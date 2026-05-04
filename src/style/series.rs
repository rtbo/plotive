/*!
 * This module deals with colors and style of data series.
 */
use crate::style::{self, catppuccin, defaults};
use crate::{Rgba8, ResolveColor};

/// A palette for data series.
/// It provides ordered colors for series in a figure.
/// If more series are present than colors in the palette,
/// colors are reused in order.
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub enum Palette {
    /// Black monochrome palette
    Black,
    #[default]
    /// Standard plotive palette
    Standard,
    /// Pastel plotive palette
    Pastel,
    /// Paul Tol's bright colorblind-safe palette
    TolBright,
    /// Okabe & Ito colorblind-safe palette
    OkabeIto,
    /// Catppuccin Mocha palette
    CatppuccinMocha,
    /// Catppuccin Macchiato palette
    CatppuccinMacchiato,
    /// Catppuccin Frappe palette
    CatppuccinFrappe,
    /// Catppuccin Latte palette
    CatppuccinLatte,
    /// A custom palette
    Custom(Vec<Rgba8>),
}

impl Palette {
    /// Get the colors in the palette
    pub const fn colors(&self) -> &[Rgba8] {
        match self {
            Palette::Black => palettes::BLACK,
            Palette::Standard => palettes::STANDARD,
            Palette::Pastel => palettes::PASTEL,
            Palette::TolBright => palettes::TOL_BRIGHT,
            Palette::OkabeIto => palettes::OKABE_ITO,
            Palette::CatppuccinMocha => catppuccin::series_colors::<catppuccin::Mocha>(),
            Palette::CatppuccinMacchiato => catppuccin::series_colors::<catppuccin::Macchiato>(),
            Palette::CatppuccinFrappe => catppuccin::series_colors::<catppuccin::Frappe>(),
            Palette::CatppuccinLatte => catppuccin::series_colors::<catppuccin::Latte>(),
            Palette::Custom(colors) => colors.as_slice(),
        }
    }

    /// Get the number of colors in the palette
    pub const fn len(&self) -> usize {
        self.colors().len()
    }

    /// Get a color from the palette by its index
    pub const fn get(&self, col: IndexColor) -> Rgba8 {
        self.colors()[col.0 % self.len()]
    }
}

/// A series color identified by its index in a palette
#[derive(Debug, Clone, Copy)]
pub struct IndexColor(pub usize);

impl style::Color for IndexColor {}

/// A series color that is automatically chosen from a palette based on the series index
#[derive(Debug, Clone, Copy)]
pub struct AutoColor;

impl style::Color for AutoColor {}

/// A flexible color for data series
#[derive(Debug, Clone, Copy, Default)]
pub enum Color {
    /// Automatic color from the palette
    #[default]
    Auto,
    /// Color from the palette by index
    Index(IndexColor),
    /// Fixed RGB color
    Fixed(Rgba8),
}

impl From<IndexColor> for Color {
    fn from(color: IndexColor) -> Self {
        Color::Index(color)
    }
}

impl From<AutoColor> for Color {
    fn from(_color: AutoColor) -> Self {
        Color::Auto
    }
}

impl From<Rgba8> for Color {
    fn from(color: Rgba8) -> Self {
        Color::Fixed(color)
    }
}

impl style::Color for Color {}

impl ResolveColor<IndexColor> for Palette {
    fn resolve_color(&self, col: &IndexColor) -> Rgba8 {
        self.get(*col)
    }
}

impl ResolveColor<AutoColor> for (&Palette, usize) {
    fn resolve_color(&self, _col: &AutoColor) -> Rgba8 {
        self.0.get(IndexColor(self.1))
    }
}

impl ResolveColor<Color> for (&Palette, usize) {
    fn resolve_color(&self, col: &Color) -> Rgba8 {
        match col {
            Color::Auto => self.0.get(IndexColor(self.1)),
            Color::Index(idx) => self.0.get(*idx),
            Color::Fixed(c) => *c,
        }
    }
}

/// Stroke style for theme elements
pub type Stroke = style::Stroke<Color>;

impl Default for Stroke {
    fn default() -> Self {
        Stroke {
            color: Color::default(),
            width: defaults::SERIES_LINE_WIDTH,
            pattern: style::LinePattern::default(),
            opacity: None,
        }
    }
}

impl From<Rgba8> for Stroke {
    fn from(color: Rgba8) -> Self {
        Stroke {
            color: color.into(),
            width: defaults::SERIES_LINE_WIDTH,
            pattern: style::LinePattern::default(),
            opacity: None,
        }
    }
}

/// Fill style for theme elements
pub type Fill = style::Fill<Color>;

impl From<Rgba8> for Fill {
    fn from(color: Rgba8) -> Self {
        Fill::Solid {
            color: color.into(),
            opacity: None,
        }
    }
}

/// Marker style for theme elements
pub type Marker = style::Marker<Color>;

impl From<Rgba8> for Marker {
    fn from(color: Rgba8) -> Self {
        Marker::new_with_color(color.into())
    }
}

/// Types for built-in and custom palettes
mod palettes {
    use crate::Rgba8;

    pub const BLACK: &[Rgba8] = &[Rgba8::from_hex(b"#000000")];
    pub const STANDARD: &[Rgba8] = &[
        Rgba8::from_hex(b"#1f77b4"), // blue
        Rgba8::from_hex(b"#ff7f0e"), // orange
        Rgba8::from_hex(b"#2ca02c"), // green
        Rgba8::from_hex(b"#d62728"), // red
        Rgba8::from_hex(b"#9467bd"), // purple
        Rgba8::from_hex(b"#8c564b"), // brown
        Rgba8::from_hex(b"#e377c2"), // pink
        Rgba8::from_hex(b"#7f7f7f"), // gray
        Rgba8::from_hex(b"#bcbd22"), // olive
        Rgba8::from_hex(b"#17becf"), // cyan
    ];
    pub const PASTEL: &[Rgba8] = &[
        Rgba8::from_hex(b"#aec7e8"), // light blue
        Rgba8::from_hex(b"#ffbb78"), // light orange
        Rgba8::from_hex(b"#98df8a"), // light green
        Rgba8::from_hex(b"#ff9896"), // light red
        Rgba8::from_hex(b"#c5b0d5"), // light purple
        Rgba8::from_hex(b"#c49c94"), // light brown
        Rgba8::from_hex(b"#f7b6d2"), // light pink
        Rgba8::from_hex(b"#c7c7c7"), // light gray
        Rgba8::from_hex(b"#dbdb8d"), // light olive
        Rgba8::from_hex(b"#9edae5"), // light cyan
    ];
    pub const TOL_BRIGHT: &[Rgba8] = &[
        Rgba8::from_hex(b"#4477AA"), // blue
        Rgba8::from_hex(b"#EE6677"), // red
        Rgba8::from_hex(b"#228833"), // green
        Rgba8::from_hex(b"#CCBB44"), // yellow
        Rgba8::from_hex(b"#66CCEE"), // cyan
        Rgba8::from_hex(b"#AA3377"), // purple
        Rgba8::from_hex(b"#BBBBBB"), // gray
    ];
    pub const OKABE_ITO: &[Rgba8] = &[
        Rgba8::from_hex(b"#E69F00"), // orange
        Rgba8::from_hex(b"#56B4E9"), // sky blue
        Rgba8::from_hex(b"#009E73"), // bluish green
        Rgba8::from_hex(b"#F0E442"), // yellow
        Rgba8::from_hex(b"#0072B2"), // blue
        Rgba8::from_hex(b"#D55E00"), // vermillion
        Rgba8::from_hex(b"#CC79A7"), // reddish purple
    ];
}
