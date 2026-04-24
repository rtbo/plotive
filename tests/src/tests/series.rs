use plotive::{data, des, style};

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

#[test]
fn series_area_double() {
    let x = vec![0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
    let y1 = vec![10.0, 15.0, 8.0, 6.0, 12.0, 10.0];
    let y2 = vec![4.0, 9.0, 2.0, 0.0, 6.0, 4.0];

    let fill = plotive::ColorU8::from_html(b"#888").into();
    let stroke: style::series::Stroke = plotive::ColorU8::from_html(b"#000").into();

    let plot = des::Plot::new(vec![
        des::series::Area::new(
            des::data_inline(x.clone()),
            des::data_inline(y1.clone()),
            des::data_inline(y2.clone()).into(),
        )
        .with_fill(Some(fill))
        .with_stroke_y1(stroke.clone())
        .with_stroke_y2(stroke.clone())
        .into(),
        des::series::Area::new(
            des::data_inline(x.clone()),
            des::data_inline(y2.clone()),
            Default::default(),
        )
        .with_fill(Some(fill))
        .with_stroke_y1(stroke.clone())
        .with_stroke_y2(stroke.clone())
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

    let fill1 = plotive::ColorU8::from_html(b"#888").into();
    let fill2 = plotive::ColorU8::from_html(b"#444").into();
    let stroke: style::series::Stroke = plotive::ColorU8::from_html(b"#000").into();

    let plot = des::Plot::new(vec![
        des::series::Area::new(
            des::data_inline(x.clone()),
            des::data_inline(y1.clone()),
            des::data_inline(y2.clone()).into(),
        )
        .with_name("area1")
        .with_fill(Some(fill1))
        .with_stroke_y1(stroke.clone())
        .with_stroke_y2(stroke.clone())
        .into(),
        des::series::Area::new(
            des::data_inline(x.clone()),
            des::data_inline(y2.clone()),
            Default::default(),
        )
        .with_name("area2")
        .with_fill(Some(fill2))
        .with_stroke_y1(stroke.clone())
        .with_stroke_y2(stroke.clone())
        .into(),
    ]);
    let fig = fig_small(plot).with_legend(Default::default());

    assert_fig_eq_ref!(&fig, "series/area-double-legend");
}
