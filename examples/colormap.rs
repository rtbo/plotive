use plotive::{data, des};
use rand_distr::{Distribution, Uniform};

mod common;

fn main() {
    let axis = des::Axis::new()
        .with_scale((-0.3, 10.3).into())
        .with_ticks(Default::default())
        .with_grid(Default::default());

    let fig = des::series::Scatter::new("x".into(), "y".into())
        .with_sizes("sizes".into())
        // Will use the default "viridis" colormap
        .with_colors("colors".into(), Default::default())
        .into_plot()
        .with_x_axis(axis.clone())
        .with_y_axis(axis)
        .with_colorbar(Default::default())
        .into_figure();

    let mut rng = common::predictable_rng(1234.into());
    let xy_dist = Uniform::new(0.0, 10.0).unwrap();
    let sz_dist = Uniform::new(0.5, 20.0).unwrap();

    const N: usize = 50;
    let x = (0..N)
        .map(|_| xy_dist.sample(&mut rng))
        .collect::<Vec<f64>>();
    let y = (0..N)
        .map(|_| xy_dist.sample(&mut rng))
        .collect::<Vec<f64>>();
    let sizes = (0..N)
        .map(|_| sz_dist.sample(&mut rng))
        .collect::<Vec<f64>>();
    let colors = (0..N)
        .map(|i| 10.0 + 10.0 * (i as f64) / ((N - 1) as f64))
        .collect::<Vec<f64>>();

    let data_source = data::NamedColumns::new()
        .with_column("x", &x)
        .with_column("y", &y)
        .with_column("sizes", &sizes)
        .with_column("colors", &colors);

    common::process_figure(&fig, &data_source, None, "colormap");
}
