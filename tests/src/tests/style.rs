use plotive::utils::MplStyle;
use plotive::{Rgba8, des};

use super::{fig_small, line};
use crate::{TestHarness, assert_fig_eq_ref};

fn line_spline() -> des::series::Line {
    let x = vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
    let y = vec![0.0, 2.0, 3.0, 1.0, 4.0, 4.0];
    des::series::Line::new(des::data_inline(x), des::data_inline(y))
        .with_interpolation(des::series::Interpolation::Spline)
}

#[test]
fn style_dash_mpl() {
    let series = line().with_mpl_style("--").unwrap().into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dash");
}

#[test]
fn style_dash_dot_mpl() {
    let series = line().with_mpl_style("-.").unwrap().into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dash_dot");
}

#[test]
fn style_dash_dot_spline_mpl() {
    let series = line_spline().with_mpl_style("-.").unwrap().into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dash_dot-spline");
}

#[test]
fn style_dot_mpl() {
    let series = line().with_mpl_style(":").unwrap().into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dot");
}

#[test]
fn style_dash_scales_with_width_mpl() {
    let series = line()
        .with_stroke(plotive::style::series::Stroke::default().with_width(4.0))
        .with_mpl_style("--")
        .unwrap()
        .into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dash-fat");
}

#[test]
fn style_line_markers_circle_mpl() {
    let plot = line_spline().with_mpl_style("o").unwrap().into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/line-markers-circle");
}

#[test]
fn style_line_markers_square_mpl() {
    let plot = line_spline().with_mpl_style("s").unwrap().into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/line-markers-square");
}

#[test]
fn style_line_markers_diamond_mpl() {
    let plot = line_spline().with_mpl_style("D").unwrap().into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/line-markers-diamond");
}

#[test]
fn style_line_markers_cross_mpl() {
    let plot = line_spline().with_mpl_style("x").unwrap().into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/line-markers-cross");
}

#[test]
fn style_line_markers_plus_mpl() {
    let plot = line_spline().with_mpl_style("+").unwrap().into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/line-markers-plus");
}

#[test]
fn style_line_markers_triup_mpl() {
    let plot = line_spline().with_mpl_style("^").unwrap().into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/line-markers-triup");
}

#[test]
fn style_line_markers_tridown_mpl() {
    let plot = line_spline().with_mpl_style("v").unwrap().into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/line-markers-tridown");
}

#[test]
fn style_line_markers_trileft_mpl() {
    let plot = line_spline().with_mpl_style("<").unwrap().into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/line-markers-trileft");
}

#[test]
fn style_line_markers_triright_mpl() {
    let plot = line_spline().with_mpl_style(">").unwrap().into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/line-markers-triright");
}

#[test]
fn style_line_markers_triup_color() {
    let plot = line_spline()
        .with_marker(
            plotive::style::series::Marker::new_with_color(
                plotive::Rgba8::from_hex(b"#000").into(),
            )
            .with_stroke(plotive::style::series::Color::Fixed(Rgba8::from_hex(b"#080")).into())
            .with_shape(plotive::style::MarkerShape::TriangleUp),
        )
        .into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/line-markers-triup-color");
}
