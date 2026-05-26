//! Color bar configuration
use crate::des::axis;
use crate::style::{defaults, theme};
use crate::text;

super::define_rich_text_structs!(Title, TitleProps, TitleOptProps);

impl Default for TitleProps {
    fn default() -> Self {
        TitleProps::new(defaults::COLORBAR_TITLE_FONT_SIZE)
    }
}

/// Position of a color bar relatively to the plot
#[derive(Debug, Default, Clone, Copy)]
pub enum Pos {
    /// Position the color bar above the plot area
    Top,
    /// Position the color bar to the right of the plot area (default)
    #[default]
    Right,
    /// Position the color bar below the plot area
    Bottom,
    /// Position the color bar to the left of the plot area
    Left,
}

/// Font configuration for color bar ticks
#[derive(Debug, Clone)]
pub struct TicksFont {
    /// The font size in figure units
    pub size: f32,
    /// The font
    pub font: text::Font,
    /// The font color
    pub color: theme::Color,
}

impl Default for TicksFont {
    fn default() -> Self {
        Self {
            size: defaults::COLORBAR_TICKS_FONT_SIZE,
            font: text::Font::default(),
            color: theme::Col::Foreground.into(),
        }
    }
}

/// ColorBar configuration for a plot
#[derive(Debug, Clone)]
pub struct ColorBar {
    pos: Pos,
    width: f32,
    title: Option<Title>,
    ticks_font: TicksFont,
    border: Option<theme::Stroke>,
    locator: axis::ticks::Locator,
    margin: f32,
}

impl Default for ColorBar {
    fn default() -> Self {
        Self {
            pos: Pos::default(),
            width: defaults::COLORBAR_WIDTH,
            title: None,
            ticks_font: TicksFont::default(),
            border: Some(theme::Stroke {
                color: theme::Col::Foreground.into(),
                width: 1.0,
                pattern: Default::default(),
                opacity: None,
            }),
            locator: axis::ticks::Locator::Auto,
            margin: defaults::COLORBAR_MARGIN,
        }
    }
}

impl ColorBar {
    /// Create a new color bar with the specified position
    pub fn new(pos: Pos) -> Self {
        Self {
            pos,
            ..Default::default()
        }
    }

    /// Set the width of the color bar and return self for chaining
    pub fn with_width(mut self, width: f32) -> Self {
        self.width = width;
        self
    }

    /// Set the title text and return self for chaining
    pub fn with_title(mut self, title: Title) -> Self {
        self.title = Some(title);
        self
    }

    /// Set the ticks font properties and return self for chaining
    pub fn with_ticks_font(mut self, ticks_font: TicksFont) -> Self {
        self.ticks_font = ticks_font;
        self
    }

    /// Set the border properties and return self for chaining
    pub fn with_border(mut self, border: Option<theme::Stroke>) -> Self {
        self.border = border;
        self
    }

    /// Set the ticks locator and return self for chaining
    pub fn with_ticks_locator(mut self, locator: axis::ticks::Locator) -> Self {
        self.locator = locator;
        self
    }

    /// Set the margin between the color bar and the plot area and return self for chaining
    pub fn with_margin(mut self, margin: f32) -> Self {
        self.margin = margin;
        self
    }

    /// Get the position of the color bar
    pub fn pos(&self) -> Pos {
        self.pos
    }

    /// Get the width of the color bar
    pub fn width(&self) -> f32 {
        self.width
    }

    /// Get the title text of the color bar, if it has one
    pub fn title(&self) -> Option<&Title> {
        self.title.as_ref()
    }

    /// Get the ticks font properties
    pub fn ticks_font(&self) -> &TicksFont {
        &self.ticks_font
    }

    /// Get the border properties
    pub fn border(&self) -> Option<&theme::Stroke> {
        self.border.as_ref()
    }

    /// Get the ticks locator
    pub fn ticks_locator(&self) -> &axis::ticks::Locator {
        &self.locator
    }

    /// Get the margin between the color bar and the plot area
    pub fn margin(&self) -> f32 {
        self.margin
    }
}

impl From<Pos> for ColorBar {
    fn from(pos: Pos) -> Self {
        Self::new(pos)
    }
}

/// A tick locator that fits well with the stellar colormap with data in K
pub fn stellar_ticks_locator() -> axis::ticks::Locator {
    axis::ticks::Locator::List(
        vec![
            1000.0, 2000.0, 3000.0, 4000.0, 5000.0, 6500.0, 8000.0, 10000.0, 12500.0, 15000.0,
        ]
        .into(),
    )
}
