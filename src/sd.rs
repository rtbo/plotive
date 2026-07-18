//! Serialization and deserialization of figures

use plotive_base::deserialize_map_fields;
use serde::ser::SerializeMap;

use crate::des::{FigLegend, Figure, Plot, Subplots, Text, figure};
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
mod text;
#[cfg(feature = "time")]
mod time;

// MARK: Figure

impl serde::Serialize for Figure {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_map(None)?;
        if self.size() != defaults::FIG_SIZE {
            state.serialize_entry("size", &self.size())?;
        }
        if let Some(title) = self.title() {
            state.serialize_entry("title", title)?;
        }
        if self.fill() != Some(theme::Col::Background.into()) {
            state.serialize_entry("fill", &self.fill())?;
        }
        if let Some(legend) = self.legend() {
            state.serialize_entry("legend", legend)?;
        }
        if self.padding() != &defaults::FIG_PADDING {
            state.serialize_entry("padding", &self.padding())?;
        }

        match self.plots() {
            figure::Plots::Plot(plot) => {
                state.serialize_entry("plot", plot)?;
            }
            figure::Plots::Subplots(subplots) => {
                if subplots.space() != 0.0 {
                    state.serialize_entry("space", &subplots.space())?;
                }

                state.serialize_entry("plots", subplots)?;
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
            let default = <$typ>::default();
            if $obj == &default {
                $tag.serialize($serializer)
            } else {
                let mut map = $serializer.serialize_map(std::option::Option::None)?;
                map.serialize_entry("type", $tag)?;
                $(
                    if $obj.$field != default.$field {
                        map.serialize_entry($key, &$obj.$field)?;
                    }
                )+
                map.end()
            }
        }
    };
}

pub(crate) use serialize_tagged_map_variant;

/// Internal macro to deserialize tagged map fields.
/// This macro is used to generate code for deserializing fields of a struct from a map, handling both required and optional fields, and checking for duplicate or missing fields.
///
/// It matches the field type either as a Option<T> or T and generate the appropriate code to handle the deserialization and error checking.
#[macro_export]
macro_rules! deserialize_tagged_map_fields {
    ($de:lifetime, $map:expr, $buffered:expr, $($fields:tt)+) => {
        $crate::deserialize_tagged_map_fields!(
            @parse [$de, $map, $buffered, value] [] [] [] [] [] ; $($fields)+
        );
    };

    (@parse
        [$de:lifetime, $map:expr, $buffered:expr, $value:ident]
        [$($decls:tt)*]
        [$($arms1:tt)*]
        [$($arms2:tt)*]
        [$($field_names:expr,)*]
        [$($binds:tt)*]
        ;
        $key:expr => $name:ident: Option<$inner:ty>,
        $($rest:tt)*
    ) => {
        $crate::deserialize_tagged_map_fields!(
            @parse
            [$de, $map, $buffered, $value]
            [
                $($decls)*
                let mut $name = None::<Option<$inner>>;
            ]
            [
                $($arms1)*
                $key => {
                    if $name.is_some() {
                        return std::result::Result::Err(serde::de::Error::duplicate_field($key));
                    }
                    $name = std::option::Option::Some(
                        $value
                            .deserialize_into::<Option<$inner>>()
                            .map_err(serde::de::Error::custom)?,
                    );

                }
            ]
            [
                $($arms2)*
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
        [$de:lifetime, $map:expr, $buffered:expr, $value:ident]
        [$($decls:tt)*]
        [$($arms1:tt)*]
        [$($arms2:tt)*]
        [$($field_names:expr,)*]
        [$($binds:tt)*]
        ;
        $key:expr => $name:ident: $ty:ty,
        $($rest:tt)*
    ) => {
        $crate::deserialize_tagged_map_fields!(
            @parse
            [$de, $map, $buffered, $value]
            [
                $($decls)*
                let mut $name = None::<$ty>;
            ]
            [
                $($arms1)*
                $key => {
                    if $name.is_some() {
                        return std::result::Result::Err(serde::de::Error::duplicate_field($key));
                    }
                    $name = std::option::Option::Some(
                        $value
                            .deserialize_into::<$ty>()
                            .map_err(serde::de::Error::custom)?,
                    );

                }
            ]
            [
                $($arms2)*
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
        [$de:lifetime, $map:expr, $buffered:expr, $value:ident]
        [$($decls:tt)*]
        [$($arms1:tt)*]
        [$($arms2:tt)*]
        [$($field_names:expr,)*]
        [$($binds:tt)*]
        ;
    ) => {
        $($decls)*

        for (key, $value) in $buffered {
            match key.as_str() {
                "type" => {
                    return std::result::Result::Err(serde::de::Error::duplicate_field("type"));
                }
                $($arms1)*
                _ => {}
            }
        }

        while let Some(key) = $map.next_key::<std::borrow::Cow<$de, str>>()? {
            match key.as_ref() {
                $($arms2)*
                _ => {
                    return Err(serde::de::Error::unknown_field(
                        key.as_ref(),
                        &[$($field_names),+]
                    ));
                }
            }
        }

        $($binds)*
    };
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
