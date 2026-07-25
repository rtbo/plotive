mod common;

use plotive::{data, des};

fn main() {
    let fig = des::series::Line::new(des::data_src_ref("x"), des::data_src_ref("y"))
        .into_plot()
        .into_figure()
        .with_title("Minimal Figure".into());

    let x = vec![1.0, 2.0, 3.0];
    let y = vec![3.0, 1.0, 2.0];

    let data_source = data::TableSource::new()
        .with_f64_column("x".into(), x)
        .with_f64_column("y".into(), y);

    common::process_figure(&fig, &data_source, None, "minimal");
}
