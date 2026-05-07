use std::fmt;
use std::sync::Arc;

use crate::des::{self, colorbar};
use crate::drawing::axis::{self, AsBoundRef};
use crate::drawing::cmap::{AsColorMap, ColorMap};
use crate::drawing::{Ctx, Text, ticks};
use crate::style::theme;
use crate::{Style, data, geom, missing_params, render, text};

/// A colorbar entry, used to populate one colorbar
#[derive(Clone)]
pub struct Entry<'a> {
    pub data_col: &'a des::DataCol,
    pub cmap: &'a dyn AsColorMap,
}

/// A trait that maps data to a 0..1 range, used for color bars and similar features.
pub trait ColorDataMap {
    // identifies the right colorbar when multiple color bars are present
    fn hash(&self) -> u64;
    fn map_color_data(&self, data: data::SampleRef<'_>) -> Option<f32>;
}

#[derive(Clone)]
pub struct ColorBarBuilder {
    hash: u64,
    cmap: Arc<dyn ColorMap>,
    data_bounds: axis::Bounds,
}

impl ColorBarBuilder {
    pub fn new(hash: u64, cmap: Arc<dyn ColorMap>, data_bounds: axis::Bounds) -> Self {
        Self {
            hash,
            cmap,
            data_bounds,
        }
    }

    pub fn hash(&self) -> u64 {
        self.hash
    }

    pub fn data_bounds(&self) -> axis::BoundsRef<'_> {
        self.data_bounds.as_bound_ref()
    }

    pub fn unite_bounds(&mut self, data_bounds: axis::BoundsRef<'_>) -> Result<(), super::Error> {
        self.data_bounds.unite_with(&data_bounds)
    }

    pub fn build<D>(self, des: des::ColorBar, ctx: &Ctx<'_, D>) -> Result<ColorBar, super::Error>
    where
        D: data::Source + ?Sized,
    {
        let side = match des.pos() {
            colorbar::Pos::Right => axis::Side::Right,
            colorbar::Pos::Left => axis::Side::Left,
            colorbar::Pos::Top => axis::Side::Top,
            colorbar::Pos::Bottom => axis::Side::Bottom,
        };

        let title = des
            .title()
            .map(|title| title.to_rich_text(side.title_layout(), ctx.fontdb()))
            .transpose()?
            .map(|rt| Text::from_rich_text(&rt, ctx.fontdb()))
            .transpose()?;

        let ticks = match &self.data_bounds {
            axis::Bounds::Num(nb) => {
                let align = side.ticks_labels_align();
                let font = des.ticks_font().clone();
                let scale: des::axis::Scale =
                    des::axis::Range::new(Some(nb.start()), Some(nb.end())).into();
                let locator = des::axis::ticks::Locator::Auto;
                let formatter = des::axis::ticks::Formatter::Auto;
                let ticks = ticks::locate_num(&locator, *nb, &scale)?;
                let formatter = ticks::num_label_formatter(&locator, Some(&formatter), *nb, &scale);
                ticks
                    .into_iter()
                    .map(|t| -> Result<_, super::Error> {
                        let text = formatter.format_label(t.into());
                        let lt = text::LineText::new(
                            text,
                            align,
                            font.size,
                            font.font.clone(),
                            ctx.fontdb(),
                        )?;
                        let text = Text::from_line_text(&lt, ctx.fontdb(), font.color)?;
                        Ok((data::Sample::Num(t), text))
                    })
                    .collect::<Result<Vec<_>, _>>()?
            }
            _ => vec![],
        };

        let ticks_mark = (
            theme::Stroke {
                color: theme::Col::Foreground.into(),
                width: 1.0,
                pattern: Default::default(),
                opacity: None,
            },
            4.0,
        );

        Ok(ColorBar {
            hash: self.hash,
            side,
            des,
            data_bounds: self.data_bounds,
            cmap: self.cmap,
            title,
            ticks,
            ticks_mark,
        })
    }
}

#[derive(Clone)]
pub struct ColorBar {
    hash: u64,
    side: axis::Side,
    des: des::ColorBar,
    data_bounds: axis::Bounds,
    cmap: Arc<dyn ColorMap>,
    title: Option<Text>,
    ticks: Vec<(data::Sample, Text)>,
    ticks_mark: (theme::Stroke, f32),
}

impl fmt::Debug for ColorBar {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("ColorBar")
            .field("hash", &self.hash)
            .field("side", &self.side)
            .field("des", &self.des)
            .field("data_bounds", &self.data_bounds)
            .field("title", &self.title)
            .field("ticks", &self.ticks)
            .field("ticks_mark", &self.ticks_mark)
            .finish()
    }
}

impl ColorDataMap for ColorBar {
    fn hash(&self) -> u64 {
        self.hash
    }

    fn map_color_data(&self, data: data::SampleRef<'_>) -> Option<f32> {
        let bounds = self.data_bounds.as_bound_ref().as_num()?;
        let val = data.as_num()?;
        let min = bounds.start();
        let max = bounds.end();

        if val.is_finite() && min.is_finite() && max.is_finite() && max > min {
            Some(((val - min) / (max - min)).clamp(0.0, 1.0) as f32)
        } else {
            None
        }
    }
}

impl ColorBar {
    pub fn pos(&self) -> colorbar::Pos {
        self.des.pos()
    }

    pub fn width(&self) -> f32 {
        self.des.width()
    }

    pub fn margin(&self) -> f32 {
        self.des.margin()
    }

    pub fn border(&self) -> Option<&theme::Stroke> {
        self.des.border()
    }

    pub fn calc_size_across(&self) -> f32 {
        let mut size = self.width();

        if !self.ticks.is_empty() {
            size += self.ticks_mark.1 + missing_params::TICK_LABEL_MARGIN;
            match self.side {
                axis::Side::Bottom | axis::Side::Top => {
                    let max_h = self
                        .ticks
                        .iter()
                        .map(|t| t.1.height())
                        .max_by(|a, b| a.partial_cmp(b).unwrap())
                        .unwrap_or(0.0);
                    size += max_h;
                }
                axis::Side::Left | axis::Side::Right => {
                    let max_w = self
                        .ticks
                        .iter()
                        .map(|t| t.1.width())
                        .max_by(|a, b| a.partial_cmp(b).unwrap())
                        .unwrap_or(0.0);
                    size += max_w;
                }
            }
        }

        if let Some(title) = self.title.as_ref() {
            // vertical axis rotate the title, therefore we take the height in all cases.
            size += title.height() + missing_params::AXIS_TITLE_MARGIN;
        }
        size
    }

    pub fn draw<S>(
        &self,
        surface: &mut S,
        style: &Style,
        plot_rect: &geom::Rect,
        plot_box: &geom::Rect,
    ) where
        S: render::Surface,
    {
        let bar_rect = match self.side {
            axis::Side::Right => geom::Rect::from_trbl(
                plot_rect.top(),
                plot_box.right() + self.margin() + self.width(),
                plot_rect.bottom(),
                plot_box.right() + self.margin(),
            ),
            axis::Side::Left => geom::Rect::from_trbl(
                plot_rect.top(),
                plot_box.left() - self.margin(),
                plot_rect.bottom(),
                plot_box.left() - self.margin() - self.width(),
            ),
            axis::Side::Top => geom::Rect::from_trbl(
                plot_box.top() - self.margin() - self.width(),
                plot_rect.right(),
                plot_box.top() - self.margin(),
                plot_rect.left(),
            ),
            axis::Side::Bottom => geom::Rect::from_trbl(
                plot_box.bottom() + self.margin(),
                plot_rect.right(),
                plot_box.bottom() + self.margin() + self.width(),
                plot_rect.left(),
            ),
        };
        let bar_len = match self.side {
            axis::Side::Right | axis::Side::Left => bar_rect.height(),
            axis::Side::Top | axis::Side::Bottom => bar_rect.width(),
        };
        let num_pts = bar_len.ceil() as usize;
        let (start, sign) = match self.side {
            axis::Side::Right | axis::Side::Left => (bar_rect.bottom(), -1.0),
            axis::Side::Top | axis::Side::Bottom => (bar_rect.left(), 1.0),
        };
        let mut pos = start;
        let pos_shift = sign * bar_len / num_pts as f32;
        let mut t = 0.0;
        let t_shift = 1.0 / num_pts as f32;

        let mut pb = geom::PathBuilder::with_capacity(5, 4);
        for i in 0..=num_pts {
            let color = self.cmap.map_color(t);
            let pi = start + i as f32 * pos_shift;
            let pos2 = if i == num_pts {
                pi
            } else {
                pi + pos_shift / 2.0
            };
            let (x1, y1, x2, y2) = match self.side {
                axis::Side::Right | axis::Side::Left => {
                    (bar_rect.left(), pos, bar_rect.right(), pos2)
                }
                axis::Side::Top | axis::Side::Bottom => {
                    (pos, bar_rect.top(), pos2, bar_rect.bottom())
                }
            };
            pb.move_to(x1, y1);
            pb.line_to(x1, y2);
            pb.line_to(x2, y2);
            pb.line_to(x2, y1);

            let path = pb.finish().expect("path should be valid");
            let rpath = render::Path {
                path: &path,
                fill: Some(color.opaque().into()),
                stroke: None,
                transform: None,
            };
            surface.draw_path(&rpath);

            pb = path.clear();
            pos = pos2;
            t = (t + t_shift).min(1.0);
        }

        if let Some(border) = self.border() {
            let path = bar_rect.to_path();
            let rpath = render::Path {
                path: &path,
                fill: None,
                stroke: Some(border.as_stroke(style)),
                transform: None,
            };
            surface.draw_path(&rpath);
        }

        let mut title_shift: f32 = 0.0;

        let mark_len = self.ticks_mark.1;
        for (tick_val, tick_text) in &self.ticks {
            if !self.data_bounds.contains(tick_val.as_ref()) {
                continue;
            }
            let Some(t) = self.map_color_data(tick_val.as_ref()) else {
                continue;
            };
            let tick_pos = start + sign * t * bar_len;
            let (tx1, tx2, ty1, ty2) = match self.side {
                axis::Side::Right => (
                    bar_rect.right(),
                    bar_rect.right() + mark_len,
                    tick_pos,
                    tick_pos,
                ),
                axis::Side::Left => (
                    bar_rect.left(),
                    bar_rect.left() - mark_len,
                    tick_pos,
                    tick_pos,
                ),
                axis::Side::Top => (
                    tick_pos,
                    tick_pos,
                    bar_rect.top(),
                    bar_rect.top() - mark_len,
                ),
                axis::Side::Bottom => (
                    tick_pos,
                    tick_pos,
                    bar_rect.bottom(),
                    bar_rect.bottom() + mark_len,
                ),
            };
            pb.move_to(tx1, ty1);
            pb.line_to(tx2, ty2);
            let path = pb.finish().expect("path should be valid");
            let rpath = render::Path {
                path: &path,
                fill: None,
                stroke: Some(self.ticks_mark.0.as_stroke(style)),
                transform: None,
            };
            surface.draw_path(&rpath);
            pb = path.clear();

            let (tx, ty, ts) = match self.side {
                axis::Side::Right => (
                    tx2 + missing_params::TICK_LABEL_MARGIN,
                    tick_pos,
                    tick_text.width(),
                ),
                axis::Side::Left => (
                    tx2 - missing_params::TICK_LABEL_MARGIN,
                    tick_pos,
                    tick_text.width(),
                ),
                axis::Side::Top => (
                    tick_pos,
                    ty2 - missing_params::TICK_LABEL_MARGIN,
                    tick_text.height(),
                ),
                axis::Side::Bottom => (
                    tick_pos,
                    ty2 + missing_params::TICK_LABEL_MARGIN,
                    tick_text.height(),
                ),
            };
            let transform = geom::Transform::from_translate(tx, ty);
            tick_text.draw(surface, style, Some(&transform));

            title_shift = title_shift.max(ts + missing_params::TICK_LABEL_MARGIN + mark_len);
        }

        if let Some(title) = self.title.as_ref() {
            let (tx, ty, rot) = match self.side {
                axis::Side::Right => (
                    bar_rect.right() + title_shift + missing_params::AXIS_TITLE_MARGIN,
                    start + sign * bar_len / 2.0,
                    -90.0,
                ),
                axis::Side::Left => (
                    bar_rect.left() - title_shift - missing_params::AXIS_TITLE_MARGIN,
                    start + sign * bar_len / 2.0,
                    -90.0,
                ),
                axis::Side::Top => (
                    start + sign * bar_len / 2.0,
                    bar_rect.top() - title_shift - missing_params::AXIS_TITLE_MARGIN,
                    0.0,
                ),
                axis::Side::Bottom => (
                    start + sign * bar_len / 2.0,
                    bar_rect.bottom() + title_shift + missing_params::AXIS_TITLE_MARGIN,
                    0.0,
                ),
            };
            let transform = geom::Transform::from_translate(tx, ty).pre_rotate(rot);
            title.draw(surface, style, Some(&transform));
        }
    }
}
