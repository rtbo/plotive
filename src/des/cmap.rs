//! A module for defining color maps that can be used in the design of plots to map scalar values to colors.

use crate::color::Rgb8;
use crate::des::axis;

/// Describes how to interpolate between colors in a color map, either in linear RGB or perceptual color space.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum LerpMethod {
    /// Do not interpolate colors, only pick the nearest one
    Nearest,
    /// Interpolate colors in the standard RGB color space, which is fast but not perceptually uniform.
    /// It tends to produce darker gradients, especially when interpolating between bright colors,
    /// and can result in less visually appealing color maps.
    /// Use this if you have significant amount of stops in the colormap gradient or significant performance constraints.
    SRgb,
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
    scale: axis::Scale,
    locator: Option<axis::ticks::Locator>,

}

impl LerpColorMap {
    /// Creates a new `LerpColorMap` with the specified interpolation method, start and end colors, and optional stops.
    pub fn new(method: LerpMethod, start: Rgb8, end: Rgb8) -> Self {
        Self {
            method,
            start,
            end,
            scale: Default::default(),
            locator: None,
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

    /// Assign a scale to this colormap.
    ///
    /// By default, the colormap will map linearly the full range of data values in the plot, but this can be overridden with this method.
    pub fn with_scale(mut self, scale: axis::Scale) -> Self {
        assert!(
            !scale.is_shared(),
            "Color map scale cannot be shared"
        );
        self.scale = scale;
        self
    }

    /// Force the ticks of colorbar mapping this colormap to be located according to the given locator.
    /// By default, the locator is automatic, but this can be overridden with this method.
    /// Use this if you want to have specific control over the ticks of the colorbar, for example to place them at specific data values.
    pub fn force_ticks_locator(mut self, locator: axis::ticks::Locator) -> Self {
        self.locator = Some(locator);
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

    /// Get the scale of this colormap.
    /// The scale is used to map data values to a 0 to 1 range that correspond to the
    /// full range of colors
    /// If None, the color map is assumed to map the range of data values in the plot.
    pub fn scale(&self) -> &axis::Scale {
        &self.scale
    }

    /// Get the ticks locator that this colormap is forced to use for its colorbar, if it has one.
    pub fn forced_ticks_locator(&self) -> Option<&axis::ticks::Locator> {
        self.locator.as_ref()
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

/// Build one of the builtin color maps from its name.
/// Returns None if the name is not recognized.
pub fn from_name(name: &str) -> Option<LerpColorMap> {
    match name {
        "stellar" => Some(stellar()),
        "viridis" => Some(viridis()),
        _ => None,
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
    .with_stop(stop_for_temp(12500.0))
    .with_scale((MIN_TEMP, MAX_TEMP).into())
    .force_ticks_locator(axis::ticks::Locator::List(
        vec![
            1000.0, 2000.0, 3000.0, 4000.0, 5000.0, 6500.0, 8000.0, 10000.0, 12500.0, 15000.0,
        ]
        .into(),
    ))
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
