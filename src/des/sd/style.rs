use std::borrow::Cow;
use std::marker::PhantomData;
use std::str::FromStr;

use serde::ser::SerializeStruct;
use serde::{Deserialize, Serialize};

use crate::Color;
use crate::style::{self, series, theme};

/////////////////////////////////
// MARK: style::theme::Color
/////////////////////////////////

impl Serialize for style::theme::Color {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        use style::theme;
        match self {
            theme::Color::Theme(theme::Col::Background) => "background".serialize(serializer),
            theme::Color::Theme(theme::Col::Foreground) => "foreground".serialize(serializer),
            theme::Color::Theme(theme::Col::LegendFill) => "legend-fill".serialize(serializer),
            theme::Color::Theme(theme::Col::LegendBorder) => "legend-border".serialize(serializer),
            theme::Color::Theme(theme::Col::Grid) => "grid".serialize(serializer),
            theme::Color::Fixed(rgba) => rgba.serialize(serializer),
        }
    }
}

impl<'de> Deserialize<'de> for style::theme::Color {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let s: Cow<'de, str> = serde::Deserialize::deserialize(deserializer)?;

        match s.as_ref() {
            "background" => Ok(style::theme::Color::Theme(theme::Col::Background)),
            "foreground" => Ok(style::theme::Color::Theme(theme::Col::Foreground)),
            "legend-fill" => Ok(style::theme::Color::Theme(theme::Col::LegendFill)),
            "legend-border" => Ok(style::theme::Color::Theme(theme::Col::LegendBorder)),
            "grid" => Ok(style::theme::Color::Theme(theme::Col::Grid)),
            _ => s
                .parse()
                .map(style::theme::Color::Fixed)
                .map_err(serde::de::Error::custom),
        }
    }
}

/* #endregion */

//////////////////////////////////
// MARK: style::series::Color
//////////////////////////////////

impl Serialize for style::series::Color {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        use style::series;
        match self {
            series::Color::Auto => "auto".serialize(serializer),
            series::Color::Index(idx) => idx.0.serialize(serializer),
            series::Color::Fixed(rgba) => rgba.serialize(serializer),
        }
    }
}

impl<'de> Deserialize<'de> for style::series::Color {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(SeriesColorVisitor)
    }
}
struct SeriesColorVisitor;

impl<'de> serde::de::Visitor<'de> for SeriesColorVisitor {
    type Value = style::series::Color;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a series color string or an index or a color")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        match value {
            "auto" => Ok(style::series::Color::Auto),
            _ => Err(E::unknown_variant(value, &["auto"])),
        }
    }

    fn visit_i64<E>(self, v: i64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        if v < 0 {
            return Err(E::custom("expected a non-negative integer"));
        }
        self.visit_u64(v as u64)
    }

    fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(style::series::Color::Index(style::series::IndexColor(
            value as usize,
        )))
    }
}

/////////////////////////
// MARK: style::Fill
/////////////////////////

impl<C> Serialize for style::Fill<C>
where
    C: Serialize + Color,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let style::Fill::Solid { color, opacity } = self;

        if let Some(opacity) = opacity {
            if *opacity == 1.0 {
                color.serialize(serializer)
            } else {
                let mut state = serializer.serialize_struct("Fill", 2)?;
                state.serialize_field("color", color)?;
                state.serialize_field("opacity", opacity)?;
                state.end()
            }
        } else {
            color.serialize(serializer)
        }
    }
}

impl<'de, C> Deserialize<'de> for style::Fill<C>
where
    C: Deserialize<'de> + Color + FromStr,
    <C as FromStr>::Err: std::fmt::Display,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(FillVisitor {
            _phantom: PhantomData,
        })
    }
}

struct FillVisitor<C> {
    _phantom: PhantomData<C>,
}

impl<'de, C> serde::de::Visitor<'de> for FillVisitor<C>
where
    C: Deserialize<'de> + Color + FromStr,
    <C as FromStr>::Err: std::fmt::Display,
{
    type Value = style::Fill<C>;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a fill color or a map with color and opacity")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        let color = value.parse::<C>().map_err(E::custom)?;
        Ok(style::Fill::Solid {
            color,
            opacity: None,
        })
    }

    fn visit_map<A>(self, map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        let color = C::deserialize(serde::de::value::MapAccessDeserializer::new(map))?;
        Ok(style::Fill::Solid {
            color,
            opacity: None,
        })
    }
}

////////////////////////////////
// MARK: style::LinePattern
////////////////////////////////

impl Serialize for style::LinePattern {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        use style::LinePattern;
        match self {
            LinePattern::Solid => "solid".serialize(serializer),
            LinePattern::Dashed => "dashed".serialize(serializer),
            LinePattern::Dot => "dotted".serialize(serializer),
            LinePattern::DashDot => "dash-dot".serialize(serializer),
            LinePattern::Dash(dash) => dash.0.serialize(serializer),
        }
    }
}

impl<'de> Deserialize<'de> for style::LinePattern {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(LinePatternVisitor)
    }
}

struct LinePatternVisitor;

impl<'de> serde::de::Visitor<'de> for LinePatternVisitor {
    type Value = style::LinePattern;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a line pattern string or a dash array")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        match value {
            "solid" => Ok(style::LinePattern::Solid),
            "dashed" => Ok(style::LinePattern::Dashed),
            "dotted" => Ok(style::LinePattern::Dot),
            "dash-dot" => Ok(style::LinePattern::DashDot),
            _ => Err(E::unknown_variant(
                value,
                &["solid", "dashed", "dotted", "dash-dot"],
            )),
        }
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let mut dash: Vec<f32> = if let Some(sz) = seq.size_hint() {
            Vec::with_capacity(sz)
        } else {
            Vec::new()
        };

        while let Some(value) = seq.next_element()? {
            dash.push(value);
        }
        Ok(style::LinePattern::Dash(style::Dash(dash)))
    }
}

///////////////////////////
// MARK: style::Stroke
///////////////////////////

impl<C> Serialize for style::Stroke<C>
where
    C: Serialize + Color + style::DefaultStrokeWidth + PartialEq,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serialize_stroke(self, None, "Stroke", serializer)
    }
}

impl<'de, C> Deserialize<'de> for style::Stroke<C>
where
    C: Deserialize<'de> + Color + style::DefaultStrokeWidth + FromStr,
    <C as FromStr>::Err: std::fmt::Display,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(StrokeVisitor::new("Stroke", None))
    }
}

pub fn serialize_stroke<C, S>(
    stroke: &style::Stroke<C>,
    default_stroke: Option<style::Stroke<C>>,
    name: &'static str,
    serializer: S,
) -> Result<S::Ok, S::Error>
where
    C: Serialize + Color + style::DefaultStrokeWidth + PartialEq,
    S: serde::Serializer,
{
    let default_width = C::default_stroke_width();

    let (has_default_color, has_default_width, has_default_pattern, has_default_opacity) =
        if let Some(default) = default_stroke {
            (
                default.color == stroke.color,
                default.width == stroke.width,
                default.pattern == stroke.pattern,
                default.opacity == stroke.opacity,
            )
        } else {
            (
                false,
                stroke.width == default_width,
                stroke.pattern == Default::default(),
                stroke.opacity.unwrap_or(1.0) == 1.0,
            )
        };

    match (
        has_default_color,
        has_default_width,
        has_default_pattern,
        has_default_opacity,
    ) {
        (true, true, true, true) => "auto".serialize(serializer),
        (false, true, true, true) => stroke.color.serialize(serializer),
        (true, false, true, true) => stroke.pattern.serialize(serializer),
        (true, true, false, true) => stroke.pattern.serialize(serializer),
        _ => {
            let fields = (!has_default_color as usize)
                + (!has_default_width as usize)
                + (!has_default_pattern as usize)
                + (!has_default_opacity as usize);
            let mut state = serializer.serialize_struct(name, fields)?;
            if !has_default_color {
                state.serialize_field("color", &stroke.color)?;
            }
            if !has_default_width {
                state.serialize_field("width", &stroke.width)?;
            }
            if !has_default_pattern {
                state.serialize_field("pattern", &stroke.pattern)?;
            }
            if !has_default_opacity {
                state.serialize_field("opacity", &stroke.opacity.unwrap_or(1.0))?;
            }
            state.end()
        }
    }
}

pub struct StrokeVisitor<C>
where
    C: Color,
{
    name: &'static str,
    default_stroke: Option<style::Stroke<C>>,
}

impl<C> StrokeVisitor<C>
where
    C: Color,
{
    pub fn new(name: &'static str, default_stroke: Option<style::Stroke<C>>) -> Self {
        Self {
            name,
            default_stroke,
        }
    }
}

impl<'de, C> serde::de::Visitor<'de> for StrokeVisitor<C>
where
    C: Deserialize<'de> + Color + style::DefaultStrokeWidth + FromStr,
    <C as FromStr>::Err: std::fmt::Display,
{
    type Value = style::Stroke<C>;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str(format!("a {} object or 'auto'", self.name).as_str())
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        if value == "auto" {
            if let Some(default) = self.default_stroke {
                Ok(default)
            } else {
                Err(serde::de::Error::custom(format!(
                    "'auto' is not a valid value for {} because there is no default stroke defined",
                    self.name
                )))
            }
        } else {
            let color = value.parse().map_err(|_| {
                serde::de::Error::custom(format!(
                    "Invalid color string for {}: expected 'auto' or a color string",
                    self.name
                ))
            })?;

            if let Some(default) = self.default_stroke {
                Ok(Self::Value::from(style::Stroke {
                    color,
                    width: default.width,
                    pattern: default.pattern,
                    opacity: default.opacity,
                }))
            } else {
                Ok(Self::Value::from(style::Stroke {
                    color,
                    width: C::default_stroke_width(),
                    pattern: Default::default(),
                    opacity: None,
                }))
            }
        }
    }

    fn visit_f64<E>(self, value: f64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        let Some(default) = self.default_stroke else {
            return Err(serde::de::Error::custom(format!(
                "Numeric value is not valid for {} because there is no default stroke color defined",
                self.name
            )));
        };

        if value <= 0.0 {
            return Err(serde::de::Error::custom(format!(
                "Invalid stroke width for {}: width cannot be null or negative",
                self.name
            )));
        }

        let width = value as f32;
        Ok(style::Stroke {
            color: default.color,
            width,
            pattern: default.pattern,
            opacity: default.opacity,
        })
    }

    fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        self.visit_f64(value as f64)
    }

    fn visit_i64<E>(self, value: i64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        self.visit_f64(value as f64)
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        super::deserialize_map_fields!(
            'de, map,
            "color" => color: Option<C>,
            "width" => width: Option<f32>,
            "pattern" => pattern: Option<style::LinePattern>,
            "opacity" => opacity: Option<f32>,
        );
        if let Some(default) = self.default_stroke {
            Ok(style::Stroke {
                color: color.unwrap_or(default.color),
                width: width.unwrap_or(default.width),
                pattern: pattern.unwrap_or(default.pattern),
                opacity: opacity.or(default.opacity),
            })
        } else {
            Ok(style::Stroke {
                color: color.ok_or_else(|| serde::de::Error::missing_field("color"))?,
                width: width.unwrap_or_else(|| C::default_stroke_width()),
                pattern: pattern.unwrap_or_default(),
                opacity,
            })
        }
    }
}

///////////////////////////
// MARK: style::Marker
///////////////////////////

trait DefaultColor: Color {
    fn default_color() -> Option<Self>;
}

impl DefaultColor for theme::Color {
    fn default_color() -> Option<Self> {
        None
    }
}

impl DefaultColor for series::Color {
    fn default_color() -> Option<Self> {
        Some(series::Color::Auto)
    }
}

impl<C> Serialize for style::Marker<C>
where
    C: Serialize + Color + DefaultColor + style::DefaultStrokeWidth + PartialEq,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let style::Marker {
            size,
            shape,
            fill,
            stroke,
        } = self;

        let default_color = C::default_color();
        let default_stroke = default_color.as_ref().map(|color| style::Stroke {
            color: color.clone(),
            width: C::default_stroke_width(),
            pattern: style::LinePattern::default(),
            opacity: None,
        });

        let has_default_size = size == &style::MarkerSize::default();
        let has_default_shape = shape == &style::MarkerShape::default();
        let default_fill = default_color.as_ref().map(|color| style::Fill::Solid {
            color: color.clone(),
            opacity: None,
        });
        let has_default_stroke =
            default_stroke.is_some() && stroke.as_ref() == default_stroke.as_ref();
        let has_default_fill = default_fill.is_some() && fill.as_ref() == default_fill.as_ref();

        // if all defaults, serialize as the shape only
        // if default shape and non-default color, serialize as the color only
        // otherwise, serialize as a struct with all non-default fields
        if has_default_size && has_default_fill && has_default_stroke {
            shape.serialize(serializer)
        } else if has_default_shape && has_default_fill && has_default_stroke {
            size.serialize(serializer)
        } else {
            let mut state = serializer.serialize_struct("Marker", 3)?;
            state.serialize_field("shape", shape)?;
            if !has_default_size {
                state.serialize_field("size", size)?;
            }
            if !has_default_fill {
                state.serialize_field("fill", fill)?;
            }
            if !has_default_stroke {
                state.serialize_field("stroke", stroke)?;
            }
            state.end()
        }
    }
}

impl<'de, C> Deserialize<'de> for style::Marker<C>
where
    C: Deserialize<'de> + Color + DefaultColor + style::DefaultStrokeWidth + FromStr,
    <C as FromStr>::Err: std::fmt::Display,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(MarkerVisitor {
            _phantom: PhantomData,
        })
    }
}

struct MarkerVisitor<C> {
    _phantom: PhantomData<C>,
}

impl<'de, C> serde::de::Visitor<'de> for MarkerVisitor<C>
where
    C: Deserialize<'de> + Color + DefaultColor + style::DefaultStrokeWidth + FromStr,
    <C as FromStr>::Err: std::fmt::Display,
{
    type Value = style::Marker<C>;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a marker shape or a marker object")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        if let Some(shape) = str_to_shape(value) {
            let default_color = C::default_color().ok_or_else(|| {
                E::custom(format!(
                    "cannot use shape-only marker without a default color: {}",
                    value
                ))
            })?;
            let mut marker = style::Marker::new_with_color(default_color);
            marker.shape = shape;
            Ok(marker)
        } else if let Ok(color) = value.parse::<C>() {
            Ok(style::Marker::new_with_color(color))
        } else {
            return Err(E::custom(format!("invalid marker value: {}", value)));
        }
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        let mut shape: Option<style::MarkerShape> = None;
        let mut size: Option<style::MarkerSize> = None;
        let mut fill: Option<style::Fill<C>> = None;
        let mut stroke: Option<style::Stroke<C>> = None;
        let mut color: Option<C> = None;
        let mut fill_opacity: Option<f32> = None;

        while let Some(key) = map.next_key::<Cow<'de, str>>()? {
            match key.as_ref() {
                "shape" => shape = Some(map.next_value()?),
                "size" => size = Some(map.next_value()?),
                "fill" => fill = Some(map.next_value()?),
                "stroke" => stroke = Some(map.next_value()?),
                "color" => color = Some(map.next_value()?),
                "fill-opacity" => fill_opacity = Some(map.next_value()?),
                _ => {
                    return Err(serde::de::Error::unknown_field(
                        key.as_ref(),
                        &["shape", "size", "fill", "stroke", "color", "fill-opacity"],
                    ));
                }
            }
        }

        let mut marker = style::Marker {
            shape: shape.unwrap_or_default(),
            size: size.unwrap_or_default(),
            fill,
            stroke,
        };
        if let Some(color) = color {
            marker = marker.with_color(color);
        }
        if let Some(opacity) = fill_opacity {
            marker = marker.with_fill_opacity(opacity);
        }
        Ok(marker)
    }
}

///////////////////////////
// MARK: style::MarkerShape
///////////////////////////

const SHAPE_STRS: &[&str] = &[
    "circle",
    "square",
    "diamond",
    "cross",
    "plus",
    "triangle-up",
    "triangle-down",
    "triangle-left",
    "triangle-right",
];

fn shape_to_str(shape: &style::MarkerShape) -> &'static str {
    match shape {
        style::MarkerShape::Circle => "circle",
        style::MarkerShape::Square => "square",
        style::MarkerShape::Diamond => "diamond",
        style::MarkerShape::Cross => "cross",
        style::MarkerShape::Plus => "plus",
        style::MarkerShape::TriangleUp => "triangle-up",
        style::MarkerShape::TriangleDown => "triangle-down",
        style::MarkerShape::TriangleLeft => "triangle-left",
        style::MarkerShape::TriangleRight => "triangle-right",
    }
}

fn str_to_shape(s: &str) -> Option<style::MarkerShape> {
    match s {
        "circle" => Some(style::MarkerShape::Circle),
        "square" => Some(style::MarkerShape::Square),
        "diamond" => Some(style::MarkerShape::Diamond),
        "cross" => Some(style::MarkerShape::Cross),
        "plus" => Some(style::MarkerShape::Plus),
        "triangle-up" => Some(style::MarkerShape::TriangleUp),
        "triangle-down" => Some(style::MarkerShape::TriangleDown),
        "triangle-left" => Some(style::MarkerShape::TriangleLeft),
        "triangle-right" => Some(style::MarkerShape::TriangleRight),
        _ => None,
    }
}

impl serde::Serialize for style::MarkerShape {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        shape_to_str(self).serialize(serializer)
    }
}

impl<'de> Deserialize<'de> for style::MarkerShape {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let s: Cow<'de, str> = Deserialize::deserialize(deserializer)?;

        match str_to_shape(s.as_ref()) {
            Some(shape) => Ok(shape),
            None => Err(serde::de::Error::unknown_variant(s.as_ref(), SHAPE_STRS)),
        }
    }
}

///////////////////////////
// MARK: style::MarkerSize
///////////////////////////

impl serde::Serialize for style::MarkerSize {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        self.0.serialize(serializer)
    }
}

impl<'de> Deserialize<'de> for style::MarkerSize {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let size = f32::deserialize(deserializer)?;
        Ok(style::MarkerSize(size))
    }
}
