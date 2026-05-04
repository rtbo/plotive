//! A module for defining color maps that can be used in the drawing engine (DES) to map scalar values to colors.
//!
//! The type defined in this module can be converted to a `ColorMap` implementation at draw time, which is used for color mapping in heatmaps and similar plots.
//! Although they could implement `ColorMap` directly, doing so would require additional color conversions for each call of `map_color`, which can be expensive.

use std::sync::Arc;

use crate::color::{LinearColorMap, ColorMap, PerceptualColorMap, Rgb8};

/// A trait for types that can be converted to a `ColorMap` implementation at draw time.
pub trait AsColorMap {
    /// Get the name of this color map, if it has one.
    /// It is used when drawing a color bar for this color map, to display the name as a label.
    fn name(&self) -> Option<&str>;
    /// Convert this type to a `ColorMap` implementation that can be used for color mapping.
    fn as_color_map(&self) -> Arc<dyn ColorMap>;
}

/// Describes how to interpolate between colors in a color map, either in linear RGB or perceptual color space.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum LerpMethod {
    /// Interpolate colors in the linear RGB color space, which is faster but can produce less smooth gradients.
    LinearRgb,
    /// Interpolate colors in a perceptual color space, which produces smoother gradients but is slower.
    Perceptual,
}

/// A color map that can be converted to a `MapColor` implementation at draw time.
#[derive(Debug, Clone)]
pub struct LerpColorMap {
    method: LerpMethod,
    name: Option<String>,
    start: Rgb8,
    end: Rgb8,
    stops: Vec<(f32, Rgb8)>,
}

impl LerpColorMap {
    /// Creates a new `LerpColorMap` with the specified interpolation method, start and end colors, and optional stops.
    pub fn new(method: LerpMethod, start: Rgb8, end: Rgb8) -> Self {
        Self {
            method,
            name: None,
            start,
            end,
            stops: Vec::new(),
        }
    }

    /// Set the name of this color map.
    /// It is used when drawing a color bar for this color map, to display the name as a label.
    pub fn with_name(mut self, name: impl Into<String>) -> Self {
        self.name = Some(name.into());
        self
    }

    /// Adds a color stop at the specified position (between 0.0 and 1.0) with the given color.
    pub fn with_stop(mut self, position: f32, color: Rgb8) -> Self {
        assert!(
            (0.0..=1.0).contains(&position),
            "Color stop position must be between 0.0 and 1.0"
        );
        self.stops.push((position, color));
        self.stops.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());
        self
    }

    /// Get the name of this color map, if it has one.
    pub fn name(&self) -> Option<&str> {
        self.name.as_deref()
    }
}

impl AsColorMap for LerpColorMap {
    fn name(&self) -> Option<&str> {
        self.name()
    }

    fn as_color_map(&self) -> Arc<dyn ColorMap> {
        match self.method {
            LerpMethod::LinearRgb => {
                let mut map = LinearColorMap::new(self.start, self.end);
                if !self.stops.is_empty() {
                    map = map.with_stops(self.stops.iter().copied());
                }
                Arc::new(map)
            }
            LerpMethod::Perceptual => {
                let mut map = PerceptualColorMap::new(self.start, self.end);
                if !self.stops.is_empty() {
                    map = map.with_stops(self.stops.iter().copied());
                }
                Arc::new(map)
            }
        }
    }
}

/// A colormap that maps kelvin temperatures to colors, with a range from 1000K to 15000K.
pub fn stellar() -> LerpColorMap {
    LerpColorMap::new(
        LerpMethod::LinearRgb,
        Rgb8::from_hex(b"#ff3800"), // 1000K
        Rgb8::from_hex(b"#9bb0ff"), // 15000K
    )
    .with_name("Stellar")
}