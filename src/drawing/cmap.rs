use std::sync::Arc;

use crate::color::{Lerp, LinRgb, OkLab, Rgb8, Xyz};
use crate::des::cmap::{LerpColorMap, LerpMethod};
use crate::drawing::axis;

/// A trait for mapping scalar values to colors, used for color scales in heatmaps and similar plots.
pub trait ColorMap {
    /// Maps a value in the range [0, 1] to an RGBA color.
    fn map_color(&self, value: f32) -> Rgb8;
}

/// A trait for types that can be converted to a `ColorMap` implementation at draw time.
pub trait AsColorMap {
    fn hash(&self) -> u64;

    fn data_range(&self) -> Option<axis::Bounds>;

    /// Convert this type to a `ColorMap` implementation that can be used for color mapping.
    fn as_color_map(&self) -> Arc<dyn ColorMap>;
}

impl AsColorMap for LerpColorMap {
    /// Get a unique hash for this color map, used to avoid creating
    /// multiple color bars for the same color map configuration.
    fn hash(&self) -> u64 {
        use std::hash::{DefaultHasher, Hash, Hasher};
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
        if let Some(range) = self.data_range() {
            range.0.to_bits().hash(&mut hasher);
            range.1.to_bits().hash(&mut hasher);
        }
        hasher.finish()
    }

    fn data_range(&self) -> Option<axis::Bounds> {
        self.data_range()
            .map(|rng| axis::NumBounds::from(rng).into())
    }

    fn as_color_map(&self) -> Arc<dyn ColorMap> {
        let start = self.start();
        let end = self.end();
        let stops = self.stops().iter().copied();
        match self.method() {
            LerpMethod::LinearRgb => Arc::new(LinearColorMap::new(start, end, stops)),
            LerpMethod::Perceptual => Arc::new(PerceptualColorMap::new(start, end, stops)),
            LerpMethod::Xyz => Arc::new(XyzColorMap::new(start, end, stops)),
        }
    }
}

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
