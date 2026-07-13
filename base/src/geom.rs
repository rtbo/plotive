/*!
 * Geometric primitives.
 *
 * Paths and transforms are publicly imported from tiny-skia-path.
 *
 * Y low coordinates are at the top.
 */

use std::marker::PhantomData;

use strict_num::{FiniteF32, PositiveF32};
pub use tiny_skia_path::{Path, PathBuilder, PathSegment, PathVerb, Point, Transform};

/// A size in 2D space represented by width and height
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Size {
    w: f32,
    h: f32,
}

impl Size {
    /// Build a size from width and height
    pub const fn new(w: f32, h: f32) -> Self {
        Size { w, h }
    }

    /// The width
    pub const fn width(&self) -> f32 {
        self.w
    }

    /// The height
    pub const fn height(&self) -> f32 {
        self.h
    }

    /// Expand width and height by dw and dh
    pub const fn expand(&self, dw: f32, dh: f32) -> Size {
        Size {
            w: self.w + dw,
            h: self.h + dh,
        }
    }
}

impl From<(f32, f32)> for Size {
    fn from((w, h): (f32, f32)) -> Self {
        Size { w, h }
    }
}

/// A rectangle in 2D space represented by x, y, width and height
#[derive(Debug, Clone, Copy)]
pub struct Rect {
    x: FiniteF32,
    y: FiniteF32,
    w: PositiveF32,
    h: PositiveF32,
}

impl Rect {
    pub fn null() -> Self {
        Rect {
            x: FiniteF32::new(0.0).unwrap(),
            y: FiniteF32::new(0.0).unwrap(),
            w: PositiveF32::new(0.0).unwrap(),
            h: PositiveF32::new(0.0).unwrap(),
        }
    }

    /// Build a rectangle from x, y, width and height
    pub fn from_xywh(x: f32, y: f32, w: f32, h: f32) -> Self {
        Rect {
            x: FiniteF32::new(x).unwrap(),
            y: FiniteF32::new(y).unwrap(),
            w: PositiveF32::new(w).unwrap(),
            h: PositiveF32::new(h).unwrap(),
        }
    }

    /// Build a rectangle from top, right, bottom and left
    pub fn from_trbl(top: f32, right: f32, bottom: f32, left: f32) -> Self {
        Rect {
            x: FiniteF32::new(left).unwrap(),
            y: FiniteF32::new(top).unwrap(),
            w: PositiveF32::new(right - left).unwrap(),
            h: PositiveF32::new(bottom - top).unwrap(),
        }
    }

    /// Build a rectnagle from top left point and size
    pub fn from_ps(top_left: Point, size: Size) -> Self {
        Rect::from_xywh(top_left.x, top_left.y, size.w, size.h)
    }

    /// Build a rectangle from two corner points
    pub fn from_corners(p1: Point, p2: Point) -> Self {
        Rect::from_trbl(
            p1.y.min(p2.y),
            p1.x.max(p2.x),
            p1.y.max(p2.y),
            p1.x.min(p2.x),
        )
    }

    /// Pad the rectangle, removing padding from 4 sides
    pub fn pad(&self, padding: &Padding) -> Self {
        Rect {
            x: FiniteF32::new(self.x.get() + padding.left()).unwrap(),
            y: FiniteF32::new(self.y.get() + padding.top()).unwrap(),
            w: PositiveF32::new(self.w.get() - padding.sum_hor()).unwrap(),
            h: PositiveF32::new(self.h.get() - padding.sum_ver()).unwrap(),
        }
    }

    /// The top-left point of the rectangle
    pub const fn top_left(&self) -> Point {
        Point {
            x: self.left(),
            y: self.top(),
        }
    }

    /// The top-right point of the rectangle
    pub const fn top_right(&self) -> Point {
        Point {
            x: self.right(),
            y: self.top(),
        }
    }

    /// The bottom-right point of the rectangle
    pub const fn bottom_right(&self) -> Point {
        Point {
            x: self.right(),
            y: self.bottom(),
        }
    }

    /// The bottom-left point of the rectangle
    pub const fn bottom_left(&self) -> Point {
        Point {
            x: self.left(),
            y: self.bottom(),
        }
    }

    /// The size of the rectangle
    pub const fn size(&self) -> Size {
        Size {
            w: self.width(),
            h: self.height(),
        }
    }

    /// The X coordinate of the left side
    pub const fn x(&self) -> f32 {
        self.x.get()
    }

    /// The Y coordinate of the top side
    pub const fn y(&self) -> f32 {
        self.y.get()
    }

    /// The center point of the rectangle
    pub const fn center(&self) -> Point {
        Point {
            x: self.center_x(),
            y: self.center_y(),
        }
    }

    /// The horizontal center X coordinate
    pub const fn center_x(&self) -> f32 {
        self.x() + self.width() / 2.0
    }

    /// The vertical center Y coordinate
    pub const fn center_y(&self) -> f32 {
        self.y() + self.height() / 2.0
    }

    /// The width of the rectangle
    pub const fn width(&self) -> f32 {
        self.w.get()
    }

    /// The height of the rectangle
    pub const fn height(&self) -> f32 {
        self.h.get()
    }

    /// The top Y coordinate
    pub const fn top(&self) -> f32 {
        self.y.get()
    }

    /// The right X coordinate
    pub const fn right(&self) -> f32 {
        self.x.get() + self.w.get()
    }

    /// The bottom Y coordinate
    pub const fn bottom(&self) -> f32 {
        self.y.get() + self.h.get()
    }

    /// The left X coordinate
    pub const fn left(&self) -> f32 {
        self.x.get()
    }

    /// Set the top Y coordinate
    pub fn set_top(&mut self, top: f32) {
        self.y = FiniteF32::new(top).unwrap();
    }

    /// Set the right X coordinate
    pub fn set_right(&mut self, right: f32) {
        self.w = PositiveF32::new(right - self.x()).unwrap();
    }

    /// Set the bottom Y coordinate
    pub fn set_bottom(&mut self, bottom: f32) {
        self.h = PositiveF32::new(bottom - self.y()).unwrap();
    }

    /// Set the left X coordinate
    pub fn set_left(&mut self, left: f32) {
        self.x = FiniteF32::new(left).unwrap();
    }

    /// Shift the top side down by shift
    pub fn shifted_top_side(&self, shift: f32) -> Rect {
        Rect {
            x: self.x,
            y: FiniteF32::new(self.y.get() + shift).unwrap(),
            w: self.w,
            h: PositiveF32::new(self.h.get() - shift).unwrap(),
        }
    }

    /// Shift the right side right by shift
    pub fn shifted_right_side(&self, shift: f32) -> Rect {
        Rect {
            x: self.x,
            y: self.y,
            w: PositiveF32::new(self.w.get() + shift).unwrap(),
            h: self.h,
        }
    }

    /// Shift the bottom side down by shift
    pub fn shifted_bottom_side(&self, shift: f32) -> Rect {
        Rect {
            x: self.x,
            y: self.y,
            w: self.w,
            h: PositiveF32::new(self.h.get() + shift).unwrap(),
        }
    }

    /// Shift the left side right by shift
    pub fn shifted_left_side(&self, shift: f32) -> Rect {
        Rect {
            x: FiniteF32::new(self.x.get() + shift).unwrap(),
            y: self.y,
            w: PositiveF32::new(self.w.get() - shift).unwrap(),
            h: self.h,
        }
    }

    /// Shift the top side down by shift (in-place)
    pub fn shift_top_side(&mut self, shift: f32) {
        self.y = FiniteF32::new(self.y.get() + shift).unwrap();
        self.h = PositiveF32::new(self.h.get() - shift).unwrap();
    }

    /// Shift the right side right by shift (in-place)
    pub fn shift_right_side(&mut self, shift: f32) {
        self.w = PositiveF32::new(self.w.get() + shift).unwrap();
    }

    /// Shift the bottom side down by shift (in-place)
    pub fn shift_bottom_side(&mut self, shift: f32) {
        self.h = PositiveF32::new(self.h.get() + shift).unwrap();
    }

    /// Shift the left side right by shift (in-place)
    pub fn shift_left_side(&mut self, shift: f32) {
        self.x = FiniteF32::new(self.x.get() + shift).unwrap();
        self.w = PositiveF32::new(self.w.get() - shift).unwrap();
    }

    /// Build a copy of the rect with a new top side
    pub fn with_top(self, top: f32) -> Rect {
        let new_h = self.bottom() - top;
        Rect {
            y: FiniteF32::new(top).unwrap(),
            h: PositiveF32::new(new_h).unwrap(),
            ..self
        }
    }

    /// Build a copy of the rect with a new right side
    pub fn with_right(self, right: f32) -> Rect {
        let new_w = right - self.x();
        Rect {
            w: PositiveF32::new(new_w).unwrap(),
            ..self
        }
    }

    /// Build a copy of the rect with a new bottom side
    pub fn with_bottom(self, bottom: f32) -> Rect {
        let new_h = bottom - self.y();
        Rect {
            h: PositiveF32::new(new_h).unwrap(),
            ..self
        }
    }

    /// Build a copy of the rect with a new left side
    pub fn with_left(self, left: f32) -> Rect {
        let new_w = self.right() - left;
        Rect {
            x: FiniteF32::new(left).unwrap(),
            w: PositiveF32::new(new_w).unwrap(),
            ..self
        }
    }

    /// Unite two rectangles into one that contains both
    pub fn unite(r1: &Rect, r2: &Rect) -> Rect {
        let left = r1.left().min(r2.left());
        let top = r1.top().min(r2.top());
        let right = r1.right().max(r2.right());
        let bottom = r1.bottom().max(r2.bottom());
        Rect::from_trbl(top, right, bottom, left)
    }

    /// Unite two optional rectangles into one that contains both
    pub fn unite_opt(r1: Option<&Rect>, r2: Option<&Rect>) -> Option<Rect> {
        match (r1, r2) {
            (Some(r1), Some(r2)) => Some(Rect::unite(r1, r2)),
            (Some(r1), None) => Some(*r1),
            (None, Some(r2)) => Some(*r2),
            (None, None) => None,
        }
    }

    /// Transform the rectangle with a transform
    pub fn transform(self, transform: &Transform) -> Rect {
        let mut tlbr = [
            Point {
                x: self.left(),
                y: self.top(),
            },
            Point {
                x: self.right(),
                y: self.bottom(),
            },
        ];
        transform.map_points(&mut tlbr);

        let [p1, p2] = tlbr;
        let x = p1.x.min(p2.x);
        let y = p1.y.min(p2.y);
        let width = (p2.x - p1.x).abs();
        let height = (p2.y - p1.y).abs();

        Rect::from_xywh(x, y, width, height)
    }

    /// Translate the rectangle by dx and dy
    pub fn translate(&self, dx: f32, dy: f32) -> Rect {
        Rect {
            x: FiniteF32::new(self.x.get() + dx).unwrap(),
            y: FiniteF32::new(self.y.get() + dy).unwrap(),
            w: self.w,
            h: self.h,
        }
    }

    /// Scale the rectangle about a center point
    ///
    /// Panics if the scale factor is not positive.
    pub fn scale_about(&self, center: Point, scale_factor: f32) -> Self {
        assert!(scale_factor > 0.0, "Scale factor must be positive");

        let width = self.width() * scale_factor;
        let height = self.height() * scale_factor;

        let left = center.x - (center.x - self.left()) * scale_factor;
        let top = center.y - (center.y - self.top()) * scale_factor;

        Rect::from_xywh(left, top, width, height)
    }

    /// Test if the rectangle contains a point
    pub fn contains_point(&self, point: &Point) -> bool {
        point.x >= self.left()
            && point.x <= self.right()
            && point.y >= self.top()
            && point.y <= self.bottom()
    }

    /// Build a path from the rectangle
    pub fn to_path(&self) -> Path {
        PathBuilder::from_rect(
            tiny_skia_path::Rect::from_xywh(self.x.get(), self.y.get(), self.w.get(), self.h.get())
                .unwrap(),
        )
    }
}

/// Padding within a graphical element
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Padding {
    /// Uniform padding in all directions
    Even(f32),
    /// Vertical and horizontal padding
    Center {
        /// Vertical padding
        ver: f32,
        /// Horizontal padding
        hor: f32,
    },
    /// Top, right, bottom and left padding
    Custom {
        /// Top padding
        top: f32,
        /// Right padding
        right: f32,
        /// Bottom padding
        bottom: f32,
        /// Left padding
        left: f32,
    },
}

impl Padding {
    /// The top padding
    pub const fn top(&self) -> f32 {
        match self {
            Padding::Even(p) => *p,
            Padding::Center { ver: v, .. } => *v,
            Padding::Custom { top: t, .. } => *t,
        }
    }

    /// The right padding
    pub const fn right(&self) -> f32 {
        match self {
            Padding::Even(p) => *p,
            Padding::Center { hor: h, .. } => *h,
            Padding::Custom { right: r, .. } => *r,
        }
    }

    /// The bottom padding
    pub const fn bottom(&self) -> f32 {
        match self {
            Padding::Even(p) => *p,
            Padding::Center { ver: v, .. } => *v,
            Padding::Custom { bottom: b, .. } => *b,
        }
    }

    /// The left padding
    pub const fn left(&self) -> f32 {
        match self {
            Padding::Even(p) => *p,
            Padding::Center { hor: h, .. } => *h,
            Padding::Custom { left: l, .. } => *l,
        }
    }

    /// The total vertical padding
    pub const fn sum_ver(&self) -> f32 {
        match self {
            Padding::Even(p) => *p * 2.0,
            Padding::Center { ver: v, .. } => *v * 2.0,
            Padding::Custom {
                top: t, bottom: b, ..
            } => *t + *b,
        }
    }

    /// The total horizontal padding
    pub const fn sum_hor(&self) -> f32 {
        match self {
            Padding::Even(p) => *p * 2.0,
            Padding::Center { hor: h, .. } => *h * 2.0,
            Padding::Custom {
                left: l, right: r, ..
            } => *l + *r,
        }
    }
}

impl From<f32> for Padding {
    fn from(value: f32) -> Self {
        Padding::Even(value)
    }
}

impl From<(f32, f32)> for Padding {
    fn from((v, h): (f32, f32)) -> Self {
        Padding::Center { ver: v, hor: h }
    }
}

impl From<(f32, f32, f32, f32)> for Padding {
    fn from((t, r, b, l): (f32, f32, f32, f32)) -> Self {
        Padding::Custom {
            top: t,
            right: r,
            bottom: b,
            left: l,
        }
    }
}

/// Margin around a graphical element
#[derive(Debug, Clone, Copy)]
pub enum Margin {
    /// Uniform margin in all directions
    Even(f32),
    /// Vertical and horizontal margin
    Center {
        /// Vertical margin
        v: f32,
        /// Horizontal margin
        h: f32,
    },
    /// Top, right, bottom and left margin
    Custom {
        /// Top margin
        t: f32,
        /// Right margin
        r: f32,
        /// Bottom margin
        b: f32,
        /// Left margin
        l: f32,
    },
}

impl Margin {
    /// The top margin
    pub const fn top(&self) -> f32 {
        match self {
            Margin::Even(p) => *p,
            Margin::Center { v, .. } => *v,
            Margin::Custom { t, .. } => *t,
        }
    }

    /// The right margin
    pub const fn right(&self) -> f32 {
        match self {
            Margin::Even(p) => *p,
            Margin::Center { h, .. } => *h,
            Margin::Custom { r, .. } => *r,
        }
    }

    /// The bottom margin
    pub const fn bottom(&self) -> f32 {
        match self {
            Margin::Even(p) => *p,
            Margin::Center { v, .. } => *v,
            Margin::Custom { b, .. } => *b,
        }
    }

    /// The left margin
    pub const fn left(&self) -> f32 {
        match self {
            Margin::Even(p) => *p,
            Margin::Center { h, .. } => *h,
            Margin::Custom { l, .. } => *l,
        }
    }

    /// The total vertical margin
    pub const fn sum_ver(&self) -> f32 {
        match self {
            Margin::Even(p) => *p * 2.0,
            Margin::Center { v, .. } => *v * 2.0,
            Margin::Custom { t, b, .. } => *t + *b,
        }
    }

    /// The total horizontal margin
    pub const fn sum_hor(&self) -> f32 {
        match self {
            Margin::Even(p) => *p * 2.0,
            Margin::Center { h, .. } => *h * 2.0,
            Margin::Custom { l, r, .. } => *l + *r,
        }
    }
}

impl From<f32> for Margin {
    fn from(value: f32) -> Self {
        Margin::Even(value)
    }
}

impl From<(f32, f32)> for Margin {
    fn from((v, h): (f32, f32)) -> Self {
        Margin::Center { v, h }
    }
}

impl From<(f32, f32, f32, f32)> for Margin {
    fn from((t, r, b, l): (f32, f32, f32, f32)) -> Self {
        Margin::Custom { t, r, b, l }
    }
}

pub fn path_segments_rev_iter<'a>(path: &'a Path) -> PathSegmentsRevIter<'a> {
    PathSegmentsRevIter::new(path)
}

pub fn reverse_path(path: &Path) -> Path {
    let mut pb = PathBuilder::new();
    for seg in path_segments_rev_iter(path) {
        match seg {
            PathSegment::MoveTo(p) => pb.move_to(p.x, p.y),
            PathSegment::LineTo(p) => pb.line_to(p.x, p.y),
            PathSegment::QuadTo(ctrl, to) => pb.quad_to(ctrl.x, ctrl.y, to.x, to.y),
            PathSegment::CubicTo(ctrl1, ctrl2, to) => {
                pb.cubic_to(ctrl1.x, ctrl1.y, ctrl2.x, ctrl2.y, to.x, to.y)
            }
            PathSegment::Close => pb.close(),
        }
    }
    pb.finish()
        .expect("Reversing a valid path should yield a valid path")
}

pub struct PathSegmentsRevIter<'a> {
    segments: Vec<PathSegment>,
    segment_index: usize,
    _path: PhantomData<&'a Path>,
}

impl PathSegmentsRevIter<'_> {
    fn reverse_subpath(subpath: &SubPath, out: &mut Vec<PathSegment>) {
        let start = subpath.start;
        let last = subpath
            .segments
            .last()
            .map(|segment| segment.end())
            .unwrap_or(start);

        out.push(PathSegment::MoveTo(last));

        for segment in subpath.segments.iter().rev() {
            out.push(segment.rev_segment());
        }

        if subpath.closed {
            out.push(PathSegment::Close);
        }
    }

    fn new(path: &Path) -> Self {
        let mut subpaths: Vec<SubPath> = Vec::new();
        let mut curr_subpath: Option<SubPath> = None;
        let mut points_index = 0;

        for verb in path.verbs() {
            match *verb {
                PathVerb::Move => {
                    if let Some(subpath) = curr_subpath.take() {
                        subpaths.push(subpath);
                    }
                    let start = path.points()[points_index];
                    points_index += 1;
                    curr_subpath = Some(SubPath::new(start));
                }
                PathVerb::Line => {
                    let to = path.points()[points_index];
                    points_index += 1;
                    if let Some(subpath) = curr_subpath.as_mut() {
                        subpath.push_line(to);
                    }
                }
                PathVerb::Quad => {
                    let ctrl = path.points()[points_index];
                    let to = path.points()[points_index + 1];
                    points_index += 2;
                    if let Some(subpath) = curr_subpath.as_mut() {
                        subpath.push_quad(ctrl, to);
                    }
                }
                PathVerb::Cubic => {
                    let ctrl1 = path.points()[points_index];
                    let ctrl2 = path.points()[points_index + 1];
                    let to = path.points()[points_index + 2];
                    points_index += 3;
                    if let Some(subpath) = curr_subpath.as_mut() {
                        subpath.push_cubic(ctrl1, ctrl2, to);
                    }
                }
                PathVerb::Close => {
                    if let Some(subpath) = curr_subpath.as_mut() {
                        subpath.closed = true;
                    }
                }
            }
        }

        if let Some(subpath) = curr_subpath.take() {
            subpaths.push(subpath);
        }

        let mut segments: Vec<PathSegment> = Vec::new();
        for subpath in subpaths.iter().rev() {
            Self::reverse_subpath(subpath, &mut segments);
        }

        PathSegmentsRevIter {
            segment_index: 0,
            segments,
            _path: PhantomData,
        }
    }
}

impl<'a> Iterator for PathSegmentsRevIter<'a> {
    type Item = PathSegment;

    fn next(&mut self) -> Option<Self::Item> {
        if self.segment_index >= self.segments.len() {
            return None;
        }

        let segment = self.segments[self.segment_index];
        self.segment_index += 1;
        Some(segment)
    }
}

#[derive(Clone, Copy)]
enum SubPathSegment {
    Line {
        from: Point,
        to: Point,
    },
    Quad {
        from: Point,
        ctrl: Point,
        to: Point,
    },
    Cubic {
        from: Point,
        ctrl1: Point,
        ctrl2: Point,
        to: Point,
    },
}

impl SubPathSegment {
    fn end(&self) -> Point {
        match self {
            SubPathSegment::Line { to, .. } => *to,
            SubPathSegment::Quad { to, .. } => *to,
            SubPathSegment::Cubic { to, .. } => *to,
        }
    }

    fn rev_segment(&self) -> PathSegment {
        match self {
            SubPathSegment::Line { from, .. } => PathSegment::LineTo(*from),
            SubPathSegment::Quad { from, ctrl, .. } => PathSegment::QuadTo(*ctrl, *from),
            SubPathSegment::Cubic {
                from, ctrl1, ctrl2, ..
            } => PathSegment::CubicTo(*ctrl2, *ctrl1, *from),
        }
    }
}

struct SubPath {
    start: Point,
    curr: Point,
    closed: bool,
    segments: Vec<SubPathSegment>,
}

impl SubPath {
    fn new(start: Point) -> Self {
        Self {
            start,
            curr: start,
            closed: false,
            segments: Vec::new(),
        }
    }

    fn push_line(&mut self, to: Point) {
        self.segments.push(SubPathSegment::Line {
            from: self.curr,
            to,
        });
        self.curr = to;
    }

    fn push_quad(&mut self, ctrl: Point, to: Point) {
        self.segments.push(SubPathSegment::Quad {
            from: self.curr,
            ctrl,
            to,
        });
        self.curr = to;
    }

    fn push_cubic(&mut self, ctrl1: Point, ctrl2: Point, to: Point) {
        self.segments.push(SubPathSegment::Cubic {
            from: self.curr,
            ctrl1,
            ctrl2,
            to,
        });
        self.curr = to;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn p(x: f32, y: f32) -> Point {
        Point { x, y }
    }

    #[test]
    fn reverse_open_path_segments() {
        let mut pb = PathBuilder::new();
        pb.move_to(0.0, 0.0);
        pb.line_to(1.0, 1.0);
        pb.quad_to(2.0, 3.0, 4.0, 5.0);
        pb.cubic_to(6.0, 7.0, 8.0, 9.0, 10.0, 11.0);
        let path = pb.finish().unwrap();

        let rev: Vec<PathSegment> = path_segments_rev_iter(&path).collect();
        let expected = vec![
            PathSegment::MoveTo(p(10.0, 11.0)),
            PathSegment::CubicTo(p(8.0, 9.0), p(6.0, 7.0), p(4.0, 5.0)),
            PathSegment::QuadTo(p(2.0, 3.0), p(1.0, 1.0)),
            PathSegment::LineTo(p(0.0, 0.0)),
        ];

        assert_eq!(rev, expected);
    }

    #[test]
    fn reverse_closed_path_segments() {
        let mut pb = PathBuilder::new();
        pb.move_to(0.0, 0.0);
        pb.line_to(1.0, 0.0);
        pb.line_to(1.0, 1.0);
        pb.close();
        let path = pb.finish().unwrap();

        let rev: Vec<PathSegment> = path_segments_rev_iter(&path).collect();
        let expected = vec![
            PathSegment::MoveTo(p(1.0, 1.0)),
            PathSegment::LineTo(p(1.0, 0.0)),
            PathSegment::LineTo(p(0.0, 0.0)),
            PathSegment::Close,
        ];

        assert_eq!(rev, expected);
    }

    #[test]
    fn reverse_multiple_subpaths() {
        let mut pb = PathBuilder::new();
        pb.move_to(0.0, 0.0);
        pb.line_to(1.0, 0.0);
        pb.move_to(5.0, 5.0);
        pb.line_to(6.0, 6.0);
        let path = pb.finish().unwrap();

        let rev: Vec<PathSegment> = path_segments_rev_iter(&path).collect();
        let expected = vec![
            PathSegment::MoveTo(p(6.0, 6.0)),
            PathSegment::LineTo(p(5.0, 5.0)),
            PathSegment::MoveTo(p(1.0, 0.0)),
            PathSegment::LineTo(p(0.0, 0.0)),
        ];

        assert_eq!(rev, expected);
    }
}
