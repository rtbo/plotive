use plotive::{data, des, utils};

mod common;

use std::f64::consts::PI;

fn main() {
    let x1 = utils::linspace(0.0, 2.0 * PI, 400);
    let y1: Vec<f64> = x1.iter().map(|x| (x * x).sin()).collect();
    let x2 = utils::linspace(0.5 * PI, 2.5 * PI, 400);
    let y2: Vec<f64> = x1.iter().map(|x| -(x * x).sin()).collect();

    let mut data_source = data::NamedColumns::new();
    data_source.add_column("x1", &x1 as &dyn data::Column);
    data_source.add_column("y1", &y1 as &dyn data::Column);
    data_source.add_column("x2", &x2 as &dyn data::Column);
    data_source.add_column("y2", &y2 as &dyn data::Column);

    let fig = des::Figure::new(
        des::Subplots::new(2, 1)
            .with_plot(
                (0, 0),
                des::Plot::new(vec![
                    des::series::Line::new(
                        des::series::data_src_ref("x1"),
                        des::series::data_src_ref("y1"),
                    )
                    .into(),
                ])
                .with_x_axis(
                    des::Axis::new()
                        .with_scale(des::axis::ref_id("x2").into())
                        .with_ticks(Default::default())
                        .with_grid(Default::default()),
                ),
            )
            .with_plot(
                (1, 0),
                des::Plot::new(vec![
                    des::series::Line::new(
                        des::series::data_src_ref("x2"),
                        des::series::data_src_ref("y2"),
                    )
                    .into(),
                ])
                .with_x_axis(
                    des::Axis::new()
                        .with_id("x2")
                        .with_ticks(des::axis::ticks::PiMultipleLocator::default().into())
                        .with_grid(Default::default()),
                ),
            )
            .with_space(10.0)
            .into(),
    )
    .with_size((800.0, 900.0).into());

    common::process_figure(&fig, &data_source, None, "subplots");
}
