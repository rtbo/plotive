//! A module for defining color maps that can be used in the design of plots to map scalar values to colors.

use std::collections::HashMap;

use crate::color::Rgb8;
use crate::des::axis;
use crate::style;

/// A generic color map that can be used to map scalar values to colors in a plot.
#[derive(Debug, Clone, PartialEq, Default)]
pub enum ColorMap {
    /// A color map that automatically chooses a color map based on the data range and type.
    /// When the data is floating point, it will use the viridis perceptual color map,
    /// When the data is is string, it will use a categorical color map.
    /// When the data is integer, a literal color map will be used, interpreting the integer values as RGBA 32 bit colors.
    #[default]
    Auto,
    /// A color map that interpolates between colors in a specified color space.
    Lerp(LerpColorMap),
    /// A color map that uses a predefined set of colors for categorical data.
    Cat(CatColorMap),
    /// A color map that interprets string values as literal colors using `Rgb8::parse` and integer values as RGBA 32 bit colors.
    Literal(LiteralColorMap),
}

impl From<LerpColorMap> for ColorMap {
    fn from(cmap: LerpColorMap) -> Self {
        ColorMap::Lerp(cmap)
    }
}

impl From<CatColorMap> for ColorMap {
    fn from(cmap: CatColorMap) -> Self {
        ColorMap::Cat(cmap)
    }
}

impl From<LiteralColorMap> for ColorMap {
    fn from(cmap: LiteralColorMap) -> Self {
        ColorMap::Literal(cmap)
    }
}

/// Describes how to interpolate between colors in a color map, either in linear RGB or perceptual color space.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Default)]
pub enum LerpMethod {
    /// Do not interpolate colors, only pick the nearest one
    Nearest,
    /// Interpolate colors in the standard RGB color space, which is fast but not perceptually uniform.
    /// It tends to produce darker gradients, especially when interpolating between bright colors,
    /// and can result in less visually appealing color maps.
    /// Use this if you have significant amount of stops in the colormap gradient or significant performance constraints.
    SRgb,
    #[default]
    /// Interpolate colors in the linear RGB color space.
    LinearRgb,
    /// Interpolate colors in a perceptual color space (OkLab).
    Perceptual,
    /// Interpolate colors in the XYZ color space.
    Xyz,
}

/// A color map that can be converted to a `MapColor` implementation at draw time.
#[derive(Debug, Clone, PartialEq)]
pub struct LerpColorMap {
    method: LerpMethod,
    start: Rgb8,
    end: Rgb8,
    stops: Vec<(f32, Rgb8)>,
    scale: axis::Scale,
    #[cfg(feature = "serde")]
    name: Option<&'static str>,
}

impl LerpColorMap {
    /// Creates a new `LerpColorMap` with the specified interpolation method, start and end colors, and optional stops.
    pub fn new(method: LerpMethod, start: Rgb8, end: Rgb8) -> Self {
        Self {
            method,
            start,
            end,
            scale: Default::default(),
            stops: Vec::new(),
            #[cfg(feature = "serde")]
            name: None,
        }
    }

    /// Adds a color stop at the specified position (between 0.0 and 1.0) with the given color.
    pub fn with_stop(mut self, (position, color): (f32, Rgb8)) -> Self {
        assert!(
            position > 0.0 && position < 1.0,
            "Color stop position must be in range"
        );
        #[cfg(feature = "serde")]
        {
            self.name = None;
        }
        self.stops.push((position, color));
        self.stops.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());
        self
    }

    /// Set all the stops at once.
    /// Previously set stops are erased
    pub fn with_stops(mut self, stops: Vec<(f32, Rgb8)>) -> Self {
        assert!(
            stops
                .iter()
                .all(|(position, _)| position > &0.0 && position < &1.0),
            "Color stop position must be in range"
        );
        #[cfg(feature = "serde")]
        {
            self.name = None;
        }
        let mut stops = stops;
        stops.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());
        self.stops = stops;
        self
    }

    /// Assign a scale to this colormap.
    ///
    /// By default, the colormap will map linearly the full range of data values in the plot, but this can be overridden with this method.
    pub fn with_scale(mut self, scale: axis::Scale) -> Self {
        assert!(!scale.is_shared(), "Color map scale cannot be shared");
        #[cfg(feature = "serde")]
        {
            self.name = None;
        }
        self.scale = scale;
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

    #[cfg(feature = "serde")]
    pub(crate) fn name(&self) -> Option<&'static str> {
        self.name
    }

    #[allow(unused)]
    fn with_name(mut self, name: &'static str) -> Self {
        #[cfg(feature = "serde")]
        {
            self.name = Some(name);
        }
        self
    }

    #[cfg(feature = "serde")]
    pub(crate) fn is_monotonic(&self) -> bool {
        let div = 1.0 / (self.stops.len() as f32 + 1.0);
        let mut cur = div;
        for (pos, _) in self.stops.iter() {
            if (cur - pos).abs() < 0.00001 {
                cur += div;
            } else {
                return false;
            }
        }
        true
    }
}

impl Default for LerpColorMap {
    fn default() -> Self {
        viridis()
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
        "viridis" => Some(viridis()),
        "stellar" => Some(stellar()),
        _ => None,
    }
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
    let cmap: LerpColorMap = (LerpMethod::Perceptual, STOPS).into();
    cmap.with_name("viridis")
}

/// A colormap that maps kelvin temperatures to black body color, with a range from 1000K to 15000K.
/// Based on the approximation from Tanner Helland:
/// https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html
///
/// By default, this colormap is assigned a linear scale between 1000 and 15000 (so that to map directly to Kelvins).
/// If a regular colormap behavior is needed, you can use `stellar().with_scale(axis::Scale::Auto)`
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
    .with_name("stellar")
}

/// A categorical color map that maps a set of categories to a set of colors.
#[derive(Debug, Clone, PartialEq, Default)]
pub enum CatColorMap {
    /// A categorical color map that pick colors based on the category type.
    /// Each distinct category will be assigned a distinct color, in the order they are encoutered.
    /// The colors are the one from the active series color palette.
    #[default]
    Auto,
    /// A categorical color map that uses a predefined set of colors indexed by string categories
    Strings(HashMap<String, style::series::Color>),
}

/// A colormap that interpret string values as literal colors using `Rgb8::parse` and integer values as RGBA 32 bit colors.
#[derive(Debug, Clone, Copy, PartialEq, Default)]
pub struct LiteralColorMap;
