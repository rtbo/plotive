use std::{fs, path};

use plotive::data::Source;
use plotive::des::cmap;
use plotive::{data, des, style};

mod common;

fn stars_csv_path() -> path::PathBuf {
    let csv = path::Path::new(file!());
    let parent = csv.parent().unwrap();
    parent.join("stars.csv")
}

/// Convert a right ascension string in the format "h:m:s" to degrees.
fn ra_to_deg(ra: &str) -> f64 {
    let parts: Vec<&str> = ra.split(':').collect();
    let h: f64 = parts[0].parse().unwrap();
    let m: f64 = parts[1].parse().unwrap();
    let s: f64 = parts[2].parse().unwrap();
    (h + m / 60.0 + s / 3600.0) * 15.0
}

/// Convert a declination string in the format "d:m:s" to degrees.
fn dec_to_deg(dec: &str) -> f64 {
    let parts: Vec<&str> = dec.split(':').collect();
    let d: f64 = parts[0].parse().unwrap();
    let m: f64 = parts[1].parse().unwrap();
    let s: f64 = parts[2].parse().unwrap();
    let sign = if d < 0.0 { -1.0 } else { 1.0 };
    sign * (d.abs() + m / 60.0 + s / 3600.0)
}

fn main() {
    let csv_path = stars_csv_path();
    let csv_data = fs::read_to_string(&csv_path).unwrap();
    let table = data::csv::parse_str(&csv_data, Default::default()).unwrap();

    const RA_COL: &str = "RA (h:m:s)";
    const DEC_COL: &str = "DEC (d:m:s)";
    const TEMP_COL: &str = "Surface Temperature (K)";
    const APP_MAG: &str = "Apparent Magnitude";

    let mag_col = table.column(APP_MAG).unwrap().f64().unwrap();
    let temp_col = table.column(TEMP_COL).unwrap();

    /// Map the apparent magnitude to a size factor for the star markers,
    const MIN_SIZE: f64 = 0.2;
    const MAX_SIZE: f64 = 20.0;
    let mag_bounds = mag_col.minmax().unwrap();
    let mag_sizes = mag_col
        .f64_iter()
        .map(|mag| {
            let mag = mag.unwrap();
            let norm = (mag - mag_bounds.0) / (mag_bounds.1 - mag_bounds.0);
            MAX_SIZE - norm * (MAX_SIZE - MIN_SIZE)
        })
        .collect::<Vec<_>>();

    // Map the right ascension and declination to x and y coordinates in degrees
    let ra_col = table.column(RA_COL).unwrap().str().unwrap();
    let dec_col = table.column(DEC_COL).unwrap().str().unwrap();
    let x_coords = ra_col
        .str_iter()
        .map(|ra| ra_to_deg(ra.unwrap()))
        .collect::<Vec<_>>();
    let y_coords = dec_col
        .str_iter()
        .map(|dec| dec_to_deg(dec.unwrap()))
        .collect::<Vec<_>>();

    let data_source = data::NamedColumns::new()
        .with_column("x", &x_coords)
        .with_column("y", &y_coords)
        .with_column("mag_sizes", &mag_sizes)
        .with_column("temp", temp_col);

    let fig = des::Figure::new(
        des::Plot::new(vec![
            des::series::Scatter::new("x".into(), "y".into())
                .with_size_data("mag_sizes".into())
                .with_color_data("temp".into(), cmap::stellar())
                .with_marker(
                    style::series::Marker::default()
                        .with_fill_opacity(0.6)
                )
                .into(),
        ])
        .with_colorbar(Default::default())
        .into(),
    );

    common::save_figure(&fig, &data_source, Default::default(), "stars");
}
