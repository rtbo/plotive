use std::borrow::Cow;
use std::collections::HashMap;
use std::fmt;
use std::str::FromStr;
use std::sync::LazyLock;

use serde::Serialize;
use serde::de::IntoDeserializer;
use serde::ser::SerializeMap;

use crate::color::{css4, xkcd};
use crate::geom::{Padding, Size};
use crate::style::{Color, DefaultColor, DefaultStroke, DefaultStrokeWidth, Stroke};
use crate::{Rgb8, Rgba8, geom, style};

/// Macro to deserialize fields from a map, with support for optional fields and default values.
///
/// It matches 3 types of fields differently:
///  - Option<Option<T>>: The field is optional, and if present, it can be null.
///     - If the field is missing, it will be None.
///     - If the field is present but null, it will be Some(None).
///     - If the field is present and has a value, it will be Some(Some(value)).
///  - Option<T>: The field is optional, and if present, it can be null
///     - If the field is missing, it will be None.
///     - If the field is present and null, it will be None.
///     - If the field is present and has a value, it will be Some(value).
///  - T: The field is required, and if missing, it will return an error.
#[macro_export]
macro_rules! deserialize_map_fields {
    ($de:lifetime, $map:expr, $($fields:tt)+) => {
        $crate::deserialize_map_fields!(@parse [$de, $map] [] [] [] [] ; $($fields)+);
    };

    (@parse
        [$de:lifetime, $map:expr]
        [$($decls:tt)*]
        [$($arms:tt)*]
        [$($field_names:expr,)*]
        [$($binds:tt)*]
        ;
        $key:expr => $name:ident: Option<Option<$inner:ty>>,
        $($rest:tt)*
    ) => {
        $crate::deserialize_map_fields!(
            @parse
            [$de, $map]
            [
                $($decls)*
                let mut $name = None::<Option<$inner>>;
            ]
            [
                $($arms)*
                $key => {
                    if $name.is_some() {
                        let _: Option<$inner> = $map.next_value()?;
                        return Err(serde::de::Error::duplicate_field($key));
                    }
                    $name = Some($map.next_value::<Option<$inner>>()?);
                }
            ]
            [$($field_names,)* $key,]
            [
                $($binds)*
                let $name = $name;
            ]
            ;
            $($rest)*
        );
    };

    (@parse
        [$de:lifetime, $map:expr]
        [$($decls:tt)*]
        [$($arms:tt)*]
        [$($field_names:expr,)*]
        [$($binds:tt)*]
        ;
        $key:expr => $name:ident: Option<$inner:ty>,
        $($rest:tt)*
    ) => {
        $crate::deserialize_map_fields!(
            @parse
            [$de, $map]
            [
                $($decls)*
                let mut $name = None::<Option<$inner>>;
            ]
            [
                $($arms)*
                $key => {
                    if $name.is_some() {
                        let _: Option<$inner> = $map.next_value()?;
                        return Err(serde::de::Error::duplicate_field($key));
                    }
                    $name = Some($map.next_value::<Option<$inner>>()?);
                }
            ]
            [$($field_names,)* $key,]
            [
                $($binds)*
                let $name = $name.flatten();
            ]
            ;
            $($rest)*
        );
    };

    (@parse
        [$de:lifetime, $map:expr]
        [$($decls:tt)*]
        [$($arms:tt)*]
        [$($field_names:expr,)*]
        [$($binds:tt)*]
        ;
        $key:expr => $name:ident: $ty:ty,
        $($rest:tt)*
    ) => {
        $crate::deserialize_map_fields!(
            @parse
            [$de, $map]
            [
                $($decls)*
                let mut $name = None::<$ty>;
            ]
            [
                $($arms)*
                $key => {
                    if $name.is_some() {
                        let _: $ty = $map.next_value()?;
                        return Err(serde::de::Error::duplicate_field($key));
                    }
                    $name = Some($map.next_value::<$ty>()?);
                }
            ]
            [$($field_names,)* $key,]
            [
                $($binds)*
                let $name = $name.ok_or_else(|| serde::de::Error::missing_field($key))?;
            ]
            ;
            $($rest)*
        );
    };

    (@parse
        [$de:lifetime, $map:expr]
        [$($decls:tt)*]
        [$($arms:tt)*]
        [$($field_names:expr,)*]
        [$($binds:tt)*]
        ;
    ) => {
        $($decls)*

        while let Some(key) = $map.next_key::<std::borrow::Cow<$de, str>>()? {
            match key.as_ref() {
                $($arms)*
                _ => {
                    return Err(serde::de::Error::unknown_field(
                        key.as_ref(),
                        &[$($field_names),*],
                    ));
                }
            }
        }

        $($binds)*
    };
}

pub use deserialize_map_fields;

// MARK: Color

static INVERSE_COLOR_MAP: LazyLock<HashMap<Rgba8, &'static str>> = LazyLock::new(|| {
    let mut map = HashMap::with_capacity(xkcd::COLORS.len() + css4::COLORS.len());
    map.extend(xkcd::COLORS.iter().map(|(name, rgba)| (*rgba, *name)));
    map.extend(css4::COLORS.iter().map(|(name, rgba)| (*rgba, *name)));
    map
});

impl serde::Serialize for Rgb8 {
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

impl serde::Serialize for Rgba8 {
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
struct ColorSeqVisitor;

impl<'de> serde::de::Visitor<'de> for ColorSeqVisitor {
    type Value = Vec<u8>;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("a color string or an RGB/RGBA tuple")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        let rgba = value.parse::<Rgba8>().map_err(E::custom)?;
        Ok(vec![rgba.r(), rgba.g(), rgba.b(), rgba.a()])
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let mut values = Vec::with_capacity(seq.size_hint().unwrap_or(4));
        while let Some(v) = seq.next_element::<u8>()? {
            values.push(v);
        }
        match values.len() {
            3 | 4 => Ok(values),
            len => Err(serde::de::Error::invalid_length(len, &self)),
        }
    }
}

impl<'de> serde::Deserialize<'de> for Rgb8 {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let values = deserializer.deserialize_any(ColorSeqVisitor)?;
        match values.as_slice() {
            [r, g, b] => Ok(Rgb8::new(*r, *g, *b)),
            [r, g, b, a] if *a == 255 => Ok(Rgb8::new(*r, *g, *b)),
            [..] => Err(serde::de::Error::custom(
                "RGB colors cannot include a non-opaque alpha component",
            )),
        }
    }
}

impl<'de> serde::Deserialize<'de> for Rgba8 {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let values = deserializer.deserialize_any(ColorSeqVisitor)?;
        match values.as_slice() {
            [r, g, b] => Ok(Rgba8::new(*r, *g, *b, 255)),
            [r, g, b, a] => Ok(Rgba8::new(*r, *g, *b, *a)),
            _ => unreachable!(),
        }
    }
}

/// A color that can be deserialized from a "auto" string (yielding None)
#[derive(Debug)]
struct AutoColor<C: std::fmt::Debug>(Option<C>);

impl<'de, C> serde::de::Deserialize<'de> for AutoColor<C>
where
    C: serde::de::Deserialize<'de> + std::fmt::Debug,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(AutoColorVisitor {
            phantom: std::marker::PhantomData,
        })
    }
}

struct AutoColorVisitor<C> {
    phantom: std::marker::PhantomData<C>,
}

impl<'de, C> serde::de::Visitor<'de> for AutoColorVisitor<C>
where
    C: serde::de::Deserialize<'de> + std::fmt::Debug,
{
    type Value = AutoColor<C>;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("'auto' or any value deserializable as the target color type")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        if value == "auto" {
            Ok(AutoColor(None))
        } else {
            let color = C::deserialize(value.into_deserializer())?;
            Ok(AutoColor(Some(color)))
        }
    }

    fn visit_borrowed_str<E>(self, value: &'de str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        self.visit_str(value)
    }

    fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        if value == "auto" {
            Ok(AutoColor(None))
        } else {
            let color = C::deserialize(value.into_deserializer())?;
            Ok(AutoColor(Some(color)))
        }
    }

    fn visit_bool<E>(self, value: bool) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        let color = C::deserialize(value.into_deserializer())?;
        Ok(AutoColor(Some(color)))
    }

    fn visit_i64<E>(self, value: i64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        let color = C::deserialize(value.into_deserializer())?;
        Ok(AutoColor(Some(color)))
    }

    fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        let color = C::deserialize(value.into_deserializer())?;
        Ok(AutoColor(Some(color)))
    }

    fn visit_f64<E>(self, value: f64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        let color = C::deserialize(value.into_deserializer())?;
        Ok(AutoColor(Some(color)))
    }

    fn visit_seq<A>(self, seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let color = C::deserialize(serde::de::value::SeqAccessDeserializer::new(seq))?;
        Ok(AutoColor(Some(color)))
    }

    fn visit_map<A>(self, map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        let color = C::deserialize(serde::de::value::MapAccessDeserializer::new(map))?;
        Ok(AutoColor(Some(color)))
    }
}

// MARK: style::Fill

impl<C> serde::Serialize for style::Fill<C>
where
    C: serde::Serialize,
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
                let mut state = serializer.serialize_map(Some(2))?;
                state.serialize_entry("color", color)?;
                state.serialize_entry("opacity", opacity)?;
                state.end()
            }
        } else {
            color.serialize(serializer)
        }
    }
}

impl<'de, C> serde::Deserialize<'de> for style::Fill<C>
where
    C: serde::Deserialize<'de> + Color + FromStr + DefaultColor + std::fmt::Debug,
    <C as FromStr>::Err: std::fmt::Display,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(FillVisitor {
            _phantom: std::marker::PhantomData,
        })
    }
}

struct FillVisitor<C> {
    _phantom: std::marker::PhantomData<C>,
}

impl<'de, C> serde::de::Visitor<'de> for FillVisitor<C>
where
    C: serde::de::Deserialize<'de> + Color + FromStr + DefaultColor + std::fmt::Debug,
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
        let color = if value == "auto" {
            C::default_fill_color().ok_or_else(|| E::custom("No default color available"))?
        } else {
            value.parse().map_err(E::custom)?
        };
        Ok(style::Fill::Solid {
            color,
            opacity: None,
        })
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        deserialize_map_fields!(
            'de, map,
            "color" => color: Option<AutoColor<C>>,
            "opacity" => opacity: Option<f32>,
        );

        let color = match (color, C::default_fill_color()) {
            (Some(AutoColor(Some(color))), _) => color,
            (_, Some(color)) => color,
            (Some(AutoColor(None)), _) => {
                return Err(serde::de::Error::custom(
                    "No default color available for 'auto'",
                ));
            }
            (_, None) => return Err(serde::de::Error::missing_field("color")),
        };

        Ok(style::Fill::Solid { color, opacity })
    }
}

// MARK: LinePattern

impl serde::Serialize for style::LinePattern {
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
            LinePattern::Custom(dash) => dash.serialize(serializer),
        }
    }
}

impl<'de> serde::de::Deserialize<'de> for style::LinePattern {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(LinePatternVisitor)
    }
}

struct LinePatternVisitor;

fn str_to_line_pattern(value: &str) -> Option<style::LinePattern> {
    match value {
        "solid" => Some(style::LinePattern::Solid),
        "dashed" => Some(style::LinePattern::Dashed),
        "dotted" => Some(style::LinePattern::Dot),
        "dash-dot" => Some(style::LinePattern::DashDot),
        _ => None,
    }
}

impl<'de> serde::de::Visitor<'de> for LinePatternVisitor {
    type Value = style::LinePattern;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a line pattern string or a dash array")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        str_to_line_pattern(value)
            .ok_or_else(|| E::unknown_variant(value, &["solid", "dashed", "dotted", "dash-dot"]))
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
        Ok(style::LinePattern::Custom(dash))
    }
}

// MARK: Stroke

impl<C> serde::Serialize for Stroke<C>
where
    C: serde::Serialize + DefaultStroke + DefaultStrokeWidth + PartialEq,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serialize_stroke(self, C::default_stroke(), serializer)
    }
}

impl<'de, C> serde::de::Deserialize<'de> for Stroke<C>
where
    C: serde::de::Deserialize<'de>
        + DefaultColor
        + DefaultStroke
        + DefaultStrokeWidth
        + FromStr
        + std::fmt::Debug,
    <C as FromStr>::Err: std::fmt::Display,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(StrokeVisitor::new("Stroke", C::default_stroke()))
    }
}

pub fn serialize_stroke<C, S>(
    stroke: &Stroke<C>,
    default_stroke: Option<Stroke<C>>,
    serializer: S,
) -> Result<S::Ok, S::Error>
where
    C: serde::Serialize + DefaultStrokeWidth + PartialEq,
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
        (true, true, false, true) => stroke.pattern.serialize(serializer),
        _ => {
            let mut state = serializer.serialize_map(None)?;
            if !has_default_color {
                state.serialize_entry("color", &stroke.color)?;
            }
            if !has_default_width {
                state.serialize_entry("width", &stroke.width)?;
            }
            if !has_default_pattern {
                state.serialize_entry("pattern", &stroke.pattern)?;
            }
            if !has_default_opacity {
                state.serialize_entry("opacity", &stroke.opacity.unwrap_or(1.0))?;
            }
            state.end()
        }
    }
}

pub struct StrokeVisitor<C> {
    name: &'static str,
    default_stroke: Option<Stroke<C>>,
}

impl<C> StrokeVisitor<C> {
    pub fn new(name: &'static str, default_stroke: Option<Stroke<C>>) -> Self {
        Self {
            name,
            default_stroke,
        }
    }

    fn accepts_compact_pattern(&self) -> bool {
        self.default_stroke.is_some()
    }

    fn accepted_string_forms(&self) -> &'static str {
        if self.accepts_compact_pattern() {
            "'auto', a line pattern, or a color string"
        } else {
            "a color string"
        }
    }

    fn expecting_description(&self) -> &'static str {
        if self.accepts_compact_pattern() {
            "a stroke object, 'auto', a stroke width, a line pattern, a dash array, or a color string"
        } else {
            "a stroke object or a color string"
        }
    }

    fn invalid_string_message(&self) -> String {
        format!(
            "Invalid string value for {}: expected {}",
            self.name,
            self.accepted_string_forms()
        )
    }

    fn no_default_dash_array_message(&self) -> String {
        format!(
            "Dash array is not valid for {} because there is no default stroke defined",
            self.name
        )
    }
}

impl<'de, C> serde::de::Visitor<'de> for StrokeVisitor<C>
where
    C: serde::de::Deserialize<'de>
        + DefaultColor
        + DefaultStroke
        + DefaultStrokeWidth
        + FromStr
        + std::fmt::Debug,
    <C as FromStr>::Err: std::fmt::Display,
{
    type Value = Stroke<C>;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str(self.expecting_description())
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
        } else if let Some(ref default) = self.default_stroke {
            if let Some(pattern) = str_to_line_pattern(value) {
                return Ok(Self::Value::from(Stroke {
                    color: default.color,
                    width: default.width,
                    pattern,
                    opacity: default.opacity,
                }));
            }

            let color = value
                .parse()
                .map_err(|_| serde::de::Error::custom(self.invalid_string_message()))?;

            Ok(Self::Value::from(Stroke {
                color,
                width: default.width,
                pattern: default.pattern.clone(),
                opacity: default.opacity,
            }))
        } else {
            let color = value
                .parse()
                .map_err(|_| serde::de::Error::custom(self.invalid_string_message()))?;

            Ok(Self::Value::from(Stroke {
                color,
                width: C::default_stroke_width(),
                pattern: Default::default(),
                opacity: None,
            }))
        }
    }

    // TODO: check seq definition for stroke: color or dash pattern ??

    // fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    // where
    //     A: serde::de::SeqAccess<'de>,
    // {
    //     let r = seq
    //         .next_element()?
    //         .ok_or_else(|| A::Error::custom("Expected red component"))?;
    //     let g = seq
    //         .next_element()?
    //         .ok_or_else(|| A::Error::custom("Expected green component"))?;
    //     let b = seq
    //         .next_element()?
    //         .ok_or_else(|| A::Error::custom("Expected blue component"))?;
    //     let a = seq.next_element()?.unwrap_or(255u8);

    //     let color: C = Rgba8::new(r, g, b, a).into();
    //     Ok(props::Outline {
    //         color,
    //         width: 1.0,
    //         pattern: props::LinePattern::Solid,
    //     })
    // }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let no_default_dash_array_message = self.no_default_dash_array_message();

        let Some(default) = self.default_stroke else {
            return Err(serde::de::Error::custom(no_default_dash_array_message));
        };

        let mut dash: Vec<f32> = if let Some(sz) = seq.size_hint() {
            Vec::with_capacity(sz)
        } else {
            Vec::new()
        };

        while let Some(value) = seq.next_element()? {
            dash.push(value);
        }

        Ok(Self::Value::from(Stroke {
            color: default.color,
            width: default.width,
            pattern: style::LinePattern::Custom(dash),
            opacity: default.opacity,
        }))
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        deserialize_map_fields!(
            'de, map,
            "color" => color: Option<AutoColor<C>>,
            "width" => width: Option<f32>,
            "pattern" => pattern: Option<style::LinePattern>,
            "opacity" => opacity: Option<f32>,
        );

        let color = match (
            color,
            self.default_stroke.as_ref(),
            C::default_stroke_color(),
        ) {
            (Some(AutoColor(Some(color))), _, _) => color,
            (_, Some(default), _) => default.color,
            (_, _, Some(color)) => color,
            (Some(AutoColor(None)), _, _) => {
                return Err(serde::de::Error::custom(
                    "No default color available for 'auto'",
                ));
            }
            (_, _, _) => return Err(serde::de::Error::missing_field("color")),
        };

        if let Some(default) = self.default_stroke {
            Ok(Stroke {
                color,
                width: width.unwrap_or(default.width),
                pattern: pattern.unwrap_or(default.pattern),
                opacity: opacity.or(default.opacity),
            })
        } else {
            Ok(Stroke {
                color,
                width: width.unwrap_or_else(|| C::default_stroke_width()),
                pattern: pattern.unwrap_or_default(),
                opacity,
            })
        }
    }
}

// MARK: Size and Padding

impl serde::Serialize for geom::Size {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        (self.width(), self.height()).serialize(serializer)
    }
}

impl<'de> serde::Deserialize<'de> for geom::Size {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct SizeVisitor;

        impl<'de> serde::de::Visitor<'de> for SizeVisitor {
            type Value = Size;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a [width, height] tuple or an object { width, height }")
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::SeqAccess<'de>,
            {
                let width = seq
                    .next_element::<f32>()?
                    .ok_or_else(|| serde::de::Error::invalid_length(0, &self))?;
                let height = seq
                    .next_element::<f32>()?
                    .ok_or_else(|| serde::de::Error::invalid_length(1, &self))?;
                Ok(Size::new(width, height))
            }

            fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                let mut width = None::<f32>;
                let mut height = None::<f32>;

                while let Some(key) = map.next_key::<std::borrow::Cow<'de, str>>()? {
                    match key.as_ref() {
                        "width" => {
                            if width.is_some() {
                                let _: f32 = map.next_value()?;
                                return Err(serde::de::Error::duplicate_field("width"));
                            }
                            width = Some(map.next_value()?);
                        }
                        "height" => {
                            if height.is_some() {
                                let _: f32 = map.next_value()?;
                                return Err(serde::de::Error::duplicate_field("height"));
                            }
                            height = Some(map.next_value()?);
                        }
                        _ => {
                            return Err(serde::de::Error::unknown_field(
                                key.as_ref(),
                                &["width", "height"],
                            ));
                        }
                    }
                }

                Ok(Size::new(
                    width.ok_or_else(|| serde::de::Error::missing_field("width"))?,
                    height.ok_or_else(|| serde::de::Error::missing_field("height"))?,
                ))
            }
        }

        deserializer.deserialize_any(SizeVisitor)
    }
}

impl serde::Serialize for geom::Padding {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            geom::Padding::Even(p) => p.serialize(serializer),
            geom::Padding::Center { ver, hor } => (ver, hor).serialize(serializer),
            geom::Padding::Custom {
                top,
                right,
                bottom,
                left,
            } => (top, right, bottom, left).serialize(serializer),
        }
    }
}

impl<'de> serde::Deserialize<'de> for Padding {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct PaddingVisitor;

        impl<'de> serde::de::Visitor<'de> for PaddingVisitor {
            type Value = Padding;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a single float for even padding, a tuple of two floats for center padding, or a tuple of four floats for custom padding")
            }

            fn visit_i64<E>(self, value: i64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(Padding::Even(value as f32))
            }

            fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(Padding::Even(value as f32))
            }

            fn visit_f32<E>(self, value: f32) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(Padding::Even(value))
            }

            fn visit_f64<E>(self, value: f64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(Padding::Even(value as f32))
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::SeqAccess<'de>,
            {
                let first = seq
                    .next_element::<f32>()?
                    .ok_or_else(|| serde::de::Error::invalid_length(0, &self))?;
                let second = seq
                    .next_element::<f32>()?
                    .ok_or_else(|| serde::de::Error::invalid_length(1, &self))?;

                if let Some(third) = seq.next_element::<f32>()? {
                    let fourth = seq
                        .next_element::<f32>()?
                        .ok_or_else(|| serde::de::Error::invalid_length(3, &self))?;
                    Ok(Padding::Custom {
                        top: first,
                        right: second,
                        bottom: third,
                        left: fourth,
                    })
                } else {
                    Ok(Padding::Center {
                        ver: first,
                        hor: second,
                    })
                }
            }

            fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                let mut ver = None::<f32>;
                let mut hor = None::<f32>;
                let mut top = None::<f32>;
                let mut right = None::<f32>;
                let mut bottom = None::<f32>;
                let mut left = None::<f32>;

                while let Some(field) = map.next_key::<Cow<'de, str>>()? {
                    match &*field {
                        "ver" => {
                            ver = Some(map.next_value()?);
                        }
                        "hor" => {
                            hor = Some(map.next_value()?);
                        }
                        "top" => top = Some(map.next_value()?),
                        "right" => right = Some(map.next_value()?),
                        "bottom" => bottom = Some(map.next_value()?),
                        "left" => left = Some(map.next_value()?),
                        _ => {
                            return Err(serde::de::Error::unknown_field(
                                &field,
                                &["ver", "hor", "top", "right", "bottom", "left"],
                            ));
                        }
                    }
                }

                match (ver, hor, top, right, bottom, left) {
                    (Some(ver), Some(hor), None, None, None, None) => {
                        Ok(geom::Padding::Center { ver, hor })
                    }
                    (None, None, Some(top), Some(right), Some(bottom), Some(left)) => {
                        Ok(geom::Padding::Custom {
                            top,
                            right,
                            bottom,
                            left,
                        })
                    }
                    _ => Err(serde::de::Error::custom(
                        "Expected either a tuple of two floats for center padding or a tuple of four floats for custom padding",
                    )),
                }
            }
        }

        deserializer.deserialize_any(PaddingVisitor)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_color_ser() {
        let color = Rgba8::new(255, 0, 0, 255);
        let serialized = serde_json::to_string(&color).unwrap();
        assert_eq!(serialized, "\"red\"");

        let color = "antiquewhite".parse::<Rgba8>().unwrap();
        let serialized = serde_json::to_string(&color).unwrap();
        assert_eq!(serialized, "\"antiquewhite\"");

        let color = Rgba8::new(0x12, 0x34, 0x56, 0xff);
        let serialized = serde_json::to_string(&color).unwrap();
        assert_eq!(serialized, "\"#123456\"");

        let color = Rgba8::new(0x12, 0x34, 0x56, 0);
        let serialized = serde_json::to_string(&color).unwrap();
        assert_eq!(serialized, "\"rgba(18, 52, 86, 0)\"");
    }

    #[test]
    fn test_color_deser() {
        let json = "\"red\"";
        let deserialized: Rgba8 = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Rgba8::new(255, 0, 0, 255));

        let json = "\"#123456\"";
        let deserialized: Rgba8 = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Rgba8::new(0x12, 0x34, 0x56, 255));

        let json = "\"rgba(18, 52, 86, 0)\"";
        let deserialized: Rgba8 = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Rgba8::new(0x12, 0x34, 0x56, 0));

        let json = "[18, 52, 86]";
        let deserialized: Rgba8 = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Rgba8::new(0x12, 0x34, 0x56, 255));
    }

    #[test]
    fn test_size_ser() {
        let size = Size::new(100.0, 200.0);
        let serialized = serde_json::to_string(&size).unwrap();
        assert_eq!(serialized, "[100.0,200.0]");
    }

    #[test]
    fn test_size_deser() {
        let json = "[100.0, 200.0]";
        let deserialized: Size = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Size::new(100.0, 200.0));
        let json = r#"{"width": 100.0, "height": 200.0}"#;
        let deserialized: Size = serde_json::from_str(json).unwrap();
        assert_eq!(deserialized, Size::new(100.0, 200.0));
    }

    #[test]
    fn test_padding_ser() {
        let tests = vec![
            (Padding::Even(10.0), "10.0"),
            (
                Padding::Center {
                    ver: 5.0,
                    hor: 15.0,
                },
                "[5.0,15.0]",
            ),
            (
                Padding::Custom {
                    top: 1.0,
                    right: 2.0,
                    bottom: 3.0,
                    left: 4.0,
                },
                "[1.0,2.0,3.0,4.0]",
            ),
        ];
        for (padding, expected) in tests {
            let serialized = serde_json::to_string(&padding).unwrap();
            assert_eq!(serialized, expected);
        }
    }

    #[test]
    fn test_padding_deser() {
        let tests = vec![
            ("10.0", Padding::Even(10.0)),
            (
                "[5.0, 15.0]",
                Padding::Center {
                    ver: 5.0,
                    hor: 15.0,
                },
            ),
            (
                "[1.0, 2.0, 3.0, 4.0]",
                Padding::Custom {
                    top: 1.0,
                    right: 2.0,
                    bottom: 3.0,
                    left: 4.0,
                },
            ),
            (
                r#"{"ver": 5.0, "hor": 15.0}"#,
                Padding::Center {
                    ver: 5.0,
                    hor: 15.0,
                },
            ),
            (
                r#"{"top": 1.0, "right": 2.0, "bottom": 3.0, "left": 4.0}"#,
                Padding::Custom {
                    top: 1.0,
                    right: 2.0,
                    bottom: 3.0,
                    left: 4.0,
                },
            ),
        ];
        for (json, expected) in tests {
            let deserialized: Padding = serde_json::from_str(json).unwrap();
            assert_eq!(deserialized, expected);
        }
    }
}
