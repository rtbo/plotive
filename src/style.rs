//! Style definitions for lines, fills, markers, and themes.
mod catppuccin;
pub(crate) mod defaults;
mod dracula;
pub mod series;
pub mod theme;

pub use crate::style::series::Palette;
pub use crate::style::theme::Theme;
use crate::{Color, ResolveColor, Rgba8, render};

/// Overall style definition for figures
///
/// The style gathers together two main components:
/// - The theme, which defines colors for the figure background, foreground, grid lines, and legend.
/// - The palette, which defines colors for data series.
#[derive(Debug, Clone, PartialEq)]
pub struct Style {
    /// Theme used for the figure
    theme: Theme,
    /// Palette used for series colors
    palette: Palette,
}

impl Default for Style {
    fn default() -> Self {
        Style::light()
    }
}

impl Style {
    /// Create a new style with the given theme and palette
    pub const fn new(theme: Theme, palette: Palette) -> Self {
        Style { theme, palette }
    }

    /// Create a black and white monochrome style
    /// If you use this with multiple series, consider styling the series lines with different patterns to distinguish them
    pub const fn black_white() -> Self {
        Style {
            theme: Theme::Light,
            palette: Palette::Black,
        }
    }

    /// Create the default light style, using a light theme and standard palette
    pub const fn light() -> Self {
        Style {
            theme: Theme::Light,
            palette: Palette::Standard,
        }
    }

    /// Create the default dark style, using a dark theme and pastel palette
    pub const fn dark() -> Self {
        Style {
            theme: Theme::Dark,
            palette: Palette::Pastel,
        }
    }

    /// Create a light theme with Okabe & Ito colorblind-safe palette
    pub const fn okabe_ito() -> Self {
        Style {
            theme: Theme::Light,
            palette: Palette::OkabeIto,
        }
    }

    /// Create a light theme with Paul Tol's bright colorblind-safe palette
    pub const fn tol_bright() -> Self {
        Style {
            theme: Theme::Light,
            palette: Palette::TolBright,
        }
    }

    /// Create a Dracula theme and palette
    pub const fn dracula() -> Self {
        Style {
            theme: Theme::Dracula,
            palette: Palette::Dracula,
        }
    }

    /// Create an Alucard theme and palette
    pub const fn alucard() -> Self {
        Style {
            theme: Theme::Alucard,
            palette: Palette::Alucard,
        }
    }

    /// Create a Catppuccin Mocha theme and palette
    pub const fn catppuccin_mocha() -> Self {
        Style {
            theme: Theme::CatppuccinMocha,
            palette: Palette::CatppuccinMocha,
        }
    }

    /// Create a Catppuccin Macchiato theme and palette
    pub const fn catppuccin_macchiato() -> Self {
        Style {
            theme: Theme::CatppuccinMacchiato,
            palette: Palette::CatppuccinMacchiato,
        }
    }

    /// Create a Catppuccin Frappe theme and palette
    pub const fn catppuccin_frappe() -> Self {
        Style {
            theme: Theme::CatppuccinFrappe,
            palette: Palette::CatppuccinFrappe,
        }
    }

    /// Create a Catppuccin Latte theme and palette
    pub const fn catppuccin_latte() -> Self {
        Style {
            theme: Theme::CatppuccinLatte,
            palette: Palette::CatppuccinLatte,
        }
    }

    /// Theme used for the figure
    pub const fn theme(&self) -> &Theme {
        &self.theme
    }

    /// Palette used for series colors
    pub const fn palette(&self) -> &Palette {
        &self.palette
    }
}

impl ResolveColor<theme::Color> for Style {
    fn resolve_color(&self, col: &theme::Color) -> Rgba8 {
        self.theme().resolve_color(col)
    }
}

impl ResolveColor<series::IndexColor> for Style {
    fn resolve_color(&self, col: &series::IndexColor) -> Rgba8 {
        self.palette.get(*col)
    }
}

impl ResolveColor<series::AutoColor> for (&Style, usize) {
    fn resolve_color(&self, _col: &series::AutoColor) -> Rgba8 {
        self.0.palette.get(series::IndexColor(self.1))
    }
}

impl ResolveColor<series::Color> for (&Style, usize) {
    fn resolve_color(&self, col: &series::Color) -> Rgba8 {
        match col {
            series::Color::Auto => self.0.palette.get(series::IndexColor(self.1)),
            series::Color::Index(idx) => self.0.palette.get(*idx),
            series::Color::Fixed(c) => *c,
        }
    }
}

fn add_opacity(c: Rgba8, opacity: Option<f32>) -> Rgba8 {
    debug_assert!(opacity.is_none_or(|t| (0.0..=1.0).contains(&t)));

    match opacity {
        Some(opacity) => Rgba8::new(c.r(), c.g(), c.b(), (c.a() as f32 * opacity).round() as u8),
        None => c,
    }
}

/// Dash pattern for dashed lines
/// A dash pattern is a sequence of lengths that specify the lengths of
/// alternating dashes and gaps.
///
/// The lengths are relative to the line width.
/// So a pattern will scale with the line width and remain visually consistent.
#[derive(Debug, Clone, PartialEq)]
pub struct Dash(pub Vec<f32>);

impl Default for Dash {
    fn default() -> Self {
        Dash(vec![5.0, 5.0])
    }
}

/// Line pattern defines how the line is drawn
#[derive(Debug, Clone, PartialEq, Default)]
pub enum LinePattern {
    /// Solid line
    #[default]
    Solid,
    /// Dashed line. Equivalent to Dash(vec![5.0, 5.0])
    Dashed,
    /// Dotted line. Equivalent to Dash(vec![1.0, 1.0])
    Dot,
    /// Dash-dot line. Equivalent to Dash(vec![5.0, 5.0, 1.0, 5.0])
    DashDot,
    /// Dashed line. The pattern is relative to the line width.
    Dash(Dash),
}

impl From<Dash> for LinePattern {
    fn from(dash: Dash) -> Self {
        LinePattern::Dash(dash)
    }
}

/// Stroke style definition. Defines how lines are stroked.
///
/// The color is a generic parameter to support different color resolution strategies,
/// such as fixed colors, theme-based colors, or series-based colors.
#[derive(Debug, Clone, PartialEq)]
pub struct Stroke<C: Color> {
    /// Line color
    pub color: C,
    /// Line width in figure units
    pub width: f32,
    /// Line pattern
    pub pattern: LinePattern,
    /// Line opacity (0.0 to 1.0)
    pub opacity: Option<f32>,
}

const DASHED_DASH: &[f32] = &[5.0, 5.0];
const DOT_DASH: &[f32] = &[1.0, 1.0];
const DASH_DOT_DASH: &[f32] = &[5.0, 5.0, 1.0, 5.0];

/// Trait for types that have a default stroke width for serialization purposes
/// The trait is implemented for color types, so that the default stroke width
/// can be associated with the color type used in the stroke.
pub trait DefaultStrokeWidth {
    /// Return the default stroke width for this color type.
    fn default_stroke_width() -> f32;
}

impl<C: Color> Stroke<C> {
    /// Set the line width in figure units, returning self for chaining
    pub fn with_width(self, width: f32) -> Self {
        Stroke { width, ..self }
    }

    /// Set the line opacity (0.0 to 1.0), returning self for chaining
    pub fn with_opacity(self, opacity: f32) -> Self {
        Stroke {
            opacity: Some(opacity),
            ..self
        }
    }

    /// Set the line pattern, returning self for chaining
    pub fn with_pattern(self, pattern: LinePattern) -> Self {
        Stroke { pattern, ..self }
    }

    /// Convert to a renderable stroke, resolving colors using the provided resolver
    pub fn as_stroke<'a, R>(&'a self, rc: &R) -> render::Stroke<'a>
    where
        R: ResolveColor<C>,
    {
        let color = add_opacity(self.color.resolve(rc), self.opacity);

        let pattern = match &self.pattern {
            LinePattern::Solid => render::LinePattern::Solid,
            LinePattern::Dashed => render::LinePattern::Dash(DASHED_DASH),
            LinePattern::Dot => render::LinePattern::Dash(DOT_DASH),
            LinePattern::DashDot => render::LinePattern::Dash(DASH_DOT_DASH),
            LinePattern::Dash(Dash(a)) => render::LinePattern::Dash(a.as_slice()),
        };

        render::Stroke {
            color,
            width: self.width,
            pattern,
        }
    }
}

impl<C> Default for Stroke<C>
where
    C: Color + Default + DefaultStrokeWidth,
{
    fn default() -> Self {
        Stroke {
            color: C::default(),
            width: C::default_stroke_width(),
            pattern: LinePattern::default(),
            opacity: None,
        }
    }
}

impl<C: Color> From<C> for Stroke<C> {
    fn from(color: C) -> Self {
        Stroke {
            width: 1.0,
            color,
            pattern: LinePattern::default(),
            opacity: None,
        }
    }
}

impl<C: Color> From<(C, f32)> for Stroke<C> {
    fn from((color, width): (C, f32)) -> Self {
        Stroke {
            color,
            width,
            pattern: LinePattern::default(),
            opacity: None,
        }
    }
}

impl<C: Color> From<(C, f32, LinePattern)> for Stroke<C> {
    fn from((color, width, pattern): (C, f32, LinePattern)) -> Self {
        Stroke {
            color,
            width,
            pattern,
            opacity: None,
        }
    }
}

impl<C: Color> From<(C, f32, Dash)> for Stroke<C> {
    fn from((color, width, dash): (C, f32, Dash)) -> Self {
        Stroke {
            color,
            width,
            pattern: LinePattern::Dash(dash),
            opacity: None,
        }
    }
}

/// Fill style definition
/// The color is a generic parameter to support different color resolution strategies,
/// such as fixed colors, theme based colors, or series-based colors.
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Fill<C: Color> {
    /// Solid fill
    Solid {
        /// Fill color
        color: C,
        /// Fill opacity (0.0 to 1.0)
        opacity: Option<f32>,
    },
}

impl<C> Default for Fill<C>
where
    C: Color + Default,
{
    fn default() -> Self {
        Fill::Solid {
            color: C::default(),
            opacity: None,
        }
    }
}

impl<C: Color> Fill<C> {
    /// Set the fill opacity (0.0 to 1.0), returning self for chaining
    pub const fn with_opacity(self, opacity: f32) -> Self {
        match self {
            Fill::Solid { color, .. } => Fill::Solid {
                color,
                opacity: Some(opacity),
            },
        }
    }

    /// Convert to a renderable paint, resolving colors using the provided resolver
    pub fn as_paint<R>(&self, rc: &R) -> render::Paint<'_>
    where
        R: ResolveColor<C>,
    {
        match self {
            Fill::Solid { color, opacity } => {
                render::Paint::Solid(add_opacity(color.resolve(rc), *opacity))
            }
        }
    }
}

impl<C: Color> From<C> for Fill<C> {
    fn from(color: C) -> Self {
        Fill::Solid {
            color,
            opacity: None,
        }
    }
}

/// Shape of a marker, used in scatter plots
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub enum MarkerShape {
    /// Circle marker (the default)
    #[default]
    Circle,
    /// Square marker
    Square,
    ///  Diamond marker
    Diamond,
    ///  Cross marker
    Cross,
    ///  Plus marker
    Plus,
    ///  Upward pointing triangle marker
    TriangleUp,
    ///  Downward pointing triangle marker
    TriangleDown,
    ///  Rightward pointing triangle marker
    TriangleRight,
    ///  Leftward pointing triangle marker
    TriangleLeft,
}

/// Size of a marker, used in scatter plots
/// The size is interpreted as an area, so it scales quadratically with the visual size of the marker.
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct MarkerSize(pub f32);

impl MarkerSize {
    /// Scale the marker area by the given factor, returning self for chaining
    pub fn scale(self, factor: f32) -> Self {
        MarkerSize(self.0 * factor)
    }

    /// Convert the marker size to a visual size (e.g. diameter for circle marker)
    pub fn to_visual_size(&self) -> f32 {
        self.0.sqrt()
    }
}

impl Default for MarkerSize {
    fn default() -> Self {
        MarkerSize(defaults::MARKER_SIZE)
    }
}

impl From<f32> for MarkerSize {
    fn from(size: f32) -> Self {
        MarkerSize(size)
    }
}

/// Marker style definition, used in scatter plots
#[derive(Debug, Clone)]
pub struct Marker<C: Color> {
    /// Marker size
    pub size: MarkerSize,
    /// Marker shape
    pub shape: MarkerShape,
    /// Marker fill style
    pub fill: Option<Fill<C>>,
    /// Marker stroke style
    pub stroke: Option<Stroke<C>>,
}

impl<C> Marker<C>
where
    C: Color + DefaultStrokeWidth,
{
    /// Create a new marker with both fill and stroke set to the same color
    pub fn new_with_color(color: C) -> Self {
        Marker {
            size: MarkerSize::default(),
            shape: MarkerShape::default(),
            fill: Some(Fill::Solid {
                color,
                opacity: None,
            }),
            stroke: Some(Stroke {
                color,
                width: C::default_stroke_width(),
                pattern: LinePattern::default(),
                opacity: None,
            }),
        }
    }

    /// Set the marker size, returning self for chaining
    pub fn with_size<S: Into<MarkerSize>>(self, size: S) -> Self {
        Self {
            size: size.into(),
            ..self
        }
    }

    /// Set the marker shape, returning self for chaining
    pub fn with_shape(self, shape: MarkerShape) -> Self {
        Self { shape, ..self }
    }

    /// Set the marker fill style, returning self for chaining
    pub fn with_fill(self, fill: Fill<C>) -> Self {
        Self {
            fill: Some(fill),
            ..self
        }
    }

    /// Set the marker stroke style, returning self for chaining
    pub fn with_stroke(self, stroke: Stroke<C>) -> Self {
        Self {
            stroke: Some(stroke),
            ..self
        }
    }

    /// Shorthand for setting both fill and stroke to the same color, returning self for chaining
    pub fn with_color(self, color: C) -> Self {
        let mut fill = self.fill.unwrap_or_else(|| Fill::Solid {
            color,
            opacity: None,
        });
        match &mut fill {
            Fill::Solid { color: col, .. } => *col = color,
        }

        let mut stroke = self.stroke.unwrap_or_else(|| Stroke {
            color,
            width: C::default_stroke_width(),
            opacity: None,
            pattern: LinePattern::default(),
        });
        stroke.color = color;

        Self {
            fill: Some(fill),
            stroke: Some(stroke),
            ..self
        }
    }

    /// Shorthand for setting opacity of the fill, returning self for chaining
    pub fn with_fill_opacity(self, opacity: f32) -> Self {
        match self.fill {
            Some(Fill::Solid { color, .. }) => self.with_fill(Fill::Solid {
                color,
                opacity: Some(opacity),
            }),
            None => self,
        }
    }

    /// Shorthand for setting stroke width, returning self for chaining
    pub fn with_stroke_width(self, width: f32) -> Self {
        let stroke = match self.stroke {
            Some(Stroke {
                color,
                pattern,
                opacity,
                ..
            }) => Some(Stroke {
                color,
                width,
                pattern,
                opacity,
            }),
            None => None,
        };
        Self { stroke, ..self }
    }
}

impl<C> Default for Marker<C>
where
    C: Color + Default + DefaultStrokeWidth,
{
    fn default() -> Self {
        Marker::new_with_color(C::default())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::Rgba8;
    use crate::style::theme;

    #[test]
    fn test_color_resolve() {
        let style = Style::light();

        let theme_line: theme::Stroke = (theme::Color::Theme(theme::Col::LegendBorder), 2.0).into();
        let stroke = theme_line.as_stroke(&style);
        assert_eq!(stroke.color, Rgba8::from_hex(b"#000000"));

        let series_line: Stroke<series::IndexColor> = (series::IndexColor(2), 2.0).into();
        let stroke = series_line.as_stroke(&style);
        assert_eq!(stroke.color, Rgba8::from_hex(b"#2ca02c"));

        let series_line: Stroke<series::AutoColor> = (series::AutoColor, 2.0).into();
        let stroke = series_line.as_stroke(&(&style, 2));
        assert_eq!(stroke.color, Rgba8::from_hex(b"#2ca02c"));

        let fixed_color: Stroke<Rgba8> = (Rgba8::from_hex(b"#123456"), 2.0).into();
        let stroke = fixed_color.as_stroke(&());
        assert_eq!(stroke.color, Rgba8::from_hex(b"#123456"));
    }
}
