//! Serialization and deserialization of figures

use serde::ser::SerializeStruct;

use super::Figure;
use crate::des::figure;
use crate::style::{defaults, theme};

mod axis;
mod legend;
mod plot;
mod series;
mod style;
#[cfg(feature = "time")]
mod time;

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