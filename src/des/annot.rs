//! Annotations to place on the plot area.
use crate::des::axis;
use crate::style::{self, theme};
use crate::text::Font;

/// An arbitrary graphical annotation placed on the plot area.
/// The placement is made according to the data coordinates.
/// By default, lines are plotted under the series, and other annotations are plotted above the series.
/// This can be changed using [`with_zpos()`](Annotation::with_zpos).
#[derive(Debug, Clone)]
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
#[derive(Debug, Clone)]
pub struct Line {
    direction: LineDir,
    stroke: theme::Stroke,

    x_axis: axis::Ref,
    y_axis: axis::Ref,
    zpos: ZPos,
}

/// The definition of the direction of a line plotted on the plot area.
/// This type defines the position and orientation of the line in data coordinates.
#[derive(Debug, Clone, Copy)]
pub enum LineDir {
    /// A horizontal line passing by the given y value in data coordinates
    Horizontal(f64),
    /// A vertical line passing by the given x value in data coordinates
    Vertical(f64),
    /// A line passing by (x, y) with the given slope in data coordinates
    Slope {
        /// The x value of the point the line passes by in data coordinates
        x: f64,
        /// The y value of the point the line passes by in data coordinates
        y: f64,
        /// The slope of the line in data coordinates
        slope: f32,
    },
    /// A line passing by (x1, y1) and (x2, y2) in data coordinates
    TwoPoints {
        /// The x value of the first point in data coordinates
        x1: f64,
        /// The y value of the first point in data coordinates
        y1: f64,
        /// The x value of the second point in data coordinates
        x2: f64,
        /// The y value of the second point in data coordinates
        y2: f64,
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
    pub fn vertical(x: f64) -> Self {
        Line::new(LineDir::Vertical(x))
    }

    /// Plot a horizontal line passing by y
    pub fn horizontal(y: f64) -> Self {
        Line::new(LineDir::Horizontal(y))
    }

    /// Plot a line passing by x and y with the given slope.
    /// This is only meaningful on linear scales, and will raise an error
    /// if either X or Y axes are logarithmic.
    pub fn slope(x: f64, y: f64, slope: f32) -> Self {
        Line::new(LineDir::Slope { x, y, slope })
    }

    /// Plot a line passing by (x1, y1) and (x2, y2).
    pub fn two_points(x1: f64, y1: f64, x2: f64, y2: f64) -> Self {
        Line::new(LineDir::TwoPoints { x1, y1, x2, y2 })
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
#[derive(Debug, Clone)]
pub struct Arrow {
    x: f64,
    y: f64,
    dx: f32,
    dy: f32,
    head_size: f32,
    stroke: theme::Stroke,

    x_axis: axis::Ref,
    y_axis: axis::Ref,
    zpos: ZPos,
}

impl Arrow {
    /// Create a new arrow pointing at (x, y) in data coordinates,
    /// with the given delta vector in figure units.
    pub fn new(x: f64, y: f64, dx: f32, dy: f32) -> Self {
        Arrow {
            x,
            y,
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
    pub fn target(&self) -> (f64, f64) {
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
#[derive(Debug, Clone)]
pub struct Marker {
    x: f64,
    y: f64,
    marker: theme::Marker,

    x_axis: axis::Ref,
    y_axis: axis::Ref,
    zpos: ZPos,
}

impl Marker {
    /// Create a new marker at data coordinates (x, y)
    pub fn new(x: f64, y: f64) -> Self {
        Marker {
            x,
            y,
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
    pub fn position(&self) -> (f64, f64) {
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
#[derive(Debug, Clone)]
pub struct Label {
    x: f64,
    y: f64,
    text: String,
    font_size: f32,
    font: Font,
    color: theme::Color,
    anchor: Anchor,
    frame: (Option<theme::Fill>, Option<theme::Stroke>),
    angle: f32,

    x_axis: axis::Ref,
    y_axis: axis::Ref,
    zpos: ZPos,
}

impl Label {
    /// Create a new label with the given text at data coordinates (x, y)
    pub fn new(text: String, x: f64, y: f64) -> Self {
        Label {
            x,
            y,
            text,
            font_size: 12.0,
            font: Font::default(),
            color: theme::Col::Foreground.into(),
            anchor: Anchor::default(),
            frame: (None, None),
            angle: 0.0,
            x_axis: Default::default(),
            y_axis: Default::default(),
            zpos: ZPos::AboveSeries,
        }
    }

    /// Set the font size of the label
    pub fn with_font_size(self, font_size: f32) -> Self {
        Self { font_size, ..self }
    }

    /// Set the font of the label
    pub fn with_font(self, font: Font) -> Self {
        Self { font, ..self }
    }

    /// Set the color of the label.
    /// By default, the foreground theme color is used.
    pub fn with_color(self, color: theme::Color) -> Self {
        Self { color, ..self }
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
    pub fn position(&self) -> (f64, f64) {
        (self.x, self.y)
    }

    /// Get the text of the label.
    pub fn text(&self) -> &str {
        &self.text
    }

    /// Get the font size of the label
    pub fn font_size(&self) -> f32 {
        self.font_size
    }

    /// Get the font of the label
    pub fn font(&self) -> &Font {
        &self.font
    }

    /// Get the color of the label.
    /// By default, the foreground theme color is used.
    pub fn color(&self) -> &theme::Color {
        &self.color
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
