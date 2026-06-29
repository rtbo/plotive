/*!
 * # Declarative design module for plotive
 *
 * This module contains all data structures for the design of plotting figures.
 */
pub mod annot;
pub mod axis;
pub mod cmap;
pub mod colorbar;
pub mod figure;
pub mod legend;
pub mod plot;
pub mod series;

#[cfg(feature = "serde")]
mod sd;

pub use annot::Annotation;
pub use axis::Axis;
pub use colorbar::ColorBar;
pub use figure::{FigLegend, Figure};
pub use legend::Legend;
pub use plot::{Plot, PlotLegend, Subplots};
pub use series::{DataCol, Series, data_inline, data_src_ref};

use crate::style::theme;
use crate::text;

/// Text content for titles, labels, legends, etc.
#[derive(Debug, Clone, PartialEq)]
pub enum Text {
    /// Plain text
    Plain(String),
    /// Rich text, the format string is parsed to produce a rich text, using the standard classes
    Rich(String),
    /// Rich text, the format string is parsed to produce a rich text,
    /// and the non-standard classes can be used to define the properties of the spans
    RichWithClasses {
        /// The format string for the rich text, with optional classes
        fmt: String,
        /// The classes that can be used in the format string
        classes: Vec<(String, text::RichProps)>,
    },
}

impl Text {
    pub(crate) fn to_rich_text(
        &self,
        base: text::rich::TextProps<theme::Color>,
        layout: text::rich::Layout,
        db: &text::fontdb::Database,
    ) -> std::result::Result<text::RichText<theme::Color>, text::Error> {
        match self {
            Text::Plain(text) => {
                let builder = text::RichTextBuilder::new(text.clone(), base).with_layout(layout);
                builder.done(db)
            }
            Text::Rich(fmt) => {
                let parsed_text = text::parse_rich_text::<theme::Color>(fmt)?;
                let builder = parsed_text.into_builder(base).with_layout(layout);
                builder.done(db)
            }
            Text::RichWithClasses { fmt, classes } => {
                let parsed_text = text::parse_rich_text_with_classes(fmt, &classes)?;
                let builder = parsed_text.into_builder(base).with_layout(layout);
                builder.done(db)
            }
        }
    }
}

impl From<String> for Text {
    fn from(s: String) -> Self {
        Text::Plain(s)
    }
}

impl From<&str> for Text {
    fn from(s: &str) -> Self {
        Text::Plain(s.to_string())
    }
}

impl From<[String; 1]> for Text {
    fn from(arr: [String; 1]) -> Self {
        let mut arr = arr;
        let fmt = std::mem::take(&mut arr[0]);
        Text::Rich(fmt)
    }
}

impl From<[&str; 1]> for Text {
    fn from(arr: [&str; 1]) -> Self {
        Text::Rich(arr[0].to_string())
    }
}

impl From<(String,)> for Text {
    fn from(tuple: (String,)) -> Self {
        Text::Rich(tuple.0)
    }
}

impl From<(&str,)> for Text {
    fn from(tuple: (&str,)) -> Self {
        Text::Rich(tuple.0.to_string())
    }
}

impl From<(String, Vec<(String, text::RichProps)>)> for Text {
    fn from(tuple: (String, Vec<(String, text::RichProps)>)) -> Self {
        Text::RichWithClasses {
            fmt: tuple.0,
            classes: tuple.1,
        }
    }
}

/// Index of a plot in a subplot grid
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct PlotIdx {
    /// Row index of the plot (0-based)
    pub row: u32,
    /// Column index of the plot (0-based)
    pub col: u32,
}

impl PlotIdx {
    /// Create a new PlotIdx from row and column indices
    pub fn new(row: u32, col: u32) -> Self {
        PlotIdx { row, col }
    }

    pub(crate) fn index(&self, cols: u32) -> usize {
        (self.row * cols + self.col) as usize
    }

    pub(crate) fn is_first(&self) -> bool {
        self.row == 0 && self.col == 0
    }

    pub(crate) fn next(&self, cols: u32) -> Self {
        let mut row = self.row;
        let mut col = self.col + 1;
        if col >= cols {
            col = 0;
            row += 1;
        }
        PlotIdx { row, col }
    }
}

/// Convert a (row, col) tuple into a PlotIdx
impl From<(u32, u32)> for PlotIdx {
    fn from((row, col): (u32, u32)) -> Self {
        PlotIdx { row, col }
    }
}

/// Iterator over all PlotIdx in a subplot grid
#[derive(Debug, Clone, Copy)]
pub(crate) struct PlotIdxIter {
    rows: u32,
    cols: u32,
    current: PlotIdx,
    done: bool,
}

impl PlotIdxIter {
    pub(crate) fn new(rows: u32, cols: u32) -> Self {
        PlotIdxIter {
            rows,
            cols,
            current: PlotIdx { row: 0, col: 0 },
            done: rows == 0 || cols == 0,
        }
    }
}

impl Iterator for PlotIdxIter {
    type Item = PlotIdx;

    fn next(&mut self) -> Option<Self::Item> {
        if self.done {
            return None;
        }
        let result = self.current;
        if self.current.col + 1 >= self.cols {
            self.current.col = 0;
            self.current.row += 1;
            if self.current.row >= self.rows {
                self.done = true;
            }
        } else {
            self.current.col += 1;
        }
        Some(result)
    }
}

impl std::iter::FusedIterator for PlotIdxIter {}
