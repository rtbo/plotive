use plotive::des;

use super::fig_small;
use crate::{TestHarness, assert_fig_eq_ref};

#[test]
fn line_lin_null_end() {
    let x = vec![1.0, 2.0, 3.0, 4.0, 5.0];
    let y = vec![1.0, 2.0, 3.0, 4.0, f64::NAN];
    let series = des::series::Line::new(x.into(), y.into()).into();
    let plot =
        des::Plot::new(vec![series]).with_x_axis(des::Axis::default().with_title("x axis".into()));
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "nulls/line-lin-null-end");
}

#[test]
fn line_spline_null_middle() {
    let x = vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0];
    let y = vec![0.0, 2.0, 3.0, 1.0, 4.0, f64::NAN, 2.0, 3.0, 1.0, 4.0];

    let plot = des::series::Line::new(x.into(), y.into())
        .with_interpolation(des::series::Interpolation::Spline)
        .into_plot()
        .with_x_axis(des::Axis::default().with_ticks(Default::default()));
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "nulls/line-spline-null-middle");
}
