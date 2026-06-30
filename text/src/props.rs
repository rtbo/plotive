use plotive_base::{color, style};

use crate::font::{self, Font};

#[derive(Debug, Clone, PartialEq)]
pub struct FontProps {
    pub font: Font,
    pub size: f32,
}

impl FontProps {
    pub fn new(font: Font, size: f32) -> Self {
        FontProps { font, size }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Default)]
pub struct Decorations {
    pub underline: bool,
    pub strikethrough: bool,
}

/// A color that has meaning for the foreground
/// (e.g. a text color)
pub trait Foreground {
    fn foreground() -> Self;
}

impl Foreground for color::Rgba8 {
    fn foreground() -> Self {
        color::BLACK
    }
}

/// Properties for rendering text, including color and outline.
#[derive(Debug, Clone, PartialEq)]
pub struct RenderProps<C> {
    /// The color of the text. This is the fill color for the text glyphs.
    pub fill: Option<style::Fill<C>>,
    /// The outline of the text. This is the stroke color and width for the text glyphs.
    pub outline: Option<style::Stroke<C>>,
}

impl<C> From<C> for RenderProps<C>
where
    C: Foreground + style::Color,
{
    fn from(color: C) -> Self {
        RenderProps {
            fill: Some(style::Fill::solid(color)),
            outline: None,
        }
    }
}

impl<C: Foreground> Default for RenderProps<C> {
    fn default() -> Self {
        RenderProps {
            fill: Some(style::Fill::solid(C::foreground())),
            outline: None,
        }
    }
}

#[derive(Debug, Clone, PartialEq)]
pub struct TextProps<C> {
    pub font: FontProps,
    pub decorations: Decorations,
    pub render: RenderProps<C>,
}

impl<C> TextProps<C>
where
    C: Foreground,
{
    pub fn new(font: Font, size: f32) -> TextProps<C> {
        TextProps {
            font: FontProps::new(font, size),
            decorations: Decorations::default(),
            render: RenderProps::default(),
        }
    }
}

impl<C> TextProps<C>
where
    C: Clone,
{
    pub fn with_font(mut self, font: FontProps) -> Self {
        self.font = font;
        self
    }

    pub fn with_decoration(mut self, decorations: Decorations) -> Self {
        self.decorations = decorations;
        self
    }

    pub fn with_render(mut self, render: RenderProps<C>) -> Self {
        self.render = render;
        self
    }

    pub fn apply_modifiers(&mut self, modifiers: &TextModifiers<C>) {
        if let Some(families) = &modifiers.families {
            self.font.font.families = families.clone();
        }
        if let Some(weight) = modifiers.weight {
            self.font.font.weight = weight;
        }
        if let Some(width) = modifiers.width {
            self.font.font.width = width;
        }
        if let Some(style) = modifiers.style {
            self.font.font.style = style;
        }
        if let Some(size) = modifiers.size {
            self.font.size = size;
        }
        if let Some(fill) = modifiers.color.as_ref() {
            self.render.fill = fill.clone();
        }
        if let Some(outline) = modifiers.outline.as_ref() {
            self.render.outline = outline.clone();
        }
        if let Some(underline) = modifiers.underline {
            self.decorations.underline = underline;
        }
        if let Some(strikethrough) = modifiers.strikethrough {
            self.decorations.strikethrough = strikethrough;
        }
    }
}

impl<C> RenderProps<C> {
    /// Convert this RenderProps to another color type using the provided mapping function
    pub fn to_other_color<D, M>(&self, color_map: M) -> RenderProps<D>
    where
        D: Clone,
        M: Fn(&C) -> D,
    {
        RenderProps {
            fill: self.fill.as_ref().map(|fill| match fill {
                style::Fill::Solid { color, opacity } => style::Fill::Solid {
                    color: color_map(color),
                    opacity: *opacity,
                },
            }),
            outline: self.outline.as_ref().map(|stroke| style::Stroke {
                color: color_map(&stroke.color),
                width: stroke.width,
                pattern: stroke.pattern.clone(),
                opacity: stroke.opacity,
            }),
        }
    }
}

impl<C> TextProps<C>
where
    C: Clone,
{
    /// Convert this TextProps to another color type using the provided mapping function
    pub fn to_other_color<D, M>(&self, color_map: M) -> TextProps<D>
    where
        D: Clone,
        M: Fn(&C) -> D,
    {
        TextProps {
            font: self.font.clone(),
            decorations: self.decorations,
            render: self.render.to_other_color(color_map),
        }
    }
}

/// A set of modifiers that can be applied on top of [`TextProps`] to alter the text appearance.
/// This is especially used for rich text rendering, where different parts of the text can have different styles.
#[derive(Debug, Clone, PartialEq)]
pub struct TextModifiers<C> {
    pub families: Option<Vec<font::Family>>,
    pub weight: Option<font::Weight>,
    pub width: Option<font::Width>,
    pub style: Option<font::Style>,
    pub size: Option<f32>,
    pub color: Option<Option<style::Fill<C>>>,
    pub outline: Option<Option<style::Stroke<C>>>,
    pub underline: Option<bool>,
    pub strikethrough: Option<bool>,
}

impl<C> Default for TextModifiers<C> {
    fn default() -> Self {
        TextModifiers {
            families: None,
            weight: None,
            width: None,
            style: None,
            size: None,
            color: None,
            outline: None,
            underline: None,
            strikethrough: None,
        }
    }
}

impl<C> TextModifiers<C> {
    pub(crate) fn affect_shape(&self) -> bool {
        self.families.is_some()
            || self.weight.is_some()
            || self.width.is_some()
            || self.style.is_some()
            || self.size.is_some()
    }
}
