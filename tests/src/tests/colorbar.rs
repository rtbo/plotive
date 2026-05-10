use plotive::des::{self, ColorBar, cmap, colorbar};
use plotive::style;
use rand_distr::Uniform;

use crate::tests::fig_small;
use crate::{TestHarness, assert_fig_eq_ref};

fn columns() -> (Vec<f64>, Vec<f64>, Vec<f64>) {
    use super::{NotRandom, RngSeed};

    let mut rng = NotRandom::new(RngSeed::default());
    let distr = Uniform::new(0.0, 1.0).unwrap();

    let x = rng.make_col(15, distr);
    let y = rng.make_col(15, distr);
    let col = rng.make_col(15, distr);

    (x, y, col)
}

fn scatter(x: Vec<f64>, y: Vec<f64>) -> des::series::Scatter {
    des::series::Scatter::new(des::data_inline(x), des::data_inline(y)).with_marker(
        style::series::Marker::default()
            .with_fill_opacity(0.7)
            .with_stroke_width(2.0),
    )
}

#[test]
fn colorbar_default() {
    let (x, y, col) = columns();

    let plot = des::Plot::new(vec![
        scatter(x, y)
            .with_color_data(des::data_inline(col), cmap::viridis())
            .into(),
    ])
    .with_colorbar(Default::default());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "colorbar/default");
}

#[test]
fn colorbar_locator() {
    let (x, y, col) = columns();
    let ticks = vec![0.0, 0.25, 0.5, 0.75, 1.0];

    let plot = des::Plot::new(vec![
        scatter(x, y)
            .with_color_data(
                des::data_inline(col),
                cmap::viridis().with_scale((0.0, 1.0).into()),
            )
            .into(),
    ])
    .with_colorbar(ColorBar::default().with_ticks_locator(ticks.into()));
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "colorbar/locator");
}

#[test]
fn colorbar_default_with_axes() {
    let (x, y, col) = columns();

    let plot = des::Plot::new(vec![
        scatter(x, y)
            .with_color_data(des::data_inline(col), cmap::viridis())
            .into(),
    ])
    .with_x_axis(
        des::Axis::default()
            .with_ticks(des::axis::Ticks::default())
            .with_title("x".into()),
    )
    .with_y_axis(
        des::Axis::default()
            .with_ticks(des::axis::Ticks::default())
            .with_title("y".into()),
    )
    .with_colorbar(Default::default());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "colorbar/default-with-axes");
}

#[test]
fn colorbar_auto_range() {
    let (x, y, _) = columns();
    let col = vec![
        -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0,
    ];

    let plot = des::Plot::new(vec![
        scatter(x, y)
            .with_color_data(des::data_inline(col), cmap::viridis())
            .into(),
    ])
    .with_colorbar(Default::default());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "colorbar/auto-range");
}

#[test]
fn colorbar_cmap_scale() {
    let (x, y, col) = columns();

    let plot = des::Plot::new(vec![
        scatter(x, y)
            .with_color_data(
                des::data_inline(col),
                cmap::viridis().with_scale((0.0, 2.0).into()),
            )
            .into(),
    ])
    .with_colorbar(Default::default());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "colorbar/cmap-scale");
}

#[test]
fn colorbar_left() {
    let (x, y, col) = columns();

    let plot = des::Plot::new(vec![
        scatter(x, y)
            .with_color_data(des::data_inline(col), cmap::viridis())
            .into(),
    ])
    .with_colorbar(colorbar::Pos::Left.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "colorbar/left");
}

#[test]
fn colorbar_top() {
    let (x, y, col) = columns();

    let plot = des::Plot::new(vec![
        scatter(x, y)
            .with_color_data(des::data_inline(col), cmap::viridis())
            .into(),
    ])
    .with_colorbar(colorbar::Pos::Top.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "colorbar/top");
}

#[test]
fn colorbar_bottom() {
    let (x, y, col) = columns();

    let plot = des::Plot::new(vec![
        scatter(x, y)
            .with_color_data(des::data_inline(col), cmap::viridis())
            .into(),
    ])
    .with_colorbar(colorbar::Pos::Bottom.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "colorbar/bottom");
}
