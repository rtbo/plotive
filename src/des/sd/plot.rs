use serde::Deserialize;
use serde::ser::{SerializeSeq, SerializeStruct, SerializeTuple};
use serde_value::Value;

use crate::des::sd::axis::{DeXAxis, DeYAxis};
use crate::des::sd::{self, deserialize_map_fields, deserialize_tagged_map_fields};
use crate::des::{Annotation, Plot, PlotLegend, Subplots, Text, axis, colorbar, plot, series};
use crate::style::theme;

// MARK: Plot

struct SerPlot<'a> {
    plot: &'a Plot,
    subplot: Option<(u32, u32)>,
}

struct DePlot {
    plot: Plot,
    subplot: Option<(u32, u32)>,
}

impl serde::Serialize for Plot {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let plot = SerPlot {
            plot: self,
            subplot: None,
        };
        plot.serialize(serializer)
    }
}

impl serde::Serialize for SerPlot<'_> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("Plot", 2)?;
        if let Some(subplot) = self.subplot {
            state.serialize_field("subplot", &subplot)?;
        }

        if let Some(title) = self.plot.title() {
            state.serialize_field("title", &title)?;
        }

        if self.plot.series().len() == 1 {
            state.serialize_field("series", &self.plot.series()[0])?;
        } else {
            state.serialize_field("series", &self.plot.series())?;
        }

        serialize_axes(&mut state, self.plot.x_axes(), sd::axis::Dir::X)?;
        serialize_axes(&mut state, self.plot.y_axes(), sd::axis::Dir::Y)?;

        if let Some(fill) = self.plot.fill() {
            state.serialize_field("fill", &fill)?;
        }

        if self.plot.border() != Some(&plot::Border::default()) {
            state.serialize_field("border", &self.plot.border())?;
        }

        if self.plot.insets() != Some(&plot::Insets::default()) {
            state.serialize_field("insets", &self.plot.insets())?;
        }

        if let Some(legend) = self.plot.legend() {
            state.serialize_field("legend", &legend)?;
        }

        if let Some(colorbar) = self.plot.colorbar() {
            state.serialize_field("colorbar", &colorbar)?;
        }

        if !self.plot.annotations().is_empty() {
            state.serialize_field("annotations", self.plot.annotations())?;
        }

        state.end()
    }
}

fn serialize_axes<S>(state: &mut S, axes: &[axis::Axis], dir: sd::axis::Dir) -> Result<(), S::Error>
where
    S: serde::ser::SerializeStruct,
{
    if axes.len() == 1 {
        let axis = super::axis::SerAxis {
            axis: &axes[0],
            dir,
        };
        let field_name = match dir {
            sd::axis::Dir::X => "xAxis",
            sd::axis::Dir::Y => "yAxis",
            sd::axis::Dir::Unknown => unreachable!(),
        };
        if axis.axis != &axis::Axis::default() {
            state.serialize_field(field_name, &axis)?;
        }
    } else if !axes.is_empty() {
        // TODO: avoid the vec allocation
        let oriented_axes = super::axis::SerAxes { axes, dir };
        let field_name = match dir {
            sd::axis::Dir::X => "xAxes",
            sd::axis::Dir::Y => "yAxes",
            sd::axis::Dir::Unknown => unreachable!(),
        };
        state.serialize_field(field_name, &oriented_axes)?;
    }
    Ok(())
}

struct DeSeries(Vec<series::Series>);

impl<'de> serde::Deserialize<'de> for DeSeries {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct SeriesVisitor;

        impl<'de> serde::de::Visitor<'de> for SeriesVisitor {
            type Value = DeSeries;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a series object or an array of series objects")
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::SeqAccess<'de>,
            {
                let mut series = Vec::<series::Series>::with_capacity(1);
                while let Some(s) = seq.next_element()? {
                    series.push(s);
                }
                Ok(DeSeries(series))
            }

            fn visit_map<A>(self, map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                let s =
                    series::Series::deserialize(serde::de::value::MapAccessDeserializer::new(map))?;
                Ok(DeSeries(vec![s]))
            }
        }

        deserializer.deserialize_any(SeriesVisitor)
    }
}

impl<'de> serde::Deserialize<'de> for Plot {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let de_plot = DePlot::deserialize(deserializer)?;
        if de_plot.subplot.is_some() {
            return Err(serde::de::Error::custom(
                "The 'subplot' field is not allowed when deserializing a Plot directly. It is only used when deserializing a Figure with multiple plots.",
            ));
        }
        Ok(de_plot.plot)
    }
}

impl<'de> serde::Deserialize<'de> for DePlot {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_map(PlotVisitor)
    }
}

struct PlotVisitor;

impl<'de> serde::de::Visitor<'de> for PlotVisitor {
    type Value = DePlot;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a plot object")
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        deserialize_map_fields!(
            'de, map,
            "subplot" => subplot: Option<(u32, u32)>,
            "series" => series: Option<DeSeries>,
            "title" => title: Option<Text>,
            "xAxis" => x_axis: Option<DeXAxis>,
            "yAxis" => y_axis: Option<DeYAxis>,
            "xAxes" => x_axes: Option<Vec<DeXAxis>>,
            "yAxes" => y_axes: Option<Vec<DeYAxis>>,
            "fill" => fill: Option<theme::Fill>,
            "border" => border: Option<Option<plot::Border>>,
            "insets" => insets: Option<Option<plot::Insets>>,
            "legend" => legend: Option<PlotLegend>,
            "colorbar" => colorbar: Option<colorbar::ColorBar>,
            "annotations" => annotations: Option<Vec<Annotation>>,
        );

        let Some(series) = series.map(|s| s.0) else {
            return Err(serde::de::Error::missing_field("series"));
        };

        let mut plot = Plot::new(series);
        if let Some(title) = title {
            plot = plot.with_title(title);
        }
        match (x_axis, x_axes) {
            (Some(x_axis), None) => plot = plot.with_x_axis(x_axis.axis),
            (None, Some(x_axes)) => {
                for x_axis in x_axes {
                    plot = plot.with_x_axis(x_axis.axis);
                }
            }
            (Some(_), Some(_)) => {
                return Err(serde::de::Error::custom(
                    "Both 'x_axis' and 'x_axes' fields cannot be specified at the same time",
                ));
            }
            (None, None) => {}
        }
        match (y_axis, y_axes) {
            (Some(y_axis), None) => plot = plot.with_y_axis(y_axis.axis),
            (None, Some(y_axes)) => {
                for y_axis in y_axes {
                    plot = plot.with_y_axis(y_axis.axis);
                }
            }
            (Some(_), Some(_)) => {
                return Err(serde::de::Error::custom(
                    "Both 'y_axis' and 'y_axes' fields cannot be specified at the same time",
                ));
            }
            (None, None) => {}
        }
        if let Some(fill) = fill {
            plot = plot.with_fill(fill);
        }
        if let Some(border) = border {
            plot = plot.with_border(border);
        }
        if let Some(insets) = insets {
            plot = plot.with_insets(insets);
        }
        if let Some(legend) = legend {
            plot = plot.with_legend(legend);
        }
        if let Some(colorbar) = colorbar {
            plot = plot.with_colorbar(colorbar);
        }
        if let Some(annotations) = annotations {
            for annotation in annotations {
                plot = plot.with_annotation(annotation);
            }
        }
        Ok(DePlot { plot, subplot })
    }
}

// MARK: Subplots

struct DePlots(Vec<DePlot>);

impl serde::Serialize for Subplots {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_seq(Some(self.len()))?;

        // Serialize the subplot property only if we are not in the default case of all plots contiguous in the same column.
        let single_column = self.cols() == 1 && self.rows() == self.len() as u32;

        for row in 0..self.rows() {
            for col in 0..self.cols() {
                if let Some(plot) = self.plot((row, col)) {
                    let plot = SerPlot {
                        plot,
                        subplot: if single_column {
                            None
                        } else {
                            Some((row, col))
                        },
                    };
                    state.serialize_element(&plot)?;
                }
            }
        }
        state.end()
    }
}

impl<'de> serde::Deserialize<'de> for DePlots {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct PlotsVisitor;

        impl<'de> serde::de::Visitor<'de> for PlotsVisitor {
            type Value = DePlots;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("an array of plot objects")
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::SeqAccess<'de>,
            {
                let capacity = seq.size_hint().unwrap_or(0);
                let mut plots = Vec::<DePlot>::with_capacity(capacity);
                while let Some(plot) = seq.next_element()? {
                    plots.push(plot);
                }
                Ok(DePlots(plots))
            }
        }

        deserializer.deserialize_seq(PlotsVisitor)
    }
}

impl<'de> serde::Deserialize<'de> for Subplots {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let DePlots(de_plots) = DePlots::deserialize(deserializer)?;
        let mut max_row = None::<u32>;
        let mut max_col = None::<u32>;
        for DePlot { subplot, .. } in &de_plots {
            if let Some((row, col)) = subplot {
                match max_row.as_mut() {
                    Some(r) => {
                        *r = (*r).max(*row);
                    }
                    None => max_row = Some(*row),
                }
                match max_col.as_mut() {
                    Some(c) => {
                        *c = (*c).max(*col);
                    }
                    None => max_col = Some(*col),
                }
            }
        }
        let rows = max_row.map(|r| r + 1).unwrap_or(de_plots.len() as u32);
        let cols = max_col.map(|c| c + 1).unwrap_or(1);

        let mut subplots = Subplots::new(rows, cols);

        for (i, DePlot { plot, subplot }) in de_plots.iter().enumerate() {
            let row = subplot.map(|(r, _)| r).unwrap_or(i as u32);
            let col = subplot.map(|(_, c)| c).unwrap_or(0);
            subplots = subplots.with_plot((row, col), plot.clone());
        }
        Ok(subplots)
    }
}

// MARK: plot::Border

impl serde::Serialize for plot::Border {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            plot::Border::Box(border) => {
                if border == &plot::BoxBorder::default() {
                    "box".serialize(serializer)
                } else {
                    let mut state = serializer.serialize_struct("Border", 2)?;
                    state.serialize_field("type", "box")?;
                    state.serialize_field("stroke", &border.0)?;
                    state.end()
                }
            }
            plot::Border::Axis(border) => {
                if border == &plot::AxisBorder::default() {
                    "axis".serialize(serializer)
                } else {
                    let mut state = serializer.serialize_struct("Border", 2)?;
                    state.serialize_field("type", "axis")?;
                    state.serialize_field("stroke", &border.0)?;
                    state.end()
                }
            }
            plot::Border::AxisArrow(border) => {
                let default = plot::AxisArrowBorder::default();
                if border == &default {
                    "arrow".serialize(serializer)
                } else {
                    let mut state = serializer.serialize_struct("Border", 2)?;
                    state.serialize_field("type", "arrow")?;
                    if border.stroke != default.stroke {
                        state.serialize_field("stroke", &border.stroke)?;
                    }
                    if border.size != default.size {
                        state.serialize_field("size", &border.size)?;
                    }
                    if border.overflow != default.overflow {
                        state.serialize_field("overflow", &border.overflow)?;
                    }
                    state.end()
                }
            }
        }
    }
}

impl<'de> serde::Deserialize<'de> for plot::Border {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(BorderVisitor)
    }
}

struct BorderVisitor;

impl<'de> serde::de::Visitor<'de> for BorderVisitor {
    type Value = plot::Border;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter
            .write_str("a border type string, a theme color/stroke, or a map with a 'type' field")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        match value {
            "box" => Ok(plot::Border::Box(Default::default())),
            "axis" => Ok(plot::Border::Axis(Default::default())),
            "arrow" => Ok(plot::Border::AxisArrow(Default::default())),
            _ => {
                let stroke =
                    theme::Stroke::deserialize(serde::de::value::StrDeserializer::<E>::new(value))?;
                Ok(plot::Border::Box(plot::BoxBorder(stroke)))
            }
        }
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
                    "box" => deserialize_box_border(&mut map, buffered).map(plot::Border::Box),
                    "axis" => deserialize_axis_border(&mut map, buffered).map(plot::Border::Axis),
                    "arrow" => deserialize_axis_arrow_border(&mut map, buffered)
                        .map(plot::Border::AxisArrow),
                    _ => Err(serde::de::Error::unknown_variant(
                        &tag,
                        &["box", "axis", "arrow"],
                    )),
                };
            }

            let value = map.next_value::<Value>()?;
            buffered.push((key, value));
        }

        let value = Value::Map(
            buffered
                .into_iter()
                .map(|(key, value)| (Value::String(key), value))
                .collect(),
        );
        let stroke = value
            .deserialize_into::<theme::Stroke>()
            .map_err(serde::de::Error::custom)?;
        Ok(plot::Border::Box(plot::BoxBorder(stroke)))
    }
}

fn deserialize_box_border<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<plot::BoxBorder, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields! {
        'de, map, buffered,
        "stroke" => stroke: Option<theme::Stroke>,
    }

    let border = stroke.map(plot::BoxBorder).unwrap_or_default();
    Ok(border)
}

fn deserialize_axis_border<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<plot::AxisBorder, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields! {
        'de, map, buffered,
        "stroke" => stroke: Option<theme::Stroke>,
    }

    let border = stroke.map(plot::AxisBorder).unwrap_or_default();
    Ok(border)
}

fn deserialize_axis_arrow_border<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<plot::AxisArrowBorder, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields! {
        'de, map, buffered,
        "stroke" => stroke: Option<theme::Stroke>,
        "size" => size: Option<f32>,
        "overflow" => overflow: Option<f32>,
    }

    let mut border = plot::AxisArrowBorder::default();
    if let Some(stroke) = stroke {
        border.stroke = stroke;
    }
    if let Some(size) = size {
        border.size = size;
    }
    if let Some(overflow) = overflow {
        border.overflow = overflow;
    }
    Ok(border)
}

// MARK: Insets

impl serde::Serialize for plot::Insets {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            plot::Insets::Auto => "auto".serialize(serializer),
            plot::Insets::Fixed(x, y) => {
                if x == y {
                    x.serialize(serializer)
                } else {
                    let mut state = serializer.serialize_tuple(2)?;
                    state.serialize_element(x)?;
                    state.serialize_element(y)?;
                    state.end()
                }
            }
        }
    }
}

impl<'de> serde::Deserialize<'de> for plot::Insets {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct InsetsVisitor;

        impl<'de> serde::de::Visitor<'de> for InsetsVisitor {
            type Value = plot::Insets;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a number, a tuple of two numbers, or the string 'auto'")
            }

            fn visit_f64<E>(self, value: f64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                let value = value as f32;
                Ok(plot::Insets::Fixed(value, value))
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::SeqAccess<'de>,
            {
                let x = seq
                    .next_element()?
                    .ok_or_else(|| serde::de::Error::invalid_length(0, &self))?;
                let y = seq
                    .next_element()?
                    .ok_or_else(|| serde::de::Error::invalid_length(1, &self))?;
                Ok(plot::Insets::Fixed(x, y))
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                if value == "auto" {
                    Ok(plot::Insets::Auto)
                } else {
                    Err(serde::de::Error::invalid_value(
                        serde::de::Unexpected::Str(value),
                        &self,
                    ))
                }
            }
        }

        deserializer.deserialize_any(InsetsVisitor)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_plot_ser() {
        let plot = Plot::new(vec![series::Line::new("x".into(), "y".into()).into()]);

        let serialized = serde_json::to_string(&plot).unwrap();
        let expected = r#"{"series":{"type":"line","x":"x","y":"y"}}"#;
        assert_eq!(serialized, expected);
    }

    #[test]
    fn test_plot_de() {
        let json = r#"{"series":{"type":"line","x":"x","y":"y"}}"#;
        let plot: Plot = serde_json::from_str(json).unwrap();

        let expected = Plot::new(vec![series::Line::new("x".into(), "y".into()).into()]);
        assert_eq!(plot, expected);
    }
}
