pub mod figure;
pub mod show;
mod surface;

pub use figure::{Figure, figure};
pub use show::Show;

pub trait ToIced {
    type IcedType;
    fn to_iced(&self) -> Self::IcedType;
}

impl ToIced for plotive::Rgba8 {
    type IcedType = iced::Color;

    fn to_iced(&self) -> Self::IcedType {
        iced::Color::from_rgba8(
            self.r(),
            self.g(),
            self.b(),
            self.a() as f32 / 255.0,
        )
    }
}
