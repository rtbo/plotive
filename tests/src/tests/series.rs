use plotive::{data, des};

use crate::tests::fig_small;
use crate::{TestHarness, assert_fig_eq_ref};

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
