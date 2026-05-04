use std::fmt;
use std::sync::Arc;

use axis::AsBoundRef;
use plotive_base::Rgb8;
use plotive_base::geom::PathSegment;
use scale::{CoordMap, CoordMapXy};

use crate::color::ColorMap;
use crate::des::cmap::AsColorMap;
use crate::drawing::axis::Bounds;
use crate::drawing::plot::Orientation;
use crate::drawing::{
    Categories, ColumnExt, Error, F64ColumnExt, axis, legend, marker, plot_to_fig, scale,
};
use crate::{Style, data, des, geom, render, style};

/// trait implemented by series, or any other item that
/// has to populate the legend
pub trait SeriesExt {
    fn legend_entry(&self) -> Option<legend::Entry<'_>>;
}

impl SeriesExt for des::series::Line {
    fn legend_entry(&self) -> Option<legend::Entry<'_>> {
        self.name().map(|n| legend::Entry {
            label: n.as_ref(),
            font: None,
            shape: legend::ShapeRef::Line(self.stroke()),
        })
    }
}

impl SeriesExt for des::series::Scatter {
    fn legend_entry(&self) -> Option<legend::Entry<'_>> {
        self.name().map(|n| legend::Entry {
            label: n.as_ref(),
            font: None,
            shape: legend::ShapeRef::Marker(self.marker()),
        })
    }
}

impl SeriesExt for des::series::Area {
    fn legend_entry(&self) -> Option<legend::Entry<'_>> {
        self.name().map(|n| legend::Entry {
            label: n.as_ref(),
            font: None,
            shape: legend::ShapeRef::AreaRect {
                fill: self.fill(),
                stroke_y1: self.stroke_y1(),
                stroke_y2: self.stroke_y2(),
            },
        })
    }
}

impl SeriesExt for des::series::Histogram {
    fn legend_entry(&self) -> Option<legend::Entry<'_>> {
        self.name().map(|n| legend::Entry {
            label: n.as_ref(),
            font: None,
            shape: legend::ShapeRef::Rect(Some(self.fill()), self.outline()),
        })
    }
}

impl SeriesExt for des::series::Bars {
    fn legend_entry(&self) -> Option<legend::Entry<'_>> {
        self.name().map(|n| legend::Entry {
            label: n.as_ref(),
            font: None,
            shape: legend::ShapeRef::Rect(Some(self.fill()), self.outline()),
        })
    }
}

impl SeriesExt for des::series::BarSeries {
    fn legend_entry(&self) -> Option<legend::Entry<'_>> {
        self.name().map(|n| legend::Entry {
            label: n.as_ref(),
            font: None,
            shape: legend::ShapeRef::Rect(Some(self.fill()), self.outline()),
        })
    }
}

fn get_column<'a, D>(
    col: &'a des::series::DataCol,
    data_source: &'a D,
) -> Result<&'a dyn data::Column, Error>
where
    D: data::Source + ?Sized,
{
    match col {
        des::series::DataCol::Inline(col) => Ok(col),
        des::series::DataCol::SrcRef(name) => data_source
            .column(name)
            .ok_or_else(|| Error::MissingDataSrc(name.to_string())),
    }
}

fn calc_xy_bounds<D>(
    data_source: &D,
    x_data: &des::series::DataCol,
    y_data: &des::series::DataCol,
) -> Result<Option<(axis::Bounds, axis::Bounds)>, Error>
where
    D: data::Source + ?Sized,
{
    let x_col = get_column(x_data, data_source)?;
    let y_col = get_column(y_data, data_source)?;

    if x_col.len() != y_col.len() {
        return Err(Error::InconsistentData(
            "X and Y data must be the same length".to_string(),
        ));
    }

    if x_col.is_empty() {
        return Ok(None);
    }

    let x_bounds = x_col.bounds().ok_or(Error::UnboundedAxis)?;
    let y_bounds = y_col.bounds().ok_or(Error::UnboundedAxis)?;

    Ok(Some((x_bounds, y_bounds)))
}

#[derive(Debug, Clone)]
pub(super) struct AxisMatcher<'a> {
    pub(super) plt_idx: usize,
    pub(super) ax_idx: usize,
    pub(super) id: Option<&'a str>,
    pub(super) title: Option<&'a str>,
}

impl<'a> AxisMatcher<'a> {
    pub(super) fn matches_ref(
        &self,
        ax_ref: &des::axis::Ref,
        plt_idx: usize,
    ) -> Result<bool, Error> {
        match ax_ref {
            des::axis::Ref::Idx(ax_idx) => Ok(self.ax_idx == *ax_idx && self.plt_idx == plt_idx),
            des::axis::Ref::Id(id) => Ok(self.id == Some(id) || self.title == Some(id)),
            ax_ref => Err(Error::IllegalAxisRef(ax_ref.clone())),
        }
    }
}

#[derive(Debug, Clone)]
pub struct Series {
    plot: SeriesPlot,
    x_axis: des::axis::Ref,
    y_axis: des::axis::Ref,
}

#[derive(Debug, Clone)]
enum SeriesPlot {
    Line(Line),
    Scatter(Scatter),
    Area(Area),
    Histogram(Histogram),
    Bars(Bars),
    BarsGroup(BarsGroup),
}

impl Series {
    pub fn prepare<D>(index: usize, series: &des::Series, data_source: &D) -> Result<Self, Error>
    where
        D: data::Source + ?Sized,
    {
        let plot = match &series {
            des::Series::Line(des) => SeriesPlot::Line(Line::prepare(index, des, data_source)?),
            des::Series::Scatter(des) => {
                SeriesPlot::Scatter(Scatter::prepare(index, des, data_source)?)
            }
            des::Series::Area(des) => SeriesPlot::Area(Area::prepare(index, des, data_source)?),
            des::Series::Histogram(des) => {
                SeriesPlot::Histogram(Histogram::prepare(index, des, data_source)?)
            }
            des::Series::Bars(des) => SeriesPlot::Bars(Bars::prepare(index, des, data_source)?),
            des::Series::BarsGroup(des) => {
                SeriesPlot::BarsGroup(BarsGroup::prepare(index, des, data_source)?)
            }
        };

        let (x_axis, y_axis) = series.axes();

        Ok(Series {
            plot,
            x_axis: x_axis.clone(),
            y_axis: y_axis.clone(),
        })
    }

    pub fn axes(&self) -> (&des::axis::Ref, &des::axis::Ref) {
        (&self.x_axis, &self.y_axis)
    }

    /// Unites bounds for series whose axis matches with `matcher`
    pub fn unite_bounds<'a, S>(
        or: Orientation,
        series: S,
        starter: Option<axis::Bounds>,
        matcher: &AxisMatcher,
        plt_idx: usize,
    ) -> Result<Option<axis::Bounds>, Error>
    where
        S: IntoIterator<Item = &'a Series>,
    {
        let mut a: Option<axis::Bounds> = starter;
        for s in series {
            let axis = match or {
                Orientation::X => s.x_axis(),
                Orientation::Y => s.y_axis(),
            };
            if !matcher.matches_ref(axis, plt_idx)? {
                continue;
            }

            let Some(sb) = s.bounds() else {
                continue;
            };

            let b = match or {
                Orientation::X => &sb.0,
                Orientation::Y => &sb.1,
            };

            if let Some(a) = &mut a {
                a.unite_with(b)?;
            } else {
                a = Some(b.to_bounds());
            }
        }
        Ok(a)
    }

    fn bounds(&self) -> Option<(axis::BoundsRef<'_>, axis::BoundsRef<'_>)> {
        match &self.plot {
            SeriesPlot::Line(line) => line
                .ab
                .as_ref()
                .map(|(x, y)| (x.as_bound_ref(), y.as_bound_ref())),
            SeriesPlot::Scatter(scatter) => scatter
                .ab
                .as_ref()
                .map(|(x, y)| (x.as_bound_ref(), y.as_bound_ref())),
            SeriesPlot::Area(area) => area
                .ab
                .as_ref()
                .map(|(x, y)| (x.as_bound_ref(), y.as_bound_ref())),
            SeriesPlot::Histogram(hist) => Some((hist.ab.0.into(), hist.ab.1.into())),
            SeriesPlot::Bars(bars) => bars.bounds(),
            SeriesPlot::BarsGroup(bg) => {
                Some((bg.bounds.0.as_bound_ref(), bg.bounds.1.as_bound_ref()))
            }
        }
    }

    fn x_axis(&self) -> &des::axis::Ref {
        match &self.plot {
            SeriesPlot::Line(line) => &line.axes.0,
            SeriesPlot::Scatter(scatter) => &scatter.axes.0,
            SeriesPlot::Area(area) => &area.axes.0,
            SeriesPlot::Histogram(hist) => &hist.axes.0,
            SeriesPlot::Bars(bars) => &bars.axes.0,
            SeriesPlot::BarsGroup(bg) => &bg.axes.0,
        }
    }

    fn y_axis(&self) -> &des::axis::Ref {
        match &self.plot {
            SeriesPlot::Line(line) => &line.axes.1,
            SeriesPlot::Scatter(scatter) => &scatter.axes.1,
            SeriesPlot::Area(area) => &area.axes.1,
            SeriesPlot::Histogram(hist) => &hist.axes.1,
            SeriesPlot::Bars(bars) => &bars.axes.1,
            SeriesPlot::BarsGroup(bg) => &bg.axes.1,
        }
    }

    pub fn update_data<D>(
        &mut self,
        data_source: &D,
        rect: &geom::Rect,
        cm: &CoordMapXy,
    ) -> Result<(), Error>
    where
        D: data::Source + ?Sized,
    {
        match &mut self.plot {
            SeriesPlot::Line(xy) => {
                xy.update_data(data_source, rect, cm);
            }
            SeriesPlot::Scatter(sc) => sc.update_data(data_source, rect, cm),
            SeriesPlot::Area(area) => area.update_data(data_source, rect, cm),
            SeriesPlot::Histogram(hist) => {
                hist.update_data(data_source, rect, cm);
            }
            SeriesPlot::Bars(bars) => {
                bars.update_data(data_source, rect, cm);
            }
            SeriesPlot::BarsGroup(bg) => bg.update_data(data_source, rect, cm),
        }
        Ok(())
    }
}

impl Series {
    pub fn draw<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        match &self.plot {
            SeriesPlot::Line(xy) => xy.draw(surface, style),
            SeriesPlot::Scatter(sc) => sc.draw(surface, style),
            SeriesPlot::Area(area) => area.draw(surface, style),
            SeriesPlot::Histogram(hist) => hist.draw(surface, style),
            SeriesPlot::Bars(bars) => bars.draw(surface, style),
            SeriesPlot::BarsGroup(bg) => bg.draw(surface, style),
        }
    }
}

trait Liner: Sized {
    fn new(pt_len: usize) -> Self
    where
        Self: Sized;

    fn start_line(&mut self, x: f32, y: f32);
    fn cont_line(&mut self, x: f32, y: f32);
    fn stop_line(&mut self, x: f32, y: f32) {
        self.cont_line(x, y);
    }

    fn into_path(self) -> geom::Path;

    fn make_path(
        mut self,
        x: &dyn data::Column,
        y: &dyn data::Column,
        cm: &CoordMapXy,
        rect: &geom::Rect,
    ) -> geom::Path {
        let mut prev = None;
        let mut cur = None;

        for (x, y) in x.sample_iter().zip(y.sample_iter()) {
            let next = if x.is_null() || y.is_null() {
                None
            } else {
                let (x, y) = cm.map_coord((x, y)).expect("Should be valid coordinates");
                let (x, y) = plot_to_fig(rect, x, y);
                Some((x, y))
            };

            match (prev, cur, next) {
                (_, None, _) => {}
                (None, Some(_), None) => {
                    // single point, no line to draw
                }
                (None, Some((x, y)), Some(_)) => {
                    self.start_line(x, y);
                }
                (Some(_), Some((x, y)), None) => {
                    self.stop_line(x, y);
                }
                (Some(_), Some((x, y)), Some(_)) => {
                    self.cont_line(x, y);
                }
            }
            prev = cur;
            cur = next;
        }

        match (prev, cur) {
            (_, None) => {}
            (None, Some(_)) => {
                // single point, no line to draw
            }
            (Some(_), Some((x, y))) => {
                self.stop_line(x, y);
            }
        }
        self.into_path()
    }
}

struct LinearLiner {
    pb: geom::PathBuilder,
}

impl Liner for LinearLiner {
    fn new(pt_len: usize) -> Self {
        LinearLiner {
            pb: geom::PathBuilder::with_capacity(pt_len + 1, pt_len),
        }
    }

    fn start_line(&mut self, x: f32, y: f32) {
        self.pb.move_to(x, y);
    }

    fn cont_line(&mut self, x: f32, y: f32) {
        self.pb.line_to(x, y);
    }

    fn into_path(self) -> geom::Path {
        self.pb.finish().expect("Should be a valid path")
    }
}

struct StepLiner {
    pb: geom::PathBuilder,
    prev_x: Option<f32>,
    prev_y: Option<f32>,
    step_type: des::series::Interpolation,
}

impl Liner for StepLiner {
    fn new(_pt_len: usize) -> Self {
        StepLiner {
            pb: geom::PathBuilder::new(),
            prev_x: None,
            prev_y: None,
            step_type: des::series::Interpolation::StepEarly, // default, will be set properly in prepare
        }
    }

    fn into_path(self) -> geom::Path {
        self.pb.finish().expect("Should be a valid path")
    }

    fn start_line(&mut self, x: f32, y: f32) {
        self.prev_x = Some(x);
        self.prev_y = Some(y);
        self.pb.move_to(x, y);
    }

    fn cont_line(&mut self, x: f32, y: f32) {
        if let (Some(px), Some(py)) = (self.prev_x, self.prev_y) {
            match self.step_type {
                des::series::Interpolation::StepEarly => {
                    self.pb.line_to(px, y);
                    self.pb.line_to(x, y);
                }
                des::series::Interpolation::StepLate => {
                    self.pb.line_to(x, py);
                    self.pb.line_to(x, y);
                }
                des::series::Interpolation::StepMiddle => {
                    let mid_x = (px + x) / 2.0;
                    self.pb.line_to(mid_x, py);
                    self.pb.line_to(mid_x, y);
                    self.pb.line_to(x, y);
                }
                _ => {}
            }
        } else {
            self.pb.move_to(x, y);
        }
        self.prev_x = Some(x);
        self.prev_y = Some(y);
    }
}

struct CubicSplineLiner {
    pb: geom::PathBuilder,
    buf: [(f32, f32); 4],
    buf_idx: usize,
}

impl CubicSplineLiner {
    fn add_point(&mut self, points: &[(f32, f32)]) {
        match points.len() {
            2 => {
                self.pb.line_to(points[1].0, points[1].1);
            }
            3 => {
                unreachable!()
                // // For the first segment, we can use a quadratic Bezier with control point at p1
                // let cp_x = points[1].0;
                // let cp_y = points[1].1;
                // self.pb
                //     .quad_to(cp_x, cp_y, points[2].0, points[2].1);
            }
            4 => {
                // Calculate control points for cubic Bezier using Catmull-Rom formulation
                // The tangent at p1 is (p2 - p0) / 2
                // The tangent at p2 is (p3 - p1) / 2

                // Tension parameter (0.5 for standard Catmull-Rom)
                let tension = 0.5;

                // Control point 1: p1 + tangent_at_p1 / 3
                let tangent1_x = (points[2].0 - points[0].0) * tension;
                let tangent1_y = (points[2].1 - points[0].1) * tension;
                let cp1_x = points[1].0 + tangent1_x / 3.0;
                let cp1_y = points[1].1 + tangent1_y / 3.0;

                // Control point 2: p2 - tangent_at_p2 / 3
                let tangent2_x = (points[3].0 - points[1].0) * tension;
                let tangent2_y = (points[3].1 - points[1].1) * tension;
                let cp2_x = points[2].0 - tangent2_x / 3.0;
                let cp2_y = points[2].1 - tangent2_y / 3.0;

                // Draw cubic Bezier curve
                self.pb
                    .cubic_to(cp1_x, cp1_y, cp2_x, cp2_y, points[2].0, points[2].1);
            }
            _ => {}
        }
    }
}

impl Liner for CubicSplineLiner {
    fn new(_pt_len: usize) -> Self {
        CubicSplineLiner {
            pb: geom::PathBuilder::new(),
            buf: [(0.0, 0.0); 4],
            buf_idx: 0,
        }
    }

    fn into_path(self) -> geom::Path {
        self.pb.finish().expect("Should be a valid path")
    }

    fn start_line(&mut self, x: f32, y: f32) {
        self.buf[0] = (x, y);
        self.buf_idx = 1;
        self.pb.move_to(x, y);
    }

    fn cont_line(&mut self, x: f32, y: f32) {
        self.buf[self.buf_idx] = (x, y);
        self.buf_idx += 1;
        if self.buf_idx == 3 {
            // For the first segment, we can use a quadratic Bezier with control point at p1
            let [(x0, y0), (x1, y1), (x2, y2), _] = self.buf;
            let points = [(x0, y0), (x0, y0), (x1, y1), (x2, y2)];
            self.add_point(&points);
        } else if self.buf_idx == 4 {
            let points = self.buf;
            self.add_point(&points);
            // Shift buffer
            self.buf[0] = self.buf[1];
            self.buf[1] = self.buf[2];
            self.buf[2] = self.buf[3];
            self.buf_idx = 3;
        }
    }

    fn stop_line(&mut self, x: f32, y: f32) {
        self.cont_line(x, y);

        // we draw the last segment if any
        if self.buf_idx == 3 {
            let points = [self.buf[0], self.buf[1], self.buf[2], self.buf[2]];
            self.add_point(&points);
        }
    }
}

fn calc_xy_line_path(
    x_col: &dyn data::Column,
    y_col: &dyn data::Column,
    interpolation: des::series::Interpolation,
    rect: &geom::Rect,
    cm: &CoordMapXy,
) -> geom::Path {
    match interpolation {
        des::series::Interpolation::Linear => {
            let liner = LinearLiner::new(x_col.len());
            liner.make_path(x_col, y_col, cm, rect)
        }
        des::series::Interpolation::StepEarly
        | des::series::Interpolation::StepLate
        | des::series::Interpolation::StepMiddle => {
            let mut liner = StepLiner::new(x_col.len());
            liner.step_type = interpolation;
            liner.make_path(x_col, y_col, cm, rect)
        }
        des::series::Interpolation::Spline => {
            let liner = CubicSplineLiner::new(x_col.len());
            liner.make_path(x_col, y_col, cm, rect)
        }
    }
}

#[derive(Debug, Clone)]
struct MarkerPoint {
    pos: geom::Point,
    scale: f32,
    fill: Option<Rgb8>,
    stroke: Option<Rgb8>,
}

impl Default for MarkerPoint {
    fn default() -> Self {
        MarkerPoint {
            pos: geom::Point { x: 0.0, y: 0.0 },
            scale: 1.0,
            fill: None,
            stroke: None,
        }
    }
}

#[derive(Debug, Clone)]
struct MarkerData {
    path: geom::Path,
    points: Vec<MarkerPoint>,
    marker: style::series::Marker,
}

impl MarkerData {
    fn new(marker: style::series::Marker) -> Self {
        let path = marker::marker_path(marker.shape);
        Self {
            path,
            points: Vec::new(),
            marker,
        }
    }

    fn clear(&mut self) {
        self.points.clear();
    }

    fn draw<S>(&self, surface: &mut S, style: &Style, index: usize)
    where
        S: render::Surface,
    {
        if self.points.is_empty() {
            return;
        }

        let rc = (style, index);

        for p in &self.points {
            let scale = self.marker.size.scale(p.scale).to_visual_size();
            let transform =
                geom::Transform::from_translate(p.pos.x, p.pos.y).pre_scale(scale, scale);

            let fill = self.marker.fill.as_ref().map(|f| {
                let f = f.as_paint(&rc);
                if let Some(rgb) = p.fill {
                    f.with_rgb(rgb)
                } else {
                    f
                }
            });

            let stroke = self.marker.stroke.as_ref().map(|s| {
                let s = s.as_stroke(&rc).with_multiplied_width(1.0 / scale);
                if let Some(rgb) = p.stroke {
                    s.with_rgb(rgb)
                } else {
                    s
                }
            });

            let path = render::Path {
                path: &self.path,
                fill,
                stroke,
                transform: Some(&transform),
            };
            surface.draw_path(&path);
        }
    }
}

#[derive(Debug, Clone)]
struct Line {
    index: usize,
    cols: (des::DataCol, des::DataCol),
    ab: Option<(axis::Bounds, axis::Bounds)>,
    axes: (des::axis::Ref, des::axis::Ref),
    path: Option<geom::Path>,
    stroke: style::series::Stroke,
    interpolation: des::series::Interpolation,
    marker_data: Option<MarkerData>,
}

impl Line {
    fn prepare<D>(index: usize, des: &des::series::Line, data_source: &D) -> Result<Self, Error>
    where
        D: data::Source + ?Sized,
    {
        let cols = (des.x_data().clone(), des.y_data().clone());
        let xy_bounds = calc_xy_bounds(data_source, &cols.0, &cols.1)?;
        let marker_data = des.marker().cloned().map(MarkerData::new);
        Ok(Line {
            index,
            cols,
            ab: xy_bounds,
            axes: (des.x_axis().clone(), des.y_axis().clone()),
            path: None,
            stroke: des.stroke().clone(),
            interpolation: des.interpolation(),
            marker_data,
        })
    }

    fn update_data<D>(&mut self, data_source: &D, rect: &geom::Rect, cm: &CoordMapXy)
    where
        D: data::Source + ?Sized,
    {
        // unwraping here as data is checked during setup phase
        let x_col = get_column(&self.cols.0, data_source).unwrap();
        let y_col = get_column(&self.cols.1, data_source).unwrap();

        debug_assert!(x_col.len() == y_col.len());

        if self.ab.is_none() && x_col.is_empty() {
            self.path = None;
            return;
        }

        if self.ab.is_none() && !x_col.is_empty() {
            let xy_bounds = calc_xy_bounds(data_source, &self.cols.0, &self.cols.1)
                .expect("Should be able to calculate bounds for non-empty data")
                .expect("Should be able to calculate bounds for non-empty data");
            self.ab = Some(xy_bounds);
        }

        let path = calc_xy_line_path(x_col, y_col, self.interpolation, rect, cm);

        self.path = Some(path);

        if let Some(marker_data) = self.marker_data.as_mut() {
            let mut points = Vec::with_capacity(x_col.len());

            for (x, y) in x_col.sample_iter().zip(y_col.sample_iter()) {
                if x.is_null() || y.is_null() {
                    continue;
                }
                let (x, y) = cm.map_coord((x, y)).expect("Should be valid coordinates");
                let x = rect.left() + x;
                let y = rect.bottom() - y;
                points.push(MarkerPoint {
                    pos: geom::Point { x, y },
                    ..Default::default()
                });
            }
            marker_data.points = points;
        }
    }

    fn draw<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        let rc = (style, self.index);

        if let Some(path) = self.path.as_ref() {
            let rpath = render::Path {
                path,
                fill: None,
                stroke: Some(self.stroke.as_stroke(&rc)),
                transform: None,
            };
            surface.draw_path(&rpath);
        }

        if let Some(marker) = self.marker_data.as_ref() {
            marker.draw(surface, style, self.index);
        }
    }
}

#[derive(Clone)]
struct Scatter {
    index: usize,
    cols: (des::DataCol, des::DataCol),
    size_col: Option<des::DataCol>,
    color_data: Option<(des::DataCol, Option<String>, Arc<dyn ColorMap>)>,
    ab: Option<(axis::Bounds, axis::Bounds)>,
    axes: (des::axis::Ref, des::axis::Ref),
    marker_data: MarkerData,
}

impl fmt::Debug for Scatter {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Scatter")
            .field("index", &self.index)
            .field("cols", &self.cols)
            .field("size_col", &self.size_col)
            .field(
                "color_data",
                &(self.color_data.as_ref().map(|(col, label, _)| (col, label))),
            )
            .field("ab", &self.ab)
            .field("axes", &self.axes)
            .finish()
    }
}

impl Scatter {
    fn prepare<D>(index: usize, des: &des::series::Scatter, data_source: &D) -> Result<Self, Error>
    where
        D: data::Source + ?Sized,
    {
        let cols = (des.x_data().clone(), des.y_data().clone());
        let size_col = des.size_data().cloned();
        let color_data = des.color_data().map(|(col, cmap)| {
            let col = col.clone();
            let name = cmap.name().map(|l| l.to_string());
            let cmap = cmap.as_color_map();
            (col, name, cmap)
        });
        let xy_bounds = calc_xy_bounds(data_source, &cols.0, &cols.1)?;
        let marker_data = MarkerData::new(des.marker().clone());
        Ok(Scatter {
            index,
            cols,
            size_col,
            color_data,
            ab: xy_bounds,
            axes: (des.x_axis().clone(), des.y_axis().clone()),
            marker_data,
        })
    }

    fn update_data<D>(&mut self, data_source: &D, rect: &geom::Rect, cm: &CoordMapXy)
    where
        D: data::Source + ?Sized,
    {
        let x_col = get_column(&self.cols.0, data_source).unwrap();
        let y_col = get_column(&self.cols.1, data_source).unwrap();
        debug_assert!(x_col.len() == y_col.len());

        let size_col = self
            .size_col
            .as_ref()
            .map(|col| get_column(col, data_source).unwrap());
        debug_assert!(size_col.map_or(true, |sc| sc.len() == x_col.len()));

        if self.ab.is_none() && x_col.is_empty() {
            self.marker_data.clear();
            return;
        }

        if self.ab.is_none() && !x_col.is_empty() {
            let xy_bounds = calc_xy_bounds(data_source, &self.cols.0, &self.cols.1)
                .expect("Should be able to calculate bounds for non-empty data")
                .expect("Should be able to calculate bounds for non-empty data");
            self.ab = Some(xy_bounds);
        }

        let mut points = Vec::with_capacity(x_col.len());

        let mut size_iter = size_col.map(|sc| sc.sample_iter());
        let mut color_iter = self
            .color_data
            .as_ref()
            .map(|(col, _, _)| get_column(col, data_source).unwrap().sample_iter());
        let cmap = self.color_data.as_ref().map(|(_, _, cmap)| cmap.clone());

        let has_fill = self.marker_data.marker.fill.is_some();
        let has_stroke = self.marker_data.marker.stroke.is_some();

        for (x, y) in x_col.sample_iter().zip(y_col.sample_iter()) {
            if x.is_null() || y.is_null() {
                continue;
            }

            let (x, y) = cm.map_coord((x, y)).expect("Should be valid coordinates");
            let x = rect.left() + x;
            let y = rect.bottom() - y;
            let scale = size_iter
                .as_mut()
                .and_then(|iter| iter.next())
                .and_then(|v| v.as_num())
                .map(|v| v as f32)
                .unwrap_or(1.0);

            let color_sample = color_iter.as_mut().and_then(|iter| iter.next());

            let fill = if has_fill {
                color_sample
                    .zip(cmap.as_ref())
                    .map(|(v, cmap)| cmap.map_color(v))
            } else {
                None
            };
            let stroke = if has_stroke {
                color_sample
                    .zip(cmap.as_ref())
                    .map(|(v, cmap)| cmap.map_color(v))
            } else {
                None
            };

            points.push(MarkerPoint {
                pos: geom::Point { x, y },
                scale,
                fill,
                stroke,
            });
        }
        self.marker_data.points = points;
    }

    fn draw<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        self.marker_data.draw(surface, style, self.index);
    }
}

#[derive(Debug, Clone)]
struct Area {
    index: usize,
    x: des::DataCol,
    y1: des::DataCol,
    y2: des::series::AreaY2,
    ab: Option<(axis::Bounds, axis::Bounds)>,
    axes: (des::axis::Ref, des::axis::Ref),
    path_y1: Option<geom::Path>,
    path_y2: Option<geom::Path>,
    path_fill: Option<geom::Path>,
    fill: Option<style::series::Fill>,
    stroke_y1: Option<style::series::Stroke>,
    stroke_y2: Option<style::series::Stroke>,
    interpolation: des::series::Interpolation,
}

impl Area {
    fn calc_bounds<D>(
        data_source: &D,
        x: &des::DataCol,
        y1: &des::DataCol,
        y2: &des::series::AreaY2,
    ) -> Result<Option<(axis::Bounds, axis::Bounds)>, Error>
    where
        D: data::Source + ?Sized,
    {
        let mut xy_bounds = calc_xy_bounds(data_source, x, y1)?;
        if let Some((_, y_bounds)) = &mut xy_bounds {
            match y2 {
                des::series::AreaY2::Baseline(value) => {
                    y_bounds.unite_with(&Bounds::Num((*value).into()))?;
                }
                des::series::AreaY2::DataCol(y2_col, ..) => {
                    let y2_col = get_column(y2_col, data_source)?;
                    if let Some(y2_bounds) = y2_col.bounds() {
                        y_bounds.unite_with(&y2_bounds)?;
                    }
                }
            }
        }
        Ok(xy_bounds)
    }

    fn prepare<D>(index: usize, des: &des::series::Area, data_source: &D) -> Result<Self, Error>
    where
        D: data::Source + ?Sized,
    {
        let x = des.x_data().clone();
        let y1 = des.y1_data().clone();
        let y2 = des.y2_data().clone();
        let xy_bounds = Self::calc_bounds(data_source, &x, &y1, &y2)?;
        Ok(Area {
            index,
            x,
            y1,
            y2,
            ab: xy_bounds,
            axes: (des.x_axis().clone(), des.y_axis().clone()),
            path_y1: None,
            path_y2: None,
            path_fill: None,
            fill: des.fill().cloned(),
            stroke_y1: des.stroke_y1().cloned(),
            stroke_y2: des.stroke_y2().cloned(),
            interpolation: des.interpolation(),
        })
    }

    fn update_data<D>(&mut self, data_source: &D, rect: &geom::Rect, cm: &CoordMapXy)
    where
        D: data::Source + ?Sized,
    {
        // unwraping here as data is checked during setup phase
        let x_col = get_column(&self.x, data_source).unwrap();
        let y1_col = get_column(&self.y1, data_source).unwrap();

        debug_assert!(x_col.len() == y1_col.len());

        if self.ab.is_none() && x_col.is_empty() {
            self.path_y1 = None;
            self.path_y2 = None;
            self.path_fill = None;
            return;
        }

        if self.ab.is_none() && !x_col.is_empty() {
            let xy_bounds = Self::calc_bounds(data_source, &self.x, &self.y1, &self.y2)
                .expect("Should be able to calculate bounds for non-empty data")
                .expect("Should be able to calculate bounds for non-empty data");
            self.ab = Some(xy_bounds);
        }

        let path = calc_xy_line_path(x_col, y1_col, self.interpolation, rect, cm);
        self.path_y1 = Some(path);

        self.path_y2 = match &self.y2 {
            des::series::AreaY2::Baseline(value) => {
                let mut pb = geom::PathBuilder::new();
                let path_y1 = self.path_y1.as_ref().unwrap();
                let x1 = path_y1.points().first().unwrap().x;
                let x2 = path_y1.points().last().unwrap().x;
                let y = cm.y.map_coord_num(*value);
                let (_, y1) = plot_to_fig(rect, x1, y);
                let (_, y2) = plot_to_fig(rect, x2, y);
                pb.move_to(x1, y1);
                pb.line_to(x2, y2);
                Some(pb.finish().expect("Should be a valid path"))
            }
            des::series::AreaY2::DataCol(y2_col, interpolation) => {
                let y2_col = get_column(y2_col, data_source).unwrap();
                let path = calc_xy_line_path(x_col, y2_col, *interpolation, rect, cm);
                Some(path)
            }
        };

        self.path_fill = self.fill.as_ref().map(|_| {
            let path_y1 = self.path_y1.as_ref().unwrap();
            let path_y2 = self.path_y2.as_ref().unwrap();

            let mut pb = geom::PathBuilder::new();
            // For some reason, pb.push_path doesn't work (it inserts a line back to the beginning)
            for seg in path_y1.segments() {
                match seg {
                    PathSegment::MoveTo(p) => {
                        pb.move_to(p.x, p.y);
                    }
                    PathSegment::LineTo(p) => {
                        pb.line_to(p.x, p.y);
                    }
                    PathSegment::QuadTo(p1, p) => {
                        pb.quad_to(p1.x, p1.y, p.x, p.y);
                    }
                    PathSegment::CubicTo(p1, p2, p) => {
                        pb.cubic_to(p1.x, p1.y, p2.x, p2.y, p.x, p.y);
                    }
                    PathSegment::Close => {
                        pb.close();
                    }
                }
            }

            let mut linked = false;
            for seg in geom::path_segments_rev_iter(path_y2) {
                match seg {
                    PathSegment::MoveTo(p) => {
                        debug_assert!(!linked);
                        if !linked {
                            pb.line_to(p.x, p.y);
                            linked = true;
                        } else {
                            pb.move_to(p.x, p.y);
                        }
                    }
                    PathSegment::LineTo(p) => {
                        debug_assert!(linked, "Should have made linked already");
                        pb.line_to(p.x, p.y);
                    }
                    PathSegment::QuadTo(p1, p) => {
                        debug_assert!(linked, "Should have made linked already");
                        pb.quad_to(p1.x, p1.y, p.x, p.y);
                    }
                    PathSegment::CubicTo(p1, p2, p) => {
                        debug_assert!(linked, "Should have made linked already");
                        pb.cubic_to(p1.x, p1.y, p2.x, p2.y, p.x, p.y);
                    }
                    PathSegment::Close => {
                        println!("Z");
                        pb.close();
                    }
                }
            }
            pb.close();
            let p = pb.finish().expect("Should be a valid path");
            p
        });
    }

    fn draw<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        let rc = (style, self.index);

        if let (Some(fp), Some(fill)) = (&self.path_fill, &self.fill) {
            let path = render::Path {
                path: fp,
                fill: Some(fill.as_paint(&rc)),
                stroke: None,
                transform: None,
            };
            surface.draw_path(&path);
        }
        if let (Some(sp), Some(stroke)) = (&self.path_y1, &self.stroke_y1) {
            let path = render::Path {
                path: sp,
                fill: None,
                stroke: Some(stroke.as_stroke(&rc)),
                transform: None,
            };
            surface.draw_path(&path);
        }
        if let (Some(sp), Some(stroke)) = (&self.path_y2, &self.stroke_y2) {
            let path = render::Path {
                path: sp,
                fill: None,
                stroke: Some(stroke.as_stroke(&rc)),
                transform: None,
            };
            surface.draw_path(&path);
        }
    }
}

#[derive(Debug, Clone, Copy)]
struct HistBin {
    /// Start and end of this bin
    range: (f64, f64),
    /// Either count or density
    value: f64,
}

#[derive(Debug, Clone)]
struct Histogram {
    index: usize,
    data_col: des::DataCol,
    bin_count: u32,
    density: bool,
    ab: (axis::NumBounds, axis::NumBounds),
    axes: (des::axis::Ref, des::axis::Ref),
    bins: Vec<HistBin>,
    path: Option<geom::Path>,
    fill: style::series::Fill,
    line: Option<style::series::Stroke>,
    updated_once: bool,
}

impl Histogram {
    fn prepare<D>(
        index: usize,
        hist: &des::series::Histogram,
        data_source: &D,
    ) -> Result<Self, Error>
    where
        D: data::Source + ?Sized,
    {
        let data_col = hist.data().clone();
        let col = get_column(&data_col, data_source)?;
        let col = col.f64().ok_or(Error::InconsistentData(
            "Histogram data must be numeric".into(),
        ))?;
        let x_bounds = col.bounds().ok_or(Error::UnboundedAxis)?;

        let bins = Self::calc_bins(col, x_bounds, hist.bins(), hist.density())?;

        let mut y_bounds = axis::NumBounds::NAN;
        for bin in bins.iter() {
            y_bounds.add_sample(bin.value);
        }

        Ok(Histogram {
            index,
            data_col,
            bin_count: hist.bins(),
            density: hist.density(),
            ab: (x_bounds, y_bounds),
            axes: (hist.x_axis().clone(), hist.y_axis().clone()),
            bins,
            path: None,
            fill: hist.fill().clone(),
            line: hist.outline().cloned(),
            updated_once: false,
        })
    }

    fn calc_bins(
        col: &dyn data::F64Column,
        x_bounds: axis::NumBounds,
        bins: u32,
        density: bool,
    ) -> Result<Vec<HistBin>, Error> {
        let width = x_bounds.span() / bins as f64;
        let mut bins = Vec::with_capacity(bins as usize);
        let mut val = x_bounds.start();
        while val <= x_bounds.end() {
            bins.push(HistBin {
                range: (val, val + width),
                value: 0.0,
            });
            val += width;
        }

        let samp_add = if density {
            1.0 / (col.len_some() as f64 * width)
        } else {
            1.0
        };

        for x in col.f64_iter() {
            if let Some(x) = x {
                let idx = (((x - x_bounds.start()) / width).floor() as usize).min(bins.len() - 1);
                bins[idx].value += samp_add;
            }
        }

        Ok(bins)
    }

    fn update_data<D>(&mut self, data_source: &D, rect: &geom::Rect, cm: &CoordMapXy)
    where
        D: data::Source + ?Sized,
    {
        if !self.updated_once {
            self.updated_once = true;
            // no need to recalculate bins, as first call is made with the same data_source as prepare
        } else {
            let x_bounds = self.ab.0;
            let col = get_column(&self.data_col, data_source).expect("TODO: error handling");
            let col = col.f64().expect("TODO: error handling");
            let bins = Self::calc_bins(col, x_bounds, self.bin_count, self.density)
                .expect("TODO: error handling");

            self.bins = bins;
        }

        let mut pb = geom::PathBuilder::new();
        let mut x = rect.left() + cm.x.map_coord_num(self.bins[0].range.0);
        let mut y = rect.bottom() - cm.y.map_coord_num(0.0);
        pb.move_to(x, y);

        for bin in self.bins.iter() {
            y = rect.bottom() - cm.y.map_coord_num(bin.value);
            pb.line_to(x, y);
            x = rect.left() + cm.x.map_coord_num(bin.range.1);
            pb.line_to(x, y);
        }

        y = rect.bottom() - cm.y.map_coord_num(0.0);
        pb.line_to(x, y);

        let path = pb.finish().expect("Should be a valid path");
        self.path = Some(path);
    }

    fn draw<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        let rc = (style, self.index);

        let path = render::Path {
            path: self.path.as_ref().unwrap(),
            fill: Some(self.fill.as_paint(&rc)),
            stroke: self.line.as_ref().map(|l| l.as_stroke(&rc)),
            transform: None,
        };
        surface.draw_path(&path);
    }
}

#[derive(Debug, Clone)]
enum BarsBounds {
    Vertical(Categories, axis::NumBounds),
    Horizontal(axis::NumBounds, Categories),
}

impl BarsBounds {
    fn calc(x_bounds: axis::Bounds, y_bounds: axis::Bounds) -> Result<Self, Error> {
        match (x_bounds, y_bounds) {
            (axis::Bounds::Num(mut x_bounds), axis::Bounds::Cat(y_bounds)) => {
                x_bounds.add_sample(0.0);
                Ok(BarsBounds::Horizontal(x_bounds, y_bounds))
            }
            (axis::Bounds::Cat(x_bounds), axis::Bounds::Num(mut y_bounds)) => {
                y_bounds.add_sample(0.0);
                Ok(BarsBounds::Vertical(x_bounds, y_bounds))
            }
            _ => {
                return Err(Error::InconsistentData(
                    "One of X and Y data must be numeric and the other categorical".to_string(),
                ));
            }
        }
    }
}

#[derive(Debug, Clone)]
struct Bars {
    index: usize,
    cols: (des::DataCol, des::DataCol),
    bounds: Option<BarsBounds>,
    axes: (des::axis::Ref, des::axis::Ref),
    position: des::series::BarsPosition,
    path: Option<geom::Path>,
    fill: style::series::Fill,
    line: Option<style::series::Stroke>,
}

impl Bars {
    fn prepare<D>(index: usize, des: &des::series::Bars, data_source: &D) -> Result<Self, Error>
    where
        D: data::Source + ?Sized,
    {
        let cols = (des.x_data().clone(), des.y_data().clone());
        let xy_bounds = calc_xy_bounds(data_source, &cols.0, &cols.1)?;

        let bounds = if let Some((x_bounds, y_bounds)) = xy_bounds {
            Some(BarsBounds::calc(x_bounds, y_bounds)?)
        } else {
            None
        };

        Ok(Bars {
            index,
            cols,
            bounds,
            axes: (des.x_axis().clone(), des.y_axis().clone()),
            position: des.position().clone(),
            path: None,
            fill: des.fill().clone(),
            line: des.outline().cloned(),
        })
    }

    fn bounds(&self) -> Option<(axis::BoundsRef<'_>, axis::BoundsRef<'_>)> {
        match self.bounds.as_ref()? {
            &BarsBounds::Vertical(ref x_bounds, y_bounds) => {
                Some((x_bounds.into(), y_bounds.into()))
            }
            &BarsBounds::Horizontal(x_bounds, ref y_bounds) => {
                Some((x_bounds.into(), y_bounds.into()))
            }
        }
    }

    fn update_data<D>(&mut self, data_source: &D, rect: &geom::Rect, cm: &CoordMapXy)
    where
        D: data::Source + ?Sized,
    {
        // unwraping here as data is checked during setup phase
        let x_col = get_column(&self.cols.0, data_source).unwrap();
        let y_col = get_column(&self.cols.1, data_source).unwrap();
        debug_assert!(x_col.len() == y_col.len());

        if self.bounds.is_none() && x_col.is_empty() && y_col.is_empty() {
            // no valid data, so no bars to draw
            self.path = None;
            return;
        }

        if self.bounds.is_none() {
            let xy_bounds = calc_xy_bounds(data_source, &self.cols.0, &self.cols.1)
                .expect("Should be able to calculate bounds for non-empty data")
                .expect("Should be able to calculate bounds for non-empty data");
            self.bounds = Some(
                BarsBounds::calc(xy_bounds.0, xy_bounds.1)
                    .expect("Should be able to calculate bars bounds"),
            );
        }

        let mut pb = geom::PathBuilder::new();

        match self.bounds.as_ref().unwrap() {
            BarsBounds::Vertical(..) => {
                let cat_bin_width = cm.x.cat_bin_size();
                let y_start = rect.bottom() - cm.y.map_coord_num(0.0);

                for (x, y) in x_col.sample_iter().zip(y_col.sample_iter()) {
                    if x.is_null() || y.is_null() {
                        continue;
                    }

                    let (x, y) = cm.map_coord((x, y)).expect("Should be valid coordinates");
                    let x_start = rect.left() + x + cat_bin_width * (self.position.offset - 0.5);
                    let x_end = x_start + cat_bin_width * self.position.width;
                    let y_end = rect.bottom() - y;
                    pb.move_to(x_start, y_start);
                    pb.line_to(x_start, y_end);
                    pb.line_to(x_end, y_end);
                    pb.line_to(x_end, y_start);
                }
            }
            BarsBounds::Horizontal(..) => {
                let cat_bin_height = cm.y.cat_bin_size();
                let x_start = rect.left() + cm.x.map_coord_num(0.0);

                for (x, y) in x_col.sample_iter().zip(y_col.sample_iter()) {
                    if x.is_null() || y.is_null() {
                        continue;
                    }

                    let (x, y) = cm.map_coord((x, y)).expect("Should be valid coordinates");
                    let y_start = rect.bottom() - y - cat_bin_height * (self.position.offset - 0.5);
                    let y_end = y_start - cat_bin_height * self.position.width;
                    let x_end = rect.left() + x;
                    pb.move_to(x_start, y_start);
                    pb.line_to(x_end, y_start);
                    pb.line_to(x_end, y_end);
                    pb.line_to(x_start, y_end);
                }
            }
        }

        let path = pb.finish().expect("Should be a valid path");
        self.path = Some(path);
    }

    fn draw<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        if self.path.is_none() {
            return;
        }

        let rc = (style, self.index);

        let path = render::Path {
            path: self.path.as_ref().unwrap(),
            fill: Some(self.fill.as_paint(&rc)),
            stroke: self.line.as_ref().map(|l| l.as_stroke(&rc)),
            transform: None,
        };
        surface.draw_path(&path);
    }
}

#[derive(Debug, Clone)]
pub struct BarsGroup {
    fst_index: usize,
    bounds: (axis::Bounds, axis::Bounds),
    axes: (des::axis::Ref, des::axis::Ref),
    orientation: des::series::BarsOrientation,
    arrangement: des::series::BarsArrangement,
    series: Vec<des::series::BarSeries>,
    series_paths: Vec<geom::Path>,
}

impl BarsGroup {
    fn prepare<D>(
        index: usize,
        des: &des::series::BarsGroup,
        data_source: &D,
    ) -> Result<Self, Error>
    where
        D: data::Source + ?Sized,
    {
        let cat_col = get_column(des.categories(), data_source)?;
        let categories: Categories = cat_col
            .str()
            .ok_or_else(|| {
                Error::InconsistentData("BarsGroup categories must be a string column".to_string())
            })?
            .into();

        let mut bounds_per_cat: Vec<axis::NumBounds> =
            vec![axis::NumBounds::from(0.0); categories.len()];

        for bs in des.series() {
            let data_col = get_column(bs.data(), data_source)?;
            if data_col.len() != categories.len() {
                return Err(Error::InconsistentData(
                    "BarsGroup data must be the same length as categories".to_string(),
                ));
            }
            let data_col = data_col.f64().ok_or(Error::InconsistentData(
                "BarsGroup data must be numeric".to_string(),
            ))?;

            for (v, bounds) in data_col.f64_iter().zip(bounds_per_cat.iter_mut()) {
                if let Some(v) = v {
                    match des.arrangement() {
                        des::series::BarsArrangement::Aside(..) => {
                            bounds.add_sample(v);
                        }
                        des::series::BarsArrangement::Stack(..) => {
                            if bounds.end().is_finite() {
                                bounds.add_sample(v + bounds.end());
                            } else {
                                bounds.add_sample(v);
                            }
                        }
                    }
                }
            }
        }

        let mut num_bounds = axis::NumBounds::NAN;
        for bounds in &bounds_per_cat {
            num_bounds.unite_with(bounds);
        }

        let bounds = match des.orientation() {
            des::series::BarsOrientation::Vertical => {
                (axis::Bounds::Cat(categories), axis::Bounds::Num(num_bounds))
            }
            des::series::BarsOrientation::Horizontal => {
                (axis::Bounds::Num(num_bounds), axis::Bounds::Cat(categories))
            }
        };

        Ok(BarsGroup {
            fst_index: index,
            bounds,
            axes: (des.x_axis().clone(), des.y_axis().clone()),
            orientation: des.orientation().clone(),
            arrangement: des.arrangement().clone(),
            series: des.series().to_vec(),
            series_paths: Vec::new(),
        })
    }

    fn update_data<D>(&mut self, data_source: &D, rect: &geom::Rect, cm: &CoordMapXy)
    where
        D: data::Source + ?Sized,
    {
        let categories = match self.orientation {
            des::series::BarsOrientation::Vertical => self.bounds.0.as_cat().unwrap(),
            des::series::BarsOrientation::Horizontal => self.bounds.1.as_cat().unwrap(),
        };

        let paths = match self.arrangement {
            des::series::BarsArrangement::Aside(aside) => {
                self.build_paths_aside(data_source, &aside, categories, rect, cm)
            }
            des::series::BarsArrangement::Stack(stack) => {
                self.build_paths_stack(data_source, &stack, categories, rect, cm)
            }
        };
        self.series_paths = paths;
    }

    fn build_paths_aside<D>(
        &self,
        data_source: &D,
        arrangement: &des::series::BarsAsideArrangement,
        categories: &Categories,
        rect: &geom::Rect,
        cm: &CoordMapXy,
    ) -> Vec<geom::Path>
    where
        D: data::Source + ?Sized,
    {
        let num_series = self.series.len();
        if num_series == 0 {
            return Vec::new();
        }
        let num_gaps = num_series - 1;

        let des::series::BarsAsideArrangement {
            mut offset,
            width,
            gap,
        } = *arrangement;
        let width = (width - gap * num_gaps as f32) / num_series as f32;

        let mut paths = Vec::with_capacity(num_series);

        for series in &self.series {
            let data_col = get_column(series.data(), data_source).unwrap();
            let data_col = data_col.f64().unwrap();

            let mut pb = geom::PathBuilder::new();

            for (cat, val) in categories.iter().zip(data_col.f64_iter()) {
                let Some(val) = val else { continue };

                let val_start = 0.0;
                let val_end = val_start + val;

                let cat_coords = self.orientation.cat_coords(cm, cat, offset, width, rect);
                let val_coords = self.orientation.val_coords(cm, val_start, val_end, rect);
                self.orientation
                    .add_series_path(&mut pb, cat_coords, val_coords);
            }

            let path = pb.finish().expect("Failed to build path");
            paths.push(path);

            offset += width + gap;
        }
        paths
    }

    fn build_paths_stack<D>(
        &self,
        data_source: &D,
        arrangement: &des::series::BarsStackArrangement,
        categories: &Categories,
        rect: &geom::Rect,
        cm: &CoordMapXy,
    ) -> Vec<geom::Path>
    where
        D: data::Source + ?Sized,
    {
        let mut cat_values = vec![0.0; categories.len()];

        let mut paths = Vec::with_capacity(self.series.len());

        for series in &self.series {
            let data_col = get_column(series.data(), data_source).unwrap();
            let data_col = data_col.f64().unwrap();

            let mut pb = geom::PathBuilder::new();

            for (idx, (cat, val)) in categories.iter().zip(data_col.f64_iter()).enumerate() {
                let Some(val) = val else { continue };

                let val_start = cat_values[idx];
                let val_end = val_start + val;

                cat_values[idx] = val_end;

                let cat_coords = self.orientation.cat_coords(
                    cm,
                    cat,
                    arrangement.offset,
                    arrangement.width,
                    rect,
                );
                let val_coords = self.orientation.val_coords(cm, val_start, val_end, rect);
                self.orientation
                    .add_series_path(&mut pb, cat_coords, val_coords);
            }

            let path = pb.finish().expect("Failed to build path");
            paths.push(path);
        }
        paths
    }

    fn draw<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        let mut col_idx = self.fst_index;

        for (series, path) in self.series.iter().zip(self.series_paths.iter()) {
            let rc = (style, col_idx);
            col_idx += 1;

            let rpath = render::Path {
                path,
                fill: Some(series.fill().as_paint(&rc)),
                stroke: series.outline().map(|l| l.as_stroke(&rc)),
                transform: None,
            };
            surface.draw_path(&rpath);
        }
    }
}

trait BarsOrientationExt {
    fn cat_map<'a>(&self, cm: &'a CoordMapXy) -> &'a dyn CoordMap;
    fn val_map<'a>(&self, cm: &'a CoordMapXy) -> &'a dyn CoordMap;

    fn cat_coords(
        &self,
        cm: &CoordMapXy,
        cat: &str,
        bar_offset: f32,
        bar_size: f32,
        rect: &geom::Rect,
    ) -> (f32, f32);

    fn val_coords(
        &self,
        cm: &CoordMapXy,
        val_start: f64,
        val_end: f64,
        rect: &geom::Rect,
    ) -> (f32, f32);

    fn add_series_path(
        &self,
        pb: &mut geom::PathBuilder,
        cat_coords: (f32, f32),
        val_coords: (f32, f32),
    );
}

impl BarsOrientationExt for des::series::BarsOrientation {
    fn cat_map<'a>(&self, cm: &'a CoordMapXy) -> &'a dyn CoordMap {
        match self {
            Self::Vertical => cm.x,
            Self::Horizontal => cm.y,
        }
    }

    fn val_map<'a>(&self, cm: &'a CoordMapXy) -> &'a dyn CoordMap {
        match self {
            Self::Vertical => cm.y,
            Self::Horizontal => cm.x,
        }
    }

    fn cat_coords(
        &self,
        cm: &CoordMapXy,
        cat: &str,
        bar_offset: f32,
        bar_size: f32,
        rect: &geom::Rect,
    ) -> (f32, f32) {
        let cat_map = self.cat_map(cm);
        let bin_size = cat_map.cat_bin_size();
        let coord = cat_map.map_coord_cat(cat);
        let start = match self {
            Self::Vertical => rect.left() + coord + bin_size * (bar_offset - 0.5),
            Self::Horizontal => rect.bottom() - coord - bin_size * (bar_offset - 0.5),
        };
        let end = match self {
            Self::Vertical => start + bin_size * bar_size,
            Self::Horizontal => start - bin_size * bar_size,
        };
        (start, end)
    }

    fn val_coords(
        &self,
        cm: &CoordMapXy,
        val_start: f64,
        val_end: f64,
        rect: &geom::Rect,
    ) -> (f32, f32) {
        let val_map = self.val_map(cm);
        let start = val_map.map_coord_num(val_start);
        let end = val_map.map_coord_num(val_end);
        match self {
            Self::Vertical => (rect.bottom() - start, rect.bottom() - end),
            Self::Horizontal => (rect.left() + start, rect.left() + end),
        }
    }

    fn add_series_path(
        &self,
        pb: &mut geom::PathBuilder,
        cat_coords: (f32, f32),
        val_coords: (f32, f32),
    ) {
        match self {
            Self::Vertical => {
                pb.move_to(cat_coords.0, val_coords.0);
                pb.line_to(cat_coords.1, val_coords.0);
                pb.line_to(cat_coords.1, val_coords.1);
                pb.line_to(cat_coords.0, val_coords.1);
            }
            Self::Horizontal => {
                pb.move_to(val_coords.0, cat_coords.0);
                pb.line_to(val_coords.1, cat_coords.0);
                pb.line_to(val_coords.1, cat_coords.1);
                pb.line_to(val_coords.0, cat_coords.1);
            }
        }
    }
}
