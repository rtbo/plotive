use plotive::des::cmap;
use plotive::{Style, data, des, style};

use crate::tests::fig_small;
use crate::{TestHarness, assert_fig_eq_ref};

fn line() -> des::series::Line {
    let x = vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
    let y = vec![0.0, 2.0, 3.0, 1.0, 4.0, 4.0];
    des::series::Line::new(des::data_inline(x), des::data_inline(y)).into()
}

#[test]
fn series_line_nodata() {
    let plot = des::Plot::new(vec![
        des::series::Line::new(
            des::DataCol::Inline(data::VecColumn::F64(vec![])),
            des::DataCol::Inline(data::VecColumn::F64(vec![])),
        )
        .into(),
    ]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "series/line-nodata");
}

#[test]
fn series_line_interp_linear() {
    let plot = line()
        .with_interpolation(des::series::Interpolation::Linear)
        .into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "series/line-interp-linear");
}

#[test]
fn series_line_interp_step_early() {
    let plot = line()
        .with_interpolation(des::series::Interpolation::StepEarly)
        .into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "series/line-interp-step-early");
}

#[test]
fn series_line_interp_step_middle() {
    let plot = line()
        .with_interpolation(des::series::Interpolation::StepMiddle)
        .into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "series/line-interp-step-middle");
}

#[test]
fn series_line_interp_step_late() {
    let plot = line()
        .with_interpolation(des::series::Interpolation::StepLate)
        .into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "series/line-interp-step-late");
}

#[test]
fn series_line_interp_spline() {
    let plot = line()
        .with_interpolation(des::series::Interpolation::Spline)
        .into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "series/line-interp-spline");
}

#[test]
fn series_scatter_nodata() {
    let plot = des::Plot::new(vec![
        des::series::Scatter::new(
            des::DataCol::Inline(data::VecColumn::F64(vec![])),
            des::DataCol::Inline(data::VecColumn::F64(vec![])),
        )
        .into(),
    ]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "series/scatter-nodata");
}

#[test]
fn series_scatter_sizes() {
    let x = vec![1.0, 2.0, 3.0, 4.0, 5.0];
    let y = vec![1.0, 4.0, 9.0, 16.0, 25.0];
    let sizes = vec![8.0, 4.0, 2.0, 1.0, 0.5];

    let color: plotive::Rgba8 = "light eggplant".parse().unwrap();

    let plot = des::Plot::new(vec![
        des::series::Scatter::new(des::data_inline(x), des::data_inline(y))
            .with_sizes(des::data_inline(sizes))
            .with_marker(
                style::series::Marker::default()
                    .with_color(color.into())
                    .with_fill_opacity(0.6)
                    .with_stroke_width(2.0),
            )
            .into(),
    ]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "series/scatter-sizes");
}

#[test]
fn series_scatter_colors() {
    let x = vec![1.0, 2.0, 3.0, 4.0, 5.0];
    let y = vec![1.0, 4.0, 9.0, 16.0, 25.0];
    let colors = vec![0.0, 0.25, 0.5, 0.75, 1.0];

    let plot = des::Plot::new(vec![
        des::series::Scatter::new(des::data_inline(x), des::data_inline(y))
            .with_colors(des::data_inline(colors), cmap::viridis().into())
            .with_marker(
                style::series::Marker::default()
                    .with_fill_opacity(0.6)
                    .with_stroke_width(2.0),
            )
            .into(),
    ]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "series/scatter-colors");
}

#[test]
fn series_area_double() {
    let x = vec![0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
    let y1 = vec![10.0, 15.0, 8.0, 6.0, 12.0, 10.0];
    let y2 = vec![4.0, 9.0, 2.0, 0.0, 6.0, 4.0];

    let fill = style::series::Fill::solid(plotive::Rgba8::from_hex(b"#888").into());
    let stroke = style::series::Stroke::solid(plotive::Rgba8::from_hex(b"#000").into());

    let plot = des::Plot::new(vec![
        des::series::Area::new(
            des::data_inline(x.clone()),
            des::data_inline(y1.clone()),
            des::data_inline(y2.clone()).into(),
        )
        .with_fill(fill)
        .with_y1_stroke(stroke.clone())
        .with_y2_stroke(stroke.clone())
        .into(),
        des::series::Area::new(
            des::data_inline(x.clone()),
            des::data_inline(y2.clone()),
            Default::default(),
        )
        .with_fill(fill)
        .with_y1_stroke(stroke.clone())
        .with_y2_stroke(stroke.clone())
        .into(),
    ]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "series/area-double");
}

#[test]
fn series_area_double_legend() {
    let x = vec![0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
    let y1 = vec![10.0, 15.0, 8.0, 6.0, 12.0, 10.0];
    let y2 = vec![4.0, 9.0, 2.0, 0.0, 6.0, 4.0];

    let fill1 = style::series::Fill::solid(plotive::Rgba8::from_hex(b"#888").into());
    let fill2 = style::series::Fill::solid(plotive::Rgba8::from_hex(b"#444").into());
    let stroke = style::series::Stroke::solid(plotive::Rgba8::from_hex(b"#000").into());

    let plot = des::Plot::new(vec![
        des::series::Area::new(
            des::data_inline(x.clone()),
            des::data_inline(y1.clone()),
            des::data_inline(y2.clone()).into(),
        )
        .with_name("area1")
        .with_fill(fill1)
        .with_y1_stroke(stroke.clone())
        .with_y2_stroke(stroke.clone())
        .into(),
        des::series::Area::new(
            des::data_inline(x.clone()),
            des::data_inline(y2.clone()),
            Default::default(),
        )
        .with_name("area2")
        .with_fill(fill2)
        .with_y1_stroke(stroke.clone())
        .with_y2_stroke(stroke.clone())
        .into(),
    ]);
    let fig = fig_small(plot).with_legend(Default::default());

    assert_fig_eq_ref!(&fig, "series/area-double-legend");
}

#[test]
fn series_color_cats_to_legend() {
    let fig: des::Figure = crate::json_figure("series/color-cats-to-legend");
    assert_fig_eq_ref!(&fig, "series/color-cats-to-legend", &Style::light());
}
