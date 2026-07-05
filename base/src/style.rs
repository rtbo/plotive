use crate::Rgba8;

/// Trait for color types that have a default value for serialization purposes
pub trait DefaultColor: Color {
    fn default_color() -> Option<Self>;
    fn default_fill_color() -> Option<Self> {
        Self::default_color()
    }
    fn default_stroke_color() -> Option<Self> {
        Self::default_color()
    }
    fn default_text_color() -> Option<Self> {
        Self::default_color()
    }
}

/// Trait for types that have a default stroke for serialization purposes
/// The trait is implemented for color types, so that the default stroke width
/// can be associated with the color type used in the stroke.
pub trait DefaultStroke: Sized {
    /// Return the default stroke for this color type.
    fn default_stroke() -> Option<Stroke<Self>>;
}

/// Trait for types that have a default stroke width for serialization purposes
/// The trait is implemented for color types, so that the default stroke width
/// can be associated with the color type used in the stroke.
pub trait DefaultStrokeWidth {
    /// Return the default stroke width for this color type.
    fn default_stroke_width() -> f32;
}

/// Trait that defines a context for resolving colors.
/// The context can be used to resolve colors based on themes, series, or other factors.
pub trait ResolveColor<C> {
    fn resolve_color(&self, color: &C) -> Rgba8;
}

/// Trait for color types that can be resolved to a concrete color.
pub trait Color: Clone + Copy + From<Rgba8> + std::fmt::Debug {
    #[inline]
    fn resolve<R>(&self, rc: &R) -> Rgba8
    where
        R: ResolveColor<Self>,
        Self: Sized,
    {
        rc.resolve_color(self)
    }
}

impl Color for Rgba8 {}

impl DefaultStroke for Rgba8 {
    fn default_stroke() -> Option<Stroke<Self>> {
        None
    }
}

impl DefaultStrokeWidth for Rgba8 {
    fn default_stroke_width() -> f32 {
        1.0
    }
}

impl ResolveColor<Rgba8> for () {
    fn resolve_color(&self, color: &Rgba8) -> Rgba8 {
        *color
    }
}

/// Dash pattern for dashed lines
/// A dash pattern is a sequence of lengths that specify the lengths of
/// alternating dashes and gaps.
///
/// The lengths of dashes and gaps are relative to the line width.
/// So a pattern will scale with the line width and remain visually consistent.
#[derive(Debug, Clone, PartialEq, Default)]
pub enum LinePattern {
    /// Solid line
    #[default]
    Solid,
    /// Dashed line. Equivalent to Custom(vec![5.0, 5.0])
    Dashed,
    /// Dotted line. Equivalent to Custom(vec![1.0, 1.0])
    Dot,
    /// Dash-dot line. Equivalent to Custom(vec![5.0, 5.0, 1.0, 5.0])
    DashDot,
    /// Custom dashed line.
    /// The pattern is a sequence of lengths that specify the lengths of alternating dashes and gaps.
    Custom(Vec<f32>),
}

impl LinePattern {
    const DASHED: &'static [f32] = &[5.0, 5.0];
    const DOTTED: &'static [f32] = &[1.0, 1.0];
    const DASH_DOT: &'static [f32] = &[5.0, 5.0, 1.0, 5.0];

    pub fn get_dash(&self) -> Option<&[f32]> {
        match self {
            LinePattern::Solid => None,
            LinePattern::Dashed => Some(Self::DASHED),
            LinePattern::Dot => Some(Self::DOTTED),
            LinePattern::DashDot => Some(Self::DASH_DOT),
            LinePattern::Custom(pattern) => Some(pattern),
        }
    }
}

/// Stroke style definition. Defines how lines are stroked.
///
/// The color is a generic parameter to support different color resolution strategies,
/// such as fixed colors, theme-based colors, or series-based colors.
#[derive(Debug, Clone, PartialEq)]
pub struct Stroke<C> {
    /// Line color
    pub color: C,
    /// Line width in figure units
    pub width: f32,
    /// Line pattern
    pub pattern: LinePattern,
    /// Line opacity (0.0 to 1.0)
    pub opacity: Option<f32>,
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
}

impl<C: Color + DefaultStrokeWidth> Stroke<C> {
    pub fn solid(color: C) -> Self {
        Stroke {
            color,
            width: C::default_stroke_width(),
            pattern: LinePattern::Solid,
            opacity: None,
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

impl<C: Color + DefaultStrokeWidth> From<C> for Stroke<C> {
    fn from(color: C) -> Self {
        Stroke {
            color,
            width: C::default_stroke_width(),
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

impl<C: Color> From<(C, f32, Vec<f32>)> for Stroke<C> {
    fn from((color, width, dash): (C, f32, Vec<f32>)) -> Self {
        Stroke {
            color,
            width,
            pattern: LinePattern::Custom(dash),
            opacity: None,
        }
    }
}

/// Fill style definition
/// The color is a generic parameter to support different color resolution strategies,
/// such as fixed colors, theme based colors, or series-based colors.
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Fill<C> {
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

impl<C: Color> From<C> for Fill<C> {
    fn from(color: C) -> Self {
        Fill::Solid {
            color,
            opacity: None,
        }
    }
}

impl<C> Fill<C> {
    /// Create a solid and opaque fill
    pub fn solid(color: C) -> Self {
        Fill::Solid {
            color,
            opacity: None,
        }
    }

    /// Set the fill opacity (0.0 to 1.0), returning self for chaining
    pub fn with_opacity(self, opacity: f32) -> Self {
        match self {
            Fill::Solid { color, .. } => Fill::Solid {
                color,
                opacity: Some(opacity),
            },
        }
    }
}
