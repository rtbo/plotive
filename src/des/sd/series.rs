use std::borrow::Cow;

use serde::de::MapAccess;
use serde::ser::SerializeStruct;
use serde_value::Value;

use crate::des::{Series, axis, series};
#[cfg(feature = "time")]
use crate::time;
use crate::{data, style};

// MARK: series::DataCol

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

impl<'de> serde::Deserialize<'de> for series::DataCol {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(DataColVisitor)
    }
}

struct DataColVisitor;

impl<'de> serde::de::Visitor<'de> for DataColVisitor {
    type Value = series::DataCol;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a data source reference string or an inline data sequence")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(series::DataCol::SrcRef(value.to_string()))
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let size_hint = seq.size_hint().unwrap_or(0);

        let first_f64 = seq.next_element::<f64>();
        match first_f64 {
            Ok(None) => {
                // For empty sequence, we assume empty f64 column.
                Ok(series::DataCol::Inline(data::VecColumn::F64(Vec::new())))
            }
            Ok(Some(first)) => {
                let mut vec = Vec::with_capacity(size_hint);
                vec.push(first);
                while let Some(value) = seq.next_element::<f64>()? {
                    vec.push(value);
                }
                Ok(series::DataCol::Inline(data::VecColumn::F64(vec)))
            }
            Err(_) => {
                if let Some(first) = seq.next_element::<Option<i64>>()? {
                    let mut vec = Vec::with_capacity(size_hint);
                    vec.push(first);
                    while let Some(value) = seq.next_element::<Option<i64>>()? {
                        vec.push(value);
                    }
                    Ok(series::DataCol::Inline(data::VecColumn::I64(vec)))
                } else if let Some(first) = seq.next_element::<Option<String>>()? {
                    let mut vec = Vec::with_capacity(size_hint);
                    vec.push(first);
                    while let Some(value) = seq.next_element::<Option<String>>()? {
                        vec.push(value);
                    }
                    Ok(series::DataCol::Inline(data::VecColumn::Str(vec)))
                } else {
                    #[cfg(feature = "time")]
                    {
                        // FIXME: handle nulls
                        if let Some(first) = seq.next_element::<time::DateTime>()? {
                            let mut vec = Vec::with_capacity(size_hint);
                            vec.push(Some(first));
                            while let Some(value) = seq.next_element::<time::DateTime>()? {
                                vec.push(Some(value));
                            }
                            return Ok(series::DataCol::Inline(data::VecColumn::Time(vec)));
                        } else if let Some(first) = seq.next_element::<time::TimeDelta>()? {
                            let mut vec = Vec::with_capacity(size_hint);
                            vec.push(Some(first));
                            while let Some(value) = seq.next_element::<time::TimeDelta>()? {
                                vec.push(Some(value));
                            }
                            return Ok(series::DataCol::Inline(data::VecColumn::TimeDelta(vec)));
                        }
                    }
                    Err(serde::de::Error::custom("unsupported data column type"))
                }
            }
        }
    }
}

// MARK: series::Interpolation

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

impl<'de> serde::Deserialize<'de> for series::Interpolation {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let s: Cow<'de, str> = serde::Deserialize::deserialize(deserializer)?;
        match &*s {
            "linear" => Ok(series::Interpolation::Linear),
            "step-early" => Ok(series::Interpolation::StepEarly),
            "step-middle" => Ok(series::Interpolation::StepMiddle),
            "step-late" => Ok(series::Interpolation::StepLate),
            "spline" => Ok(series::Interpolation::Spline),
            _ => Err(serde::de::Error::unknown_variant(
                &s,
                &["linear", "step-early", "step-middle", "step-late", "spline"],
            )),
        }
    }
}

// MARK: Series

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

impl<'de> serde::Deserialize<'de> for Series {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_map(SeriesVisitor)
    }
}

struct SeriesVisitor;

impl<'de> serde::de::Visitor<'de> for SeriesVisitor {
    type Value = Series;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a tagged series map")
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        let mut buffered = Vec::<(String, Value)>::new();

        while let Some(key) = map.next_key::<String>()? {
            if key == "type" {
                let tag = map.next_value::<String>()?;
                return match tag.as_str() {
                    // If type is first, `buffered` is empty and we deserialize directly from map.
                    // If not, only the fields before `type` are buffered.
                    "line" => deserialize_line_series(&mut map, buffered).map(Series::Line),
                    "scatter" | "area" | "histogram" | "bars" | "bars-group" => {
                        Err(serde::de::Error::custom(format!(
                            "series type '{tag}' deserialization is not implemented yet"
                        )))
                    }
                    _ => Err(serde::de::Error::unknown_variant(
                        &tag,
                        &["line", "scatter", "area", "histogram", "bars", "bars-group"],
                    )),
                };
            }

            let value = map.next_value::<Value>()?;
            buffered.push((key, value));
        }

        Err(serde::de::Error::missing_field("type"))
    }
}

// MARK: helper macro

macro_rules! deserialize_series_fields {
    ($de:lifetime, $map:expr, $buffered:expr, $($key:expr => $name:ident: Option<$ty:ty>,)+) => {
        $(
            let mut $name = None::<$ty>;
        )+
        for (key, value) in $buffered {
            match key.as_str() {
                "type" => {
                    return Err(serde::de::Error::duplicate_field("type"));
                }
                $($key => {
                    if $name.is_some() {
                        return Err(serde::de::Error::duplicate_field($key));
                    }
                    $name = Some(
                        value
                            .deserialize_into::<$ty>()
                            .map_err(serde::de::Error::custom)?,
                    );

                })+
                _ => {}
            }
        }

        while let Some(key) = $map.next_key::<Cow<$de, str>>()? {
            match key.as_ref() {
                "type" => {
                    let _: String = $map.next_value()?;
                    return Err(serde::de::Error::duplicate_field("type"));
                }
                $($key => {
                    if $name.is_some() {
                        let _: $ty = $map.next_value()?;
                        return Err(serde::de::Error::duplicate_field($key));
                    }
                    $name = Some($map.next_value::<$ty>()?);
                })+
                _ => {}
            }
        }
    }
}

// MARK: series::Line

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


fn deserialize_line_series<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<series::Line, A::Error>
where
    A: MapAccess<'de>,
{
    deserialize_series_fields! {
        'de, map, buffered,
        "x" => x_data: Option<series::DataCol>,
        "y" => y_data: Option<series::DataCol>,
        "name" => name: Option<String>,
        "x_axis" => x_axis: Option<axis::Ref>,
        "y_axis" => y_axis: Option<axis::Ref>,
        "stroke" => stroke: Option<style::series::Stroke>,
        "marker" => marker: Option<style::series::Marker>,
        "interpolation" => interpolation: Option<series::Interpolation> ,
    }

    let x_data = x_data.ok_or_else(|| serde::de::Error::missing_field("x"))?;
    let y_data = y_data.ok_or_else(|| serde::de::Error::missing_field("y"))?;

    let mut line = series::Line::new(x_data, y_data);
    if let Some(name) = name {
        line = line.with_name(name);
    }
    if let Some(x_axis) = x_axis {
        line = line.with_x_axis(x_axis);
    }
    if let Some(y_axis) = y_axis {
        line = line.with_y_axis(y_axis);
    }
    if let Some(marker) = marker {
        line = line.with_marker(marker);
    }
    if let Some(stroke) = stroke {
        line = line.with_stroke(stroke);
    }
    if let Some(interpolation) = interpolation {
        line = line.with_interpolation(interpolation);
    }

    Ok(line)
}
