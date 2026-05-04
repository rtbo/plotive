//! Catppuccin theme implementation
use crate::{Rgba8, style};

/// Catppuccin Latte theme
#[derive(Debug, Clone, Copy)]
pub struct Latte;

/// Catppuccin Frappe theme
#[derive(Debug, Clone, Copy)]
pub struct Frappe;

/// Catppuccin Macchiato theme
#[derive(Debug, Clone, Copy)]
pub struct Macchiato;

/// Catppuccin Mocha theme
#[derive(Debug, Clone, Copy)]
pub struct Mocha;

pub trait Flavors {
    const ROSEWATER: Rgba8;
    const FLAMINGO: Rgba8;
    const PINK: Rgba8;
    const MAUVE: Rgba8;
    const RED: Rgba8;
    const MAROON: Rgba8;
    const PEACH: Rgba8;
    const YELLOW: Rgba8;
    const GREEN: Rgba8;
    const TEAL: Rgba8;
    const SKY: Rgba8;
    const SAPPHIRE: Rgba8;
    const BLUE: Rgba8;
    const LAVENDER: Rgba8;
    const TEXT: Rgba8;
    const _SUBTEXT1: Rgba8;
    const _SUBTEXT0: Rgba8;
    const OVERLAY2: Rgba8;
    const _OVERLAY1: Rgba8;
    const _OVERLAY0: Rgba8;
    const SURFACE2: Rgba8;
    const _SURFACE1: Rgba8;
    const SURFACE0: Rgba8;
    const BASE: Rgba8;
    const _MANTLE: Rgba8;
    const _CRUST: Rgba8;
}

pub const fn theme_palette<F>() -> style::theme::ThemePalette
where
    F: Flavors,
{
    style::theme::ThemePalette {
        background: F::BASE,
        foreground: F::TEXT,
        grid: F::SURFACE2,
        legend_fill: F::SURFACE0,
        legend_border: F::OVERLAY2,
    }
}

pub const fn series_colors<F>() -> &'static [Rgba8]
where
    F: Flavors,
{
    &[
        F::BLUE,
        F::PEACH,
        F::GREEN,
        F::RED,
        F::MAUVE,
        F::MAROON,
        F::FLAMINGO,
        F::PINK,
        F::LAVENDER,
        F::TEAL,
        F::SKY,
        F::YELLOW,
        F::SAPPHIRE,
        F::ROSEWATER,
    ]
}

impl Flavors for Latte {
    const ROSEWATER: Rgba8 = Rgba8::from_hex(b"#dc8a78");
    const FLAMINGO: Rgba8 = Rgba8::from_hex(b"#dd7878");
    const PINK: Rgba8 = Rgba8::from_hex(b"#ea76cb");
    const MAUVE: Rgba8 = Rgba8::from_hex(b"#8839ef");
    const RED: Rgba8 = Rgba8::from_hex(b"#d20f39");
    const MAROON: Rgba8 = Rgba8::from_hex(b"#e64553");
    const PEACH: Rgba8 = Rgba8::from_hex(b"#fe640b");
    const YELLOW: Rgba8 = Rgba8::from_hex(b"#df8e1d");
    const GREEN: Rgba8 = Rgba8::from_hex(b"#40a02b");
    const TEAL: Rgba8 = Rgba8::from_hex(b"#179299");
    const SKY: Rgba8 = Rgba8::from_hex(b"#04a5e5");
    const SAPPHIRE: Rgba8 = Rgba8::from_hex(b"#209fb5");
    const BLUE: Rgba8 = Rgba8::from_hex(b"#1e66f5");
    const LAVENDER: Rgba8 = Rgba8::from_hex(b"#7287fd");
    const TEXT: Rgba8 = Rgba8::from_hex(b"#4c4f69");
    const _SUBTEXT1: Rgba8 = Rgba8::from_hex(b"#5c5f77");
    const _SUBTEXT0: Rgba8 = Rgba8::from_hex(b"#6c6f85");
    const OVERLAY2: Rgba8 = Rgba8::from_hex(b"#7c7f93");
    const _OVERLAY1: Rgba8 = Rgba8::from_hex(b"#9ca0b0");
    const _OVERLAY0: Rgba8 = Rgba8::from_hex(b"#c6c8d1");
    const SURFACE2: Rgba8 = Rgba8::from_hex(b"#dfdfe0");
    const _SURFACE1: Rgba8 = Rgba8::from_hex(b"#e8e8e8");
    const SURFACE0: Rgba8 = Rgba8::from_hex(b"#f5f5f5");
    const BASE: Rgba8 = Rgba8::from_hex(b"#eff1f5");
    const _MANTLE: Rgba8 = Rgba8::from_hex(b"#e6e9ef");
    const _CRUST: Rgba8 = Rgba8::from_hex(b"#dce0e8");
}

impl Flavors for Frappe {
    const ROSEWATER: Rgba8 = Rgba8::from_hex(b"#f2d5cf");
    const FLAMINGO: Rgba8 = Rgba8::from_hex(b"#eebebe");
    const PINK: Rgba8 = Rgba8::from_hex(b"#f4b8e4");
    const MAUVE: Rgba8 = Rgba8::from_hex(b"#ca9ee6");
    const RED: Rgba8 = Rgba8::from_hex(b"#e78284");
    const MAROON: Rgba8 = Rgba8::from_hex(b"#ea999c");
    const PEACH: Rgba8 = Rgba8::from_hex(b"#ef9f76");
    const YELLOW: Rgba8 = Rgba8::from_hex(b"#e5c890");
    const GREEN: Rgba8 = Rgba8::from_hex(b"#a6d189");
    const TEAL: Rgba8 = Rgba8::from_hex(b"#81c8be");
    const SKY: Rgba8 = Rgba8::from_hex(b"#99d1db");
    const SAPPHIRE: Rgba8 = Rgba8::from_hex(b"#85c1dc");
    const BLUE: Rgba8 = Rgba8::from_hex(b"#8caaee");
    const LAVENDER: Rgba8 = Rgba8::from_hex(b"#babbf1");
    const TEXT: Rgba8 = Rgba8::from_hex(b"#c6d0f5");
    const _SUBTEXT1: Rgba8 = Rgba8::from_hex(b"#b5bfe2");
    const _SUBTEXT0: Rgba8 = Rgba8::from_hex(b"#a5adce");
    const OVERLAY2: Rgba8 = Rgba8::from_hex(b"#949cbb");
    const _OVERLAY1: Rgba8 = Rgba8::from_hex(b"#838ba7");
    const _OVERLAY0: Rgba8 = Rgba8::from_hex(b"#737994");
    const SURFACE2: Rgba8 = Rgba8::from_hex(b"#626880");
    const _SURFACE1: Rgba8 = Rgba8::from_hex(b"#51576d");
    const SURFACE0: Rgba8 = Rgba8::from_hex(b"#414559");
    const BASE: Rgba8 = Rgba8::from_hex(b"#303446");
    const _MANTLE: Rgba8 = Rgba8::from_hex(b"#292c36");
    const _CRUST: Rgba8 = Rgba8::from_hex(b"#232634");
}

impl Flavors for Macchiato {
    const ROSEWATER: Rgba8 = Rgba8::from_hex(b"#f4dbd6");
    const FLAMINGO: Rgba8 = Rgba8::from_hex(b"#f0c6c6");
    const PINK: Rgba8 = Rgba8::from_hex(b"#f5bde6");
    const MAUVE: Rgba8 = Rgba8::from_hex(b"#c6a0f6");
    const RED: Rgba8 = Rgba8::from_hex(b"#ed8796");
    const MAROON: Rgba8 = Rgba8::from_hex(b"#ee99a0");
    const PEACH: Rgba8 = Rgba8::from_hex(b"#f5a97f");
    const YELLOW: Rgba8 = Rgba8::from_hex(b"#eed49f");
    const GREEN: Rgba8 = Rgba8::from_hex(b"#a6da95");
    const TEAL: Rgba8 = Rgba8::from_hex(b"#8bd5ca");
    const SKY: Rgba8 = Rgba8::from_hex(b"#91d7e3");
    const SAPPHIRE: Rgba8 = Rgba8::from_hex(b"#7dc4e4");
    const BLUE: Rgba8 = Rgba8::from_hex(b"#8aadf4");
    const LAVENDER: Rgba8 = Rgba8::from_hex(b"#b7bdf8");
    const TEXT: Rgba8 = Rgba8::from_hex(b"#cad3f5");
    const _SUBTEXT1: Rgba8 = Rgba8::from_hex(b"#b8c0e0");
    const _SUBTEXT0: Rgba8 = Rgba8::from_hex(b"#a5adcb");
    const OVERLAY2: Rgba8 = Rgba8::from_hex(b"#939ab7");
    const _OVERLAY1: Rgba8 = Rgba8::from_hex(b"#8087a2");
    const _OVERLAY0: Rgba8 = Rgba8::from_hex(b"#6e738d");
    const SURFACE2: Rgba8 = Rgba8::from_hex(b"#5b6078");
    const _SURFACE1: Rgba8 = Rgba8::from_hex(b"#494d64");
    const SURFACE0: Rgba8 = Rgba8::from_hex(b"#363a4f");
    const BASE: Rgba8 = Rgba8::from_hex(b"#24273a");
    const _MANTLE: Rgba8 = Rgba8::from_hex(b"#1e2030");
    const _CRUST: Rgba8 = Rgba8::from_hex(b"#181926");
}

impl Flavors for Mocha {
    const ROSEWATER: Rgba8 = Rgba8::from_hex(b"#f5e0dc");
    const FLAMINGO: Rgba8 = Rgba8::from_hex(b"#f2cdcd");
    const PINK: Rgba8 = Rgba8::from_hex(b"#f5c2e7");
    const MAUVE: Rgba8 = Rgba8::from_hex(b"#cba6f7");
    const RED: Rgba8 = Rgba8::from_hex(b"#f38ba8");
    const MAROON: Rgba8 = Rgba8::from_hex(b"#eba0ac");
    const PEACH: Rgba8 = Rgba8::from_hex(b"#fab387");
    const YELLOW: Rgba8 = Rgba8::from_hex(b"#f9e2af");
    const GREEN: Rgba8 = Rgba8::from_hex(b"#a6e3a1");
    const TEAL: Rgba8 = Rgba8::from_hex(b"#94e2d5");
    const SKY: Rgba8 = Rgba8::from_hex(b"#89dceb");
    const SAPPHIRE: Rgba8 = Rgba8::from_hex(b"#74c7ec");
    const BLUE: Rgba8 = Rgba8::from_hex(b"#89b4fa");
    const LAVENDER: Rgba8 = Rgba8::from_hex(b"#b4befe");
    const TEXT: Rgba8 = Rgba8::from_hex(b"#cdd6f4");
    const _SUBTEXT1: Rgba8 = Rgba8::from_hex(b"#bac2de");
    const _SUBTEXT0: Rgba8 = Rgba8::from_hex(b"#a6adc8");
    const OVERLAY2: Rgba8 = Rgba8::from_hex(b"#9399b2");
    const _OVERLAY1: Rgba8 = Rgba8::from_hex(b"#7f849c");
    const _OVERLAY0: Rgba8 = Rgba8::from_hex(b"#6c7086");
    const SURFACE2: Rgba8 = Rgba8::from_hex(b"#585b70");
    const _SURFACE1: Rgba8 = Rgba8::from_hex(b"#45475a");
    const SURFACE0: Rgba8 = Rgba8::from_hex(b"#313244");
    const BASE: Rgba8 = Rgba8::from_hex(b"#1e1e2e");
    const _MANTLE: Rgba8 = Rgba8::from_hex(b"#181825");
    const _CRUST: Rgba8 = Rgba8::from_hex(b"#11111b");
}
