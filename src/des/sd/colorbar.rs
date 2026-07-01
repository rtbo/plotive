use serde::de::MapAccess;
use serde::ser::SerializeStruct;
use serde::{Deserializer, Serializer};

use crate::des::axis::ticks;
use crate::des::{self, colorbar};
use crate::style::theme;
use crate::text;

impl serde::Serialize for colorbar::Pos {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        match self {
            colorbar::Pos::Left => serializer.serialize_str("left"),
            colorbar::Pos::Right => serializer.serialize_str("right"),
            colorbar::Pos::Top => serializer.serialize_str("top"),
            colorbar::Pos::Bottom => serializer.serialize_str("bottom"),
        }
    }
}

impl<'de> serde::Deserialize<'de> for colorbar::Pos {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct Visitor;
        impl<'de> serde::de::Visitor<'de> for Visitor {
            type Value = colorbar::Pos;
            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a string")
            }
            fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                match v {
                    "auto" => Ok(colorbar::Pos::default()),
                    "left" => Ok(colorbar::Pos::Left),
                    "right" => Ok(colorbar::Pos::Right),
                    "top" => Ok(colorbar::Pos::Top),
                    "bottom" => Ok(colorbar::Pos::Bottom),
                    _ => Err(E::invalid_value(serde::de::Unexpected::Str(v), &self)),
                }
            }
        }
        deserializer.deserialize_str(Visitor)
    }
}

impl serde::Serialize for colorbar::ColorBar {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let default = colorbar::ColorBar::default();
        if self == &default {
            return "auto".serialize(serializer);
        }

        // check if only the pos has changed
        let mut self_default_pos = self.clone();
        self_default_pos.pos = Default::default();
        if self_default_pos == default {
            return self.pos().serialize(serializer);
        }

        let mut map = serializer.serialize_struct("ColorBar", 6)?;
        if self.pos() != default.pos() {
            map.serialize_field("pos", &self.pos())?;
        }
        if self.width() != default.width() {
            map.serialize_field("width", &self.width())?;
        }
        if self.title() != default.title() {
            map.serialize_field("title", &self.title())?;
        }
        if self.border() != default.border() {
            map.serialize_field("border", &self.border())?;
        }
        if self.ticks_font() != default.ticks_font() {
            map.serialize_field("ticksFont", &self.ticks_font())?;
        }
        if self.ticks_locator() != default.ticks_locator() {
            map.serialize_field("ticks", &self.ticks_locator())?;
        }
        if self.margin() != default.margin() {
            map.serialize_field("margin", &self.margin())?;
        }
        map.end()
    }
}

impl<'de> serde::Deserialize<'de> for colorbar::ColorBar {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct Visitor;
        impl<'de> serde::de::Visitor<'de> for Visitor {
            type Value = colorbar::ColorBar;
            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a string or a map")
            }
            fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                match v {
                    "auto" => Ok(colorbar::ColorBar::default()),
                    "left" => Ok(colorbar::ColorBar::new(colorbar::Pos::Left)),
                    "right" => Ok(colorbar::ColorBar::new(colorbar::Pos::Right)),
                    "top" => Ok(colorbar::ColorBar::new(colorbar::Pos::Top)),
                    "bottom" => Ok(colorbar::ColorBar::new(colorbar::Pos::Bottom)),
                    _ => Err(E::invalid_value(serde::de::Unexpected::Str(v), &self)),
                }
            }
            fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
            where
                A: MapAccess<'de>,
            {
                super::deserialize_map_fields!(
                    'de, map,
                    "pos" => pos: Option<colorbar::Pos>,
                    "width" => width: Option<f32>,
                    "title" => title: Option<des::Text>,
                    "border" => border: Option<Option<theme::Stroke>>,
                    "ticks" => ticks: Option<ticks::Locator>,
                    "ticksFont" => ticks_font: Option<text::TextProps<theme::Color>>,
                    "margin" => margin: Option<f32>,
                );
                let mut colorbar = if let Some(pos) = pos {
                    colorbar::ColorBar::new(pos)
                } else {
                    colorbar::ColorBar::default()
                };
                if let Some(width) = width {
                    colorbar = colorbar.with_width(width);
                }
                if let Some(title) = title {
                    colorbar = colorbar.with_title(title);
                }
                if let Some(border) = border {
                    colorbar = colorbar.with_border(border);
                }
                if let Some(ticks) = ticks {
                    colorbar = colorbar.with_ticks_locator(ticks);
                }
                if let Some(ticks_font) = ticks_font {
                    colorbar = colorbar.with_ticks_font(ticks_font);
                }
                if let Some(margin) = margin {
                    colorbar = colorbar.with_margin(margin);
                }
                Ok(colorbar)
            }
        }
        deserializer.deserialize_any(Visitor)
    }
}
