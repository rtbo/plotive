use plotive::{data, des, utils};

mod common;

fn main() {
    let x = utils::linspace(0.0, 5.0, 6);
    let y1 = vec![10.0, 15.0, 8.0, 6.0, 12.0, 10.0];
    let y2 = vec![4.0, 9.0, 2.0, 0.0, 6.0, 4.0];

    let fig = des::Plot::new(vec![
        des::series::Area::new(
            des::data_src_ref("x"),
            des::data_src_ref("y1"),
            des::data_src_ref("y2").into(),
        )
        .into(),
        des::series::Area::new(
            des::data_src_ref("x"),
            des::data_src_ref("y2"),
            Default::default(),
        )
        .into(),
    ])
    .into_figure();

    let data_source = data::TableSource::new()
        .with_f64_column("x", x)
        .with_f64_column("y1", y1)
        .with_f64_column("y2", y2);

    common::save_figure(&fig, &data_source, Default::default(), "area");
}
