use plotive::{Style, des, style};

use super::{fig_small, line};
use crate::{TestHarness, assert_fig_eq_ref};

#[test]
fn legend_pos_default() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(Default::default());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-bottom");
}

#[test]
fn legend_pos_top() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::OutTop.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-top");
}

#[test]
fn legend_pos_right() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::OutRight.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-right");
}

#[test]
fn legend_pos_bottom() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::OutBottom.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-bottom");
}

#[test]
fn legend_pos_left() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::OutLeft.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-left");
}

#[test]
fn legend_pos_in_top_left() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::InTopLeft.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-in_top_left");
}

#[test]
fn legend_pos_in_top() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::InTop.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-in_top");
}

#[test]
fn legend_pos_in_top_right() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::InTopRight.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-in_top_right");
}

#[test]
fn legend_pos_in_right() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::InRight.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-in_right");
}

#[test]
fn legend_pos_in_bottom_right() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::InBottomRight.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-in_bottom_right");
}

#[test]
fn legend_pos_in_bottom() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::InBottom.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-in_bottom");
}

#[test]
fn legend_pos_in_bottom_left() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::InBottomLeft.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-in_bottom_left");
}

#[test]
fn legend_pos_in_left() {
    let series = line().with_name("line").into();
    let plot = des::Plot::new(vec![series]).with_legend(des::plot::LegendPos::InLeft.into());
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "legend/pos-in_left");
}

#[test]
fn legend_area_double() {
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

    assert_fig_eq_ref!(&fig, "legend/area-double");
}

#[test]
fn legend_scatter_color_cats() {
    let fig: des::Figure = crate::json_figure("legend/scatter-color-cats");
    assert_fig_eq_ref!(&fig, "legend/scatter-color-cats", &Style::light());
}
