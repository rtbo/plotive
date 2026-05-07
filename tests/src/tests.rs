use plotive::{des, geom};
use rand::SeedableRng;

use crate::*;

fn fig_small<P>(plots: P) -> des::Figure
where
    P: Into<des::figure::Plots>,
{
    des::Figure::new(plots.into()).with_size(geom::Size::new(400.0, 300.0))
}

fn fig_mid<P>(plots: P) -> des::Figure
where
    P: Into<des::figure::Plots>,
{
    des::Figure::new(plots.into()).with_size(geom::Size::new(600.0, 450.0))
}

fn fig_high<P>(plots: P) -> des::Figure
where
    P: Into<des::figure::Plots>,
{
    des::Figure::new(plots.into()).with_size(geom::Size::new(400.0, 500.0))
}

fn fig_wide<P>(plots: P) -> des::Figure
where
    P: Into<des::figure::Plots>,
{
    des::Figure::new(plots.into()).with_size(geom::Size::new(600.0, 300.0))
}

fn line() -> des::series::Line {
    let x = vec![1.0, 2.0, 3.0];
    let y = vec![1.0, 2.0, 3.0];
    des::series::Line::new(x.into(), y.into())
}

fn line2(x: &[f64], y: &[f64]) -> des::series::Line {
    let x = x.to_vec();
    let y = y.to_vec();
    des::series::Line::new(x.into(), y.into())
}

/// Seed for NotRandom generator
struct RngSeed(u64);

impl Default for RngSeed {
    fn default() -> Self {
        RngSeed(1234567890987654321)
    }
}

/// Predictable random number generator
struct NotRandom {
    rng: rand_chacha::ChaCha8Rng,
}

impl NotRandom {
    fn new(seed: RngSeed) -> Self {
        NotRandom {
            rng: rand_chacha::ChaCha8Rng::seed_from_u64(seed.0),
        }
    }

    fn make_col<D>(&mut self, n: usize, distr: D) -> Vec<f64>
    where
        D: rand_distr::Distribution<f64>,
    {
        (0..n).map(|_| distr.sample(&mut self.rng)).collect()
    }
}

mod axes;
mod colorbar;
mod interp;
mod legend;
mod nulls;
mod series;
mod style;
mod subplots;

#[test]
fn empty() {
    let plot = des::Plot::new(vec![]);
    let fig = fig_small(plot);

    assert_fig_eq_ref!(&fig, "empty");
}

#[test]
fn empty_title() {
    let plot = des::Plot::new(vec![]);
    let fig = fig_small(plot).with_title("Title".into());

    assert_fig_eq_ref!(&fig, "empty-title");
}
