use serde::ser::{SerializeSeq, SerializeStruct};

use crate::des::axis;

pub struct OrientedAxis<'a> {
    pub axis: &'a axis::Axis,
    pub horizontal: bool,
}

impl OrientedAxis<'_> {
    fn side_str(&self) -> &'static str {
        use axis::Side;
        match (self.axis.side(), self.horizontal) {
            (Side::Main, false) => "left",
            (Side::Main, true) => "bottom",
            (Side::Opposite, false) => "right",
            (Side::Opposite, true) => "top",
        }
    }
}

pub struct OrientedAxes<'a> {
    pub axes: &'a [axis::Axis],
    pub horizontal: bool,
}

impl<'a> serde::Serialize for OrientedAxes<'a> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_seq(Some(self.axes.len()))?;

        for axis in self.axes {
            let oriented_axis = OrientedAxis {
                axis,
                horizontal: self.horizontal,
            };
            state.serialize_element(&oriented_axis)?;
        }

        state.end()
    }
}

impl<'a> serde::Serialize for OrientedAxis<'a> {
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