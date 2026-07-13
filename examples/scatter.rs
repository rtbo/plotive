use plotive::{data, des, style};
use rand::Rng;

mod common;

fn main() {
    use rand_distr::Normal;

    let rng = rand::rng();
    let x1 = rng
        .clone()
        .sample_iter(Normal::new(30.0, 5.0).unwrap())
        .take(300)
        .collect::<Vec<f64>>();
    let y1 = rng
        .clone()
        .sample_iter(Normal::new(20.0, 2.0).unwrap())
        .take(300)
        .collect::<Vec<f64>>();
    let x2 = rng
        .clone()
        .sample_iter(Normal::new(40.0, 2.0).unwrap())
        .take(500)
        .collect::<Vec<f64>>();
    let y2 = rng
        .sample_iter(Normal::new(10.0, 5.0).unwrap())
        .take(500)
        .collect::<Vec<f64>>();

    let data_src = data::NamedColumns::new()
        .with_column("x1", &x1)
        .with_column("y1", &y1)
        .with_column("x2", &x2)
        .with_column("y2", &y2);

    let fig = des::Figure::new(
        des::Plot::new(vec![
            des::series::Scatter::new(
                des::series::data_src_ref("x1"),
                des::series::data_src_ref("y1"),
            )
            .with_name("Series 1")
            .with_marker(
                style::Marker::default()
                    .with_shape(style::MarkerShape::Circle)
                    .with_size(3.0),
            )
            .into(),
            des::series::Scatter::new(
                des::series::data_src_ref("x2"),
                des::series::data_src_ref("y2"),
            )
            .with_name("Series 2")
            .with_marker(
                style::Marker::default()
                    .with_shape(style::MarkerShape::Square)
                    .with_size(3.0),
            )
            .into(),
        ])
        .with_x_axis(
            des::Axis::default()
                .with_ticks(Default::default())
                .with_grid(Default::default()),
        )
        .with_y_axis(
            des::Axis::default()
                .with_ticks(Default::default())
                .with_grid(Default::default()),
        )
        .with_legend(des::plot::LegendPos::InBottomLeft.into())
        .into(),
    )
    .with_title("Scatter Plot Example".into());

    common::process_figure(&fig, &data_src, None, "scatter");
}
