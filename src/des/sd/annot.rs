use serde::de::{Error, MapAccess};
use serde::ser::SerializeStruct;
use serde_value::Value;

use crate::des::{Annotation, Text, annot, axis};
use crate::style::{self, theme};

impl serde::Serialize for annot::Coord {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            annot::Coord::Data(value) => value.serialize(serializer),
            annot::Coord::Plot(value) => (value, "plot").serialize(serializer),
        }
    }
}

impl<'de> serde::Deserialize<'de> for annot::Coord {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct Visitor;

        impl<'de> serde::de::Visitor<'de> for Visitor {
            type Value = annot::Coord;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a number or a tuple of (number, \"data\" | \"plot\")")
            }

            fn visit_i64<E>(self, value: i64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(annot::Coord::Data(value as f64))
            }

            fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(annot::Coord::Data(value as f64))
            }

            fn visit_f64<E>(self, value: f64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(annot::Coord::Data(value))
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::SeqAccess<'de>,
            {
                // #[derive(serde::Deserialize)]
                // #[serde(untagged)]
                // pub enum C {
                //     F64(f64),
                //     I64(i64),
                // }

                // impl C {
                //     fn as_f64(&self) -> f64 {
                //         match self {
                //             C::F64(f) => *f,
                //             C::I64(i) => *i as f64,
                //         }
                //     }
                // }

                let value = seq
                    .next_element::<f64>()?
                    .ok_or_else(|| serde::de::Error::invalid_length(0, &self))?;
                let tag = seq
                    .next_element::<String>()?
                    .ok_or_else(|| serde::de::Error::invalid_length(1, &self))?;
                if tag == "plot" {
                    Ok(annot::Coord::Plot(value as f32))
                } else if tag == "data" {
                    Ok(annot::Coord::Data(value))
                } else {
                    return Err(serde::de::Error::unknown_variant(
                        &tag,
                        &["data", "plot"],
                    ));
                }
            }
        }

        deserializer.deserialize_any(Visitor)
    }
}

impl serde::Serialize for annot::ZPos {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            annot::ZPos::BelowSeries => "below-series",
            annot::ZPos::AboveSeries => "above-series",
        }
        .serialize(serializer)
    }
}

impl<'de> serde::Deserialize<'de> for annot::ZPos {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let value = String::deserialize(deserializer)?;
        match value.as_str() {
            "below-series" => Ok(annot::ZPos::BelowSeries),
            "above-series" => Ok(annot::ZPos::AboveSeries),
            _ => Err(serde::de::Error::unknown_variant(
                &value,
                &["below-series", "above-series"],
            )),
        }
    }
}

impl serde::Serialize for annot::Anchor {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let value = match self {
            annot::Anchor::TopLeft => "top-left",
            annot::Anchor::TopCenter => "top-center",
            annot::Anchor::TopRight => "top-right",
            annot::Anchor::CenterLeft => "center-left",
            annot::Anchor::Center => "center",
            annot::Anchor::CenterRight => "center-right",
            annot::Anchor::BottomLeft => "bottom-left",
            annot::Anchor::BottomCenter => "bottom-center",
            annot::Anchor::BottomRight => "bottom-right",
        };
        value.serialize(serializer)
    }
}

impl<'de> serde::Deserialize<'de> for annot::Anchor {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let value = String::deserialize(deserializer)?;
        match value.as_str() {
            "top-left" => Ok(annot::Anchor::TopLeft),
            "top-center" => Ok(annot::Anchor::TopCenter),
            "top-right" => Ok(annot::Anchor::TopRight),
            "center-left" => Ok(annot::Anchor::CenterLeft),
            "center" => Ok(annot::Anchor::Center),
            "center-right" => Ok(annot::Anchor::CenterRight),
            "bottom-left" => Ok(annot::Anchor::BottomLeft),
            "bottom-center" => Ok(annot::Anchor::BottomCenter),
            "bottom-right" => Ok(annot::Anchor::BottomRight),
            _ => Err(serde::de::Error::unknown_variant(
                &value,
                &[
                    "top-left",
                    "top-center",
                    "top-right",
                    "center-left",
                    "center",
                    "center-right",
                    "bottom-left",
                    "bottom-center",
                    "bottom-right",
                ],
            )),
        }
    }
}

impl serde::Serialize for Annotation {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            Annotation::Line(line) => serialize_line(line, serializer),
            Annotation::Arrow(arrow) => serialize_arrow(arrow, serializer),
            Annotation::Marker(marker) => serialize_marker(marker, serializer),
            Annotation::Label(label) => serialize_label(label, serializer),
        }
    }
}

fn serialize_base_fields<S>(
    state: &mut S,
    x_axis: &axis::Ref,
    y_axis: &axis::Ref,
    zpos: annot::ZPos,
    default_zpos: annot::ZPos,
) -> Result<(), S::Error>
where
    S: serde::ser::SerializeStruct,
{
    if x_axis != &axis::Ref::default() {
        state.serialize_field("xAxis", x_axis)?;
    }
    if y_axis != &axis::Ref::default() {
        state.serialize_field("yAxis", y_axis)?;
    }
    if zpos != default_zpos {
        state.serialize_field("zpos", &zpos)?;
    }
    Ok(())
}

fn serialize_line<S>(line: &annot::Line, serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    let mut state = serializer.serialize_struct("LineAnnotation", 8)?;
    state.serialize_field("type", "line")?;
    match line.direction() {
        annot::LineDir::Horizontal(y) => state.serialize_field("horizontal", &y)?,
        annot::LineDir::Vertical(x) => state.serialize_field("vertical", &x)?,
        annot::LineDir::Slope { x, y, slope } => {
            state.serialize_field("slope", &((x, y), slope))?
        }
        annot::LineDir::TwoPoints { x1, y1, x2, y2 } => {
            state.serialize_field("twoPoints", &((x1, y1), (x2, y2)))?
        }
    }
    if line.stroke() != &theme::Stroke::from(theme::Col::Foreground) {
        state.serialize_field("stroke", line.stroke())?;
    }
    serialize_base_fields(
        &mut state,
        line.x_axis(),
        line.y_axis(),
        line.zpos(),
        annot::ZPos::BelowSeries,
    )?;
    state.end()
}

fn serialize_arrow<S>(arrow: &annot::Arrow, serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    let mut state = serializer.serialize_struct("ArrowAnnotation", 8)?;
    state.serialize_field("type", "arrow")?;
    state.serialize_field("xy", &arrow.target())?;
    state.serialize_field("dxy", &arrow.delta())?;
    if arrow.stroke() != &theme::Stroke::from(theme::Col::Foreground) {
        state.serialize_field("stroke", arrow.stroke())?;
    }
    if (arrow.head_size() - 10.0).abs() > f32::EPSILON {
        state.serialize_field("headSize", &arrow.head_size())?;
    }
    serialize_base_fields(
        &mut state,
        arrow.x_axis(),
        arrow.y_axis(),
        arrow.zpos(),
        annot::ZPos::AboveSeries,
    )?;
    state.end()
}

fn serialize_marker<S>(marker: &annot::Marker, serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    let mut state = serializer.serialize_struct("MarkerAnnotation", 6)?;
    state.serialize_field("xy", &marker.position())?;
    if marker.marker() != &theme::Marker::default() {
        state.serialize_field("marker", marker.marker())?;
    }
    serialize_base_fields(
        &mut state,
        marker.x_axis(),
        marker.y_axis(),
        marker.zpos(),
        annot::ZPos::AboveSeries,
    )?;
    state.end()
}

fn serialize_label<S>(label: &annot::Label, serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    let mut state = serializer.serialize_struct("LabelAnnotation", 10)?;
    state.serialize_field("type", "label")?;
    state.serialize_field("xy", &label.position())?;
    state.serialize_field("text", label.text())?;
    if label.anchor() != annot::Anchor::default() {
        state.serialize_field("anchor", &label.anchor())?;
    }
    let (fill, stroke) = label.frame();
    if let (Some(fill), Some(stroke)) = (fill, stroke) {
        state.serialize_field("frame", &(fill, stroke))?;
    }
    if label.angle() != 0.0 {
        state.serialize_field("angle", &label.angle())?;
    }
    serialize_base_fields(
        &mut state,
        label.x_axis(),
        label.y_axis(),
        label.zpos(),
        annot::ZPos::AboveSeries,
    )?;
    state.end()
}

impl<'de> serde::Deserialize<'de> for Annotation {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_map(AnnotVisitor)
    }
}

struct AnnotVisitor;

impl<'de> serde::de::Visitor<'de> for AnnotVisitor {
    type Value = Annotation;

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
                    "line" => deserialize_line_annotation(&mut map, buffered).map(Annotation::Line),
                    "arrow" => {
                        deserialize_arrow_annotation(&mut map, buffered).map(Annotation::Arrow)
                    }
                    "marker" => {
                        deserialize_marker_annotation(&mut map, buffered).map(Annotation::Marker)
                    }
                    "label" => {
                        deserialize_label_annotation(&mut map, buffered).map(Annotation::Label)
                    }
                    _ => Err(serde::de::Error::unknown_variant(
                        &tag,
                        &["line", "arrow", "marker", "label"],
                    )),
                };
            }

            let value = map.next_value::<Value>()?;
            buffered.push((key, value));
        }

        Err(serde::de::Error::missing_field("type"))
    }
}

fn deserialize_line_annotation<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<annot::Line, A::Error>
where
    A: MapAccess<'de>,
    A::Error: serde::de::Error,
{
    super::deserialize_tagged_map_fields! {
        'de, map, buffered,
        "horizontal" => horizontal: Option<annot::Coord>,
        "vertical" => vertical: Option<annot::Coord>,
        "slope" => slope: Option<((annot::Coord, annot::Coord), f32)>,
        "twoPoints" => two_points: Option<((annot::Coord, annot::Coord), (annot::Coord, annot::Coord))>,
        "stroke" => stroke: Option<theme::Stroke>,
        "pattern" => pattern: Option<style::LinePattern>,
        "xAxis" => x_axis: Option<axis::Ref>,
        "yAxis" => y_axis: Option<axis::Ref>,
        "zPos" => z_pos: Option<annot::ZPos>,
    }

    let mut count = 0;
    count += horizontal.is_some() as usize;
    count += vertical.is_some() as usize;
    count += slope.is_some() as usize;
    count += two_points.is_some() as usize;
    if count != 1 {
        return Err(A::Error::custom(
            "line annotations require exactly one of horizontal, vertical, slope, or twoPoints",
        ));
    }

    let mut annot = if let Some(y) = horizontal {
        annot::Line::horizontal(y)
    } else if let Some(x) = vertical {
        annot::Line::vertical(x)
    } else if let Some(((x, y), slope)) = slope {
        annot::Line::slope(x, y, slope)
    } else {
        let ((x1, y1), (x2, y2)) = two_points.expect("validated above");
        annot::Line::two_points(x1, y1, x2, y2)
    };

    let mut stroke = stroke;
    if let Some(pattern) = pattern {
        let current = stroke.unwrap_or_else(|| theme::Stroke::from(theme::Col::Foreground));
        stroke = Some(current.with_pattern(pattern));
    }
    if let Some(stroke) = stroke {
        annot = annot.with_stroke(stroke);
    }
    if let Some(x_axis) = x_axis {
        annot = annot.with_x_axis(x_axis);
    }
    if let Some(y_axis) = y_axis {
        annot = annot.with_y_axis(y_axis);
    }
    if let Some(z_pos) = z_pos {
        annot = annot.with_zpos(z_pos);
    }
    Ok(annot)
}

fn deserialize_arrow_annotation<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<annot::Arrow, A::Error>
where
    A: MapAccess<'de>,
    A::Error: serde::de::Error,
{
    super::deserialize_tagged_map_fields! {
        'de, map, buffered,
        "xy" => xy: (annot::Coord, annot::Coord),
        "dxy" => dxy: (f32, f32),
        "headSize" => head_size: Option<f32>,
        "stroke" => stroke: Option<theme::Stroke>,
        "xAxis" => x_axis: Option<axis::Ref>,
        "yAxis" => y_axis: Option<axis::Ref>,
        "zPos" => z_pos: Option<annot::ZPos>,
    }

    let mut annot = annot::Arrow::new(xy.0, xy.1, dxy.0, dxy.1);
    if let Some(head_size) = head_size {
        annot = annot.with_head_size(head_size);
    }
    if let Some(stroke) = stroke {
        annot = annot.with_stroke(stroke);
    }
    if let Some(x_axis) = x_axis {
        annot = annot.with_x_axis(x_axis);
    }
    if let Some(y_axis) = y_axis {
        annot = annot.with_y_axis(y_axis);
    }
    if let Some(z_pos) = z_pos {
        annot = annot.with_zpos(z_pos);
    }
    Ok(annot)
}

fn deserialize_marker_annotation<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<annot::Marker, A::Error>
where
    A: MapAccess<'de>,
    A::Error: serde::de::Error,
{
    super::deserialize_tagged_map_fields! {
        'de, map, buffered,
        "xy" => xy: (annot::Coord, annot::Coord),
        "marker" => marker: Option<theme::Marker>,
        "xAxis" => x_axis: Option<axis::Ref>,
        "yAxis" => y_axis: Option<axis::Ref>,
        "zPos" => z_pos: Option<annot::ZPos>,
    }

    let mut annot = annot::Marker::new(xy.0, xy.1);
    if let Some(marker) = marker {
        annot = annot.with_marker(marker)
    }
    if let Some(x_axis) = x_axis {
        annot = annot.with_x_axis(x_axis);
    }
    if let Some(y_axis) = y_axis {
        annot = annot.with_y_axis(y_axis);
    }
    if let Some(z_pos) = z_pos {
        annot = annot.with_zpos(z_pos);
    }
    Ok(annot)
}

fn deserialize_label_annotation<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<annot::Label, A::Error>
where
    A: MapAccess<'de>,
    A::Error: serde::de::Error,
{
    super::deserialize_tagged_map_fields! {
        'de, map, buffered,
        "xy" => xy: (annot::Coord, annot::Coord),
        "text" => text: Text,
        "anchor" => anchor: Option<annot::Anchor>,
        "frame" => frame: Option<(Option<theme::Fill>, Option<theme::Stroke>)>,
        "angle" => angle: Option<f32>,
        "xAxis" => x_axis: Option<axis::Ref>,
        "yAxis" => y_axis: Option<axis::Ref>,
        "zPos" => z_pos: Option<annot::ZPos>,
    }

    let mut annot = annot::Label::new(text, xy.0, xy.1);
    if let Some(anchor) = anchor {
        annot = annot.with_anchor(anchor);
    }
    if let Some((fill, stroke)) = frame {
        annot = annot.with_frame(fill, stroke);
    }
    if let Some(angle) = angle {
        annot = annot.with_angle(angle);
    }
    if let Some(x_axis) = x_axis {
        annot = annot.with_x_axis(x_axis);
    }
    if let Some(y_axis) = y_axis {
        annot = annot.with_y_axis(y_axis);
    }
    if let Some(z_pos) = z_pos {
        annot = annot.with_zpos(z_pos);
    }

    Ok(annot)
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_annot_coord_deserialize_float() {
        use super::annot::Coord;
        let json = "42.0";

        let coord: Coord = serde_json::from_str(json).unwrap();
        assert_eq!(coord, Coord::Data(42.0));
    }

    #[test]
    fn test_annot_coord_deserialize_int() {
        use super::annot::Coord;

        let json = "42";
        let coord: Coord = serde_json::from_str(json).unwrap();
        assert_eq!(coord, Coord::Data(42.0));
    }

    #[test]
    fn test_annot_coord_deserialize_tuple_data_int() {
        use super::annot::Coord;

        let json = "[42, \"data\"]";
        let coord: Coord = serde_json::from_str(json).unwrap();
        assert_eq!(coord, Coord::Data(42.0));
    }

    #[test]
    fn test_annot_coord_deserialize_tuple_data_float() {
        use super::annot::Coord;

        let json = "[42.0, \"data\"]";
        let coord: Coord = serde_json::from_str(json).unwrap();
        assert_eq!(coord, Coord::Data(42.0));
    }

    #[test]
    fn test_annot_coord_deserialize_tuple_plot() {
        use super::annot::Coord;

        let json = "[42.0, \"plot\"]";
        let coord: Coord = serde_json::from_str(json).unwrap();
        assert_eq!(coord, Coord::Plot(42.0));
    }

    #[test]
    fn test_annot_coord_deserialize_tuple_plot_neg() {
        use super::annot::Coord;

        let json = "[-42.0, \"plot\"]";
        let coord: Coord = serde_json::from_str(json).unwrap();
        assert_eq!(coord, Coord::Plot(-42.0));
    }
}
