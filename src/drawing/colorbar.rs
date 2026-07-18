use std::sync::Arc;

use plotive_base::style::ResolveColor;

use crate::des::axis::ticks::Locator;
use crate::des::colorbar;
use crate::drawing::axis::AsBoundRef;
use crate::drawing::cmap::{CatColorMap, ColorMap, ColorMapBuild, NumColorMap};
use crate::drawing::scale::CoordMap;
use crate::drawing::{Ctx, Text, axis, ticks};
use crate::style::{AsStroke, defaults, theme};
use crate::{Style, data, des, geom, missing_params, render, text};

/// A colorbar entry, used to populate one colorbar
#[derive(Clone)]
pub struct Entry<'a> {
    pub data_col: &'a des::DataCol,
    pub cmap_build: &'a dyn ColorMapBuild,
}

/// Implement the scale for a colorbar
#[derive(Debug, Clone)]
enum CbarScale {
    /// Numerical colorbar scale
    Num(NumScale),
    /// Category axis
    Cat(CatScale),
}

#[derive(Debug, Clone)]
struct NumScale {
    /// Data Bounds
    view_bounds: axis::NumBounds,
    /// The normalizer to map data values to a [0, 1] range
    normalizer: Arc<dyn CoordMap>,
    /// The color map to map normalized values to colors
    cmap: Arc<dyn NumColorMap>,
    /// The ticks and labels for the axis
    ticks: Vec<(f64, Text)>,
    /// Style for the tick marks and their size
    ticks_mark: (theme::Stroke, f32),
}

#[derive(Debug, Clone)]
struct CatScale {
    /// The categories for the axis
    categories: Vec<(String, Text)>,
    /// The color map to map category values to colors
    cmap: Arc<dyn CatColorMap>,
    /// Style for the tick marks and their size
    ticks_mark: (theme::Stroke, f32),
}

#[derive(Debug, Clone)]
pub struct ColorBar {
    side: axis::Side,
    des: des::ColorBar,
    title: Option<Text>,
    scale: CbarScale,
}

#[derive(Clone)]
pub struct ColorBarBuilder {
    hash: u64,
    cmap: Arc<dyn ColorMap>,
    num_cmap: Option<(Option<des::axis::Scale>, Arc<dyn NumColorMap>)>,
    cat_cmap: Option<Arc<dyn CatColorMap>>,
    data_bounds: axis::Bounds,
    locator: Locator,
}

impl ColorBarBuilder {
    pub fn new(
        cmap_build: &dyn ColorMapBuild,
        hash: u64,
        data_bounds: axis::Bounds,
        locator: Locator,
    ) -> Result<Self, super::Error> {
        let bounds = data_bounds.as_bound_ref();
        let cmap = cmap_build.build(bounds)?;
        let num_cmap = cmap_build.build_num(bounds);
        let cat_cmap = cmap_build.build_cat(bounds);
        Ok(Self {
            hash,
            cmap,
            num_cmap,
            cat_cmap,
            data_bounds,
            locator,
        })
    }

    pub fn hash(&self) -> u64 {
        self.hash
    }

    pub fn unite_bounds(&mut self, data_bounds: axis::BoundsRef<'_>) -> Result<(), super::Error> {
        self.data_bounds.unite_with(&data_bounds)
    }

    pub fn build<D>(
        self,
        cbar: Option<des::ColorBar>,
        ctx: &Ctx<'_, D>,
    ) -> Result<(Arc<dyn ColorMap>, Option<ColorBar>), super::Error>
    where
        D: data::Source + ?Sized,
    {
        let cmap = self.cmap.clone();

        let colorbar = if let Some(cbar) = cbar {
            Some(self.build_colorbar(cbar, ctx)?)
        } else {
            None
        };

        Ok((cmap, colorbar))
    }

    pub fn build_colorbar<D>(
        self,
        cbar: des::ColorBar,
        ctx: &Ctx<'_, D>,
    ) -> Result<ColorBar, super::Error>
    where
        D: data::Source + ?Sized,
    {
        let side = match cbar.pos() {
            colorbar::Pos::Right => axis::Side::Right,
            colorbar::Pos::Left => axis::Side::Left,
            colorbar::Pos::Top => axis::Side::Top,
            colorbar::Pos::Bottom => axis::Side::Bottom,
        };

        let title = cbar
            .title()
            .map(|title| {
                title.to_rich_text(
                    text::props::TextBaseProps::new(defaults::COLORBAR_TITLE_FONT_SIZE),
                    side.title_layout(),
                    ctx.fontdb(),
                )
            })
            .transpose()?
            .map(|rt| Text::from_rich_text(&rt, ctx.fontdb()))
            .transpose()?;

        match self.data_bounds {
            axis::Bounds::Num(num_bounds) => {
                let (scale, cmap) = self.num_cmap.ok_or(super::Error::InconsistentData(
                    "Unable to map colors for numerical data".to_string(),
                ))?;
                let scale = scale.unwrap_or_default();
                let normalizer = crate::drawing::scale::map_scale_coord_num(
                    &scale,
                    1.0,
                    &num_bounds,
                    (0.0, 0.0),
                );
                let axis::Bounds::Num(view_bounds) = normalizer.axis_bounds().to_bounds() else {
                    unreachable!("Normalizer should return numerical bounds");
                };

                let align = side.ticks_labels_align();
                let font_props = cbar.ticks_font().clone();
                let font = super::resolve_line_font(&font_props, Default::default());
                let font_size = font_props
                    .size
                    .unwrap_or(defaults::COLORBAR_TICKS_FONT_SIZE);
                let color = font_props
                    .color
                    .clone()
                    .flatten()
                    .unwrap_or(theme::Col::Foreground.into());
                let formatter = des::axis::ticks::Formatter::Auto;
                let ticks = ticks::locate_num(&self.locator, view_bounds, &scale)?;
                let formatter =
                    ticks::num_label_formatter(&self.locator, Some(&formatter), num_bounds, &scale);

                let ticks = ticks
                    .into_iter()
                    .filter(|t| view_bounds.contains(*t))
                    .map(|t| -> Result<_, super::Error> {
                        let text = formatter.format_label(t.into());
                        let lt = text::LineText::new(
                            text,
                            align,
                            font_size,
                            font.clone(),
                            ctx.fontdb(),
                        )?;
                        let text = Text::from_line_text(&lt, ctx.fontdb(), color)?;
                        Ok((t, text))
                    })
                    .collect::<Result<Vec<_>, _>>()?;

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
                    side,
                    des: cbar,
                    title,
                    scale: CbarScale::Num(NumScale {
                        normalizer,
                        view_bounds,
                        cmap,
                        ticks,
                        ticks_mark,
                    }),
                })
            }

            axis::Bounds::Cat(categories) => {
                let categories = categories
                    .iter()
                    .map(|s| -> Result<_, super::Error> {
                        let text = Text::from_line_text(
                            &text::LineText::new(
                                s.to_string(),
                                side.ticks_labels_align(),
                                defaults::COLORBAR_TICKS_FONT_SIZE,
                                super::resolve_line_font(&cbar.ticks_font(), Default::default()),
                                ctx.fontdb(),
                            )?,
                            ctx.fontdb(),
                            theme::Col::Foreground.into(),
                        )?;
                        Ok((s.to_string(), text))
                    })
                    .collect::<Result<Vec<_>, _>>()?;

                let cmap = self.cat_cmap.ok_or(super::Error::InconsistentData(
                    "Unable to map colors for categorical data".to_string(),
                ))?;

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
                    side,
                    des: cbar,
                    title,
                    scale: CbarScale::Cat(CatScale {
                        categories,
                        cmap,
                        ticks_mark,
                    }),
                })
            }

            #[cfg(feature = "time")]
            axis::Bounds::Time(..) => {
                panic!("Time bounds are not supported for colorbars");
            }
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

    fn cbar_calc_size_across<T>(&self, ticks_text: T, tick_mark_size: f32) -> f32
    where
        T: Iterator<Item = Text>,
    {
        let mut size = self.width();
        match self.side {
            axis::Side::Bottom | axis::Side::Top => {
                let max_h = ticks_text
                    .map(|t| t.height())
                    .max_by(|a, b| a.partial_cmp(b).unwrap())
                    .unwrap_or(0.0);
                size += max_h;
            }
            axis::Side::Left | axis::Side::Right => {
                let max_w = ticks_text
                    .map(|t| t.width())
                    .max_by(|a, b| a.partial_cmp(b).unwrap())
                    .unwrap_or(0.0);
                size += max_w;
            }
        }
        if size > self.width() {
            size += tick_mark_size + missing_params::TICK_LABEL_MARGIN;
        }
        size
    }

    pub fn calc_size_across(&self) -> f32 {
        let mut size = match &self.scale {
            CbarScale::Num(NumScale {
                ticks, ticks_mark, ..
            }) => self.cbar_calc_size_across(ticks.iter().map(|(_, t)| t.clone()), ticks_mark.1),
            CbarScale::Cat(CatScale {
                categories,
                ticks_mark,
                ..
            }) => {
                self.cbar_calc_size_across(categories.iter().map(|(_, t)| t.clone()), ticks_mark.1)
            }
        };

        if let Some(title) = self.title.as_ref() {
            // vertical axis rotate the title, therefore we take the text height in all cases.
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
        let (start, sign) = match self.side {
            axis::Side::Right | axis::Side::Left => (bar_rect.bottom(), -1.0),
            axis::Side::Top | axis::Side::Bottom => (bar_rect.left(), 1.0),
        };

        self.fill_inner_surface(surface, style, &bar_rect);

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

        let title_shift = match &self.scale {
            CbarScale::Num(num_scale) => {
                self.draw_num_ticks(surface, &bar_rect, num_scale, style, bar_len, start, sign)
            }
            CbarScale::Cat(cat_scale) => {
                self.draw_cat_ticks(surface, &bar_rect, cat_scale, style, bar_len, start, sign)
            }
        };

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

    fn fill_inner_surface<S>(&self, surface: &mut S, style: &Style, bar_rect: &geom::Rect)
    where
        S: render::Surface,
    {
        match &self.scale {
            CbarScale::Num(NumScale { cmap, .. }) => {
                self.draw_gradient(surface, bar_rect, &**cmap);
            }
            CbarScale::Cat(CatScale {
                cmap, categories, ..
            }) => {
                self.draw_cat_colors(surface, style, bar_rect, categories, &**cmap);
            }
        }
    }

    fn draw_gradient<S>(&self, surface: &mut S, bar_rect: &geom::Rect, cmap: &dyn NumColorMap)
    where
        S: render::Surface,
    {
        // The fake method draws the gradient as a succession of filled rectangles,
        // while the real method uses a gradient fill.
        // SVG shows visual artifacts with the fake method, while ICED doesn't support more than 8 stops.
        // Hence supporting those two methods.
        let bar_len = match self.side {
            axis::Side::Right | axis::Side::Left => bar_rect.height(),
            axis::Side::Top | axis::Side::Bottom => bar_rect.width(),
        };
        let num_pts = bar_len.ceil() as usize;

        if surface.caps().max_gradient_stops < 256 {
            self.draw_fake_gradient(surface, bar_len, num_pts, bar_rect, cmap);
        } else {
            self.draw_real_gradient(surface, num_pts.min(256), bar_rect, cmap);
        }
    }

    fn draw_fake_gradient<S>(
        &self,
        surface: &mut S,
        bar_len: f32,
        num_stops: usize,
        bar_rect: &geom::Rect,
        cmap: &dyn NumColorMap,
    ) where
        S: render::Surface,
    {
        let (start, sign) = match self.side {
            axis::Side::Right | axis::Side::Left => (bar_rect.bottom(), -1.0),
            axis::Side::Top | axis::Side::Bottom => (bar_rect.left(), 1.0),
        };

        let mut pos = start;
        let pos_shift = sign * bar_len / num_stops as f32;
        let mut t = 0.0;
        let t_shift = 1.0 / num_stops as f32;

        let mut pb = geom::PathBuilder::with_capacity(5, 4);
        for i in 0..=num_stops {
            let color = cmap.map_num_to_color(t);
            let pi = start + i as f32 * pos_shift;
            let pos2 = if i == num_stops {
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
    }

    fn draw_real_gradient<S>(
        &self,
        surface: &mut S,
        num_stops: usize,
        bar_rect: &geom::Rect,
        cmap: &dyn NumColorMap,
    ) where
        S: render::Surface,
    {
        let (start_pos, end_pos) = match self.side {
            axis::Side::Right | axis::Side::Left => {
                let x = bar_rect.left() + bar_rect.width() / 2.0;
                (
                    geom::Point {
                        x,
                        y: bar_rect.bottom(),
                    },
                    geom::Point {
                        x,
                        y: bar_rect.top(),
                    },
                )
            }
            axis::Side::Top | axis::Side::Bottom => {
                let y = bar_rect.top() + bar_rect.height() / 2.0;
                (
                    geom::Point {
                        x: bar_rect.left(),
                        y,
                    },
                    geom::Point {
                        x: bar_rect.right(),
                        y,
                    },
                )
            }
        };
        let mut stops = Vec::with_capacity(num_stops);
        for i in 0..=num_stops {
            let t = i as f32 / num_stops as f32;
            let color = cmap.map_num_to_color(t);
            stops.push((t, color.opaque()));
        }
        let gradient = render::Paint::LinearGradient {
            start_pos,
            end_pos,
            stops: &stops,
        };
        let rpath = render::Path {
            path: &bar_rect.to_path(), // Replace with actual path
            fill: Some(gradient),
            stroke: None,
            transform: None,
        };
        surface.draw_path(&rpath);
    }

    fn draw_cat_colors<S>(
        &self,
        surface: &mut S,
        style: &Style,
        bar_rect: &geom::Rect,
        categories: &[(String, Text)],
        cmap: &dyn CatColorMap,
    ) where
        S: render::Surface,
    {
        let is_vertical = matches!(self.side, axis::Side::Right | axis::Side::Left);
        if is_vertical {
            let height = bar_rect.height() / categories.len() as f32;
            for (i, (category, _)) in categories.iter().enumerate() {
                let rc = (style, i);
                let Some(color) = cmap.map_cat_to_color(category) else {
                    continue;
                };
                let color = rc.resolve_color(&color);

                let y1 = bar_rect.bottom() - i as f32 * height;
                let y2 = y1 - height;
                let rect = geom::Rect::from_trbl(y2, bar_rect.right(), y1, bar_rect.left());
                let rpath = render::Path {
                    path: &rect.to_path(),
                    fill: Some(color.into()),
                    stroke: None,
                    transform: None,
                };
                surface.draw_path(&rpath);
            }
        } else {
            let width = bar_rect.width() / categories.len() as f32;
            for (i, (category, _)) in categories.iter().enumerate() {
                let rc = (style, i);
                let Some(color) = cmap.map_cat_to_color(category) else {
                    continue;
                };
                let color = rc.resolve_color(&color);
                let x1 = bar_rect.left() + i as f32 * width;
                let x2 = x1 + width;
                let rect = geom::Rect::from_trbl(bar_rect.top(), x2, bar_rect.bottom(), x1);
                let rpath = render::Path {
                    path: &rect.to_path(),
                    fill: Some(color.into()),
                    stroke: None,
                    transform: None,
                };
                surface.draw_path(&rpath);
            }
        }
    }

    fn draw_num_ticks<S>(
        &self,
        surface: &mut S,
        bar_rect: &geom::Rect,
        num_scale: &NumScale,
        style: &Style,
        bar_len: f32,
        start: f32,
        sign: f32,
    ) -> f32
    where
        S: render::Surface,
    {
        let mut pb = geom::PathBuilder::with_capacity(2, 2);
        let mut title_shift: f32 = 0.0;

        let mark_len = num_scale.ticks_mark.1;
        for (tick_val, tick_text) in &num_scale.ticks {
            if !num_scale.view_bounds.contains(*tick_val) {
                continue;
            }
            let Some(t) = num_scale.normalizer.map_coord((*tick_val).into()) else {
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
                stroke: Some(num_scale.ticks_mark.0.as_stroke(style)),
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

        title_shift
    }

    fn draw_cat_ticks<S>(
        &self,
        surface: &mut S,
        bar_rect: &geom::Rect,
        cat_scale: &CatScale,
        style: &Style,
        bar_len: f32,
        start: f32,
        sign: f32,
    ) -> f32
    where
        S: render::Surface,
    {
        let mut pb = geom::PathBuilder::with_capacity(2, 2);
        let mut title_shift: f32 = 0.0;

        let bin_size = bar_len / cat_scale.categories.len() as f32;
        let mark_len = cat_scale.ticks_mark.1;

        let ticks_coord = |tick_pos| match self.side {
            axis::Side::Right => (
                bar_rect.left(),
                bar_rect.right() + mark_len,
                tick_pos,
                tick_pos,
            ),
            axis::Side::Left => (
                bar_rect.right(),
                bar_rect.left() - mark_len,
                tick_pos,
                tick_pos,
            ),
            axis::Side::Top => (
                tick_pos,
                tick_pos,
                bar_rect.bottom(),
                bar_rect.top() - mark_len,
            ),
            axis::Side::Bottom => (
                tick_pos,
                tick_pos,
                bar_rect.top(),
                bar_rect.bottom() + mark_len,
            ),
        };

        for i in 0..=cat_scale.categories.len() {
            let tick_pos = start + sign * i as f32 * bin_size;
            let (tx1, tx2, ty1, ty2) = ticks_coord(tick_pos);
            pb.move_to(tx1, ty1);
            pb.line_to(tx2, ty2);

            let path = pb.finish().expect("path should be valid");
            let rpath = render::Path {
                path: &path,
                fill: None,
                stroke: Some(cat_scale.ticks_mark.0.as_stroke(style)),
                transform: None,
            };

            surface.draw_path(&rpath);
            pb = path.clear();
        }

        for (i, (_, tick_text)) in cat_scale.categories.iter().enumerate() {
            let tick_pos = start + sign * (i as f32 + 0.5) * bin_size;
            let (_, tx2, _, ty2) = ticks_coord(tick_pos);

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

        title_shift
    }
}
