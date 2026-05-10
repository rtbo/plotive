use std::hash::{DefaultHasher, Hash, Hasher};
use std::sync::Arc;

use plotive_base::color::SRgb;

use crate::color::{Lerp, LinRgb, OkLab, Rgb8, Xyz};
use crate::des;
use crate::des::cmap::{LerpColorMap, LerpMethod};

/// A trait for mapping scalar values to colors, used for color scales in heatmaps and similar plots.
pub trait ColorMap {
    /// Maps a value in the range [0, 1] to an RGBA color.
    fn map_color(&self, value: f32) -> Rgb8;
}

/// A trait for types that can be converted to a `ColorMap` implementation at draw time.
pub trait AsColorMap {
    fn hash(&self) -> u64;

    fn scale(&self) -> &des::axis::Scale;

    /// Convert this type to a `ColorMap` implementation that can be used for color mapping.
    fn as_color_map(&self) -> Arc<dyn ColorMap>;
}

fn hash_range(rng: &des::axis::Range, hasher: &mut DefaultHasher) {
    match rng {
        des::axis::Range(Some(val1), Some(val2)) => {
            val1.to_bits().hash(hasher);
            val2.to_bits().hash(hasher);
        }
        des::axis::Range(Some(val1), None) => {
            val1.to_bits().hash(hasher);
            "none".hash(hasher);
        }
        des::axis::Range(None, Some(val2)) => {
            "none".hash(hasher);
            val2.to_bits().hash(hasher);
        }
        des::axis::Range(None, None) => {
            "none".hash(hasher);
            "none".hash(hasher);
        }
    }
}

impl AsColorMap for LerpColorMap {
    /// Get a unique hash for this color map, used to avoid creating
    /// multiple color bars for the same color map configuration.
    fn hash(&self) -> u64 {
        let mut hasher = DefaultHasher::new();
        self.method().hash(&mut hasher);
        self.start().hash(&mut hasher);
        self.end().hash(&mut hasher);
        for stop in self.stops() {
            // reinterpret the f32 position as u32 for hashing
            // it is checked that the position can't be invalid or -0.0
            let pos_bits = stop.0.to_bits();
            pos_bits.hash(&mut hasher);
            stop.1.hash(&mut hasher);
        }
        match self.scale() {
            des::axis::Scale::Auto => "auto".hash(&mut hasher),
            des::axis::Scale::Linear(rng) => {
                "lin".hash(&mut hasher);
                hash_range(rng, &mut hasher);
            }
            des::axis::Scale::Log(log_scale) => {
                "log".hash(&mut hasher);
                log_scale.base.to_bits().hash(&mut hasher);
                hash_range(&log_scale.range, &mut hasher);
            }
            _ => unreachable!(),
        }
        // TODO: hash the locator
        hasher.finish()
    }

    fn scale(&self) -> &des::axis::Scale {
        self.scale()
    }

    fn as_color_map(&self) -> Arc<dyn ColorMap> {
        let start = self.start();
        let end = self.end();
        let stops = self.stops().iter().copied();
        match self.method() {
            LerpMethod::Nearest => Arc::new(NearestColorMap::new(start, end, stops)),
            LerpMethod::SRgb => Arc::new(SRgbColorMap::new(start, end, stops)),
            LerpMethod::LinearRgb => Arc::new(LinearColorMap::new(start, end, stops)),
            LerpMethod::Perceptual => Arc::new(PerceptualColorMap::new(start, end, stops)),
            LerpMethod::Xyz => Arc::new(XyzColorMap::new(start, end, stops)),
        }
    }
}

pub struct NearestColorMap {
    start: Rgb8,
    end: Rgb8,
    stops: Vec<(f32, Rgb8)>,
}

impl NearestColorMap {
    pub fn new<S>(start: Rgb8, end: Rgb8, stops: S) -> Self
    where
        S: IntoIterator<Item = (f32, Rgb8)>,
    {
        Self {
            start,
            end,
            stops: stops.into_iter().collect(),
        }
    }
}

impl ColorMap for NearestColorMap {
    fn map_color(&self, value: f32) -> Rgb8 {
        if value <= 0.0 {
            self.start
        } else if value >= 1.0 {
            self.end
        } else {
            let mut nearest = self.start;
            let mut nearest_pos = 0.0;
            for stop in &self.stops {
                if (stop.0 - value).abs() < (nearest_pos - value).abs() {
                    nearest = stop.1;
                    nearest_pos = stop.0;
                }
                if stop.0 > value {
                    break;
                }
            }
            nearest
        }
    }
}

/// A color map that interpolates between two colors and optional stops in the linear RGB color space
pub type SRgbColorMap = GenColorMap<SRgb>;

/// A color map that interpolates between two colors and optional stops in the linear RGB color space
pub type LinearColorMap = GenColorMap<LinRgb>;

/// A color map that interpolates between two colors and optional stops in a perceptual color space
pub type PerceptualColorMap = GenColorMap<OkLab>;

/// A color map that interpolates between two colors and optional stops in a XYZ color space
pub type XyzColorMap = GenColorMap<Xyz>;

/// A generic color map that interpolates between two colors and optional stops in the color space defined by the color type `C`.
#[derive(Debug, Clone)]
pub struct GenColorMap<C> {
    start: C,
    end: C,
    stops: Vec<(f32, C)>,
}

impl<C: From<Rgb8>> GenColorMap<C> {
    /// Creates a new `CColorMap` with the specified start and end colors, and optional stops.
    pub fn new<S>(start: Rgb8, end: Rgb8, stops: S) -> Self
    where
        S: IntoIterator<Item = (f32, Rgb8)>,
    {
        Self {
            start: start.into(),
            end: end.into(),
            stops: stops
                .into_iter()
                .map(|(pos, color)| (pos, color.into()))
                .collect(),
        }
    }
}

impl<C: Lerp + Copy + Into<Rgb8>> ColorMap for GenColorMap<C> {
    fn map_color(&self, value: f32) -> Rgb8 {
        let mut start = (0.0, self.start);
        let mut end = (1.0, self.end);

        for stop in &self.stops {
            if stop.0 <= value {
                start = *stop;
            } else {
                end = *stop;
                break;
            }
        }
        let t = if end.0 != start.0 {
            (value - start.0) / (end.0 - start.0)
        } else {
            0.0
        };
        start.1.lerp(end.1, t).into()
    }
}
