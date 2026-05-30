pub mod color;
pub use color::{Color, ResolveColor, Rgb8, Rgba8};

pub mod geom;

#[cfg(feature = "serde")]
mod sd;
