use std::marker::PhantomData;

use serde::ser::{SerializeSeq, SerializeStruct};

use crate::des::axis;
use crate::des::sd::deserialize_map_fields;

// MARK: axis::Title

impl serde::Serialize for axis::Title {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        if self.spans().is_empty() && self.props() == &axis::TitleProps::default() {
            self.text().serialize(serializer)
        } else {
            let mut state = serializer.serialize_struct("Title", 2)?;
            state.serialize_field("text", self.text())?;
            todo!("Serialize rich props and spans")
            //state.end()
        }
    }
}

impl<'de> serde::Deserialize<'de> for axis::Title {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct TitleVisitor;

        impl<'de> serde::de::Visitor<'de> for TitleVisitor {
            type Value = axis::Title;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("an axis title string or rich text")
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(axis::Title::from(value.to_string()))
            }

            fn visit_map<A>(self, _map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                todo!("Deserialize rich title with props and spans")
            }
        }
        deserializer.deserialize_any(TitleVisitor)
    }
}


// MARK: Axis

#[derive(Debug, Clone, Copy)]
pub enum Dir {
    X,
    Y,
    Unknown,
}

pub struct SerAxis<'a> {
    pub axis: &'a axis::Axis,
    pub dir: Dir,
}

impl SerAxis<'_> {
    fn side_str(&self) -> &'static str {
        use axis::Side;
        match (self.axis.side(), &self.dir) {
            (Side::Main, Dir::Y) => "left",
            (Side::Main, Dir::X) => "bottom",
            (Side::Main, Dir::Unknown) => "main",
            (Side::Opposite, Dir::Y) => "right",
            (Side::Opposite, Dir::X) => "top",
            (Side::Opposite, Dir::Unknown) => "opposite",
        }
    }
}

pub struct SerAxes<'a> {
    pub axes: &'a [axis::Axis],
    pub dir: Dir,
}

impl<'a> serde::Serialize for SerAxes<'a> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_seq(Some(self.axes.len()))?;

        for axis in self.axes {
            let axis = SerAxis {
                axis,
                dir: self.dir,
            };
            state.serialize_element(&axis)?;
        }

        state.end()
    }
}

impl<'a> serde::Serialize for SerAxis<'a> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("Axis", 3)?;

        if let Some(id) = self.axis.id() {
            state.serialize_field("id", id)?;
        }

        if let Some(title) = self.axis.title() {
            state.serialize_field("title", title)?;
        }

        if self.axis.side() != axis::Side::default() {
            let side_str = self.side_str();
            state.serialize_field("side", side_str)?;
        }

        state.end()
    }
}

impl serde::Serialize for axis::Axis {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let axis = SerAxis {
            axis: self,
            dir: Dir::Unknown,
        };
        axis.serialize(serializer)
    }
}

trait DeDir {
    fn dir() -> Dir;
}

pub struct DeX;
pub struct DeY;
struct DeUnknown;

impl DeDir for DeX {
    fn dir() -> Dir {
        Dir::X
    }
}

impl DeDir for DeY {
    fn dir() -> Dir {
        Dir::Y
    }
}

impl DeDir for DeUnknown {
    fn dir() -> Dir {
        Dir::Unknown
    }
}

pub type DeXAxis = DeAxis<DeX>;
pub type DeYAxis = DeAxis<DeY>;

pub struct DeAxis<Dr> {
    pub axis: axis::Axis,
    phantom: PhantomData<Dr>,
}

impl<'de, Dr> serde::Deserialize<'de> for DeAxis<Dr>
where
    Dr: DeDir,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(AxisVisitor {
            phantom: PhantomData,
        })
    }
}

impl<'de> serde::Deserialize<'de> for axis::Axis {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let axis = deserializer.deserialize_map(AxisVisitor {
            phantom: PhantomData::<DeUnknown>,
        })?;
        Ok(axis.axis)
    }
}

struct AxisVisitor<Dr> {
    phantom: PhantomData<Dr>,
}

impl<'de, Dr> serde::de::Visitor<'de> for AxisVisitor<Dr>
where
    Dr: DeDir,
{
    type Value = DeAxis<Dr>;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("an axis object")
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        deserialize_map_fields!(
            'de, map,
            "id" => id: Option<String>,
            "title" => title: Option<axis::Title>,
            "side" => side: Option<String>,
        );

        let side = match (side.as_deref(), Dr::dir()) {
            (Some("main"), _) => axis::Side::Main,
            (Some("opposite"), _) => axis::Side::Opposite,
            (Some("bottom"), Dir::X) => axis::Side::Main,
            (Some("top"), Dir::X) => axis::Side::Opposite,
            (Some("left"), Dir::Y) => axis::Side::Main,
            (Some("right"), Dir::Y) => axis::Side::Opposite,
            (Some("bottom") | Some("top"), Dir::Y) => {
                return Err(serde::de::Error::custom(format!(
                    "Invalid side '{}' for y-axis",
                    side.unwrap()
                )));
            }
            (Some("left") | Some("right"), Dir::X) => {
                return Err(serde::de::Error::custom(format!(
                    "Invalid side '{}' for x-axis",
                    side.unwrap()
                )));
            }
            (Some(other), _) => {
                return Err(serde::de::Error::custom(format!(
                    "Invalid side '{}'",
                    other
                )));
            }
            (None, _) => axis::Side::default(),
        };

        let mut axis = axis::Axis::new();
        if let Some(id) = id {
            axis = axis.with_id(id);
        }
        if let Some(title) = title {
            axis = axis.with_title(title);
        }
        if side == axis::Side::Opposite {
            axis = axis.with_opposite_side();
        }

        Ok(DeAxis {
            axis,
            phantom: PhantomData,
        })
    }
}
