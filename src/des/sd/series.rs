use serde::ser::SerializeStruct;

use crate::{data, des::{Series, axis, series}, style};


impl serde::Serialize for Series {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            Series::Line(line) => line.serialize(serializer),
            _ => todo!("Serialize other series types"),
        }
    }
}

impl serde::Serialize for series::DataCol {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            series::DataCol::SrcRef(src_ref) => src_ref.serialize(serializer),
            series::DataCol::Inline(data::VecColumn::F64(vec)) => vec.serialize(serializer),
            series::DataCol::Inline(data::VecColumn::I64(vec)) => vec.serialize(serializer),
            series::DataCol::Inline(data::VecColumn::Str(vec)) => vec.serialize(serializer),
            #[cfg(feature = "time")]
            series::DataCol::Inline(data::VecColumn::Time(vec)) => vec.serialize(serializer),
            #[cfg(feature = "time")]
            series::DataCol::Inline(data::VecColumn::TimeDelta(vec)) => vec.serialize(serializer),
        }
    }
}

impl serde::Serialize for axis::Ref {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            axis::Ref::Id(id) => serializer.serialize_str(id),
            axis::Ref::Idx(idx) => serializer.serialize_u32(*idx as _),
        }
    }
}

impl serde::Serialize for series::Interpolation {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let s = match self {
            series::Interpolation::Linear => "linear",
            series::Interpolation::StepEarly => "step-early",
            series::Interpolation::StepMiddle => "step-middle",
            series::Interpolation::StepLate => "step-late",
            series::Interpolation::Spline => "spline",
        };
        serializer.serialize_str(s)
    }
}

impl serde::Serialize for series::Line {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("LineSeries", 6)?;
        state.serialize_field("type", "line")?;
        state.serialize_field("x", self.x_data())?;
        state.serialize_field("y", self.y_data())?;

        if let Some(name) = self.name() {
            state.serialize_field("name", name)?;
        }

        if self.x_axis() != &axis::Ref::default() {
            state.serialize_field("x_axis", self.x_axis())?;
        }

        if self.y_axis() != &axis::Ref::default() {
            state.serialize_field("y_axis", self.y_axis())?;
        }

        if self.stroke() != &style::series::Stroke::default() {
            state.serialize_field("stroke", self.stroke())?;
        }

        if let Some(marker) = self.marker() {
            state.serialize_field("marker", marker)?;
        }

        if self.interpolation() != series::Interpolation::default() {
            state.serialize_field("interpolation", &self.interpolation())?;
        }

        state.end()
    }
}

