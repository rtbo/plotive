//! Color bar configuration
use crate::style::{defaults, theme};
use crate::text;

/// Position of a color bar relatively to the plot
#[derive(Debug, Default, Clone, Copy)]
pub enum ColorBarPos {
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

/// Font configuration for a color bar label
#[derive(Debug, Clone)]
pub struct LabelFont {
    /// The font size in figure units
    pub size: f32,
    /// The font
    pub font: text::Font,
    /// The font color
    pub color: theme::Color,
}

impl Default for LabelFont {
    fn default() -> Self {
        Self {
            size: defaults::COLORBAR_LABEL_FONT_SIZE,
            font: text::Font::default(),
            color: theme::Col::Foreground.into(),
        }
    }
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
    pos: ColorBarPos,
    width: f32,
    label_font: LabelFont,
    ticks_font: TicksFont,
    border: Option<theme::Stroke>,
    margin: f32,
}

impl Default for ColorBar {
    fn default() -> Self {
        Self {
            pos: ColorBarPos::default(),
            width: defaults::COLORBAR_WIDTH,
            label_font: LabelFont::default(),
            ticks_font: TicksFont::default(),
            border: Some(theme::Stroke {
                color: theme::Col::Foreground.into(),
                width: 1.0,
                pattern: Default::default(),
                opacity: None,
            }),
            margin: defaults::COLORBAR_MARGIN,
        }
    }
}

impl ColorBar {
    /// Create a new color bar with the specified position
    pub fn new(pos: ColorBarPos) -> Self {
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

    /// Set the label font properties and return self for chaining
    pub fn with_label_font(mut self, label_font: LabelFont) -> Self {
        self.label_font = label_font;
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

    /// Set the margin between the color bar and the plot area and return self for chaining
    pub fn with_margin(mut self, margin: f32) -> Self {
        self.margin = margin;
        self
    }

    /// Get the position of the color bar
    pub fn pos(&self) -> ColorBarPos {
        self.pos
    }

    /// Get the width of the color bar
    pub fn width(&self) -> f32 {
        self.width
    }

    /// Get the label font properties
    pub fn label_font(&self) -> &LabelFont {
        &self.label_font
    }

    /// Get the ticks font properties
    pub fn ticks_font(&self) -> &TicksFont {
        &self.ticks_font
    }

    /// Get the border properties
    pub fn border(&self) -> Option<&theme::Stroke> {
        self.border.as_ref()
    }

    /// Get the margin between the color bar and the plot area
    pub fn margin(&self) -> f32 {
        self.margin
    }
}

impl From<ColorBarPos> for ColorBar {
    fn from(pos: ColorBarPos) -> Self {
        Self::new(pos)
    }
}
