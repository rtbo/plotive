//! Utility traits and functions

use std::fmt;

use plotive_base::{Rgba8, color};

use crate::des::series;
use crate::style;
#[cfg(feature = "time")]
use crate::time::DateTime;

/// Create a linearly spaced vector of `num` elements between `start` and `end`
pub fn linspace(start: f64, end: f64, num: usize) -> Vec<f64> {
    let step = (end - start) / (num as f64 - 1.0);
    (0..num).map(|i| start + i as f64 * step).collect()
}

/// Create a log-spaced vector of `num` elements between `start` and `end`
pub fn logspace(start: f64, end: f64, num: usize) -> Vec<f64> {
    let log_start = start.log10();
    let log_end = end.log10();
    let step = (log_end - log_start) / (num as f64 - 1.0);
    (0..num)
        .map(|i| 10f64.powf(log_start + i as f64 * step))
        .collect()
}

#[cfg(feature = "time")]
/// Create a linearly spaced time vector of `num` elements between `start` and `end`
pub fn timespace(start: DateTime, end: DateTime, num: usize) -> Vec<DateTime> {
    let step = (end - start) / (num as f64 - 1.0);
    let mut result = Vec::with_capacity(num);
    let mut cur = start;
    for _ in 0..num {
        result.push(cur);
        cur += step;
    }
    result
}

/// Error type for Matplotlib style parsing
#[derive(Debug)]
pub struct MplStyleError(String);

impl From<String> for MplStyleError {
    fn from(s: String) -> Self {
        MplStyleError(s)
    }
}

impl From<&str> for MplStyleError {
    fn from(s: &str) -> Self {
        MplStyleError(s.to_string())
    }
}

impl fmt::Display for MplStyleError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Matplotlib style parsing error: {}", self.0)
    }
}

impl std::error::Error for MplStyleError {}

/// Trait for applying Matplotlib styles to series
pub trait MplStyle {
    /// Return a new instance of the series with the given Matplotlib style applied.
    ///
    /// E.g. for line series, see the format string section of
    /// [matplotlib.pyplot.plot](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html)
    fn with_mpl_style(self, mpl_style: &str) -> Result<Self, MplStyleError>
    where
        Self: Sized;
}

impl MplStyle for series::Line {
    fn with_mpl_style(mut self, mpl_style: &str) -> Result<Self, MplStyleError> {
        if let Ok(c) = mpl_style.parse::<color::Rgba8>() {
            let mut s = self.stroke().clone();
            s.color = c.into();
            return Ok(self.with_stroke(s));
        }

        let style = match LineMplStyle::parse(mpl_style) {
            Ok(s) => s,
            Err(e) => {
                return Err(MplStyleError(format!(
                    "Failed to parse Matplotlib style string '{}': {}",
                    mpl_style, e
                )));
            }
        };

        if let Some(shape) = style.marker_shape {
            let mut marker = self.marker().cloned().unwrap_or_default();
            marker.shape = shape;
            self = self.with_marker(marker);
        }

        if let Some(pattern) = style.pattern {
            let mut s = self.stroke().clone();
            s.pattern = pattern;
            self = self.with_stroke(s);
        }

        if let Some(c) = style.color {
            let mut s = self.stroke().clone();
            s.color = c;
            self = self.with_stroke(s);
        }

        Ok(self)
    }
}

struct LineMplStyle {
    marker_shape: Option<style::MarkerShape>,
    pattern: Option<style::LinePattern>,
    color: Option<style::series::Color>,
}
impl LineMplStyle {
    fn parse(mpl_style: &str) -> Result<LineMplStyle, MplStyleError> {
        let mut style = LineMplStyle {
            marker_shape: None,
            pattern: None,
            color: None,
        };

        let mut chars = mpl_style.chars().enumerate().peekable();

        while let Some((i, c)) = chars.next() {
            match c {
                'o' => style.set_marker_shape(style::MarkerShape::Circle)?,
                's' => style.set_marker_shape(style::MarkerShape::Square)?,
                'D' => style.set_marker_shape(style::MarkerShape::Diamond)?,
                'x' => style.set_marker_shape(style::MarkerShape::Cross)?,
                '+' => style.set_marker_shape(style::MarkerShape::Plus)?,
                'v' => style.set_marker_shape(style::MarkerShape::TriangleDown)?,
                '^' => style.set_marker_shape(style::MarkerShape::TriangleUp)?,
                '>' => style.set_marker_shape(style::MarkerShape::TriangleRight)?,
                '<' => style.set_marker_shape(style::MarkerShape::TriangleLeft)?,
                '-' => {
                    if let Some((_, next)) = chars.peek() {
                        match next {
                            '-' => {
                                chars.next();
                                style.set_pattern(style::Dash::default().into())?;
                            }
                            '.' => {
                                chars.next();
                                style.set_pattern(style::LinePattern::DashDot)?;
                            }
                            _ => style.set_pattern(style::LinePattern::Solid)?,
                        }
                    } else {
                        style.set_pattern(style::LinePattern::Solid)?;
                    }
                }
                ':' => style.set_pattern(style::LinePattern::Dot)?,
                'b' => style.set_color(Rgba8::from_hex(b"#0000ff").into())?,
                'g' => style.set_color(Rgba8::from_hex(b"#008000").into())?,
                'r' => style.set_color(Rgba8::from_hex(b"#ff0000").into())?,
                'c' => style.set_color(Rgba8::from_hex(b"#00bfbf").into())?,
                'm' => style.set_color(Rgba8::from_hex(b"#bf00bf").into())?,
                'y' => style.set_color(Rgba8::from_hex(b"#bfbf00").into())?,
                'k' => style.set_color(Rgba8::from_hex(b"#000000").into())?,
                'w' => style.set_color(Rgba8::from_hex(b"#ffffff").into())?,
                'C' => {
                    let s: usize = mpl_style[i + 1..].parse().map_err(|_| {
                        MplStyleError(format!(
                            "Invalid color index after 'C' in Matplotlib style string: '{}'",
                            mpl_style
                        ))
                    })?;
                    style.set_color(style::series::IndexColor(s).into())?;
                    break;
                }
                _ => {
                    return Err(MplStyleError(format!(
                        "Unknown Matplotlib style character '{}'",
                        c
                    )));
                }
            }
        }

        Ok(style)
    }

    fn set_marker_shape(&mut self, shape: style::MarkerShape) -> Result<(), MplStyleError> {
        if self.marker_shape.is_some() {
            Err(MplStyleError("Multiple marker shapes".to_string()))
        } else {
            self.marker_shape = Some(shape);
            Ok(())
        }
    }

    fn set_pattern(&mut self, pattern: style::LinePattern) -> Result<(), MplStyleError> {
        if self.pattern.is_some() {
            Err(MplStyleError("Multiple line patterns".to_string()))
        } else {
            self.pattern = Some(pattern);
            Ok(())
        }
    }

    fn set_color(&mut self, color: style::series::Color) -> Result<(), MplStyleError> {
        if self.color.is_some() {
            Err(MplStyleError("Multiple colors".to_string()))
        } else {
            self.color = Some(color);
            Ok(())
        }
    }
}
