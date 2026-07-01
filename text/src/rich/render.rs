use plotive_base::{Rgba8, geom, style};
use ttf_parser as ttf;

use super::RichText;
use crate::{font, fontdb};

#[derive(Debug)]
pub enum RichPrimitive<'a, C = Rgba8>
where
    C: Clone,
{
    Fill(&'a geom::Path, &'a style::Fill<C>),
    Stroke(&'a geom::Path, &'a style::Stroke<C>),
}

pub fn render_rich_text_with<C, RenderFn>(
    text: &RichText<C>,
    fontdb: &fontdb::Database,
    mut render_fn: RenderFn,
) -> Result<(), crate::Error>
where
    C: Clone,
    RenderFn: FnMut(RichPrimitive<'_, C>),
{
    let mut span_builder = geom::PathBuilder::new();
    let mut glyph_builder = geom::PathBuilder::new();

    for line in &text.lines {
        for shape in &line.shapes {
            (glyph_builder, span_builder) = fontdb
                .with_face_data(shape.face_id, |data, index| {
                    let mut face = ttf::Face::parse(data, index).unwrap();
                    font::apply_ttf_variations(&mut face, shape.font());

                    // TODO: get span bbox and render underline and strikeout lines

                    for span in &shape.spans {
                        for glyph in shape
                            .glyphs
                            .iter()
                            .filter(|g| g.cluster >= span.start && g.cluster < span.end)
                        {
                            {
                                let mut builder = crate::Outliner(&mut glyph_builder);
                                face.outline_glyph(glyph.id, &mut builder);
                            }

                            if let Some(path) = glyph_builder.finish() {
                                let path = path.transform(glyph.ts).unwrap();
                                span_builder.push_path(&path);

                                glyph_builder = path.clear();
                            } else {
                                glyph_builder = geom::PathBuilder::new();
                            }
                        }

                        if span.props.decorations().underline {
                            let line = shape.metrics.uline;
                            let path = crate::line_path(
                                span.bbox(),
                                shape.y_baseline,
                                line,
                                glyph_builder,
                            );
                            span_builder.push_path(&path);
                            glyph_builder = path.clear();
                        }
                        if span.props.decorations().strikethrough {
                            let line = shape.metrics.strikeout;
                            let path = crate::line_path(
                                span.bbox(),
                                shape.y_baseline,
                                line,
                                glyph_builder,
                            );
                            span_builder.push_path(&path);
                            glyph_builder = path.clear();
                        }

                        if let Some(path) = span_builder.finish() {
                            if let Some(fill) = span.props.render().fill.as_ref() {
                                let prim = RichPrimitive::Fill(&path, fill);
                                render_fn(prim);
                            }
                            if let Some(outline) = span.props.render().outline.as_ref() {
                                let prim = RichPrimitive::Stroke(&path, outline);
                                render_fn(prim);
                            }
                            span_builder = path.clear();
                        } else {
                            span_builder = geom::PathBuilder::new();
                        }
                    }

                    (glyph_builder, span_builder)
                })
                .unwrap();
        }
    }

    Ok(())
}

pub fn render_rich_text(
    text: &RichText,
    fontdb: &fontdb::Database,
    transform: geom::Transform,
    mask: Option<&tiny_skia::Mask>,
    pixmap: &mut tiny_skia::PixmapMut<'_>,
) -> Result<(), crate::Error> {
    let render_fn = |primitive: RichPrimitive| match primitive {
        RichPrimitive::Fill(path, fill) => {
            let mut paint = tiny_skia::Paint::default();
            match fill {
                style::Fill::Solid { color, opacity } => {
                    let a = if let Some(opacity) = opacity {
                        (color.a() as f32 * opacity).round() as u8
                    } else {
                        color.a()
                    };
                    paint.set_color_rgba8(color.r(), color.g(), color.b(), a);
                }
            }
            pixmap.fill_path(path, &paint, tiny_skia::FillRule::Winding, transform, mask);
        }
        RichPrimitive::Stroke(path, outline) => {
            let mut paint = tiny_skia::Paint::default();
            paint.set_color_rgba8(
                outline.color.r(),
                outline.color.g(),
                outline.color.b(),
                outline.color.a(),
            );
            let mut stroke = tiny_skia::Stroke::default();
            stroke.width = outline.width;
            if let Some(pattern) = outline.pattern.get_dash() {
                let array = pattern.iter().map(|d| d * stroke.width).collect();
                stroke.dash = tiny_skia::StrokeDash::new(array, 0.0);
            }
            pixmap.stroke_path(path, &paint, &stroke, transform, mask);
        }
    };
    render_rich_text_with(text, fontdb, render_fn)
}
