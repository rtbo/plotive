use std::f64::consts::PI;

use plotive::{data, des, utils};

mod common;

fn main() {
    let x = utils::linspace(0.0, PI, 500);
    let y1 = x
        .iter()
        .map(|x| x.sin() - 0.8 * x.sin().powi(2))
        .collect::<Vec<f64>>();
    let y2 = x
        .iter()
        .map(|x| 100.0 * (x - PI / 4.0).cos())
        .collect::<Vec<f64>>();
    let y3 = x.iter().map(|x| 1000.0 * x.sin()).collect::<Vec<f64>>();

    let mut data_src = data::NamedColumns::new();
    data_src.add_column("x", &x as &dyn data::Column);
    data_src.add_column("y1", &y1 as &dyn data::Column);
    data_src.add_column("y2", &y2 as &dyn data::Column);
    data_src.add_column("y3", &y3 as &dyn data::Column);

    let fig = des::Plot::new(vec![
        des::series::Line::new(
            des::series::data_src_ref("x"),
            des::series::data_src_ref("y1"),
        )
        .with_name("y1 = sin(x) - 0.8 sin^2(x)")
        .into(),
        des::series::Line::new(
            des::series::data_src_ref("x"),
            des::series::data_src_ref("y2"),
        )
        .with_name("y2 = 100 * cos(x - π/4)")
        // Referencing the second y-axis by its id.
        .with_y_axis(des::axis::ref_id("y2"))
        .into(),
        des::series::Line::new(
            des::series::data_src_ref("x"),
            des::series::data_src_ref("y3"),
        )
        .with_name("y3 = 1000 * sin(x)")
        // Referencing the third y-axis by its title.
        .with_y_axis(des::axis::ref_id("Y3"))
        .into(),
    ])
    .with_x_axis(
        des::Axis::new()
            .with_title("X".into())
            .with_ticks(des::axis::ticks::PiMultipleLocator::default().into()),
    )
    .with_y_axis(
        des::Axis::new()
            .with_title("Y1".into())
            .with_ticks(des::axis::ticks::PercentFormatter::default().into()),
    )
    .with_y_axis(
        des::Axis::new()
            .with_id("y2")
            .with_title("Y2".into())
            .with_ticks(Default::default())
            .with_opposite_side(),
    )
    .with_y_axis(
        des::Axis::new()
            .with_title("Y3".into())
            .with_ticks(Default::default())
            .with_opposite_side(),
    )
    .into_figure()
    .with_legend(des::figure::LegendPos::Bottom.into());

    common::process_figure(&fig, &data_src, None, "multiple-axes");
}
