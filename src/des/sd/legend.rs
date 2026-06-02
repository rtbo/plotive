use std::borrow::Cow;

use serde::ser::SerializeStruct;

use crate::des::{Legend, figure, legend, plot};
use crate::geom;
use crate::style::{defaults, theme};

// MARK: figure::LegendPos

impl serde::Serialize for figure::LegendPos {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            figure::LegendPos::Top => "top",
            figure::LegendPos::Right => "right",
            figure::LegendPos::Bottom => "bottom",
            figure::LegendPos::Left => "left",
        }
        .serialize(serializer)
    }
}

impl<'de> serde::de::Deserialize<'de> for figure::LegendPos {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::de::Deserializer<'de>,
    {
        let s: Cow<'de, str> = serde::Deserialize::deserialize(deserializer)?;
        match &*s {
            "top" => Ok(figure::LegendPos::Top),
            "right" => Ok(figure::LegendPos::Right),
            "bottom" => Ok(figure::LegendPos::Bottom),
            "left" => Ok(figure::LegendPos::Left),
            _ => Err(serde::de::Error::unknown_variant(
                &s,
                &["top", "right", "bottom", "left"],
            )),
        }
    }
}

// MARK: plot::LegendPos

impl serde::Serialize for plot::LegendPos {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            plot::LegendPos::OutTop => "out-top",
            plot::LegendPos::OutRight => "out-right",
            plot::LegendPos::OutBottom => "out-bottom",
            plot::LegendPos::OutLeft => "out-left",
            plot::LegendPos::InTopLeft => "in-top-left",
            plot::LegendPos::InTop => "in-top",
            plot::LegendPos::InTopRight => "in-top-right",
            plot::LegendPos::InRight => "in-right",
            plot::LegendPos::InBottomRight => "in-bottom-right",
            plot::LegendPos::InBottom => "in-bottom",
            plot::LegendPos::InBottomLeft => "in-bottom-left",
            plot::LegendPos::InLeft => "in-left",
        }
        .serialize(serializer)
    }
}

impl<'de> serde::de::Deserialize<'de> for plot::LegendPos {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::de::Deserializer<'de>,
    {
        let s: Cow<'de, str> = serde::Deserialize::deserialize(deserializer)?;
        match &*s {
            "out-top" => Ok(plot::LegendPos::OutTop),
            "out-right" => Ok(plot::LegendPos::OutRight),
            "out-bottom" => Ok(plot::LegendPos::OutBottom),
            "out-left" => Ok(plot::LegendPos::OutLeft),
            "in-top-left" => Ok(plot::LegendPos::InTopLeft),
            "in-top" => Ok(plot::LegendPos::InTop),
            "in-top-right" => Ok(plot::LegendPos::InTopRight),
            "in-right" => Ok(plot::LegendPos::InRight),
            "in-bottom-right" => Ok(plot::LegendPos::InBottomRight),
            "in-bottom" => Ok(plot::LegendPos::InBottom),
            "in-bottom-left" => Ok(plot::LegendPos::InBottomLeft),
            "in-left" => Ok(plot::LegendPos::InLeft),
            _ => Err(serde::de::Error::unknown_variant(
                s.as_ref(),
                &[
                    "out-top", "out-right", "out-bottom", "out-left",
                    "in-top-left", "in-top", "in-top-right", "in-right",
                    "in-bottom-right", "in-bottom", "in-bottom-left", "in-left",
                ],
            )),
        }
    }
}

// MARK: Legend

impl<P> serde::Serialize for Legend<P>
where
    P: serde::Serialize + Copy,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let font_default = self.font() == &legend::EntryFont::default();
        let fill_default = self.fill() == defaults::legend_fill().as_ref();
        let border_default = self.border() == Some(&theme::Col::LegendBorder.into());
        let columns_default = self.columns().is_none();
        let padding_default = self.padding() == defaults::LEGEND_PADDING.into();
        let margin_default = self.margin() == defaults::LEGEND_MARGIN;
        let spacing_default = self.spacing()
            == geom::Size::new(defaults::LEGEND_H_SPACING, defaults::LEGEND_V_SPACING);

        if font_default
            && fill_default
            && border_default
            && columns_default
            && padding_default
            && margin_default
            && spacing_default
        {
            self.pos().serialize(serializer)
        } else {
            let mut state = serializer.serialize_struct("Legend", 2)?;
            state.serialize_field("pos", &self.pos())?;
            if !font_default {
                todo!("Serialize legend::EntryFont")
            }
            if !fill_default {
                state.serialize_field("fill", &self.fill())?;
            }
            if !border_default {
                state.serialize_field("border", &self.border())?;
            }
            if !columns_default {
                state.serialize_field("columns", &self.columns())?;
            }
            if !padding_default {
                todo!("Serialize geom::Padding")
            }
            if !margin_default {
                state.serialize_field("margin", &self.margin())?;
            }
            if !spacing_default {
                state.serialize_field("spacing", &self.spacing())?;
            }
            state.end()
        }
    }
}

impl<'de, P> serde::de::Deserialize<'de> for Legend<P>
where
    P: serde::de::Deserialize<'de> + Default,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::de::Deserializer<'de>,
    {
        deserializer.deserialize_any(LegendVisitor {
            marker: std::marker::PhantomData,
        })
    }
}

struct LegendVisitor<P> {
    marker: std::marker::PhantomData<P>,
}

impl<'de, P> serde::de::Visitor<'de> for LegendVisitor<P>
where
    P: serde::de::Deserialize<'de> + Default,
{
    type Value = Legend<P>;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a legend position or a legend object")
    }

    fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        let deserializer = serde::de::value::StrDeserializer::<E>::new(v);
        if let Ok(pos) = P::deserialize(deserializer) {
            return Ok(Legend::<P>::new(pos));
        }
        Err(serde::de::Error::custom(format!(
            "invalid legend position: {}",
            v
        )))
    }

    fn visit_map<M>(self, mut map: M) -> Result<Self::Value, M::Error>
    where
        M: serde::de::MapAccess<'de>,
    {
        let mut legend = Legend::<P>::default();
        while let Some(key) = map.next_key::<Cow<'de, str>>()? {
            match &*key {
                "pos" => legend = legend.with_pos(map.next_value()?),
                "font" => todo!("Deserialize legend::EntryFont"),
                "fill" => legend = legend.with_fill(map.next_value()?),
                "border" => legend = legend.with_border(map.next_value()?),
                "columns" => legend = legend.with_columns(map.next_value()?),
                "padding" => todo!("Deserialize geom::Padding"),
                "margin" => legend = legend.with_margin(map.next_value()?),
                "spacing" => legend = legend.with_spacing(map.next_value()?),
                _ => return Err(serde::de::Error::unknown_field(&key, &["pos", "font", "fill", "border", "columns", "padding", "margin", "spacing"])),
            }
        }
        Ok(legend)
    }
}
