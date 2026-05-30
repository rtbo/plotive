use serde::ser::{SerializeSeq, SerializeStruct, SerializeTuple};

use crate::des::{Plot, Subplots, axis, plot};

impl serde::Serialize for Plot {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let plot = IndexedPlot {
            plot: self,
            subplot: None,
        };
        plot.serialize(serializer)
    }
}

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
                    let plot = IndexedPlot {
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

struct IndexedPlot<'a> {
    plot: &'a Plot,
    subplot: Option<(u32, u32)>,
}

impl serde::Serialize for IndexedPlot<'_> {
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

        serialize_axes(&mut state, self.plot.x_axes(), true)?;
        serialize_axes(&mut state, self.plot.y_axes(), false)?;

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

        state.end()
    }
}

fn serialize_axes<S>(state: &mut S, axes: &[axis::Axis], horizontal: bool) -> Result<(), S::Error>
where
    S: serde::ser::SerializeStruct,
{
    if axes.len() == 1 {
        let axis = super::axis::OrientedAxis {
            axis: &axes[0],
            horizontal,
        };
        let field_name = if horizontal { "x_axis" } else { "y_axis" };
        state.serialize_field(field_name, &axis)?;
    } else if !axes.is_empty() {
        // TODO: avoid the vec allocation
        let oriented_axes = super::axis::OrientedAxes {
            axes,
            horizontal,
        };
        let field_name = if horizontal { "x_axes" } else { "y_axes" };
        state.serialize_field(field_name, &oriented_axes)?;
    }
    Ok(())
}

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
                    "axis-arrow".serialize(serializer)
                } else {
                    let mut state = serializer.serialize_struct("Border", 2)?;
                    state.serialize_field("type", "axis-arrow")?;
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
