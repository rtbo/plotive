use plotive::des::{self, cmap, colorbar};
use plotive::style;
use rand_distr::Uniform;

use crate::tests::fig_small;
use crate::{TestHarness, assert_fig_eq_ref};

fn columns() -> (Vec<f64>, Vec<f64>, Vec<f64>) {
    let mut rng = super::rng(None);
    let distr = Uniform::new(0.0, 1.0).unwrap();

    let x = super::make_col(15, distr, &mut rng);
    let y = super::make_col(15, distr, &mut rng);
    let col = super::make_col(15, distr, &mut rng);

    (x, y, col)
}

#[test]
fn colorbar_default() {
    let (x, y, col) = columns();

    let plot = des::Plot::new(vec![
        des::series::Scatter::new(des::data_inline(x), des::data_inline(y))
            .with_color_data(des::data_inline(col), cmap::viridis())
            .with_marker(
                style::series::Marker::default()
                    .with_fill_opacity(0.7)
                    .with_stroke_width(2.0),
            )
            .into(),
    ])
    .with_colorbar(Default::default());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "colorbar/default");
}

#[test]
fn colorbar_default_with_axes() {
    let (x, y, col) = columns();

    let plot = des::Plot::new(vec![
        des::series::Scatter::new(des::data_inline(x), des::data_inline(y))
            .with_color_data(des::data_inline(col), cmap::viridis())
            .with_marker(
                style::series::Marker::default()
                    .with_fill_opacity(0.7)
                    .with_stroke_width(2.0),
            )
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
fn colorbar_forced_scale() {
    let (x, y, col) = columns();

    let plot = des::Plot::new(vec![
        des::series::Scatter::new(des::data_inline(x), des::data_inline(y))
            .with_color_data(
                des::data_inline(col),
                cmap::viridis().with_data_range((0.0, 2.0)),
            )
            .with_marker(
                style::series::Marker::default()
                    .with_fill_opacity(0.7)
                    .with_stroke_width(2.0),
            )
            .into(),
    ])
    .with_colorbar(Default::default());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "colorbar/forced-scale");
}

#[test]
fn colorbar_left() {
    let (x, y, col) = columns();

    let plot = des::Plot::new(vec![
        des::series::Scatter::new(des::data_inline(x), des::data_inline(y))
            .with_color_data(des::data_inline(col), cmap::viridis())
            .with_marker(
                style::series::Marker::default()
                    .with_fill_opacity(0.7)
                    .with_stroke_width(2.0),
            )
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
        des::series::Scatter::new(des::data_inline(x), des::data_inline(y))
            .with_color_data(des::data_inline(col), cmap::viridis())
            .with_marker(
                style::series::Marker::default()
                    .with_fill_opacity(0.7)
                    .with_stroke_width(2.0),
            )
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
        des::series::Scatter::new(des::data_inline(x), des::data_inline(y))
            .with_color_data(des::data_inline(col), cmap::viridis())
            .with_marker(
                style::series::Marker::default()
                    .with_fill_opacity(0.7)
                    .with_stroke_width(2.0),
            )
            .into(),
    ])
    .with_colorbar(colorbar::Pos::Bottom.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "colorbar/bottom");
}
