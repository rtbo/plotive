//! Color types and utilities for the `plotive` crate.

/// Rexports of [`plotive_base::color`]` items
pub use plotive_base::color::*;

use crate::data::SampleRef;

/// A trait for mapping scalar values to colors, used for color scales in heatmaps and similar plots.
pub trait ColorMap {
    /// Maps a scalar value to an RGBA color.

    /// May panic if the value is not the expected type (e.g. numeric for linear or perceptual color maps).
    fn map_color(&self, value: SampleRef) -> Rgb8;
}

/// A color map that interpolates between two colors and optional stops in the linear RGB color space
pub type LinearColorMap = GenColorMap<LinRgb>;

/// A color map that interpolates between two colors and optional stops in a perceptual color space
pub type PerceptualColorMap = GenColorMap<OkLab>;

/// A generic color map that interpolates between two colors and optional stops in the color space defined by the color type `C`.
#[derive(Debug, Clone)]
pub struct GenColorMap<C> {
    start: C,
    end: C,
    stops: Vec<(f32, C)>,
}

impl<C: From<Rgb8>> GenColorMap<C> {
    /// Creates a new `CColorMap` with the specified start and end colors, and optional stops.
    pub fn new(start: Rgb8, end: Rgb8) -> Self {
        Self {
            start: start.into(),
            end: end.into(),
            stops: Vec::new(),
        }
    }

    /// Add a color stop at the specified position (between 0.0 and 1.0) with the given color.
    pub fn with_stop(mut self, position: f32, color: Rgb8) -> Self {
        assert!(
            (0.0..=1.0).contains(&position),
            "Color stop position must be between 0.0 and 1.0"
        );
        self.stops.push((position, color.into()));
        self.stops.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());
        self
    }

    /// Set the color stops at the specified position (between 0.0 and 1.0) with the given color.
    pub fn with_stops<I>(mut self, stops: I) -> Self
    where
        I: Iterator<Item = (f32, Rgb8)>,
    {
        self.stops = stops.into_iter().map(|(position, color)| {
            assert!(
                (0.0..=1.0).contains(&position),
                "Color stop position must be between 0.0 and 1.0"
            );
            (position, color.into())
        }).collect();
        self.stops.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());
        self
    }
}

impl<C: Lerp + Copy + Into<Rgb8>> ColorMap for GenColorMap<C> {
    fn map_color(&self, value: SampleRef) -> Rgb8 {
        let value = value
            .as_num()
            .expect("Color mapping requires numeric values") as f32;

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
        let t = if end.0 > start.0 {
            (value - start.0) / (end.0 - start.0)
        } else {
            0.0
        };
        start.1.lerp(end.1, t).into()
    }
}
