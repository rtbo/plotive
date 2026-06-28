use std::borrow::Cow;
use std::collections::HashMap;
use std::fmt;
use std::sync::LazyLock;

use crate::color::{css4, xkcd};
use crate::geom::{Padding, Size};
use crate::{Rgb8, Rgba8, geom};

static INVERSE_COLOR_MAP: LazyLock<HashMap<Rgba8, &'static str>> = LazyLock::new(|| {
    let mut map = HashMap::with_capacity(xkcd::COLORS.len() + css4::COLORS.len());
    map.extend(xkcd::COLORS.iter().map(|(name, rgba)| (*rgba, *name)));
    map.extend(css4::COLORS.iter().map(|(name, rgba)| (*rgba, *name)));
    map
});

impl serde::Serialize for Rgb8 {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        if let Some(name) = INVERSE_COLOR_MAP.get(&self.opaque()) {
            name.serialize(serializer)
        } else {
            self.html().serialize(serializer)
        }
    }
}

impl serde::Serialize for Rgba8 {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        if let Some(name) = INVERSE_COLOR_MAP.get(self) {
            name.serialize(serializer)
        } else {
            self.html().serialize(serializer)
        }
    }
}
struct ColorSeqVisitor;

impl<'de> serde::de::Visitor<'de> for ColorSeqVisitor {
    type Value = Vec<u8>;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("a color string or an RGB/RGBA tuple")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        let rgba = value.parse::<Rgba8>().map_err(E::custom)?;
        Ok(vec![rgba.r(), rgba.g(), rgba.b(), rgba.a()])
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let mut values = Vec::with_capacity(seq.size_hint().unwrap_or(4));
        while let Some(v) = seq.next_element::<u8>()? {
            values.push(v);
        }
        match values.len() {
            3 | 4 => Ok(values),
            len => Err(serde::de::Error::invalid_length(len, &self)),
        }
    }
}

impl<'de> serde::Deserialize<'de> for Rgb8 {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let values = deserializer.deserialize_any(ColorSeqVisitor)?;
        match values.as_slice() {
            [r, g, b] => Ok(Rgb8::new(*r, *g, *b)),
            [r, g, b, a] if *a == 255 => Ok(Rgb8::new(*r, *g, *b)),
            [..] => Err(serde::de::Error::custom(
                "RGB colors cannot include a non-opaque alpha component",
            )),
        }
    }
}

impl<'de> serde::Deserialize<'de> for Rgba8 {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let values = deserializer.deserialize_any(ColorSeqVisitor)?;
        match values.as_slice() {
            [r, g, b] => Ok(Rgba8::new(*r, *g, *b, 255)),
            [r, g, b, a] => Ok(Rgba8::new(*r, *g, *b, *a)),
            _ => unreachable!(),
        }
    }
}

impl serde::Serialize for geom::Size {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        (self.width(), self.height()).serialize(serializer)
    }
}

impl<'de> serde::Deserialize<'de> for geom::Size {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct SizeVisitor;

        impl<'de> serde::de::Visitor<'de> for SizeVisitor {
            type Value = Size;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a [width, height] tuple or an object { width, height }")
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::SeqAccess<'de>,
            {
                let width = seq
                    .next_element::<f32>()?
                    .ok_or_else(|| serde::de::Error::invalid_length(0, &self))?;
                let height = seq
                    .next_element::<f32>()?
                    .ok_or_else(|| serde::de::Error::invalid_length(1, &self))?;
                Ok(Size::new(width, height))
            }

            fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                let mut width = None::<f32>;
                let mut height = None::<f32>;

                while let Some(key) = map.next_key::<std::borrow::Cow<'de, str>>()? {
                    match key.as_ref() {
                        "width" => {
                            if width.is_some() {
                                let _: f32 = map.next_value()?;
                                return Err(serde::de::Error::duplicate_field("width"));
                            }
                            width = Some(map.next_value()?);
                        }
                        "height" => {
                            if height.is_some() {
                                let _: f32 = map.next_value()?;
                                return Err(serde::de::Error::duplicate_field("height"));
                            }
                            height = Some(map.next_value()?);
                        }
                        _ => {
                            return Err(serde::de::Error::unknown_field(
                                key.as_ref(),
                                &["width", "height"],
                            ));
                        }
                    }
                }

                Ok(Size::new(
                    width.ok_or_else(|| serde::de::Error::missing_field("width"))?,
                    height.ok_or_else(|| serde::de::Error::missing_field("height"))?,
                ))
            }
        }

        deserializer.deserialize_any(SizeVisitor)
    }
}

impl serde::Serialize for geom::Padding {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            geom::Padding::Even(p) => p.serialize(serializer),
            geom::Padding::Center { ver, hor } => (ver, hor).serialize(serializer),
            geom::Padding::Custom {
                top,
                right,
                bottom,
                left,
            } => (top, right, bottom, left).serialize(serializer),
        }
    }
}

impl<'de> serde::Deserialize<'de> for Padding {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct PaddingVisitor;

        impl<'de> serde::de::Visitor<'de> for PaddingVisitor {
            type Value = Padding;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a single float for even padding, a tuple of two floats for center padding, or a tuple of four floats for custom padding")
            }

            fn visit_i64<E>(self, value: i64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(Padding::Even(value as f32))
            }

            fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(Padding::Even(value as f32))
            }

            fn visit_f32<E>(self, value: f32) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(Padding::Even(value))
            }

            fn visit_f64<E>(self, value: f64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(Padding::Even(value as f32))
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::SeqAccess<'de>,
            {
                let first = seq
                    .next_element::<f32>()?
                    .ok_or_else(|| serde::de::Error::invalid_length(0, &self))?;
                let second = seq
                    .next_element::<f32>()?
                    .ok_or_else(|| serde::de::Error::invalid_length(1, &self))?;

                if let Some(third) = seq.next_element::<f32>()? {
                    let fourth = seq
                        .next_element::<f32>()?
                        .ok_or_else(|| serde::de::Error::invalid_length(3, &self))?;
                    Ok(Padding::Custom {
                        top: first,
                        right: second,
                        bottom: third,
                        left: fourth,
                    })
                } else {
                    Ok(Padding::Center {
                        ver: first,
                        hor: second,
                    })
                }
            }

            fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                let mut ver = None::<f32>;
                let mut hor = None::<f32>;
                let mut top = None::<f32>;
                let mut right = None::<f32>;
                let mut bottom = None::<f32>;
                let mut left = None::<f32>;

                while let Some(field) = map.next_key::<Cow<'de, str>>()? {
                    match &*field {
                        "ver" => {
                            ver = Some(map.next_value()?);
                        }
                        "hor" => {
                            hor = Some(map.next_value()?);
                        }
                        "top" => top = Some(map.next_value()?),
                        "right" => right = Some(map.next_value()?),
                        "bottom" => bottom = Some(map.next_value()?),
                        "left" => left = Some(map.next_value()?),
                        _ => {
                            return Err(serde::de::Error::unknown_field(
                                &field,
                                &["ver", "hor", "top", "right", "bottom", "left"],
                            ));
                        }
                    }
                }

                match (ver, hor, top, right, bottom, left) {
                    (Some(ver), Some(hor), None, None, None, None) => {
                        Ok(geom::Padding::Center { ver, hor })
                    }
                    (None, None, Some(top), Some(right), Some(bottom), Some(left)) => {
                        Ok(geom::Padding::Custom {
                            top,
                            right,
                            bottom,
                            left,
                        })
                    }
                    _ => Err(serde::de::Error::custom(
                        "Expected either a tuple of two floats for center padding or a tuple of four floats for custom padding",
                    )),
                }
            }
        }

        deserializer.deserialize_any(PaddingVisitor)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_color_ser() {
        let color = Rgba8::new(255, 0, 0, 255);
        let serialized = serde_json::to_string(&color).unwrap();
        assert_eq!(serialized, "\"red\"");

        let color = "antiquewhite".parse::<Rgba8>().unwrap();
        let serialized = serde_json::to_string(&color).unwrap();
        assert_eq!(serialized, "\"antiquewhite\"");

        let color = Rgba8::new(0x12, 0x34, 0x56, 0xff);
        let serialized = serde_json::to_string(&color).unwrap();
        assert_eq!(serialized, "\"#123456\"");

        let color = Rgba8::new(0x12, 0x34, 0x56, 0);
        let serialized = serde_json::to_string(&color).unwrap();
        assert_eq!(serialized, "\"rgba(18, 52, 86, 0)\"");
    }

    #[test]
    fn test_color_deser() {
        let json = "\"red\"";
        let deserialized: Rgba8 = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Rgba8::new(255, 0, 0, 255));

        let json = "\"#123456\"";
        let deserialized: Rgba8 = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Rgba8::new(0x12, 0x34, 0x56, 255));

        let json = "\"rgba(18, 52, 86, 0)\"";
        let deserialized: Rgba8 = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Rgba8::new(0x12, 0x34, 0x56, 0));

        let json = "[18, 52, 86]";
        let deserialized: Rgba8 = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Rgba8::new(0x12, 0x34, 0x56, 255));
    }

    #[test]
    fn test_size_ser() {
        let size = Size::new(100.0, 200.0);
        let serialized = serde_json::to_string(&size).unwrap();
        assert_eq!(serialized, "[100.0,200.0]");
    }

    #[test]
    fn test_size_deser() {
        let json = "[100.0, 200.0]";
        let deserialized: Size = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Size::new(100.0, 200.0));
        let json = r#"{"width": 100.0, "height": 200.0}"#;
        let deserialized: Size = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Size::new(100.0, 200.0));
    }

    #[test]
    fn test_padding_ser() {
        let tests = vec![
            (Padding::Even(10.0), "10.0"),
            (
                Padding::Center {
                    ver: 5.0,
                    hor: 15.0,
                },
                "[5.0,15.0]",
            ),
            (
                Padding::Custom {
                    top: 1.0,
                    right: 2.0,
                    bottom: 3.0,
                    left: 4.0,
                },
                "[1.0,2.0,3.0,4.0]",
            ),
        ];
        for (padding, expected) in tests {
            let serialized = serde_json::to_string(&padding).unwrap();
            assert_eq!(serialized, expected);
        }
    }

    #[test]
    fn test_padding_deser() {
        let tests = vec![
            ("10.0", Padding::Even(10.0)),
            (
                "[5.0, 15.0]",
                Padding::Center {
                    ver: 5.0,
                    hor: 15.0,
                },
            ),
            (
                "[1.0, 2.0, 3.0, 4.0]",
                Padding::Custom {
                    top: 1.0,
                    right: 2.0,
                    bottom: 3.0,
                    left: 4.0,
                },
            ),
            (
                r#"{"ver": 5.0, "hor": 15.0}"#,
                Padding::Center {
                    ver: 5.0,
                    hor: 15.0,
                },
            ),
            (
                r#"{"top": 1.0, "right": 2.0, "bottom": 3.0, "left": 4.0}"#,
                Padding::Custom {
                    top: 1.0,
                    right: 2.0,
                    bottom: 3.0,
                    left: 4.0,
                },
            ),
        ];
        for (json, expected) in tests {
            let deserialized: Padding = serde_json::from_str(json).unwrap();
            assert_eq!(deserialized, expected);
        }
    }
}
