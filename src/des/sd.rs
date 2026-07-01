//! Serialization and deserialization of figures

use serde::ser::{SerializeSeq, SerializeStruct};

use super::Figure;
use crate::des::{FigLegend, Plot, Subplots, Text, figure};
use crate::geom;
use crate::style::{defaults, theme};

mod annot;
mod axis;
mod cmap;
mod colorbar;
mod legend;
mod plot;
mod series;
mod style;
#[cfg(feature = "time")]
mod time;

use crate::text;

// MARK: Text

impl serde::Serialize for Text {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            Text::Plain(text) => serializer.serialize_str(text),
            Text::Rich(fmt) => {
                let mut seq = serializer.serialize_seq(None)?;
                for l in fmt.lines() {
                    seq.serialize_element(l)?;
                }
                seq.end()
            }
            Text::RichWithClasses { fmt, classes } => {
                let mut seq = serializer.serialize_seq(Some(2))?;
                seq.serialize_element(fmt)?;
                seq.serialize_element(classes)?;
                seq.end()
            }
        }
    }
}

enum TextPropsMapOrString {
    Props(Vec<(String, text::TextProps<theme::Color>)>),
    String(String),
}

impl<'de> serde::Deserialize<'de> for TextPropsMapOrString {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct Visitor;

        impl<'de> serde::de::Visitor<'de> for Visitor {
            type Value = TextPropsMapOrString;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a string or a text properties object")
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(TextPropsMapOrString::String(value.to_string()))
            }

            fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                let mut result = Vec::new();

                while let Some((key, value)) =
                    map.next_entry::<String, text::TextProps<theme::Color>>()?
                {
                    result.push((key, value));
                }
                Ok(TextPropsMapOrString::Props(result))
            }
        }

        deserializer.deserialize_any(Visitor)
    }
}

impl<'de> serde::Deserialize<'de> for Text {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct TextVisitor;

        impl<'de> serde::de::Visitor<'de> for TextVisitor {
            type Value = Text;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a string or a rich text array")
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(Text::Plain(value.to_string()))
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::SeqAccess<'de>,
            {
                let fmt: String = seq
                    .next_element()?
                    .ok_or_else(|| serde::de::Error::invalid_length(0, &self))?;
                let next = seq.next_element::<TextPropsMapOrString>()?;
                match next {
                    Some(TextPropsMapOrString::Props(props)) => Ok(Text::RichWithClasses {
                        fmt,
                        classes: props,
                    }),
                    Some(TextPropsMapOrString::String(s2)) => {
                        let mut fmt = fmt + "\n" + &s2;
                        while let Some(s) = seq.next_element::<String>()? {
                            fmt.push('\n');
                            fmt.push_str(&s);
                        }
                        Ok(Text::Rich(fmt))
                    }
                    None => Ok(Text::Rich(fmt)),
                }
            }

            fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                let mut fmt = Option::<String>::None;
                let mut classes = Vec::new();
                while let Some((key, value)) = map.next_entry::<String, TextPropsMapOrString>()? {
                    match key.as_str() {
                        "fmt" => {
                            if fmt.is_some() {
                                return Err(serde::de::Error::duplicate_field("fmt"));
                            }
                            match value {
                                TextPropsMapOrString::String(s) => fmt = Some(s),
                                TextPropsMapOrString::Props(_) => {
                                    return Err(serde::de::Error::custom(
                                        "The 'fmt' field must be a string, not an object",
                                    ));
                                }
                            }
                        }
                        "classes" => {
                            if !classes.is_empty() {
                                return Err(serde::de::Error::duplicate_field("classes"));
                            }
                            match value {
                                TextPropsMapOrString::Props(props) => classes = props,
                                TextPropsMapOrString::String(_) => {
                                    return Err(serde::de::Error::custom(
                                        "The 'classes' field must be an object, not a string",
                                    ));
                                }
                            }
                        }
                        _ => {
                            return Err(serde::de::Error::unknown_field(
                                key.as_str(),
                                &["fmt", "classes"],
                            ));
                        }
                    }
                }

                let Some(fmt) = fmt else {
                    return Err(serde::de::Error::missing_field("fmt"));
                };
                Ok(Text::RichWithClasses { fmt, classes })
            }
        }
        deserializer.deserialize_any(TextVisitor)
    }
}

// MARK: Figure

impl serde::Serialize for Figure {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("Figure", 5)?;
        if self.size() != defaults::FIG_SIZE {
            state.serialize_field("size", &self.size())?;
        }
        if let Some(title) = self.title() {
            state.serialize_field("title", title)?;
        }
        if self.fill() != Some(theme::Col::Background.into()) {
            state.serialize_field("fill", &self.fill())?;
        }
        if let Some(legend) = self.legend() {
            state.serialize_field("legend", legend)?;
        }
        if self.padding() != &defaults::FIG_PADDING {
            state.serialize_field("padding", &self.padding())?;
        }

        match self.plots() {
            figure::Plots::Plot(plot) => {
                state.serialize_field("plot", plot)?;
            }
            figure::Plots::Subplots(subplots) => {
                if subplots.space() != 0.0 {
                    state.serialize_field("space", &subplots.space())?;
                }

                state.serialize_field("plots", subplots)?;
            }
        }

        state.end()
    }
}

impl<'de> serde::Deserialize<'de> for Figure {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_map(FigureVisitor)
    }
}

struct FigureVisitor;

impl<'de> serde::de::Visitor<'de> for FigureVisitor {
    type Value = Figure;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a figure object")
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        deserialize_map_fields!('de, map,
            "plot" => plot: Option<Plot>,
            "plots" => plots: Option<Subplots>,
            "space" => space: Option<f32>,
            "size" => size: Option<geom::Size>,
            "title" => title: Option<Text>,
            "fill" => fill: Option<Option<theme::Fill>>,
            "legend" => legend: Option<FigLegend>,
            "padding" => padding: Option<geom::Padding>,
        );

        let plots = match (plot, plots) {
            (Some(plot), None) => {
                if space.is_some() {
                    return Err(serde::de::Error::custom(
                        "The 'space' field can only be specified when using 'plots' field, not 'plot'",
                    ));
                }
                figure::Plots::Plot(plot)
            }
            (None, Some(mut plots)) => {
                if let Some(space) = space {
                    plots = plots.with_space(space);
                }
                figure::Plots::Subplots(plots)
            }
            (Some(_), Some(_)) => {
                return Err(serde::de::Error::custom(
                    "Both 'plot' and 'plots' fields cannot be specified at the same time",
                ));
            }
            (None, None) => {
                return Err(serde::de::Error::custom(
                    "Either 'plot' or 'plots' field must be specified",
                ));
            }
        };

        let mut figure = Figure::new(plots);

        if let Some(size) = size {
            figure = figure.with_size(size);
        }

        if let Some(title) = title {
            figure = figure.with_title(title);
        }

        if let Some(fill) = fill {
            figure = figure.with_fill(fill);
        }

        if let Some(legend) = legend {
            figure = figure.with_legend(legend);
        }

        if let Some(padding) = padding {
            figure = figure.with_padding(padding);
        }

        Ok(figure)
    }
}

// MARK: map macros

macro_rules! serialize_tagged_map_variant {
    ($serializer:expr, $tag:expr, ($obj:ident, $typ:ty), $($key:expr => $field:ident,)+) => {
        {
            let typ_name = std::stringify!($typ);
            let default = <$typ>::default();
            if $obj == &default {
                $tag.serialize($serializer)
            } else {
                let mut len = 1; // for the tag
                $(
                    if $obj.$field != default.$field {
                        len += 1;
                    }
                )+
                let mut map = $serializer.serialize_struct(typ_name, len)?;
                map.serialize_field("type", $tag)?;
                $(
                    if $obj.$field != default.$field {
                        map.serialize_field($key, &$obj.$field)?;
                    }
                )+
                map.end()
            }
        }
    };
}

pub(crate) use serialize_tagged_map_variant;

macro_rules! deserialize_map_fields {
    ($de:lifetime, $map:expr, $($key:expr => $name:ident: Option<$ty:ty>,)+) => {
        $(
            let mut $name = None::<$ty>;
        )+

        while let Some(key) = $map.next_key::<std::borrow::Cow<$de, str>>()? {
            match key.as_ref() {
                $($key => {
                    if $name.is_some() {
                        let _: $ty = $map.next_value()?;
                        return Err(serde::de::Error::duplicate_field($key));
                    }
                    $name = Some($map.next_value::<$ty>()?);
                })+
                _ => {
                    return Err(serde::de::Error::unknown_field(key.as_ref(), &[$($key),+]));
                }
            }
        }
    }
}

pub(crate) use deserialize_map_fields;

macro_rules! deserialize_tagged_map_fields {
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

        while let Some(key) = $map.next_key::<std::borrow::Cow<$de, str>>()? {
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
                _ => {
                    return Err(serde::de::Error::unknown_field(key.as_ref(), &[$($key),+]));
                }
            }
        }
    }
}

pub(crate) use deserialize_tagged_map_fields;

#[allow(unused)]
macro_rules! deserialize_tagged_enum {
    ($de:lifetime, $map:expr, $buffered:expr, $enum_ty:ty,  $($key:expr => $variant:ident,)+) => {{
        let mut enum_val = std::option::Option::None::<$enum_ty>;
        for (key, value) in $buffered {
            match key.as_str() {
                "type" => {
                    return Err(serde::de::Error::duplicate_field("type"));
                }
                $($key => {
                    if enum_val.is_some() {
                        return Err(serde::de::Error::duplicate_field($key));
                    }
                    let value = value
                        .deserialize_into()
                        .map_err(serde::de::Error::custom)?;
                    enum_val = Some(<$enum_ty>::$variant(value));
                })+
                _ => {}
            }
        }

        while let Some(key) = $map.next_key::<std::borrow::Cow<$de, str>>()? {
            match key.as_ref() {
                "type" => {
                    let _: String = $map.next_value()?;
                    return Err(serde::de::Error::duplicate_field("type"));
                }
                $($key => {
                    if enum_val.is_some() {
                        return Err(serde::de::Error::duplicate_field($key));
                    }
                    let value = $map.next_value()?;
                    enum_val = Some(<$enum_ty>::$variant(value));
                })+
                _ => {
                    return Err(serde::de::Error::unknown_field(key.as_ref(), &[$($key),+]));
                }
            }
        }
        enum_val.ok_or(serde::de::Error::missing_field("type"))
    }}
}

#[allow(unused)]
pub(crate) use deserialize_tagged_enum;

#[cfg(test)]
mod tests {
    use super::*;
    use crate::des::{Plot, series};

    #[test]
    fn test_figure_ser() {
        let figure =
            Plot::new(vec![series::Line::new("x".into(), "y".into()).into()]).into_figure();

        let serialized = serde_json::to_string(&figure).unwrap();
        let expected = r#"{"plot":{"series":{"type":"line","x":"x","y":"y"}}}"#;
        assert_eq!(serialized, expected);
    }

    #[test]
    fn test_figure_de() {
        let json = r#"{"title":"Title","plot":{"series":{"type":"line","x":"x","y":"y"}}}"#;
        let figure: Figure = serde_json::from_str(json).unwrap();

        let expected = Plot::new(vec![series::Line::new("x".into(), "y".into()).into()])
            .into_figure()
            .with_title("Title".into());
        assert_eq!(figure, expected);
    }
}
