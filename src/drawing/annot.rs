use std::f32;

use super::Ctx;
use crate::des::annot::{Anchor, Coord, LineDir, ZPos};
use crate::des::{self};
use crate::drawing::axis::{Axis, Orientation};
use crate::drawing::plot::Axes;
use crate::drawing::{Text, marker};
use crate::style::{self, AsPaint, AsStroke, theme};
use crate::{Style, data, geom, render, text};

#[derive(Debug, Clone)]
pub(super) enum Annot {
    Line(des::annot::Line),
    Arrow(des::annot::Arrow),
    Marker(des::annot::Marker),
    Label(Label),
}

#[derive(Debug, Clone)]
pub(super) struct Label {
    x: Coord,
    y: Coord,
    text: Text,
    frame: (Option<theme::Fill>, Option<theme::Stroke>),
    angle: f32,
    x_axis: des::axis::Ref,
    y_axis: des::axis::Ref,
    zpos: ZPos,
}

impl<D> Ctx<'_, D>
where
    D: data::Source + ?Sized,
{
    pub fn setup_annot(&self, annot: &des::Annotation, axes: &Axes) -> Result<Annot, super::Error> {
        let mut annot = match annot {
            des::Annotation::Line(line) => Annot::Line(line.clone()),
            des::Annotation::Arrow(arrow) => Annot::Arrow(arrow.clone()),
            des::Annotation::Marker(marker) => Annot::Marker(marker.clone()),
            des::Annotation::Label(label) => {
                let (align, ver_align) = match label.anchor() {
                    Anchor::TopLeft => (text::rich::Align::Left, text::rich::VerAlign::Top),
                    Anchor::TopCenter => (text::rich::Align::Center, text::rich::VerAlign::Top),
                    Anchor::TopRight => (text::rich::Align::Right, text::rich::VerAlign::Top),
                    Anchor::CenterRight => (text::rich::Align::Right, text::rich::VerAlign::Center),
                    Anchor::BottomRight => (text::rich::Align::Right, text::rich::VerAlign::Bottom),
                    Anchor::BottomCenter => {
                        (text::rich::Align::Center, text::rich::VerAlign::Bottom)
                    }
                    Anchor::BottomLeft => (text::rich::Align::Left, text::rich::VerAlign::Bottom),
                    Anchor::CenterLeft => (text::rich::Align::Left, text::rich::VerAlign::Center),
                    Anchor::Center => (text::rich::Align::Center, text::rich::VerAlign::Center),
                };
                let text = label.text().to_rich_text(
                    text::props::TextBaseProps::<theme::Color>::new(12.0),
                    text::rich::Layout::Horizontal(align, ver_align, Default::default()),
                    self.fontdb(),
                )?;
                let (x, y) = label.position();
                let text = Text::from_rich_text(&text, self.fontdb())?;
                let frame = label.frame();
                let frame = (frame.0.cloned(), frame.1.cloned());
                Annot::Label(Label {
                    x,
                    y,
                    text,
                    frame,
                    angle: label.angle(),
                    x_axis: label.x_axis().clone(),
                    y_axis: label.y_axis().clone(),
                    zpos: label.zpos(),
                })
            }
        };

        // Resolve axis reference to index, to ensure no error can happen later during drawing
        let x_axis = axes
            .orientation_find_idx(Orientation::X, annot.x_axis())?
            .ok_or_else(|| super::Error::UnknownAxisRef(annot.x_axis().clone()))?;
        let y_axis = axes
            .orientation_find_idx(Orientation::Y, annot.y_axis())?
            .ok_or_else(|| super::Error::UnknownAxisRef(annot.y_axis().clone()))?;
        annot = annot.with_axes(des::axis::Ref::Idx(x_axis), des::axis::Ref::Idx(y_axis));

        Ok(annot)
    }
}

fn map_x_annot_coord(coord: Coord, x_axis: &Axis, _y_axis: &Axis, plot_rect: &geom::Rect) -> f32 {
    match coord {
        Coord::Data(v) => {
            let v = x_axis.coord_map().map_coord_num(v);
            plot_rect.left() + v
        }
        Coord::Plot(v) => {
            if v >= 0.0 {
                plot_rect.left() + v
            } else {
                plot_rect.right() + v
            }
        }
    }
}

fn map_y_annot_coord(coord: Coord, _x_axis: &Axis, y_axis: &Axis, plot_rect: &geom::Rect) -> f32 {
    match coord {
        Coord::Data(v) => {
            let v = y_axis.coord_map().map_coord_num(v);
            plot_rect.bottom() - v
        }
        Coord::Plot(v) => {
            if v >= 0.0 {
                plot_rect.top() + v
            } else {
                plot_rect.bottom() + v
            }
        }
    }
}

impl Annot {
    fn x_axis(&self) -> &des::axis::Ref {
        match self {
            Annot::Line(line) => line.x_axis(),
            Annot::Arrow(arrow) => arrow.x_axis(),
            Annot::Marker(marker) => marker.x_axis(),
            Annot::Label(label) => &label.x_axis,
        }
    }

    fn with_axes(self, x_axis: des::axis::Ref, y_axis: des::axis::Ref) -> Self {
        match self {
            Annot::Line(line) => Annot::Line(line.with_x_axis(x_axis).with_y_axis(y_axis)),
            Annot::Arrow(arrow) => Annot::Arrow(arrow.with_x_axis(x_axis).with_y_axis(y_axis)),
            Annot::Marker(marker) => Annot::Marker(marker.with_x_axis(x_axis).with_y_axis(y_axis)),
            Annot::Label(mut label) => {
                label.x_axis = x_axis;
                label.y_axis = y_axis;
                Annot::Label(label)
            }
        }
    }

    fn y_axis(&self) -> &des::axis::Ref {
        match self {
            Annot::Line(line) => line.y_axis(),
            Annot::Arrow(arrow) => arrow.y_axis(),
            Annot::Marker(marker) => marker.y_axis(),
            Annot::Label(label) => &label.y_axis,
        }
    }

    pub fn zpos(&self) -> ZPos {
        match self {
            Annot::Line(line) => line.zpos(),
            Annot::Arrow(arrow) => arrow.zpos(),
            Annot::Marker(marker) => marker.zpos(),
            Annot::Label(label) => label.zpos,
        }
    }

    pub fn draw<S>(
        &self,
        surface: &mut S,
        style: &style::Style,
        axes: &Axes,
        plot_rect: &geom::Rect,
    ) where
        S: render::Surface,
    {
        let x_axis = axes
            .orientation_find(Orientation::X, self.x_axis())
            .unwrap()
            .unwrap();
        let y_axis = axes
            .orientation_find(Orientation::Y, self.y_axis())
            .unwrap()
            .unwrap();
        match self {
            Annot::Line(line) => {
                self.draw_annot_line(surface, style, line, &x_axis, &y_axis, plot_rect);
            }
            Annot::Arrow(arrow) => {
                self.draw_annot_arrow(surface, style, arrow, &x_axis, &y_axis, plot_rect);
            }
            Annot::Marker(marker) => {
                self.draw_annot_marker(surface, style, marker, &x_axis, &y_axis, plot_rect);
            }
            Annot::Label(label) => {
                self.draw_annot_label(surface, style, label, &x_axis, &y_axis, plot_rect);
            }
        }
    }

    fn draw_annot_line<S>(
        &self,
        surface: &mut S,
        style: &Style,
        line: &des::annot::Line,
        x_axis: &Axis,
        y_axis: &Axis,
        plot_rect: &geom::Rect,
    ) where
        S: render::Surface,
    {
        let (p1, p2) = match line.direction() {
            LineDir::Horizontal(y) => {
                let y = map_y_annot_coord(y, x_axis, y_axis, plot_rect);
                let p1 = geom::Point {
                    x: plot_rect.left(),
                    y,
                };
                let p2 = geom::Point {
                    x: plot_rect.right(),
                    y,
                };
                (p1, p2)
            }
            LineDir::Vertical(x) => {
                let x = map_x_annot_coord(x, x_axis, y_axis, plot_rect);
                let p1 = geom::Point {
                    x,
                    y: plot_rect.top(),
                };
                let p2 = geom::Point {
                    x,
                    y: plot_rect.bottom(),
                };
                (p1, p2)
            }
            LineDir::Slope { x, y, slope } => {
                // FIXME: raise error if either X or Y is logarithmic
                let x1 = map_x_annot_coord(x, x_axis, y_axis, plot_rect);
                let y1 = map_y_annot_coord(y, x_axis, y_axis, plot_rect);
                let x2 = x1 + 100.0;
                // negative slope because Y axis is inverted in screen coordinates
                let y2 = y1 - 100.0 * slope;
                let p1 = geom::Point { x: x1, y: y1 };
                let p2 = geom::Point { x: x2, y: y2 };
                (p1, p2)
            }
            LineDir::TwoPoints { x1, y1, x2, y2 } => {
                let x1 = map_x_annot_coord(x1, x_axis, y_axis, plot_rect);
                let y1 = map_y_annot_coord(y1, x_axis, y_axis, plot_rect);
                let x2 = map_x_annot_coord(x2, x_axis, y_axis, plot_rect);
                let y2 = map_y_annot_coord(y2, x_axis, y_axis, plot_rect);
                let p1 = geom::Point { x: x1, y: y1 };
                let p2 = geom::Point { x: x2, y: y2 };
                (p1, p2)
            }
        };

        let points = plot_rect_intersections(plot_rect, &p1, &p2);
        if let Some([p1, p2]) = points {
            let mut path = geom::PathBuilder::with_capacity(2, 2);
            path.move_to(p1.x, p1.y);
            path.line_to(p2.x, p2.y);
            let path = path.finish().expect("Should be a valid path");
            let path = render::Path {
                path: &path,
                fill: None,
                stroke: Some(line.stroke().as_stroke(style)),
                transform: None,
            };
            surface.draw_path(&path);
        }
    }

    fn draw_annot_arrow<S>(
        &self,
        surface: &mut S,
        style: &Style,
        arrow: &des::annot::Arrow,
        x_axis: &Axis,
        y_axis: &Axis,
        plot_rect: &geom::Rect,
    ) where
        S: render::Surface,
    {
        let (target_x, target_y) = arrow.target();
        let (dx, dy) = arrow.delta();
        let head_size = arrow.head_size();
        let target_x = map_x_annot_coord(target_x, x_axis, y_axis, plot_rect);
        let target_y = map_y_annot_coord(target_y, x_axis, y_axis, plot_rect);
        let len = (dx.powi(2) + dy.powi(2)).sqrt();
        let mut builder = geom::PathBuilder::with_capacity(5, 5);
        builder.move_to(0.0, 0.0);
        builder.line_to(0.0, len);
        builder.move_to(-head_size / 2.0, head_size);
        builder.line_to(0.0, 0.0);
        builder.line_to(head_size / 2.0, head_size);
        let path = builder.finish().expect("Should be a valid path");
        let angle = (dy.atan2(dx) + f32::consts::FRAC_PI_2) * 180.0 / f32::consts::PI;
        let transform = geom::Transform::from_translate(target_x, target_y).pre_rotate(angle);
        let rpath = render::Path {
            path: &path,
            fill: None,
            stroke: Some(arrow.stroke().as_stroke(style)),
            transform: Some(&transform),
        };
        surface.draw_path(&rpath);
    }

    fn draw_annot_marker<S>(
        &self,
        surface: &mut S,
        style: &Style,
        marker: &des::annot::Marker,
        x_axis: &Axis,
        y_axis: &Axis,
        plot_rect: &geom::Rect,
    ) where
        S: render::Surface,
    {
        let (x, y) = marker.position();
        let x = map_x_annot_coord(x, x_axis, y_axis, plot_rect);
        let y = map_y_annot_coord(y, x_axis, y_axis, plot_rect);
        let marker = marker.marker();
        let path = marker::marker_path(marker.shape);
        let scale = marker.size.to_visual_size();

        let transform = geom::Transform::from_translate(x, y).pre_scale(scale, scale);

        let rpath = render::Path {
            path: &path,
            fill: marker.fill.as_ref().map(|f| f.as_paint(style)),
            stroke: marker
                .stroke
                .as_ref()
                .map(|l| l.as_stroke(style).with_multiplied_width(1.0 / scale)),
            transform: Some(&transform),
        };
        surface.draw_path(&rpath);
    }

    fn draw_annot_label<S>(
        &self,
        surface: &mut S,
        style: &Style,
        label: &Label,
        x_axis: &Axis,
        y_axis: &Axis,
        plot_rect: &geom::Rect,
    ) where
        S: render::Surface,
    {
        let x = map_x_annot_coord(label.x, x_axis, y_axis, plot_rect);
        let y = map_y_annot_coord(label.y, x_axis, y_axis, plot_rect);

        let transform = geom::Transform::from_translate(x, y).pre_rotate(-label.angle);

        if label.frame.0.is_some() || label.frame.1.is_some() {
            let bounds = label.text.bbox.expect("Text bbox should be computed");
            let rect =
                geom::Rect::from_xywh(bounds.x(), bounds.y(), bounds.width(), bounds.height());
            let rrect = render::Rect {
                rect,
                fill: label.frame.0.as_ref().map(|f| f.as_paint(style)),
                stroke: label.frame.1.as_ref().map(|l| l.as_stroke(style)),
                transform: Some(&transform),
            };
            surface.draw_rect(&rrect);
        }

        label.text.draw(surface, style, Some(&transform));
    }
}

fn plot_rect_intersections(
    plot_rect: &geom::Rect,
    p1: &geom::Point,
    p2: &geom::Point,
) -> Option<[geom::Point; 2]> {
    let mut intersections: [Option<geom::Point>; 4] = [None; 4];

    // Parametric equation of the line: p1 + t * (p2 - p1)
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;

    // Function to calculate Y for given X (if dx != 0)
    let y_for_x = |x: f32| -> f32 {
        if dx == 0.0 {
            p1.y // vertical line
        } else {
            let t = (x - p1.x) / dx;
            p1.y + t * dy
        }
    };

    // Function to calculate X for given Y (if dx != 0)
    let x_for_y = |y: f32| -> f32 {
        if dy == 0.0 {
            p1.x // horizontal line
        } else {
            let t = (y - p1.y) / dy;
            p1.x + t * dx
        }
    };

    let mut idx = 0;

    // Intersection with vertical edges (left and right)
    if dx != 0.0 {
        for &x in &[plot_rect.x(), plot_rect.x() + plot_rect.width()] {
            let y = y_for_x(x);
            if y >= plot_rect.y() && y <= plot_rect.y() + plot_rect.height() {
                intersections[idx] = Some(geom::Point { x, y });
                idx += 1;
            }
        }
    }

    // Intersection with horizontal edges (top and bottom)
    if dy != 0.0 {
        for &y in &[plot_rect.y(), plot_rect.y() + plot_rect.height()] {
            let x = x_for_y(y);
            if x >= plot_rect.x() && x <= plot_rect.x() + plot_rect.width() {
                intersections[idx] = Some(geom::Point { x, y });
                idx += 1;
            }
        }
    }

    // We return result only if we have two points
    if idx == 2 {
        Some([intersections[0].unwrap(), intersections[1].unwrap()])
    } else {
        None
    }
}
