use std::fmt;
use std::sync::Arc;

use super::axis::NumTicks;
use crate::color::ColorMap;
use crate::des::{self, ColorBarPos};
use crate::{Style, data, geom, render, style};

/// A colorbar entry, used to populate one colorbar
#[derive(Clone)]
pub struct Entry<'a> {
    pub hash: u64,
    pub label: Option<&'a str>,
    pub cmap: Arc<dyn ColorMap>,
}

#[derive(Clone)]
pub struct ColorBar {
    hash: u64,
    pos: ColorBarPos,
    width: f32,
    label: Option<String>,
    ticks: Option<NumTicks>,
    border: Option<style::theme::Stroke>,
    margin: f32,
    cmap: Arc<dyn ColorMap>,
}

impl fmt::Debug for ColorBar {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("ColorBar")
            .field("hash", &self.hash)
            .field("pos", &self.pos)
            .field("width", &self.width)
            .field("label", &self.label)
            .field("ticks", &self.ticks)
            .field("border", &self.border)
            .field("margin", &self.margin)
            .finish()
    }
}

impl ColorBar {
    pub fn new(des_cbar: des::ColorBar, entry: Entry<'_>) -> Self {
        Self {
            hash: entry.hash,
            pos: des_cbar.pos(),
            width: des_cbar.width(),
            label: entry.label.map(|s| s.to_string()),
            ticks: None,
            border: des_cbar.border().cloned(),
            margin: des_cbar.margin(),
            cmap: entry.cmap,
        }
    }

    pub fn hash(&self) -> u64 {
        self.hash
    }

    pub fn pos(&self) -> ColorBarPos {
        self.pos
    }

    pub fn width(&self) -> f32 {
        self.width
    }

    pub fn label(&self) -> Option<&str> {
        self.label.as_deref()
    }

    pub fn margin(&self) -> f32 {
        self.margin
    }

    pub fn calc_size_across(&self) -> f32 {
        self.width
    }

    pub fn draw<S>(&self, surface: &mut S, style: &Style, plot_rect: &geom::Rect, plot_box: &geom::Rect)
    where
        S: render::Surface,
    {
        match self.pos {
            ColorBarPos::Right => {
                let x_left = plot_box.right() + self.margin;
                self.draw_vertical(surface, style, plot_rect, x_left);
            }
            ColorBarPos::Left => {
                let x_left = plot_box.left() - self.margin - self.width;
                self.draw_vertical(surface, style, plot_rect, x_left);
            }
            _ => unimplemented!("only right colorbar is implemented for now"),
        }
    }
    pub fn draw_vertical<S>(&self, surface: &mut S, style: &Style, plot_rect: &geom::Rect, left: f32)
    where
        S: render::Surface,
    {
        let right = left + self.width;
        let bottom = plot_rect.bottom();
        let height = plot_rect.height();

        let num_pts = height.ceil() as usize;

        let mut y = bottom;
        let yshift = height / num_pts  as f32;

        let mut t = 0.0;
        let tshift = 1.0 / num_pts as f32;

        let mut pb = geom::PathBuilder::with_capacity(5, 4);

        for i in 0..=num_pts {
            let color = self.cmap.map_color(data::SampleRef::Num((t as f64).clamp(0.0, 1.0)));
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

        if let Some(border) = &self.border {
            let path = geom::Rect::from_trbl(bottom -height, left + self.width, bottom, left).to_path();
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
