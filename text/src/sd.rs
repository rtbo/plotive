use std::borrow::Cow;

use serde::de::Error;
use serde::ser::{SerializeMap, SerializeSeq};

use crate::font;

impl serde::Serialize for font::Family {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let name = match self {
            font::Family::SansSerif => "sans-serif",
            font::Family::Serif => "serif",
            font::Family::Monospace => "monospace",
            font::Family::Cursive => "cursive",
            font::Family::Fantasy => "fantasy",
            font::Family::Named(name) => name.as_str(),
        };
        name.serialize(serializer)
    }
}

impl<'de> serde::Deserialize<'de> for font::Family {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let name: Cow<'de, str> = serde::Deserialize::deserialize(deserializer)?;
        Ok(match name.as_ref() {
            "sans-serif" => font::Family::SansSerif,
            "serif" => font::Family::Serif,
            "monospace" => font::Family::Monospace,
            "cursive" => font::Family::Cursive,
            "fantasy" => font::Family::Fantasy,
            _ => font::Family::Named(name.into_owned()),
        })
    }
}

impl serde::Serialize for font::Weight {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self.0 {
            100 => return serializer.serialize_str("thin"),
            200 => return serializer.serialize_str("extra-light"),
            300 => return serializer.serialize_str("light"),
            400 => return serializer.serialize_str("normal"),
            500 => return serializer.serialize_str("medium"),
            600 => return serializer.serialize_str("semi-bold"),
            700 => return serializer.serialize_str("bold"),
            800 => return serializer.serialize_str("extra-bold"),
            900 => return serializer.serialize_str("black"),
            _ => self.0.serialize(serializer),
        }
    }
}

impl<'de> serde::de::Deserialize<'de> for font::Weight {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct Visitor;
        impl<'de> serde::de::Visitor<'de> for Visitor {
            type Value = font::Weight;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a string or number representing a font weight")
            }

            fn visit_i64<E>(self, value: i64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                if value <= 0 {
                    return Err(E::custom(format!(
                        "Font weight must be a positive integer, got: {}",
                        value
                    )));
                }
                if value > 1000 {
                    return Err(E::custom(format!(
                        "Font weight must be <= 1000, got: {}",
                        value
                    )));
                }
                Ok(font::Weight(value as u16))
            }

            fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                self.visit_i64(value as i64)
            }

            fn visit_f64<E>(self, value: f64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                self.visit_i64(value as i64)
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                value.parse::<font::Weight>().map_err(|err| {
                    E::custom(format!(
                        "Invalid font weight string: {}. Error: {}",
                        value, err
                    ))
                })
            }
        }

        deserializer.deserialize_any(Visitor)
    }
}

impl serde::Serialize for font::Style {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            font::Style::Normal => serializer.serialize_str("normal"),
            font::Style::Italic => serializer.serialize_str("italic"),
            font::Style::Oblique => serializer.serialize_str("oblique"),
        }
    }
}

impl<'de> serde::de::Deserialize<'de> for font::Style {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct Visitor;

        impl<'de> serde::de::Visitor<'de> for Visitor {
            type Value = font::Style;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a string representing a font style")
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                match value {
                    "normal" => Ok(font::Style::Normal),
                    "italic" => Ok(font::Style::Italic),
                    "oblique" => Ok(font::Style::Oblique),
                    _ => Err(E::custom(format!("Invalid font style string: {}", value))),
                }
            }
        }

        deserializer.deserialize_str(Visitor)
    }
}

impl serde::Serialize for font::Width {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            font::Width::UltraCondensed => serializer.serialize_str("ultra-condensed"),
            font::Width::ExtraCondensed => serializer.serialize_str("extra-condensed"),
            font::Width::Condensed => serializer.serialize_str("condensed"),
            font::Width::SemiCondensed => serializer.serialize_str("semi-condensed"),
            font::Width::Normal => serializer.serialize_str("normal"),
            font::Width::SemiExpanded => serializer.serialize_str("semi-expanded"),
            font::Width::Expanded => serializer.serialize_str("expanded"),
            font::Width::ExtraExpanded => serializer.serialize_str("extra-expanded"),
            font::Width::UltraExpanded => serializer.serialize_str("ultra-expanded"),
        }
    }
}

impl<'de> serde::de::Deserialize<'de> for font::Width {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct Visitor;

        impl<'de> serde::de::Visitor<'de> for Visitor {
            type Value = font::Width;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a string representing a font width")
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                match value {
                    "ultra-condensed" => Ok(font::Width::UltraCondensed),
                    "extra-condensed" => Ok(font::Width::ExtraCondensed),
                    "condensed" => Ok(font::Width::Condensed),
                    "semi-condensed" => Ok(font::Width::SemiCondensed),
                    "normal" => Ok(font::Width::Normal),
                    "semi-expanded" => Ok(font::Width::SemiExpanded),
                    "expanded" => Ok(font::Width::Expanded),
                    "extra-expanded" => Ok(font::Width::ExtraExpanded),
                    "ultra-expanded" => Ok(font::Width::UltraExpanded),
                    _ => Err(E::custom(format!("Invalid font width string: {}", value))),
                }
            }
        }

        deserializer.deserialize_str(Visitor)
    }
}

struct Outline<C>(C, f32);

impl<C> serde::Serialize for Outline<C>
where
    C: serde::Serialize,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_seq(Some(2))?;
        state.serialize_element(&self.0)?;
        state.serialize_element(&self.1)?;
        state.end()
    }
}

impl<C> serde::Serialize for crate::rich::ClassProps<C>
where
    C: serde::Serialize + Copy + Clone,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_map(None)?;
        if let Some(families) = &self.font_family {
            let family_str = crate::font::font_families_to_string(families);
            state.serialize_entry("fontFamily", &family_str)?;
        }
        if let Some(weight) = &self.font_weight {
            state.serialize_entry("fontWeight", weight)?;
        }
        if let Some(width) = &self.font_width {
            state.serialize_entry("fontWidth", width)?;
        }
        if let Some(style) = &self.font_style {
            state.serialize_entry("fontStyle", style)?;
        }
        if let Some(size) = &self.font_size {
            state.serialize_entry("fontSize", size)?;
        }
        if let Some(color) = &self.color {
            state.serialize_entry("color", color)?;
        }
        if let Some((outline, width)) = &self.outline {
            state.serialize_entry("outline", &Outline(outline, *width))?;
        }
        if let Some(underline) = &self.underline {
            state.serialize_entry("underline", underline)?;
        }
        if let Some(strikeout) = &self.strikeout {
            state.serialize_entry("strikeout", strikeout)?;
        }
        state.end()
    }
}

impl<'de, C> serde::de::Deserialize<'de> for crate::rich::ClassProps<C>
where
    C: serde::de::Deserialize<'de> + Copy + Clone,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct Visitor<C>(std::marker::PhantomData<C>);

        impl<'de, C> serde::de::Visitor<'de> for Visitor<C>
        where
            C: serde::de::Deserialize<'de> + Copy + Clone,
        {
            type Value = crate::rich::ClassProps<C>;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a map representing ClassProps")
            }

            fn visit_map<M>(self, mut map: M) -> Result<Self::Value, M::Error>
            where
                M: serde::de::MapAccess<'de>,
                M::Error: serde::de::Error,
            {
                let mut props = crate::rich::ClassProps::<C>::default();
                while let Some(key) = map.next_key::<String>()? {
                    match key.as_str() {
                        "fontFamily" => {
                            let family_str: String = map.next_value()?;
                            let value = font::parse_font_families(&family_str).map_err(|err| {
                                M::Error::custom(format!(
                                    "Invalid font family string: {}. Error: {}",
                                    family_str, err
                                ))
                            })?;
                            props.font_family = Some(value);
                        }
                        "fontWeight" => {
                            let value: font::Weight = map.next_value()?;
                            props.font_weight = Some(value);
                        }
                        "fontWidth" => {
                            let value: font::Width = map.next_value()?;
                            props.font_width = Some(value);
                        }
                        "fontStyle" => {
                            let value: font::Style = map.next_value()?;
                            props.font_style = Some(value);
                        }
                        "fontSize" => {
                            let value: f32 = map.next_value()?;
                            props.font_size = Some(value);
                        }
                        "color" => {
                            let value: C = map.next_value()?;
                            props.color = Some(value);
                        }
                        "outline" => {
                            let (outline, width): (C, f32) = map.next_value()?;
                            props.outline = Some((outline, width));
                        }
                        "underline" => {
                            let value: bool = map.next_value()?;
                            props.underline = Some(value);
                        }
                        "strikeout" => {
                            let value: bool = map.next_value()?;
                            props.strikeout = Some(value);
                        }
                        other => {
                            return Err(M::Error::unknown_field(
                                other,
                                &[
                                    "fontFamily",
                                    "fontWeight",
                                    "fontWidth",
                                    "fontStyle",
                                    "fontSize",
                                    "color",
                                    "outline",
                                    "underline",
                                    "strikeout",
                                ],
                            ));
                        }
                    }
                }
                Ok(props)
            }
        }

        deserializer.deserialize_map(Visitor::<C>(std::marker::PhantomData))
    }
}
