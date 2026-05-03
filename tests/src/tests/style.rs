use plotive::des;
use plotive::utils::MplStyle;

use super::{fig_small, line};
use crate::{TestHarness, assert_fig_eq_ref};

#[test]
fn style_default() {
    let series = line().into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "axes/default");
}

#[test]
fn style_dash() {
    let series = line().with_mpl_style("--").unwrap().into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dash");
}

#[test]
fn style_dash_dot() {
    let series = line().with_mpl_style("-.").unwrap().into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dash_dot");
}

#[test]
fn style_dot() {
    let series = line().with_mpl_style(":").unwrap().into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dot");
}

#[test]
fn style_dash_scales_with_width() {
    let series = line()
        .with_line(plotive::style::series::Stroke::default().with_width(4.0))
        .with_mpl_style("--")
        .unwrap()
        .into();
    let plot = des::Plot::new(vec![series]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "style/dash-fat");
}
