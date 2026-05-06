use std::fmt;
use std::sync::Arc;

use crate::des::{self, ColorBarPos};
use crate::drawing::axis::{self, AsBoundRef};
use crate::drawing::cmap::{AsColorMap, ColorMap};
use crate::style::theme;
use crate::{Style, data, geom, render};

/// A colorbar entry, used to populate one colorbar
#[derive(Clone)]
pub struct Entry<'a> {
    pub data_col: &'a des::DataCol,
    pub cmap: &'a dyn AsColorMap
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
        Self { hash, cmap, data_bounds }
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

    pub fn build(self, des: des::ColorBar) -> ColorBar {
        ColorBar{
            hash: self.hash,
            des,
            data_bounds: self.data_bounds,
            cmap: self.cmap,
        }
    }
}

#[derive(Clone)]
pub struct ColorBar {
    hash: u64,
    des: des::ColorBar,
    data_bounds: axis::Bounds,
    cmap: Arc<dyn ColorMap>,
}

impl fmt::Debug for ColorBar {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("ColorBar")
            .field("des", &self.des)
            .field("data_bounds", &self.data_bounds)
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
    pub fn pos(&self) -> ColorBarPos {
        self.des.pos()
    }

    pub fn width(&self) -> f32 {
        self.des.width()
    }

    pub fn label(&self) -> Option<&str> {
        self.des.label()
    }

    pub fn margin(&self) -> f32 {
        self.des.margin()
    }

    pub fn border(&self) -> Option<&theme::Stroke> {
        self.des.border()
    }

    pub fn calc_size_across(&self) -> f32 {
        self.des.width()
    }

    pub fn draw<S>(&self, surface: &mut S, style: &Style, plot_rect: &geom::Rect, plot_box: &geom::Rect)
    where
        S: render::Surface,
    {
        match self.pos() {
            ColorBarPos::Right => {
                let x_left = plot_box.right() + self.margin();
                self.draw_vertical(surface, style, plot_rect, x_left);
            }
            ColorBarPos::Left => {
                let x_left = plot_box.left() - self.margin() - self.width();
                self.draw_vertical(surface, style, plot_rect, x_left);
            }
            _ => unimplemented!("only right colorbar is implemented for now"),
        }
    }

    pub fn draw_vertical<S>(&self, surface: &mut S, style: &Style, plot_rect: &geom::Rect, left: f32)
    where
        S: render::Surface,
    {
        //let data_bounds = self.data_bounds.as_num().expect("Only numeric color bars are supported for now");
        let right = left + self.width();
        let bottom = plot_rect.bottom();
        let height = plot_rect.height();

        let num_pts = height.ceil() as usize;

        let mut y = bottom;
        let yshift = height / num_pts  as f32;

        let mut t = 0.0;
        let tshift = 1.0 / num_pts as f32;

        let mut pb = geom::PathBuilder::with_capacity(5, 4);

        for i in 0..=num_pts {
            let color = self.cmap.map_color(t);
            let py = bottom - i as f32 * yshift;
            let y2 = if i == num_pts {
                py
            } else {
                py - yshift / 2.0
            };

            pb.move_to(left, y);
            pb.line_to(left, y2);
            pb.line_to(right, y2);
            pb.line_to(right, y);

            let path = pb.finish().expect("path should be valid");
            let rpath = render::Path {
                path: &path,
                fill: Some(color.opaque().into()),
                stroke: None,
                transform: None,
            };
            surface.draw_path(&rpath);

            pb = path.clear();
            y = y2;
            t += tshift;
        }

        if let Some(border) = self.border() {
            let path = geom::Rect::from_trbl(bottom -height, left + self.width(), bottom, left).to_path();
            let rpath = render::Path {
                path: &path,
                fill: None,
                stroke: Some(border.as_stroke(style)),
                transform: None,
            };
            surface.draw_path(&rpath);
        }
    }
}
