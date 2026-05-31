//! Theme definitions and implementations

use crate::color::{self, Rgb8, Rgba8};
use crate::style::{DefaultStrokeWidth, catppuccin, dracula};
use crate::{style, text};

/// A theme, for styling figures
#[derive(Debug, Clone, Copy, PartialEq, Default)]
pub enum Theme {
    #[default]
    /// Light theme
    Light,
    /// Dark theme
    Dark,
    /// Dracula theme
    Dracula,
    /// Alucard theme (Dracula light)
    Alucard,
    /// Catppuccin Mocha theme
    CatppuccinMocha,
    /// Catppuccin Macchiato theme
    CatppuccinMacchiato,
    /// Catppuccin Frappe theme
    CatppuccinFrappe,
    /// Catppuccin Latte theme
    CatppuccinLatte,
    /// A custom theme
    Custom(ThemePalette),
}

impl Theme {
    /// Get the background color of the theme
    pub const fn background(&self) -> Rgba8 {
        self.palette().background
    }

    /// Get the foreground color of the theme
    pub const fn foreground(&self) -> Rgba8 {
        self.palette().foreground
    }

    /// Get the grid line color of the theme
    pub const fn grid(&self) -> Rgba8 {
        self.palette().grid
    }

    /// Get the legend background fill color of the theme
    pub const fn legend_fill(&self) -> Rgba8 {
        self.palette().legend_fill
    }

    /// Get the legend border color of the theme
    pub const fn legend_border(&self) -> Rgba8 {
        self.palette().legend_border
    }

    /// Get the theme palette
    pub const fn palette(&self) -> &ThemePalette {
        match self {
            Theme::Light => &ThemePalette::LIGHT,
            Theme::Dark => &ThemePalette::DARK,
            Theme::Dracula => &ThemePalette::DRACULA,
            Theme::Alucard => &ThemePalette::ALUCARD,
            Theme::CatppuccinLatte => &ThemePalette::CATPPUCCIN_LATTE,
            Theme::CatppuccinFrappe => &ThemePalette::CATPPUCCIN_FRAPPE,
            Theme::CatppuccinMacchiato => &ThemePalette::CATPPUCCIN_MACCHIATO,
            Theme::CatppuccinMocha => &ThemePalette::CATPPUCCIN_MOCHA,
            Theme::Custom(palette) => palette,
        }
    }

    /// Check whether the theme is dark or light
    /// A theme is considered dark if its background color has a luminance < 0.5
    pub fn is_dark(&self) -> bool {
        self.background().luminance() < 0.5
    }
}

/// The colors used in a theme
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct ThemePalette {
    /// Background color
    pub background: Rgba8,
    /// Foreground color
    pub foreground: Rgba8,
    /// Grid line color
    pub grid: Rgba8,
    /// Legend background fill color
    pub legend_fill: Rgba8,
    /// Legend border color
    pub legend_border: Rgba8,
}

impl ThemePalette {
    /// The light built-in theme palette
    pub const LIGHT: Self = Self {
        background: color::WHITE,
        foreground: color::BLACK,
        grid: Rgba8::from_hex(b"#808080"),
        legend_fill: color::WHITE,
        legend_border: color::BLACK,
    };

    /// The dark built-in theme palette
    pub const DARK: Self = Self {
        background: Rgba8::from_hex(b"#1e1e2e"),
        foreground: color::WHITE,
        grid: Rgba8::from_hex(b"#c0c0c0"),
        legend_fill: Rgba8::from_hex(b"#1e1e2e"),
        legend_border: color::WHITE,
    };

    /// The Dracula built-in theme palette
    pub const DRACULA: Self = dracula::theme_palette::<dracula::Dracula>();

    /// The Alucard built-in theme palette
    pub const ALUCARD: Self = dracula::theme_palette::<dracula::Alucard>();

    /// The catppuccin mocha built-in theme palette
    pub const CATPPUCCIN_MOCHA: Self = catppuccin::theme_palette::<catppuccin::Mocha>();

    /// The catppuccin macchiato built-in theme palette
    pub const CATPPUCCIN_MACCHIATO: Self = catppuccin::theme_palette::<catppuccin::Macchiato>();

    /// The catppuccin mocha built-in theme palette
    pub const CATPPUCCIN_FRAPPE: Self = catppuccin::theme_palette::<catppuccin::Frappe>();

    /// The catppuccin latte built-in theme palette
    pub const CATPPUCCIN_LATTE: Self = catppuccin::theme_palette::<catppuccin::Latte>();

    /// Create a new custom theme from background and foreground colors
    /// The grid, legend fill and legend border colors are derived automatically.
    pub fn new_back_and_fore(background: Rgba8, foreground: Rgba8) -> Self {
        let grid = if background.luminance() < 0.5 {
            // Dark background
            Rgb8::new(192, 192, 192).opaque()
        } else {
            // Light background
            Rgb8::new(128, 128, 128).opaque()
        };

        let legend_fill = background;
        let legend_border = foreground;

        Self {
            background,
            foreground,
            grid,
            legend_fill,
            legend_border,
        }
    }
}

/// Predefined colors for theme elements
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Col {
    /// Background color
    Background,
    /// Foreground color
    Foreground,
    /// Grid line color
    Grid,
    /// Legend background fill color
    LegendFill,
    /// Legend border color
    LegendBorder,
}

impl super::Color for Col {}

impl std::str::FromStr for Col {
    type Err = ();
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "background" => Ok(Col::Background),
            "foreground" => Ok(Col::Foreground),
            "grid" => Ok(Col::Grid),
            "legend_fill" => Ok(Col::LegendFill),
            "legend_border" => Ok(Col::LegendBorder),
            _ => Err(()),
        }
    }
}

impl std::fmt::Display for Col {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let s = match self {
            Col::Background => "background",
            Col::Foreground => "foreground",
            Col::Grid => "grid",
            Col::LegendFill => "legend_fill",
            Col::LegendBorder => "legend_border",
        };
        write!(f, "{}", s)
    }
}

impl color::ResolveColor<Col> for Theme {
    fn resolve_color(&self, col: &Col) -> Rgba8 {
        match col {
            Col::Background => self.background(),
            Col::Foreground => self.foreground(),
            Col::Grid => self.grid(),
            Col::LegendFill => self.legend_fill(),
            Col::LegendBorder => self.legend_border(),
        }
    }
}

/// A flexible color for theme elements
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Color {
    /// A color from the theme
    Theme(Col),
    /// A fixed RGB color
    Fixed(Rgba8),
}

impl From<Col> for Color {
    fn from(color: Col) -> Self {
        Color::Theme(color)
    }
}

impl From<Rgba8> for Color {
    fn from(color: Rgba8) -> Self {
        Color::Fixed(color)
    }
}

impl super::Color for Color {}

impl std::str::FromStr for Color {
    type Err = <Rgba8 as std::str::FromStr>::Err;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if let Ok(col) = s.parse::<Col>() {
            Ok(Color::Theme(col))
        } else {
            let c = s.parse::<Rgba8>()?;
            Ok(Color::Fixed(c))
        }
    }
}

impl std::fmt::Display for Color {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Color::Theme(col) => write!(f, "{}", col),
            Color::Fixed(c) => write!(f, "{}", c.html()),
        }
    }
}

impl text::rich::Foreground for Color {
    fn foreground() -> Self {
        Color::Theme(Col::Foreground)
    }
}

impl color::ResolveColor<Color> for Theme {
    fn resolve_color(&self, col: &Color) -> Rgba8 {
        match col {
            Color::Theme(col) => self.resolve_color(col),
            Color::Fixed(c) => *c,
        }
    }
}

impl super::DefaultStrokeWidth for Color {
    fn default_stroke_width() -> f32 {
        1.0
    }
}

/// Stroke style for theme elements
pub type Stroke = style::Stroke<Color>;

// From<Color> for Stroke is already defined in style.rs, using generics.
// We just add From<Col> for Stroke here.
impl From<Col> for Stroke {
    fn from(col: Col) -> Self {
        Stroke {
            color: col.into(),
            width: Color::default_stroke_width(),
            pattern: style::LinePattern::default(),
            opacity: None,
        }
    }
}

/// Fill style for theme elements
pub type Fill = style::Fill<Color>;

// From<Color> for Fill is already defined in style.rs, using generics.
// We just add From<Col> for Fill here.
impl From<Col> for Fill {
    fn from(col: Col) -> Self {
        Fill::Solid {
            color: col.into(),
            opacity: None,
        }
    }
}

/// Marker style for theme elements
pub type Marker = style::Marker<Color>;

impl From<Col> for Marker {
    fn from(col: Col) -> Self {
        Marker {
            size: Default::default(),
            shape: Default::default(),
            fill: Some(Fill::Solid {
                color: col.into(),
                opacity: None,
            }),
            stroke: None,
        }
    }
}

impl Default for Marker {
    fn default() -> Self {
        Marker {
            size: Default::default(),
            shape: Default::default(),
            fill: Some(Fill::Solid {
                color: Col::Foreground.into(),
                opacity: None,
            }),
            stroke: None,
        }
    }
}
