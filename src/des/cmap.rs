//! A module for defining color maps that can be used in the drawing engine (DES) to map scalar values to colors.
//!
//! The type defined in this module can be converted to a `ColorMap` implementation at draw time, which is used for color mapping in heatmaps and similar plots.
//! Although they could implement `ColorMap` directly, doing so would require additional color conversions for each call of `map_color`, which can be expensive.

use std::sync::Arc;

use crate::color::{ColorMap, LinearColorMap, PerceptualColorMap, Rgb8, XyzColorMap};

/// A trait for types that can be converted to a `ColorMap` implementation at draw time.
pub trait AsColorMap {
    /// Get a unique hash for this color map, used to avoid creating
    /// multiple color bars for the same color map configuration.
    fn hash(&self) -> u64;

    /// Get the name of this color map, if it has one.
    /// It is used when drawing a color bar for this color map, to display the name as a label.
    fn name(&self) -> Option<&str>;

    /// The range of scalar values that this color map maps to, as (min, max).
    fn range(&self) -> (f32, f32);

    /// Convert this type to a `ColorMap` implementation that can be used for color mapping.
    fn as_color_map(&self) -> Arc<dyn ColorMap>;
}

/// Describes how to interpolate between colors in a color map, either in linear RGB or perceptual color space.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum LerpMethod {
    /// Interpolate colors in the linear RGB color space.
    LinearRgb,
    /// Interpolate colors in a perceptual color space.
    Perceptual,
    /// Interpolate colors in the XYZ color space.
    Xyz,
}

/// A color map that can be converted to a `MapColor` implementation at draw time.
#[derive(Debug, Clone)]
pub struct LerpColorMap {
    method: LerpMethod,
    start: Rgb8,
    end: Rgb8,
    range: (f32, f32),
    name: Option<String>,
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
            range: (0.0, 1.0),
            stops: Vec::new(),
        }
    }

    /// Creates a new `LerpColorMap` with the specified interpolation method, start and end colors, and optional stops.
    /// The range of scalar values that this color map maps to is set to the given range (min, max).
    pub fn new_with_range(method: LerpMethod, start: Rgb8, end: Rgb8, range: (f32, f32)) -> Self {
        Self {
            method,
            name: None,
            start,
            end,
            range,
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
    pub fn with_stop(mut self, (position, color): (f32, Rgb8)) -> Self {
        assert!(
            position > self.range.0 && position < self.range.1,
            "Color stop position must be in range"
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
        use std::hash::{DefaultHasher, Hash, Hasher};
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

    fn range(&self) -> (f32, f32) {
        self.range
    }

    fn as_color_map(&self) -> Arc<dyn ColorMap> {
        match self.method {
            LerpMethod::LinearRgb => {
                let mut map = LinearColorMap::new(self.range, self.start, self.end);
                if !self.stops.is_empty() {
                    map = map.with_stops(self.stops.iter().copied());
                }
                Arc::new(map)
            }
            LerpMethod::Perceptual => {
                let mut map = PerceptualColorMap::new(self.range, self.start, self.end);
                if !self.stops.is_empty() {
                    map = map.with_stops(self.stops.iter().copied());
                }
                Arc::new(map)
            }
            LerpMethod::Xyz => {
                let mut map = XyzColorMap::new(self.range, self.start, self.end);
                if !self.stops.is_empty() {
                    map = map.with_stops(self.stops.iter().copied());
                }
                Arc::new(map)
            }
        }
    }
}

/// A colormap that maps kelvin temperatures to black body color, with a range from 1000K to 30000K.
pub fn stellar() -> LerpColorMap {
    const MIN_TEMP: f32 = 1000.0;
    const MAX_TEMP: f32 = 30000.0;
    fn stop_for_temp(temp: f32) -> (f32, Rgb8) {
        // Approximate the color of a black body at the given temperature in kelvin.
        // The formula is based on the on the Tanner Helland's approximation:
        // https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html

        let t = temp / 100.0;
        let r = if t <= 66.0 {
            255
        } else {
            let r = 329.698727446 * (t - 60.0).powf(-0.1332047592);
            r.clamp(0.0, 255.0) as u8
        };
        let g = if t <= 66.0 {
            let g = 99.4708025861 * t.ln() - 161.1195681661;
            g.clamp(0.0, 255.0) as u8
        } else {
            let g = 288.1221695283 * (t - 60.0).powf(-0.0755148492);
            g.clamp(0.0, 255.0) as u8
        };
        let b = if t >= 66.0 {
            255
        } else if t <= 19.0 {
            0
        } else {
            let b = 138.5177312231 * (t - 10.0).ln() - 305.0447927307;
            b.clamp(0.0, 255.0) as u8
        };

        (temp, Rgb8::new(r, g, b))
    }

    LerpColorMap::new_with_range(
        LerpMethod::Xyz,
        stop_for_temp(MIN_TEMP).1,
        stop_for_temp(MAX_TEMP).1,
        (MIN_TEMP, MAX_TEMP),
    )
    .with_stop(stop_for_temp(2000.0))
    .with_stop(stop_for_temp(3000.0))
    .with_stop(stop_for_temp(4000.0))
    .with_stop(stop_for_temp(5000.0))
    .with_stop(stop_for_temp(6000.0))
    .with_stop(stop_for_temp(6500.0))
    .with_stop(stop_for_temp(7000.0))
    .with_stop(stop_for_temp(8000.0))
    .with_stop(stop_for_temp(9000.0))
    .with_stop(stop_for_temp(10000.0))
    .with_stop(stop_for_temp(12000.0))
    .with_stop(stop_for_temp(15000.0))
    .with_stop(stop_for_temp(20000.0))
    .with_name("Stellar")
}
