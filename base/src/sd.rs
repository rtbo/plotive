use std::collections::HashMap;
use std::sync::LazyLock;

use serde::Serialize;
use serde::ser::SerializeTuple;

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

impl Serialize for geom::Size {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_tuple(2)?;
        state.serialize_element(&self.width())?;
        state.serialize_element(&self.height())?;
        state.end()
    }
}
