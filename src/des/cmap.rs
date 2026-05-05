//! A module for defining color maps that can be used in the drawing engine (DES) to map scalar values to colors.
//!
//! The type defined in this module can be converted to a `ColorMap` implementation at draw time, which is used for color mapping in heatmaps and similar plots.
//! Although they could implement `ColorMap` directly, doing so would require additional color conversions for each call of `map_color`, which can be expensive.

use std::sync::Arc;

use crate::color::{LinearColorMap, ColorMap, PerceptualColorMap, Rgb8};

/// A trait for types that can be converted to a `ColorMap` implementation at draw time.
pub trait AsColorMap {
    /// Get a unique hash for this color map, used to avoid creating
    /// multiple color bars for the same color map configuration.
    fn hash(&self) -> u64;

    /// Get the name of this color map, if it has one.
    /// It is used when drawing a color bar for this color map, to display the name as a label.
    fn name(&self) -> Option<&str>;

    /// Convert this type to a `ColorMap` implementation that can be used for color mapping.
    fn as_color_map(&self) -> Arc<dyn ColorMap>;
}

/// Describes how to interpolate between colors in a color map, either in linear RGB or perceptual color space.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
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
            position > 0.0 && position < 1.0,
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
    fn hash(&self) -> u64 {
        use std::hash::{Hash, Hasher, DefaultHasher};
        let mut hasher = DefaultHasher::new();
        self.method.hash(&mut hasher);
        self.start.hash(&mut hasher);
        self.end.hash(&mut hasher);
        for stop in &self.stops {
            // reinterpret the f32 position as u32 for hashing
            // it is checked that the position can't be invalid or -0.0
            let pos_bits = stop.0.to_bits();
            pos_bits.hash(&mut hasher);
            stop.1.hash(&mut hasher);
        }
        hasher.finish()
    }

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

/// A colormap that maps kelvin temperatures to colors, with a range from 1000K to 40000K.
pub fn stellar() -> LerpColorMap {
    LerpColorMap::new(
        LerpMethod::LinearRgb,
        Rgb8::from_hex(b"#ff3800"), // 1000K
        Rgb8::from_hex(b"#9bb0ff"), // 40000K
    )
    .with_name("Stellar")
}