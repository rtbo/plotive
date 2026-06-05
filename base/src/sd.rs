use std::borrow::Cow;
use std::collections::HashMap;
use std::sync::LazyLock;

use serde::{Deserialize, Serialize};

use crate::color::{css4, xkcd};
use crate::{Rgb8, Rgba8, geom};

static INVERSE_COLOR_MAP: LazyLock<HashMap<Rgba8, &'static str>> = LazyLock::new(|| {
    let mut map = HashMap::with_capacity(xkcd::COLORS.len() + css4::COLORS.len());
    map.extend(xkcd::COLORS.iter().map(|(name, rgba)| (*rgba, *name)));
    map.extend(css4::COLORS.iter().map(|(name, rgba)| (*rgba, *name)));
    map
});

impl Serialize for Rgba8 {
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

impl<'de> Deserialize<'de> for Rgba8 {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let s: Cow<'de, str> = Deserialize::deserialize(deserializer)?;
        s.parse().map_err(serde::de::Error::custom)
    }
}

impl Serialize for Rgb8 {
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

impl<'de> Deserialize<'de> for Rgb8 {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let s: Cow<'de, str> = Deserialize::deserialize(deserializer)?;
        s.parse().map_err(serde::de::Error::custom)
    }
}

impl Serialize for geom::Size {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        (self.width(), self.height()).serialize(serializer)
    }
}

impl<'de> Deserialize<'de> for geom::Size {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let (width, height) = <(f32, f32)>::deserialize(deserializer)?;
        Ok(Self::new(width, height))
    }
}

impl Serialize for geom::Padding {
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

impl<'de> Deserialize<'de> for geom::Padding {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct PaddingVisitor;

        impl<'de> serde::de::Visitor<'de> for PaddingVisitor {
            type Value = geom::Padding;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a single float for even padding, a tuple of two floats for center padding, or a tuple of four floats for custom padding")
            }

            fn visit_f32<E>(self, value: f32) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(geom::Padding::Even(value))
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::SeqAccess<'de>,
            {
                let first = seq.next_element::<f32>()?;
                let second = seq.next_element::<f32>()?;
                let third = seq.next_element::<f32>()?;
                let fourth = seq.next_element::<f32>()?;

                match (first, second, third, fourth) {
                    (Some(even), None, None, None) => Ok(geom::Padding::Even(even)),
                    (Some(ver), Some(hor), None, None) => Ok(geom::Padding::Center { ver, hor }),
                    (Some(top), Some(right), Some(bottom), Some(left)) => {
                        Ok(geom::Padding::Custom {
                            top,
                            right,
                            bottom,
                            left,
                        })
                    }
                    _ => Err(serde::de::Error::custom(
                        "Expected either a single float for even padding, a tuple of two floats for center padding, or a tuple of four floats for custom padding",
                    )),
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
                                &["even", "ver", "hor", "top", "right", "bottom", "left"],
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
