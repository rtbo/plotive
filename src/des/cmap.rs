//! A module for defining color maps that can be used in the design of plots to map scalar values to colors.

use crate::color::Rgb8;

/// Describes how to interpolate between colors in a color map, either in linear RGB or perceptual color space.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum LerpMethod {
    /// Interpolate colors in the linear RGB color space.
    LinearRgb,
    /// Interpolate colors in a perceptual color space (OkLab).
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
    stops: Vec<(f32, Rgb8)>,
    data_range: Option<(f64, f64)>,
}

impl LerpColorMap {
    /// Creates a new `LerpColorMap` with the specified interpolation method, start and end colors, and optional stops.
    pub fn new(method: LerpMethod, start: Rgb8, end: Rgb8) -> Self {
        Self {
            method,
            start,
            end,
            data_range: None,
            stops: Vec::new(),
        }
    }
    /// Adds a color stop at the specified position (between 0.0 and 1.0) with the given color.
    pub fn with_stop(mut self, (position, color): (f32, Rgb8)) -> Self {
        assert!(
            position > 0.0 && position < 1.0,
            "Color stop position must be in range"
        );
        self.stops.push((position, color));
        self.stops.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());
        self
    }

    /// Set the range of scalar values that this color map maps to, as (min, max).
    pub fn with_data_range(mut self, range: (f64, f64)) -> Self {
        assert!(
            range.0.is_finite() && range.1.is_finite(),
            "Color map data range must be finite"
        );
        assert!(
            range.0 < range.1,
            "Color map data range must have min < max"
        );
        self.data_range = Some(range);
        self
    }

    /// Get the interpolation method used by this color map.
    pub fn method(&self) -> LerpMethod {
        self.method
    }

    /// Get the start color of this color map.
    pub fn start(&self) -> Rgb8 {
        self.start
    }

    /// Get the end color of this color map.
    pub fn end(&self) -> Rgb8 {
        self.end
    }

    /// Get the color stops of this color map, as a slice of (position, color) tuples.
    pub fn stops(&self) -> &[(f32, Rgb8)] {
        &self.stops
    }

    /// Get the range of scalar values that this color map maps to, if it has one.
    /// If None, the color map is assumed to map the range of data values in the plot.
    pub fn data_range(&self) -> Option<(f64, f64)> {
        self.data_range
    }
}

impl From<(LerpMethod, &[Rgb8])> for LerpColorMap {
    fn from((method, stops): (LerpMethod, &[Rgb8])) -> Self {
        assert!(stops.len() >= 2, "At least two colors must be provided");
        let start = stops[0];
        let end = stops[stops.len() - 1];

        let mut cmap = Self::new(method, start, end);
        for (i, stop) in stops.iter().enumerate().skip(1).take(stops.len() - 2) {
            let position = i as f32 / (stops.len() - 1) as f32;
            cmap = cmap.with_stop((position, *stop));
        }
        cmap
    }
}

/// A colormap that maps kelvin temperatures to black body color, with a range from 1000K to 15000K.
/// Based on the approximation from Tanner Helland:
/// https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html
pub fn stellar() -> LerpColorMap {
    const MIN_TEMP: f64 = 1000.0;
    const MAX_TEMP: f64 = 15000.0;

    fn stop_for_temp(temp: f64) -> (f32, Rgb8) {
        let t = temp / 100.0;
        let r = if t <= 66.0 {
            255.0
        } else {
            329.698727446 * (t - 60.0).powf(-0.1332047592)
        };

        let g = if t <= 66.0 {
            99.4708025861 * t.ln() - 161.1195681661
        } else {
            288.1221695283 * (t - 60.0).powf(-0.0755148492)
        };
        let b = if t >= 66.0 {
            255.0
        } else if t <= 19.0 {
            0.0
        } else {
            138.5177312231 * (t - 10.0).ln() - 305.0447927307
        };

        let stop_pos = ((temp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) as f32;

        let r = r.clamp(0.0, 255.0) as u8;
        let g = g.clamp(0.0, 255.0) as u8;
        let b = b.clamp(0.0, 255.0) as u8;
        let color = Rgb8::new(r, g, b);

        (stop_pos, color)
    }

    LerpColorMap::new(
        LerpMethod::Xyz,
        stop_for_temp(MIN_TEMP).1,
        stop_for_temp(MAX_TEMP).1,
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
    .with_data_range((MIN_TEMP, MAX_TEMP))
}

/// The famous "viridis" color map from matplotlib
pub fn viridis() -> LerpColorMap {
    const STOPS: &[Rgb8] = &[
        Rgb8::from_hex(b"#440154"),
        Rgb8::from_hex(b"#3b518a"),
        Rgb8::from_hex(b"#208f8c"),
        Rgb8::from_hex(b"#5bc862"),
        Rgb8::from_hex(b"#fde724"),
    ];
    (LerpMethod::Perceptual, STOPS).into()
}
