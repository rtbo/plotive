//! Serialization and deserialization of figures

use serde::ser::SerializeStruct;

use super::Figure;
use crate::des::{FigLegend, Plot, Subplots, figure};
use crate::geom;
use crate::style::{defaults, theme};

mod axis;
mod legend;
mod plot;
mod series;
mod style;
#[cfg(feature = "time")]
mod time;

// MARK: figure::Title

impl serde::Serialize for figure::Title {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        if self.spans().is_empty() && self.props() == &figure::TitleProps::default() {
            self.text().serialize(serializer)
        } else {
            let mut state = serializer.serialize_struct("Title", 2)?;
            state.serialize_field("text", self.text())?;
            todo!("Serialize rich props and spans")
            //state.end()
        }
    }
}


impl<'de> serde::Deserialize<'de> for figure::Title {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct TitleVisitor;

        impl<'de> serde::de::Visitor<'de> for TitleVisitor {
            type Value = figure::Title;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a figure title string or rich text")
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(figure::Title::from(value.to_string()))
            }

            fn visit_map<A>(self, _map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                todo!("Deserialize rich title with props and spans")
            }
        }
        deserializer.deserialize_any(TitleVisitor)
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
            todo!("Serialize geom::Padding")
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
        deserialize_map_fields!( 'de, map,
            "plot" => plot: Option<Plot>,
            "plots" => plots: Option<Subplots>,
            "space" => space: Option<f32>,
            "size" => size: Option<geom::Size>,
            "title" => title: Option<figure::Title>,
            "fill" => fill: Option<Option<theme::Fill>>,
            "legend" => legend: Option<FigLegend>,
            // "padding" => padding: Option<geom::Padding>,
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

        Ok(figure)
    }
}

// MARK: helper macros

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
                _ => {}
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
                _ => {}
            }
        }
    }
}

pub(crate) use deserialize_tagged_map_fields;