use crate::{geom, style};

const SQRT2: f32 = 1.4142135623730951;
const TAN30: f32 = 0.5773502691896257;

/// Generate a path for a marker shape of size 1.0 and centered at (0, 0)
pub fn marker_path(shape: style::MarkerShape) -> geom::Path {
    match shape {
        style::MarkerShape::Circle => {
            let radius = 0.5;
            geom::PathBuilder::from_circle(0.0, 0.0, radius).expect("Should be a valid path")
        }
        style::MarkerShape::Square => {
            let half_w = 0.5;
            let half_h = 0.5;
            let mut builder = geom::PathBuilder::new();
            builder.move_to(-half_w, -half_h);
            builder.line_to(half_w, -half_h);
            builder.line_to(half_w, half_h);
            builder.line_to(-half_w, half_h);
            builder.close();
            builder.finish().expect("Should be a valid path")
        }
        style::MarkerShape::Diamond => {
            let half_w = 1.0 / SQRT2;
            let half_h = 1.0 / SQRT2;
            let mut builder = geom::PathBuilder::new();
            builder.move_to(0.0, -half_h);
            builder.line_to(half_w, 0.0);
            builder.line_to(0.0, half_h);
            builder.line_to(-half_w, 0.0);
            builder.close();
            builder.finish().expect("Should be a valid path")
        }
        style::MarkerShape::Cross => {
            let half_w = 0.5;
            let half_h = 0.5;
            let mut builder = geom::PathBuilder::new();
            builder.move_to(-half_w, -half_h);
            builder.line_to(half_w, half_h);
            builder.move_to(half_w, -half_h);
            builder.line_to(-half_w, half_h);
            // No close for open shapes
            builder.finish().expect("Should be a valid path")
        }
        style::MarkerShape::Plus => {
            let half_w = 1.0 / SQRT2;
            let half_h = 1.0 / SQRT2;
            let mut builder = geom::PathBuilder::new();
            builder.move_to(0.0, -half_h);
            builder.line_to(0.0, half_h);
            builder.move_to(-half_w, 0.0);
            builder.line_to(half_w, 0.0);
            // No close for open shapes
            builder.finish().expect("Should be a valid path")
        }
        style::MarkerShape::TriangleUp => {
            let height = 1.0;
            let base = 2.0 * height * TAN30;
            let mut builder = geom::PathBuilder::new();
            builder.move_to(0.0, -2.0 * height / 3.0);
            builder.line_to(base / 2.0, height / 3.0);
            builder.line_to(-base / 2.0, height / 3.0);
            builder.close();
            builder.finish().expect("Should be a valid path")
        }
        style::MarkerShape::TriangleDown => {
            let height = 1.0;
            let base = 2.0 * height * TAN30;
            let mut builder = geom::PathBuilder::new();
            builder.move_to(0.0, 2.0 * height / 3.0);
            builder.line_to(base / 2.0, -height / 3.0);
            builder.line_to(-base / 2.0, -height / 3.0);
            builder.close();
            builder.finish().expect("Should be a valid path")
        }
        style::MarkerShape::TriangleRight => {
            let height = 1.0;
            let base = 2.0 * height * TAN30;
            let mut builder = geom::PathBuilder::new();
            builder.move_to(2.0 * height / 3.0, 0.0);
            builder.line_to(-height / 3.0, base / 2.0);
            builder.line_to(-height / 3.0, -base / 2.0);
            builder.close();
            builder.finish().expect("Should be a valid path")
        }
        style::MarkerShape::TriangleLeft => {
            let height = 1.0;
            let base = 2.0 * height * TAN30;
            let mut builder = geom::PathBuilder::new();
            builder.move_to(-2.0 * height / 3.0, 0.0);
            builder.line_to(height / 3.0, base / 2.0);
            builder.line_to(height / 3.0, -base / 2.0);
            builder.close();
            builder.finish().expect("Should be a valid path")
        }
    }
}
