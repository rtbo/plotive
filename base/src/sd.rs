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
