use serde::Serialize;
use serde::ser::SerializeStruct;

use crate::Color;
use crate::style::{self, series, theme};

impl Serialize for style::theme::Color {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        use style::theme;
        match self {
            theme::Color::Theme(theme::Col::Background) => "background".serialize(serializer),
            theme::Color::Theme(theme::Col::Foreground) => "foreground".serialize(serializer),
            theme::Color::Theme(theme::Col::LegendFill) => "legend-fill".serialize(serializer),
            theme::Color::Theme(theme::Col::LegendBorder) => "legend-border".serialize(serializer),
            theme::Color::Theme(theme::Col::Grid) => "grid".serialize(serializer),
            theme::Color::Fixed(rgba) => rgba.serialize(serializer),
        }
    }
}

impl Serialize for style::series::Color {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        use style::series;
        match self {
            series::Color::Auto => "auto".serialize(serializer),
            series::Color::Index(idx) => idx.0.serialize(serializer),
            series::Color::Fixed(rgba) => rgba.serialize(serializer),
        }
    }
}

impl<C> Serialize for style::Fill<C>
where
    C: Serialize + Color,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let style::Fill::Solid { color, opacity } = self;

        if let Some(opacity) = opacity {
            if *opacity == 1.0 {
                color.serialize(serializer)
            } else {
                let mut state = serializer.serialize_struct("Fill", 2)?;
                state.serialize_field("color", color)?;
                state.serialize_field("opacity", opacity)?;
                state.end()
            }
        } else {
            color.serialize(serializer)
        }
    }
}

impl Serialize for style::LinePattern {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        use style::LinePattern;
        match self {
            LinePattern::Solid => "solid".serialize(serializer),
            LinePattern::Dashed => "dashed".serialize(serializer),
            LinePattern::Dot => "dotted".serialize(serializer),
            LinePattern::DashDot => "dash-dot".serialize(serializer),
            LinePattern::Dash(dash) => dash.0.serialize(serializer),
        }
    }
}

pub fn is_default_stroke<C>(stroke: &style::Stroke<C>) -> bool
where
    C: Color + style::DefaultStrokeWidth,
{
    stroke.width == C::default_stroke_width()
        && stroke.pattern == style::LinePattern::Solid
        && stroke.opacity.map_or(true, |o| o == 1.0)
}

impl<C> Serialize for style::Stroke<C>
where
    C: Serialize + Color + style::DefaultStrokeWidth,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let style::Stroke {
            color,
            width,
            pattern,
            opacity,
        } = self;

        if is_default_stroke(self) {
            color.serialize(serializer)
        } else {
            let mut state = serializer.serialize_struct("Stroke", 2)?;
            state.serialize_field("color", color)?;
            if width != &C::default_stroke_width() {
                state.serialize_field("width", width)?;
            }
            if pattern != &style::LinePattern::Solid {
                state.serialize_field("pattern", pattern)?;
            }
            if let Some(opacity) = opacity {
                if *opacity != 1.0 {
                    state.serialize_field("opacity", opacity)?;
                }
            }
            state.end()
        }
    }
}

trait DefaultColor: Color {
    fn default_color() -> Option<Self>;
}

impl DefaultColor for theme::Color {
    fn default_color() -> Option<Self> {
        None
    }
}

impl DefaultColor for series::Color {
    fn default_color() -> Option<Self> {
        Some(series::Color::Auto)
    }
}

impl<C> Serialize for style::Marker<C>
where
    C: Serialize + Color + DefaultColor + style::DefaultStrokeWidth + PartialEq,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let style::Marker {
            size,
            shape,
            fill,
            stroke,
        } = self;

        let has_default_size = size == &style::MarkerSize::default();
        let has_default_shape = shape == &style::MarkerShape::default();
        let default_color = C::default_color();
        let default_stroke = default_color.as_ref().map(|color| style::Stroke {
            color: color.clone(),
            width: C::default_stroke_width(),
            pattern: style::LinePattern::default(),
            opacity: None,
        });
        let default_fill = default_color.as_ref().map(|color| style::Fill::Solid {
            color: color.clone(),
            opacity: None,
        });
        let has_default_stroke =
            default_stroke.is_some() && stroke.as_ref() == default_stroke.as_ref();
        let has_default_fill = default_fill.is_some() && fill.as_ref() == default_fill.as_ref();

        // if all defaults, serialize as the shape only
        // if default shape and non-default color, serialize as the color only
        // otherwise, serialize as a struct with all non-default fields
        if has_default_size && has_default_fill && has_default_stroke {
            shape.serialize(serializer)
        } else if has_default_shape && has_default_fill && has_default_stroke {
            size.serialize(serializer)
        } else {
            let mut state = serializer.serialize_struct("Marker", 3)?;
            state.serialize_field("shape", shape)?;
            if !has_default_size {
                state.serialize_field("size", size)?;
            }
            if !has_default_fill {
                state.serialize_field("fill", fill)?;
            }
            if !has_default_stroke {
                state.serialize_field("stroke", stroke)?;
            }
            state.end()
        }
    }
}

impl serde::Serialize for style::MarkerShape {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        use style::MarkerShape;
        match self {
            MarkerShape::Circle => "circle".serialize(serializer),
            MarkerShape::Square => "square".serialize(serializer),
            MarkerShape::Diamond => "diamond".serialize(serializer),
            MarkerShape::Cross => "cross".serialize(serializer),
            MarkerShape::Plus => "plus".serialize(serializer),
            MarkerShape::TriangleUp => "triangle-up".serialize(serializer),
            MarkerShape::TriangleDown => "triangle-down".serialize(serializer),
            MarkerShape::TriangleLeft => "triangle-left".serialize(serializer),
            MarkerShape::TriangleRight => "triangle-right".serialize(serializer),
        }
    }
}

impl serde::Serialize for style::MarkerSize {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        self.0.serialize(serializer)
    }
}
