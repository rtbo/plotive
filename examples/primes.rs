use plotive::data;
use plotive::des::{self, axis, series};

mod common;

fn get_n_primes(n: usize) -> Vec<i64> {
    let mut primes = Vec::with_capacity(n);
    let mut candidate = 2;
    while primes.len() < n {
        let is_prime = primes.iter().all(|&p| candidate % p != 0);
        if is_prime {
            primes.push(candidate);
        }
        candidate += 1;
    }
    primes
}

fn main() {
    let n = 30;

    let fig = series::Line::new("indices".into(), "primes".into())
        .with_interpolation(series::Interpolation::StepLate)
        .into_plot()
        .with_x_axis(
            des::Axis::new().with_title("Index".into()).with_ticks(
                axis::Ticks::new().with_formatter(Some(
                    axis::ticks::DecimalFormatter {
                        decimal_places: Some(0),
                    }
                    .into(),
                )),
            ),
        )
        .with_y_axis(
            des::Axis::new()
                .with_title("Prime".into())
                .with_ticks(axis::Ticks::new())
                .with_grid(Default::default()),
        )
        .into_figure()
        .with_title(format!("First {} Prime Numbers", n).into());

    let indices = (1..=n as i64).collect::<Vec<_>>();
    let primes = get_n_primes(n);
    let data_source = data::NamedColumns::new()
        .with_column("indices", &indices)
        .with_column("primes", &primes);

    common::process_figure(&fig, &data_source, None, "primes");
}
