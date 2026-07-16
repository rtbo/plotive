//! Annotations to place on the plot area.
use crate::des::{Text, axis};
use crate::style::{self, theme};

/// Coordinates of an annotation either in data, figure, or plot coordinates.
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Coord {
    /// Coordinates in data coordinates.
    Data(f64),
    /// Coordinates in plot coordinates.
    /// The origin is the top-left corner of the plot area, and the coordinates are in points.
    /// Negative X values will place the annotations with origin on the right,
    /// and negative Y values will place the annotations with origin on the bottom.
    Plot(f32),
}

/// Build a data coordinate
pub fn data(value: f64) -> Coord {
    Coord::Data(value)
}

/// Build a plot coordinate
pub fn plot(value: f32) -> Coord {
    Coord::Plot(value)
}

/// Convert a f64 number to a data coordinate
impl From<f64> for Coord {
    fn from(value: f64) -> Self {
        Coord::Data(value)
    }
}

/// An arbitrary graphical annotation placed on the plot area.
/// The placement is made according to the data coordinates.
/// By default, lines are plotted under the series, and other annotations are plotted above the series.
/// This can be changed using [`with_zpos()`](Annotation::with_zpos).
#[derive(Debug, Clone, PartialEq)]
pub enum Annotation {
    /// A line plotted on the plot area.
    Line(Line),
    /// An arrow plotted on the plot area.
    Arrow(Arrow),
    /// A marker plotted on the plot area.
    Marker(Marker),
    /// A label plotted on the plot area.
    Label(Label),
}

impl From<Line> for Annotation {
    fn from(line: Line) -> Self {
        Annotation::Line(line)
    }
}

impl From<Arrow> for Annotation {
    fn from(arrow: Arrow) -> Self {
        Annotation::Arrow(arrow)
    }
}

impl From<Marker> for Annotation {
    fn from(marker: Marker) -> Self {
        Annotation::Marker(marker)
    }
}

impl From<Label> for Annotation {
    fn from(label: Label) -> Self {
        Annotation::Label(label)
    }
}

impl Annotation {
    /// Set the X-axis to use for this annotation.
    /// Only useful if multiple X-axes are used.
    /// By default, the first X-axis is used.
    pub fn with_x_axis(mut self, x_axis: axis::Ref) -> Self {
        match &mut self {
            Annotation::Line(line) => line.x_axis = x_axis,
            Annotation::Arrow(arrow) => arrow.x_axis = x_axis,
            Annotation::Marker(marker) => marker.x_axis = x_axis,
            Annotation::Label(label) => label.x_axis = x_axis,
        }
        self
    }

    /// Set the Y-axis to use for this annotation.
    /// Only useful if multiple Y-axes are used.
    /// By default, the first Y-axis is used.
    pub fn with_y_axis(mut self, y_axis: axis::Ref) -> Self {
        match &mut self {
            Annotation::Line(line) => line.y_axis = y_axis,
            Annotation::Arrow(arrow) => arrow.y_axis = y_axis,
            Annotation::Marker(marker) => marker.y_axis = y_axis,
            Annotation::Label(label) => label.y_axis = y_axis,
        }
        self
    }

    /// Set the z-position of this annotation in relation to the series.
    pub fn with_zpos(mut self, zpos: ZPos) -> Self {
        match &mut self {
            Annotation::Line(line) => line.zpos = zpos,
            Annotation::Arrow(arrow) => arrow.zpos = zpos,
            Annotation::Marker(marker) => marker.zpos = zpos,
            Annotation::Label(label) => label.zpos = zpos,
        }
        self
    }

    /// Get the X-axis to use for this annotation.
    /// Only useful if multiple X-axes are used.
    pub fn x_axis(&self) -> &axis::Ref {
        match self {
            Annotation::Line(line) => &line.x_axis,
            Annotation::Arrow(arrow) => &arrow.x_axis,
            Annotation::Marker(marker) => &marker.x_axis,
            Annotation::Label(label) => &label.x_axis,
        }
    }

    /// Get the Y-axis to use for this annotation.
    /// Only useful if multiple Y-axes are used.
    pub fn y_axis(&self) -> &axis::Ref {
        match self {
            Annotation::Line(line) => &line.y_axis,
            Annotation::Arrow(arrow) => &arrow.y_axis,
            Annotation::Marker(marker) => &marker.y_axis,
            Annotation::Label(label) => &label.y_axis,
        }
    }

    /// Get the z-position of this annotation in relation to the series.
    pub fn zpos(&self) -> ZPos {
        match self {
            Annotation::Line(line) => line.zpos,
            Annotation::Arrow(arrow) => arrow.zpos,
            Annotation::Marker(marker) => marker.zpos,
            Annotation::Label(label) => label.zpos,
        }
    }
}

/// Positioning information for annotations placed on the plot area.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ZPos {
    /// Annotation displayed below the series
    BelowSeries,
    /// Annotation displayed above the series
    AboveSeries,
}

/// A line plotted on the plot area.
#[derive(Debug, Clone, PartialEq)]
pub struct Line {
    direction: LineDir,
    stroke: theme::Stroke,

    x_axis: axis::Ref,
    y_axis: axis::Ref,
    zpos: ZPos,
}

/// The definition of the direction of a line plotted on the plot area.
/// This type defines the position and orientation of the line in data coordinates.
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum LineDir {
    /// A horizontal line passing by the given y value in the given coordinates
    Horizontal(Coord),
    /// A vertical line passing by the given x value in the given coordinates
    Vertical(Coord),
    /// A line passing by (x, y) with the given slope in given coordinates
    Slope {
        /// The x value of the point the line passes by in given coordinates
        x: Coord,
        /// The y value of the point the line passes by in given coordinates
        y: Coord,
        /// The slope of the line in plot coordinates. The slope is defined as the change in y over the change in x.
        slope: f32,
    },
    /// A line passing by (x1, y1) and (x2, y2) in the given coordinates
    TwoPoints {
        /// The x value of the first point in the given coordinates
        x1: Coord,
        /// The y value of the first point in the given coordinates
        y1: Coord,
        /// The x value of the second point in the given coordinates
        x2: Coord,
        /// The y value of the second point in the given coordinates
        y2: Coord,
    },
}

impl From<LineDir> for Line {
    fn from(direction: LineDir) -> Self {
        Line::new(direction)
    }
}

impl From<LineDir> for Annotation {
    fn from(direction: LineDir) -> Self {
        Line::new(direction).into()
    }
}

impl Line {
    /// Create a new line with the given direction.
    pub fn new(direction: LineDir) -> Self {
        Line {
            direction,
            stroke: theme::Col::Foreground.into(),
            x_axis: Default::default(),
            y_axis: Default::default(),
            zpos: ZPos::BelowSeries,
        }
    }

    /// Plot a vertical line passing by x
    pub fn vertical(x: impl Into<Coord>) -> Self {
        Line::new(LineDir::Vertical(x.into()))
    }

    /// Plot a horizontal line passing by y
    pub fn horizontal(y: impl Into<Coord>) -> Self {
        Line::new(LineDir::Horizontal(y.into()))
    }

    /// Plot a line passing by x and y with the given slope.
    /// This is only meaningful on linear scales, and will raise an error
    /// if either X or Y axes are logarithmic.
    pub fn slope(x: impl Into<Coord>, y: impl Into<Coord>, slope: f32) -> Self {
        Line::new(LineDir::Slope {
            x: x.into(),
            y: y.into(),
            slope,
        })
    }

    /// Plot a line passing by (x1, y1) and (x2, y2).
    pub fn two_points(
        x1: impl Into<Coord>,
        y1: impl Into<Coord>,
        x2: impl Into<Coord>,
        y2: impl Into<Coord>,
    ) -> Self {
        Line::new(LineDir::TwoPoints {
            x1: x1.into(),
            y1: y1.into(),
            x2: x2.into(),
            y2: y2.into(),
        })
    }

    /// Set the line to be displayed.
    /// By default, the line is a solid line of the foreground theme color.
    pub fn with_stroke(self, line: theme::Stroke) -> Self {
        Self {
            stroke: line,
            ..self
        }
    }

    /// Set the pattern of the line
    pub fn with_pattern(self, pattern: style::LinePattern) -> Self {
        Self {
            stroke: self.stroke.with_pattern(pattern),
            ..self
        }
    }

    /// Set the X-axis to use for this annotation.
    /// Only useful if multiple X-axes are used.
    /// By default, the first X-axis is used.
    pub fn with_x_axis(mut self, x_axis: axis::Ref) -> Self {
        self.x_axis = x_axis;
        self
    }

    /// Set the Y-axis to use for this annotation.
    /// Only useful if multiple Y-axes are used.
    /// By default, the first Y-axis is used.
    pub fn with_y_axis(mut self, y_axis: axis::Ref) -> Self {
        self.y_axis = y_axis;
        self
    }

    /// Set the z-position of this annotation in relation to the series.
    pub fn with_zpos(mut self, zpos: ZPos) -> Self {
        self.zpos = zpos;
        self
    }

    /// Get the direction of the line.
    pub fn direction(&self) -> LineDir {
        self.direction
    }

    /// Get the stroke of the line.
    /// By default, the line is a solid line of the foreground theme color.
    pub fn stroke(&self) -> &theme::Stroke {
        &self.stroke
    }

    /// Get the X-axis to use for this annotation.
    /// Only useful if multiple X-axes are used.
    pub fn x_axis(&self) -> &axis::Ref {
        &self.x_axis
    }

    /// Get the Y-axis to use for this annotation.
    /// Only useful if multiple Y-axes are used.
    pub fn y_axis(&self) -> &axis::Ref {
        &self.y_axis
    }

    /// Get the z-position of this annotation in relation to the series.
    pub fn zpos(&self) -> ZPos {
        self.zpos
    }
}

/// An arrow plotted on the plot area
#[derive(Debug, Clone, PartialEq)]
pub struct Arrow {
    x: Coord,
    y: Coord,
    dx: f32,
    dy: f32,
    head_size: f32,
    stroke: theme::Stroke,

    x_axis: axis::Ref,
    y_axis: axis::Ref,
    zpos: ZPos,
}

impl Arrow {
    /// Create a new arrow pointing at (x, y) in the given coordinates,
    /// with the given delta vector in plot units.
    pub fn new(x: impl Into<Coord>, y: impl Into<Coord>, dx: f32, dy: f32) -> Self {
        Arrow {
            x: x.into(),
            y: y.into(),
            dx,
            dy,
            head_size: 10.0,
            stroke: theme::Col::Foreground.into(),
            x_axis: Default::default(),
            y_axis: Default::default(),
            zpos: ZPos::AboveSeries,
        }
    }

    /// Set the line style of the arrow.
    /// By default the foreground theme color is used with a solid line of width 1.0.
    pub fn with_stroke(self, line: theme::Stroke) -> Self {
        Self {
            stroke: line,
            ..self
        }
    }

    /// Set the head size of the arrow in figure units. By default 5.0.
    pub fn with_head_size(self, head_size: f32) -> Self {
        Self { head_size, ..self }
    }

    /// Set the X-axis to use for this annotation.
    /// Only useful if multiple X-axes are used.
    /// By default, the first X-axis is used.
    pub fn with_x_axis(mut self, x_axis: axis::Ref) -> Self {
        self.x_axis = x_axis;
        self
    }

    /// Set the Y-axis to use for this annotation.
    /// Only useful if multiple Y-axes are used.
    /// By default, the first Y-axis is used.
    pub fn with_y_axis(mut self, y_axis: axis::Ref) -> Self {
        self.y_axis = y_axis;
        self
    }

    /// Set the z-position of this annotation in relation to the series.
    pub fn with_zpos(mut self, zpos: ZPos) -> Self {
        self.zpos = zpos;
        self
    }

    /// Get the target point of the arrow in data coordinates.
    pub fn target(&self) -> (Coord, Coord) {
        (self.x, self.y)
    }

    /// Get the delta vector of the arrow in figure units.
    pub fn delta(&self) -> (f32, f32) {
        (self.dx, self.dy)
    }

    /// Get the line style of the arrow.
    /// By default the foreground theme color is used with a solid line of width 1.0.
    pub fn stroke(&self) -> &theme::Stroke {
        &self.stroke
    }

    /// Get the head size of the arrow in figure units. By default 5.0.
    pub fn head_size(&self) -> f32 {
        self.head_size
    }

    /// Get the X-axis to use for this annotation.
    /// Only useful if multiple X-axes are used.
    pub fn x_axis(&self) -> &axis::Ref {
        &self.x_axis
    }

    /// Get the Y-axis to use for this annotation.
    /// Only useful if multiple Y-axes are used.
    pub fn y_axis(&self) -> &axis::Ref {
        &self.y_axis
    }

    /// Get the z-position of this annotation in relation to the series.
    pub fn zpos(&self) -> ZPos {
        self.zpos
    }
}

/// An arbitrary marker to place on the plot area
#[derive(Debug, Clone, PartialEq)]
pub struct Marker {
    x: Coord,
    y: Coord,
    marker: theme::Marker,

    x_axis: axis::Ref,
    y_axis: axis::Ref,
    zpos: ZPos,
}

impl Marker {
    /// Create a new marker at the given coordinates (x, y)
    pub fn new(x: impl Into<Coord>, y: impl Into<Coord>) -> Self {
        Marker {
            x: x.into(),
            y: y.into(),
            marker: Default::default(),
            x_axis: Default::default(),
            y_axis: Default::default(),
            zpos: ZPos::AboveSeries,
        }
    }

    /// Set the marker style.
    /// By default, a circle of size 5.0 and the foreground theme color is used.
    pub fn with_marker(self, marker: theme::Marker) -> Self {
        Self { marker, ..self }
    }

    /// Set the X-axis to use for this annotation.
    /// Only useful if multiple X-axes are used.
    /// By default, the first X-axis is used.
    pub fn with_x_axis(mut self, x_axis: axis::Ref) -> Self {
        self.x_axis = x_axis;
        self
    }

    /// Set the Y-axis to use for this annotation.
    /// Only useful if multiple Y-axes are used.
    /// By default, the first Y-axis is used.
    pub fn with_y_axis(mut self, y_axis: axis::Ref) -> Self {
        self.y_axis = y_axis;
        self
    }

    /// Set the z-position of this annotation in relation to the series.
    pub fn with_zpos(mut self, zpos: ZPos) -> Self {
        self.zpos = zpos;
        self
    }

    /// Get the position of the marker in data coordinates.
    pub fn position(&self) -> (Coord, Coord) {
        (self.x, self.y)
    }

    /// Get the marker style.
    /// By default, a circle of size 5.0 and the foreground theme color is used.
    pub fn marker(&self) -> &theme::Marker {
        &self.marker
    }

    /// Get the X-axis to use for this annotation.
    /// Only useful if multiple X-axes are used.
    pub fn x_axis(&self) -> &axis::Ref {
        &self.x_axis
    }

    /// Get the Y-axis to use for this annotation.
    /// Only useful if multiple Y-axes are used.
    pub fn y_axis(&self) -> &axis::Ref {
        &self.y_axis
    }

    /// Get the z-position of this annotation in relation to the series.
    pub fn zpos(&self) -> ZPos {
        self.zpos
    }
}

/// An anchor point for [`Label`].
/// It defines which point of the label is positioned at the given data coordinates.
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub enum Anchor {
    /// Anchor at the center of the label
    Center,
    #[default]
    /// Anchor at the top-left of the label
    TopLeft,
    /// Anchor at the top-right of the label
    TopRight,
    /// Anchor at the bottom-right of the label
    BottomRight,
    /// Anchor at the bottom-left of the label
    BottomLeft,
    /// Anchor at the top-center of the label
    TopCenter,
    /// Anchor at the center-right of the label
    CenterRight,
    /// Anchor at the bottom-center of the label
    BottomCenter,
    /// Anchor at the center-left of the label
    CenterLeft,
}

/// An arbitrary label to place on the plot area
#[derive(Debug, Clone, PartialEq)]
pub struct Label {
    x: Coord,
    y: Coord,
    text: Text,
    anchor: Anchor,
    frame: (Option<theme::Fill>, Option<theme::Stroke>),
    angle: f32,

    x_axis: axis::Ref,
    y_axis: axis::Ref,
    zpos: ZPos,
}

impl Label {
    /// Create a new label with the given text at coordinates (x, y)
    pub fn new(text: Text, x: impl Into<Coord>, y: impl Into<Coord>) -> Self {
        Label {
            x: x.into(),
            y: y.into(),
            text,
            anchor: Anchor::default(),
            frame: (None, None),
            angle: 0.0,
            x_axis: Default::default(),
            y_axis: Default::default(),
            zpos: ZPos::AboveSeries,
        }
    }

    /// Set the anchor point of the label.
    /// By default, the top-left corner is used.
    pub fn with_anchor(self, anchor: Anchor) -> Self {
        Self { anchor, ..self }
    }

    /// Set the frame border and fill of the label.
    /// By default, there is no frame.
    pub fn with_frame(self, fill: Option<theme::Fill>, stroke: Option<theme::Stroke>) -> Self {
        Self {
            frame: (fill, stroke),
            ..self
        }
    }

    /// Set the rotation angle of the label in degrees in counter-clockwise direction.
    /// The label is rotated around its anchor point.
    /// By default, the angle is 0.0 (horizontal).
    pub fn with_angle(self, angle: f32) -> Self {
        Self { angle, ..self }
    }

    /// Set the X-axis to use for this annotation.
    /// Only useful if multiple X-axes are used.
    /// By default, the first X-axis is used.
    pub fn with_x_axis(mut self, x_axis: axis::Ref) -> Self {
        self.x_axis = x_axis;
        self
    }

    /// Set the Y-axis to use for this annotation.
    /// Only useful if multiple Y-axes are used.
    /// By default, the first Y-axis is used.
    pub fn with_y_axis(mut self, y_axis: axis::Ref) -> Self {
        self.y_axis = y_axis;
        self
    }

    /// Set the z-position of this annotation in relation to the series.
    pub fn with_zpos(mut self, zpos: ZPos) -> Self {
        self.zpos = zpos;
        self
    }

    /// Get the position of the label in data coordinates.
    pub fn position(&self) -> (Coord, Coord) {
        (self.x, self.y)
    }

    /// Get the text of the label.
    pub fn text(&self) -> &Text {
        &self.text
    }

    /// Get the anchor point of the label.
    /// By default, the top-left corner is used.
    pub fn anchor(&self) -> Anchor {
        self.anchor
    }

    /// Get the frame border and fill of the label.
    pub fn frame(&self) -> (Option<&theme::Fill>, Option<&theme::Stroke>) {
        (self.frame.0.as_ref(), self.frame.1.as_ref())
    }

    /// Get the rotation angle of the label in degrees in counter-clockwise direction.
    pub fn angle(&self) -> f32 {
        self.angle
    }

    /// Get the X-axis to use for this annotation.
    /// Only useful if multiple X-axes are used.
    pub fn x_axis(&self) -> &axis::Ref {
        &self.x_axis
    }

    /// Get the Y-axis to use for this annotation.
    /// Only useful if multiple Y-axes are used.
    pub fn y_axis(&self) -> &axis::Ref {
        &self.y_axis
    }

    /// Get the z-position of this annotation in relation to the series.
    pub fn zpos(&self) -> ZPos {
        self.zpos
    }
}
