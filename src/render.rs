//! Render module: provides abstraction over rendering surfaces, like pixel-based, SVG, or GUI.
//!
//! All rendering surfaces must implement the `Surface` trait.
//! See the `plotive-pxl` and `plotive-svg` crates for examples.

use plotive_base::Rgb8;

use crate::{Rgba8, geom};

/// Surface capabilities, used to query the surface for supported features and optimizations.
#[derive(Debug, Clone, Copy)]
pub struct SurfaceCaps {
    /// Maximum number of gradient stops supported by the surface.
    /// If the surface does not support gradients, this will be 0.
    pub max_gradient_stops: usize,
}

/// Surface trait: defines the rendering surface API
pub trait Surface {
    /// Get the capabilities of the surface
    fn caps(&self) -> SurfaceCaps;

    /// Prepare the surface for drawing, with the given size in plot units
    fn prepare(&mut self, size: geom::Size);

    /// Fill the entire surface with the given fill pattern
    fn fill(&mut self, fill: Paint);

    /// Draw a rectangle
    ///
    /// Default implementation converts the rectangle to a path and call [`draw_path`](Surface::draw_path)
    fn draw_rect(&mut self, rect: &Rect) {
        let path = rect.rect.to_path();
        let rpath = self::Path {
            path: &path,
            fill: rect.fill,
            stroke: rect.stroke,
            transform: rect.transform,
        };
        self.draw_path(&rpath);
    }

    /// Draw a path
    fn draw_path(&mut self, path: &Path);

    /// Push a clipping rect
    /// Subsequent draw operations will be clipped to this rect,
    /// until a matching [`pop_clip`](Surface::pop_clip) is called
    fn push_clip(&mut self, clip: &Clip);

    /// Pop a clipping rect that was pushed previously with [`push_clip`](Surface::push_clip)
    fn pop_clip(&mut self);

    /// Finalize the surface
    /// Allows a surface to perform a last mutable operation after drawing, such as flushing a cache.
    fn finalize(&mut self) {}
}

/// Paint pattern, used for fill operations
#[derive(Debug, Clone, Copy)]
pub enum Paint<'a> {
    /// Solid color fill
    Solid(Rgba8),
    /// Linear gradient fill
    LinearGradient {
        /// Gradient start position
        start_pos: geom::Point,
        /// Gradient end position
        end_pos: geom::Point,
        /// Gradient stops
        stops: &'a [(f32, Rgba8)],
    },
}

impl<'a> Paint<'a> {
    /// Return a new `Paint` with the same alpha as the original, but with the RGB values replaced by the given color.
    pub fn with_rgb(self, rgb: Rgb8) -> Self {
        match self {
            Paint::Solid(rgba) => Paint::Solid(rgb.with_a(rgba.a())),
            Paint::LinearGradient { .. } => {
                panic!("with_rgb is not implemented for LinearGradient paint")
            }
        }
    }
}

impl From<Rgba8> for Paint<'_> {
    fn from(value: Rgba8) -> Self {
        Paint::Solid(value)
    }
}

/// Line pattern defines how the line is drawn
#[derive(Debug, Clone, Copy, Default)]
pub enum LinePattern<'a> {
    /// Solid line
    #[default]
    Solid,
    /// Dashed line. The pattern is relative to the line width.
    Dash(&'a [f32]),
}

/// Stroke style definition
#[derive(Debug, Clone, Copy)]
pub struct Stroke<'a> {
    /// Line color
    pub color: Rgba8,
    /// Line width in figure units
    pub width: f32,
    /// Line pattern
    pub pattern: LinePattern<'a>,
}

impl Stroke<'_> {
    /// Multiply the line width by the given factor, useful for keeping visual width with scaled paths.
    pub fn with_multiplied_width(mut self, factor: f32) -> Self {
        self.width *= factor;
        self
    }

    /// Return a new `Stroke` with the same alpha as the original, but with the RGB values replaced by the given color.
    pub fn with_rgb(self, rgb: Rgb8) -> Self {
        Stroke {
            color: rgb.with_a(self.color.a()),
            ..self
        }
    }
}

/// Rectangle to draw
#[derive(Debug, Clone)]
pub struct Rect<'a> {
    /// Rectangle geometry
    pub rect: geom::Rect,
    /// Fill style
    pub fill: Option<Paint<'a>>,
    /// Stroke style
    pub stroke: Option<Stroke<'a>>,
    /// Optional transform to apply to the rectangle
    pub transform: Option<&'a geom::Transform>,
}

/// Path to draw
#[derive(Debug, Clone)]
pub struct Path<'a> {
    /// Path geometry
    pub path: &'a geom::Path,
    /// Fill style
    pub fill: Option<Paint<'a>>,
    /// Stroke style
    pub stroke: Option<Stroke<'a>>,
    /// Optional transform to apply to the path
    pub transform: Option<&'a geom::Transform>,
}

/// Clipping rectangle
#[derive(Debug, Clone)]
pub struct Clip<'a> {
    /// Clipping rectangle
    pub rect: &'a geom::Rect,
    /// Optional transform to apply to the clipping rectangle
    pub transform: Option<&'a geom::Transform>,
}
