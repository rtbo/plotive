use std::borrow::Cow;

use serde::Serializer;
use serde::de::MapAccess;
use serde::ser::SerializeMap;
use serde_value::Value;

use crate::des::{Series, axis, cmap, series};
use crate::sd::deserialize_tagged_map_fields;
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
        // Collect all elements as Value to avoid consuming elements during type detection
        let mut values: Vec<Value> = Vec::new();
        while let Some(value) = seq.next_element::<Value>()? {
            values.push(value);
        }

        // If empty sequence, assume empty f64 column
        if values.is_empty() {
            return Ok(series::DataCol::Inline(data::VecColumn::F64(Vec::new())));
        }

        // Count leading nulls and find first non-null element to determine type
        let mut first_non_null_idx = None;
        for (idx, val) in values.iter().enumerate() {
            if !matches!(val, Value::Unit) {
                first_non_null_idx = Some(idx);
                break;
            }
        }

        // All nulls: assume f64 column
        if first_non_null_idx.is_none() {
            let vec = vec![f64::NAN; values.len()];
            return Ok(series::DataCol::Inline(data::VecColumn::F64(vec)));
        }

        // Try to determine type from first non-null element and deserialize all values
        // Try f64 first
        if let Ok(f64_vec) = deserialize_f64_vec(&values) {
            return Ok(series::DataCol::Inline(data::VecColumn::F64(f64_vec)));
        }

        #[cfg(feature = "time")]
        {
            // Try DateTime
            if let Ok(time_vec) = deserialize_datetime_vec(&values) {
                return Ok(series::DataCol::Inline(data::VecColumn::Time(time_vec)));
            }

            // Try TimeDelta
            if let Ok(td_vec) = deserialize_timedelta_vec(&values) {
                return Ok(series::DataCol::Inline(data::VecColumn::TimeDelta(td_vec)));
            }
        }

        // Try i64
        if let Ok(i64_vec) = deserialize_i64_vec(&values) {
            return Ok(series::DataCol::Inline(data::VecColumn::I64(i64_vec)));
        }

        // Try String
        if let Ok(str_vec) = deserialize_string_vec(&values) {
            return Ok(series::DataCol::Inline(data::VecColumn::Str(str_vec)));
        }

        Err(serde::de::Error::custom("unsupported data column type"))
    }
}

// Helper functions for type-specific deserialization
fn deserialize_f64_vec(values: &[Value]) -> Result<Vec<f64>, Box<dyn std::error::Error>> {
    values
        .iter()
        .map(|v| match v {
            Value::Unit => Ok(f64::NAN),
            Value::F64(f) => Ok(*f),
            Value::I64(i) => Ok(*i as f64),
            Value::U64(u) => Ok(*u as f64),
            Value::I32(i) => Ok(*i as f64),
            Value::U32(u) => Ok(*u as f64),
            Value::I16(i) => Ok(*i as f64),
            Value::U16(u) => Ok(*u as f64),
            Value::I8(i) => Ok(*i as f64),
            Value::U8(u) => Ok(*u as f64),
            _ => Err("Cannot convert value to f64".into()),
        })
        .collect()
}

fn deserialize_i64_vec(values: &[Value]) -> Result<Vec<Option<i64>>, Box<dyn std::error::Error>> {
    values
        .iter()
        .map(|v| match v {
            Value::Unit => Ok(None),
            Value::I64(i) => Ok(Some(*i)),
            Value::U64(u) => Ok(Some(*u as i64)),
            Value::I32(i) => Ok(Some(*i as i64)),
            Value::U32(u) => Ok(Some(*u as i64)),
            Value::I16(i) => Ok(Some(*i as i64)),
            Value::U16(u) => Ok(Some(*u as i64)),
            Value::I8(i) => Ok(Some(*i as i64)),
            Value::U8(u) => Ok(Some(*u as i64)),
            Value::F64(f) => Ok(Some(*f as i64)),
            _ => Err("Cannot convert value to i64".into()),
        })
        .collect()
}

fn deserialize_string_vec(
    values: &[Value],
) -> Result<Vec<Option<String>>, Box<dyn std::error::Error>> {
    values
        .iter()
        .map(|v| match v {
            Value::Unit => Ok(None),
            Value::String(s) => Ok(Some(s.clone())),
            _ => Err("Cannot convert value to String".into()),
        })
        .collect()
}

#[cfg(feature = "time")]
fn deserialize_datetime_vec(
    values: &[Value],
) -> Result<Vec<Option<crate::time::DateTime>>, Box<dyn std::error::Error>> {
    const FMT: &str = "%Y-%m-%d %H:%M:%S%.f";
    const ISOFMT: &str = "%Y-%m-%dT%H:%M:%S%.f";
    values
        .iter()
        .map(|v| match v {
            Value::Unit => Ok(None),
            Value::String(s) => {
                // Try to parse the string as a DateTime
                crate::time::DateTime::fmt_parse(s, FMT)
                    .or_else(|_| crate::time::DateTime::fmt_parse(s, ISOFMT))
                    .map(Some)
                    .map_err(|e| Box::new(e) as Box<dyn std::error::Error>)
            }
            Value::F64(f) => crate::time::DateTime::from_timestamp(*f)
                .map(Some)
                .ok_or_else(|| "invalid time".into()),
            Value::I64(i) => crate::time::DateTime::from_timestamp(*i as f64)
                .map(Some)
                .ok_or_else(|| "invalid time".into()),
            _ => Err("Cannot convert value to DateTime".into()),
        })
        .collect()
}

#[cfg(feature = "time")]
fn deserialize_timedelta_vec(
    values: &[Value],
) -> Result<Vec<Option<crate::time::TimeDelta>>, Box<dyn std::error::Error>> {
    values
        .iter()
        .map(|_v| {
            // TimeDelta deserialization is not yet implemented
            Err("TimeDelta deserialization is not implemented".into())
        })
        .collect()
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
            "default" | "linear" => Ok(series::Interpolation::Linear),
            "step-early" => Ok(series::Interpolation::StepEarly),
            "step-middle" => Ok(series::Interpolation::StepMiddle),
            "step-late" => Ok(series::Interpolation::StepLate),
            "spline" => Ok(series::Interpolation::Spline),
            _ => Err(serde::de::Error::unknown_variant(
                &s,
                &[
                    "default",
                    "linear",
                    "step-early",
                    "step-middle",
                    "step-late",
                    "spline",
                ],
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
            Series::Scatter(scatter) => scatter.serialize(serializer),
            Series::Area(area) => area.serialize(serializer),
            Series::Histogram(hist) => hist.serialize(serializer),
            Series::Bars(bars) => bars.serialize(serializer),
            Series::BarsGroup(bars_group) => bars_group.serialize(serializer),
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
                    "scatter" => {
                        deserialize_scatter_series(&mut map, buffered).map(Series::Scatter)
                    }
                    "area" => deserialize_area_series(&mut map, buffered).map(Series::Area),
                    "hist" => {
                        deserialize_histogram_series(&mut map, buffered).map(Series::Histogram)
                    }
                    "bars" => deserialize_bars_series(&mut map, buffered).map(Series::Bars),
                    "bars-group" => {
                        deserialize_bars_group_series(&mut map, buffered).map(Series::BarsGroup)
                    }
                    _ => Err(serde::de::Error::unknown_variant(
                        &tag,
                        &["line", "scatter", "area", "hist", "bars", "bars-group"],
                    )),
                };
            }

            let value = map.next_value::<Value>()?;
            buffered.push((key, value));
        }

        Err(serde::de::Error::missing_field("type"))
    }
}

// MARK: series::Line

impl serde::Serialize for series::Line {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_map(None)?;
        state.serialize_entry("type", "line")?;
        state.serialize_entry("x", self.x_data())?;
        state.serialize_entry("y", self.y_data())?;

        if let Some(name) = self.name() {
            state.serialize_entry("name", name)?;
        }

        if self.x_axis() != &axis::Ref::default() {
            state.serialize_entry("xAxis", self.x_axis())?;
        }

        if self.y_axis() != &axis::Ref::default() {
            state.serialize_entry("yAxis", self.y_axis())?;
        }

        if self.stroke() != &style::series::Stroke::default() {
            state.serialize_entry("stroke", self.stroke())?;
        }

        if let Some(marker) = self.marker() {
            state.serialize_entry("marker", marker)?;
        }

        if self.interpolation() != series::Interpolation::default() {
            state.serialize_entry("interpolation", &self.interpolation())?;
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
    deserialize_tagged_map_fields! {
        'de, map, buffered,
        "x" => x_data: series::DataCol,
        "y" => y_data: series::DataCol,

        "stroke" => stroke: Option<style::series::Stroke>,
        "marker" => marker: Option<style::series::Marker>,
        "interpolation" => interpolation: Option<series::Interpolation>,

        "name" => name: Option<String>,
        "xAxis" => x_axis: Option<axis::Ref>,
        "yAxis" => y_axis: Option<axis::Ref>,
    }

    let mut line = series::Line::new(x_data, y_data);
    if let Some(marker) = marker {
        line = line.with_marker(marker);
    }
    if let Some(stroke) = stroke {
        line = line.with_stroke(stroke);
    }
    if let Some(interpolation) = interpolation {
        line = line.with_interpolation(interpolation);
    }

    if let Some(name) = name {
        line = line.with_name(name);
    }
    if let Some(x_axis) = x_axis {
        line = line.with_x_axis(x_axis);
    }
    if let Some(y_axis) = y_axis {
        line = line.with_y_axis(y_axis);
    }

    Ok(line)
}

// MARK: series::Scatter

impl serde::Serialize for series::Scatter {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_map(None)?;
        state.serialize_entry("type", "scatter")?;
        state.serialize_entry("x", self.x_data())?;
        state.serialize_entry("y", self.y_data())?;

        if let Some(name) = self.name() {
            state.serialize_entry("name", name)?;
        }

        if self.x_axis() != &axis::Ref::default() {
            state.serialize_entry("xAxis", self.x_axis())?;
        }

        if self.y_axis() != &axis::Ref::default() {
            state.serialize_entry("yAxis", self.y_axis())?;
        }

        if self.marker() != &style::series::Marker::default() {
            state.serialize_entry("marker", self.marker())?;
        }

        if let Some(sizes) = self.size_data() {
            state.serialize_entry("sizes", sizes)?;
        }

        if let Some((colors, cmap)) = self.color_data() {
            state.serialize_entry("colors", colors)?;
            if cmap != &cmap::ColorMap::default() {
                state.serialize_entry("cmap", cmap)?;
            }
        }

        state.end()
    }
}

fn deserialize_scatter_series<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<series::Scatter, A::Error>
where
    A: MapAccess<'de>,
{
    deserialize_tagged_map_fields! {
        'de, map, buffered,
        "x" => x_data: series::DataCol,
        "y" => y_data: series::DataCol,

        "marker" => marker: Option<style::series::Marker>,
        "sizes" => sizes: Option<series::DataCol>,
        "colors" => colors: Option<series::DataCol>,
        "cmap" => cmap: Option<cmap::ColorMap>,

        "name" => name: Option<String>,
        "xAxis" => x_axis: Option<axis::Ref>,
        "yAxis" => y_axis: Option<axis::Ref>,
    }

    let mut scatter = series::Scatter::new(x_data, y_data);

    if let Some(marker) = marker {
        scatter = scatter.with_marker(marker);
    }
    if let Some(sizes) = sizes {
        scatter = scatter.with_size_data(sizes);
    }
    match (colors, cmap) {
        (Some(colors), cmap) => {
            let cmap = cmap.unwrap_or_default();
            scatter = scatter.with_color_data(colors, cmap);
        }
        _ => {}
    }

    if let Some(name) = name {
        scatter = scatter.with_name(name);
    }
    if let Some(x_axis) = x_axis {
        scatter = scatter.with_x_axis(x_axis);
    }
    if let Some(y_axis) = y_axis {
        scatter = scatter.with_y_axis(y_axis);
    }

    Ok(scatter)
}

// MARK: AreaY2Raw (internal helper for deserializing y2)

/// Internal type for deserializing the y2 field which can be either a baseline number or a DataCol.
enum AreaY2Raw {
    Baseline(f64),
    Col(series::DataCol),
}

impl<'de> serde::Deserialize<'de> for AreaY2Raw {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(AreaY2RawVisitor)
    }
}

struct AreaY2RawVisitor;

impl<'de> serde::de::Visitor<'de> for AreaY2RawVisitor {
    type Value = AreaY2Raw;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a baseline number or a data column (string or array)")
    }

    fn visit_f64<E: serde::de::Error>(self, v: f64) -> Result<Self::Value, E> {
        Ok(AreaY2Raw::Baseline(v))
    }

    fn visit_i64<E: serde::de::Error>(self, v: i64) -> Result<Self::Value, E> {
        Ok(AreaY2Raw::Baseline(v as f64))
    }

    fn visit_u64<E: serde::de::Error>(self, v: u64) -> Result<Self::Value, E> {
        Ok(AreaY2Raw::Baseline(v as f64))
    }

    fn visit_str<E: serde::de::Error>(self, v: &str) -> Result<Self::Value, E> {
        Ok(AreaY2Raw::Col(series::DataCol::SrcRef(v.to_string())))
    }

    fn visit_seq<A>(self, seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        DataColVisitor.visit_seq(seq).map(AreaY2Raw::Col)
    }
}

// MARK: series::Area

impl serde::Serialize for series::Area {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_map(None)?;
        state.serialize_entry("type", "area")?;
        state.serialize_entry("x", self.x_data())?;
        state.serialize_entry("y1", self.y1_data())?;

        match self.y2_data() {
            series::AreaY2::Baseline(v) if *v != 0.0 => {
                state.serialize_entry("y2", v)?;
            }
            series::AreaY2::DataCol(col, interp) => {
                state.serialize_entry("y2", col)?;
                if *interp != series::Interpolation::default() {
                    state.serialize_entry("y2Interp", interp)?;
                }
            }
            _ => {} // default Baseline(0.0) — skip
        }

        if let Some(name) = self.name() {
            state.serialize_entry("name", name)?;
        }

        if self.x_axis() != &axis::Ref::default() {
            state.serialize_entry("xAxis", self.x_axis())?;
        }

        if self.y_axis() != &axis::Ref::default() {
            state.serialize_entry("yAxis", self.y_axis())?;
        }

        if self.fill() != &style::series::Fill::default() {
            state.serialize_entry("fill", self.fill())?;
        }

        if let Some(stroke) = self.y1_stroke() {
            state.serialize_entry("y1Stroke", stroke)?;
        }

        if let Some(stroke) = self.y2_stroke() {
            state.serialize_entry("y2Stroke", stroke)?;
        }

        if self.interpolation() != series::Interpolation::default() {
            state.serialize_entry("y1Interp", &self.interpolation())?;
        }

        state.end()
    }
}

fn deserialize_area_series<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<series::Area, A::Error>
where
    A: MapAccess<'de>,
{
    deserialize_tagged_map_fields! {
        'de, map, buffered,
        "x" => x_data: series::DataCol,
        "y1" => y1_data: series::DataCol,

        "y2" => y2_raw: Option<AreaY2Raw>,
        "fill" => fill: Option<style::series::Fill>,
        "y1Stroke" => y1_stroke: Option<style::series::Stroke>,
        "y2Stroke" => y2_stroke: Option<style::series::Stroke>,

        "y1Interp" => y1_interp: Option<series::Interpolation>,
        "y2Interp" => y2_interp: Option<series::Interpolation>,

        "name" => name: Option<String>,
        "xAxis" => x_axis: Option<axis::Ref>,
        "yAxis" => y_axis: Option<axis::Ref>,
    }

    let y2_data = match (y2_raw, y2_interp) {
        (None, _) => series::AreaY2::default(),
        (Some(AreaY2Raw::Baseline(v)), _) => series::AreaY2::Baseline(v),
        (Some(AreaY2Raw::Col(col)), interp) => {
            series::AreaY2::DataCol(col, interp.unwrap_or_default())
        }
    };
    let mut area = series::Area::new(x_data, y1_data, y2_data);
    if let Some(fill) = fill {
        area = area.with_fill(fill);
    }
    if let Some(stroke) = y1_stroke {
        area = area.with_y1_stroke(stroke);
    }
    if let Some(stroke) = y2_stroke {
        area = area.with_y2_stroke(stroke);
    }
    if let Some(interp) = y1_interp {
        area = area.with_interpolation(interp);
    }

    if let Some(name) = name {
        area = area.with_name(name);
    }
    if let Some(x_axis) = x_axis {
        area = area.with_x_axis(x_axis);
    }
    if let Some(y_axis) = y_axis {
        area = area.with_y_axis(y_axis);
    }

    Ok(area)
}

// MARK: series::Histogram

impl serde::Serialize for series::Histogram {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_map(None)?;
        state.serialize_entry("type", "hist")?;
        state.serialize_entry("x", self.x_data())?;

        if let Some(name) = self.name() {
            state.serialize_entry("name", name)?;
        }

        if self.x_axis() != &axis::Ref::default() {
            state.serialize_entry("xAxis", self.x_axis())?;
        }

        if self.y_axis() != &axis::Ref::default() {
            state.serialize_entry("yAxis", self.y_axis())?;
        }

        if self.fill() != &style::series::Fill::default() {
            state.serialize_entry("fill", self.fill())?;
        }

        if let Some(stroke) = self.stroke() {
            state.serialize_entry("stroke", stroke)?;
        }

        if self.bins() != 10 {
            state.serialize_entry("bins", &self.bins())?;
        }

        if self.density() {
            state.serialize_entry("density", &true)?;
        }

        state.end()
    }
}

fn deserialize_histogram_series<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<series::Histogram, A::Error>
where
    A: MapAccess<'de>,
{
    deserialize_tagged_map_fields! {
        'de, map, buffered,
        "x" => x_data: series::DataCol,

        "fill" => fill: Option<style::series::Fill>,
        "stroke" => stroke: Option<style::series::Stroke>,
        "bins" => bins: Option<u32>,
        "density" => density: Option<bool>,

        "name" => name: Option<String>,
        "xAxis" => x_axis: Option<axis::Ref>,
        "yAxis" => y_axis: Option<axis::Ref>,
    }

    let mut hist = series::Histogram::new(x_data);
    if let Some(fill) = fill {
        hist = hist.with_fill(fill);
    }
    if let Some(stroke) = stroke {
        hist = hist.with_stroke(stroke);
    }
    if let Some(bins) = bins {
        hist = hist.with_bins(bins);
    }
    if density.unwrap_or(false) {
        hist = hist.with_density();
    }

    if let Some(name) = name {
        hist = hist.with_name(name);
    }
    if let Some(x_axis) = x_axis {
        hist = hist.with_x_axis(x_axis);
    }
    if let Some(y_axis) = y_axis {
        hist = hist.with_y_axis(y_axis);
    }

    Ok(hist)
}

// MARK: series::BarsPosition

impl serde::Serialize for series::BarsPosition {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let default = series::BarsPosition::default();
        let mut state = serializer.serialize_map(None)?;
        if self.offset != default.offset {
            state.serialize_entry("offset", &self.offset)?;
        }
        if self.width != default.width {
            state.serialize_entry("width", &self.width)?;
        }
        state.end()
    }
}

impl<'de> serde::Deserialize<'de> for series::BarsPosition {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(BarsPositionVisitor)
    }
}

struct BarsPositionVisitor;

impl<'de> serde::de::Visitor<'de> for BarsPositionVisitor {
    type Value = series::BarsPosition;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a BarsPosition object {offset?, width?} or a [offset, width] tuple")
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let offset: f32 = seq
            .next_element()?
            .ok_or_else(|| serde::de::Error::invalid_length(0, &"2 elements"))?;
        let width: f32 = seq
            .next_element()?
            .ok_or_else(|| serde::de::Error::invalid_length(1, &"2 elements"))?;
        Ok(series::BarsPosition { offset, width })
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        let default = series::BarsPosition::default();
        super::deserialize_map_fields!(
            'de, map,
            "offset" => offset: Option<f32>,
            "width" => width: Option<f32>,
        );
        Ok(series::BarsPosition {
            offset: offset.unwrap_or(default.offset),
            width: width.unwrap_or(default.width),
        })
    }
}

// MARK: series::Bars

impl serde::Serialize for series::Bars {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_map(None)?;
        state.serialize_entry("type", "bars")?;
        state.serialize_entry("x", self.x_data())?;
        state.serialize_entry("y", self.y_data())?;

        if let Some(name) = self.name() {
            state.serialize_entry("name", name)?;
        }

        if self.x_axis() != &axis::Ref::default() {
            state.serialize_entry("xAxis", self.x_axis())?;
        }

        if self.y_axis() != &axis::Ref::default() {
            state.serialize_entry("yAxis", self.y_axis())?;
        }

        if self.fill() != &style::series::Fill::default() {
            state.serialize_entry("fill", self.fill())?;
        }

        if let Some(stroke) = self.stroke() {
            state.serialize_entry("stroke", stroke)?;
        }

        let default_pos = series::BarsPosition::default();
        if self.position().offset != default_pos.offset
            || self.position().width != default_pos.width
        {
            state.serialize_entry("position", self.position())?;
        }

        state.end()
    }
}

fn deserialize_bars_series<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<series::Bars, A::Error>
where
    A: MapAccess<'de>,
{
    deserialize_tagged_map_fields! {
        'de, map, buffered,
        "x" => x_data: series::DataCol,
        "y" => y_data: series::DataCol,

        "fill" => fill: Option<style::series::Fill>,
        "stroke" => stroke: Option<style::series::Stroke>,
        "position" => position: Option<series::BarsPosition>,

        "name" => name: Option<String>,
        "xAxis" => x_axis: Option<axis::Ref>,
        "yAxis" => y_axis: Option<axis::Ref>,
    }

    let mut bars = series::Bars::new(x_data, y_data);
    if let Some(fill) = fill {
        bars = bars.with_fill(fill);
    }
    if let Some(stroke) = stroke {
        bars = bars.with_stroke(stroke);
    }
    if let Some(position) = position {
        bars = bars.with_position(position);
    }

    if let Some(name) = name {
        bars = bars.with_name(name);
    }
    if let Some(x_axis) = x_axis {
        bars = bars.with_x_axis(x_axis);
    }
    if let Some(y_axis) = y_axis {
        bars = bars.with_y_axis(y_axis);
    }

    Ok(bars)
}

// MARK: series::BarsOrientation

impl serde::Serialize for series::BarsOrientation {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            series::BarsOrientation::Vertical => "vertical".serialize(serializer),
            series::BarsOrientation::Horizontal => "horizontal".serialize(serializer),
        }
    }
}

impl<'de> serde::Deserialize<'de> for series::BarsOrientation {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let s: std::borrow::Cow<'de, str> = serde::Deserialize::deserialize(deserializer)?;
        match s.as_ref() {
            "vertical" => Ok(series::BarsOrientation::Vertical),
            "horizontal" => Ok(series::BarsOrientation::Horizontal),
            _ => Err(serde::de::Error::unknown_variant(
                &s,
                &["vertical", "horizontal"],
            )),
        }
    }
}

// MARK: series::BarsArrangement

impl serde::Serialize for series::BarsArrangement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            series::BarsArrangement::Aside(arr) => {
                let default = series::BarsAsideArrangement::default();
                if arr.offset == default.offset
                    && arr.width == default.width
                    && arr.gap == default.gap
                {
                    "aside".serialize(serializer)
                } else {
                    let mut state = serializer.serialize_map(None)?;
                    state.serialize_entry("type", "aside")?;
                    if arr.offset != default.offset {
                        state.serialize_entry("offset", &arr.offset)?;
                    }
                    if arr.width != default.width {
                        state.serialize_entry("width", &arr.width)?;
                    }
                    if arr.gap != default.gap {
                        state.serialize_entry("gap", &arr.gap)?;
                    }
                    state.end()
                }
            }
            series::BarsArrangement::Stack(arr) => {
                let default = series::BarsStackArrangement::default();
                if arr.offset == default.offset && arr.width == default.width {
                    "stack".serialize(serializer)
                } else {
                    let mut state = serializer.serialize_map(None)?;
                    state.serialize_entry("type", "stack")?;
                    if arr.offset != default.offset {
                        state.serialize_entry("offset", &arr.offset)?;
                    }
                    if arr.width != default.width {
                        state.serialize_entry("width", &arr.width)?;
                    }
                    state.end()
                }
            }
        }
    }
}

impl<'de> serde::Deserialize<'de> for series::BarsArrangement {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(BarsArrangementVisitor)
    }
}

struct BarsArrangementVisitor;

impl<'de> serde::de::Visitor<'de> for BarsArrangementVisitor {
    type Value = series::BarsArrangement;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str(
            "'aside' | 'stack' | {type: 'aside', offset?, width?, gap?} | {type: 'stack', offset?, width?}",
        )
    }

    fn visit_str<E: serde::de::Error>(self, v: &str) -> Result<Self::Value, E> {
        match v {
            "aside" => Ok(series::BarsArrangement::Aside(Default::default())),
            "stack" => Ok(series::BarsArrangement::Stack(Default::default())),
            _ => Err(serde::de::Error::unknown_variant(v, &["aside", "stack"])),
        }
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        let mut typ: Option<String> = None;
        let mut offset: Option<f32> = None;
        let mut width: Option<f32> = None;
        let mut gap: Option<f32> = None;

        while let Some(key) = map.next_key::<std::borrow::Cow<'de, str>>()? {
            match key.as_ref() {
                "type" => typ = Some(map.next_value()?),
                "offset" => offset = Some(map.next_value()?),
                "width" => width = Some(map.next_value()?),
                "gap" => gap = Some(map.next_value()?),
                _ => {
                    return Err(serde::de::Error::unknown_field(
                        key.as_ref(),
                        &["type", "offset", "width", "gap"],
                    ));
                }
            }
        }

        match typ.as_deref() {
            Some("aside") | None => {
                let default = series::BarsAsideArrangement::default();
                Ok(series::BarsArrangement::Aside(
                    series::BarsAsideArrangement {
                        offset: offset.unwrap_or(default.offset),
                        width: width.unwrap_or(default.width),
                        gap: gap.unwrap_or(default.gap),
                    },
                ))
            }
            Some("stack") => {
                let default = series::BarsStackArrangement::default();
                Ok(series::BarsArrangement::Stack(
                    series::BarsStackArrangement {
                        offset: offset.unwrap_or(default.offset),
                        width: width.unwrap_or(default.width),
                    },
                ))
            }
            Some(other) => Err(serde::de::Error::unknown_variant(
                other,
                &["aside", "stack"],
            )),
        }
    }
}

// MARK: series::BarSeries

impl serde::Serialize for series::BarSeries {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_map(None)?;
        state.serialize_entry("data", self.data())?;
        if let Some(name) = self.name() {
            state.serialize_entry("name", name)?;
        }
        if self.fill() != &style::series::Fill::default() {
            state.serialize_entry("fill", self.fill())?;
        }
        if let Some(stroke) = self.outline() {
            state.serialize_entry("stroke", stroke)?;
        }
        state.end()
    }
}

impl<'de> serde::Deserialize<'de> for series::BarSeries {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_map(BarSeriesVisitor)
    }
}

struct BarSeriesVisitor;

impl<'de> serde::de::Visitor<'de> for BarSeriesVisitor {
    type Value = series::BarSeries;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a BarSeries object with a 'data' field")
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        super::deserialize_map_fields!(
            'de, map,
            "data" => data: series::DataCol,
            "name" => name: Option<String>,
            "fill" => fill: Option<style::series::Fill>,
            "stroke" => stroke: Option<style::series::Stroke>,
        );

        let mut bar_series = series::BarSeries::new(data);

        if let Some(name) = name {
            bar_series = bar_series.with_name(name);
        }
        if let Some(fill) = fill {
            bar_series = bar_series.with_fill(fill);
        }
        if let Some(stroke) = stroke {
            bar_series = bar_series.with_outline(stroke);
        }
        Ok(bar_series)
    }
}

// MARK: series::BarsGroup

impl serde::Serialize for series::BarsGroup {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_map(None)?;
        state.serialize_entry("type", "bars-group")?;
        state.serialize_entry("categories", self.categories())?;
        state.serialize_entry("series", self.series())?;

        if self.x_axis() != &axis::Ref::default() {
            state.serialize_entry("xAxis", self.x_axis())?;
        }

        if self.y_axis() != &axis::Ref::default() {
            state.serialize_entry("yAxis", self.y_axis())?;
        }

        if !matches!(self.orientation(), series::BarsOrientation::Vertical) {
            state.serialize_entry("orientation", self.orientation())?;
        }

        if !matches!(
            self.arrangement(),
            series::BarsArrangement::Aside(arr) if {
                let d = series::BarsAsideArrangement::default();
                arr.offset == d.offset && arr.width == d.width && arr.gap == d.gap
            }
        ) {
            state.serialize_entry("arrangement", self.arrangement())?;
        }

        state.end()
    }
}

fn deserialize_bars_group_series<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<series::BarsGroup, A::Error>
where
    A: MapAccess<'de>,
{
    deserialize_tagged_map_fields! {
        'de, map, buffered,
        "categories" => categories: series::DataCol,
        "series" => bar_series: Vec<series::BarSeries>,

        "orientation" => orientation: Option<series::BarsOrientation>,
        "arrangement" => arrangement: Option<series::BarsArrangement>,
        "xAxis" => x_axis: Option<axis::Ref>,
        "yAxis" => y_axis: Option<axis::Ref>,
    }

    let mut group = series::BarsGroup::new(categories, bar_series);
    if let Some(orientation) = orientation {
        group = group.with_orientation(orientation);
    }
    if let Some(arrangement) = arrangement {
        group = group.with_arrangement(arrangement);
    }
    if let Some(x_axis) = x_axis {
        group = group.with_x_axis(x_axis);
    }
    if let Some(y_axis) = y_axis {
        group = group.with_y_axis(y_axis);
    }

    Ok(group)
}
