use plotive::des;
use plotive::utils::MplStyle;

use super::{fig_small, line};
use crate::{TestHarness, assert_fig_eq_ref};

fn line_spline() -> des::series::Line {
    let x = vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
    let y = vec![0.0, 2.0, 3.0, 1.0, 4.0, 4.0];
    des::series::Line::new(des::data_inline(x), des::data_inline(y))
        .with_interpolation(des::series::Interpolation::Spline)
}

#[test]
fn style_mpl_dash() {
    let series = line().with_mpl_style("--").unwrap().into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dash");
}

#[test]
fn style_mpl_dash_dot() {
    let series = line().with_mpl_style("-.").unwrap().into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dash_dot");
}

#[test]
fn style_mpl_dash_dot_spline() {
    let series = line_spline()
        .with_mpl_style("-.")
        .unwrap()
        .into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dash_dot-spline");
}

#[test]
fn style_mpl_dot() {
    let series = line().with_mpl_style(":").unwrap().into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dot");
}

#[test]
fn style_mpl_dash_scales_with_width() {
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
fn style_mpl_line_markers() {
    let plot = line_spline().with_mpl_style("o").unwrap().into_plot();
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/line-plus-markers");
}
