use plotive_base::Rgba8;

use crate::style;

/// Dracula theme
#[derive(Debug, Clone, Copy)]
pub struct Dracula;

/// Alucard theme
#[derive(Debug, Clone, Copy)]
pub struct Alucard;

pub trait Colors {
    const BACKGROUND: Rgba8;
    const _CURRENT_LINE: Rgba8;
    const SELECTION: Rgba8;
    const FOREGROUND: Rgba8;
    const _COMMENT: Rgba8;
    const CYAN: Rgba8;
    const GREEN: Rgba8;
    const ORANGE: Rgba8;
    const PINK: Rgba8;
    const PURPLE: Rgba8;
    const RED: Rgba8;
    const YELLOW: Rgba8;
}

pub const fn theme_palette<C>() -> style::theme::ThemePalette
where
    C: Colors,
{
    style::theme::ThemePalette {
        background: C::BACKGROUND,
        foreground: C::FOREGROUND,
        grid: C::FOREGROUND,
        legend_fill: C::SELECTION,
        legend_border: C::FOREGROUND,
    }
}

pub const fn series_colors<F>() -> &'static [Rgba8]
where
    F: Colors,
{
    &[
        F::CYAN,
        F::RED,
        F::YELLOW,
        F::PINK,
        F::PURPLE,
        F::GREEN,
        F::ORANGE,
    ]
}

impl Colors for Dracula {
    const BACKGROUND: Rgba8 = Rgba8::from_hex(b"#282a36");
    const _CURRENT_LINE: Rgba8 = Rgba8::from_hex(b"#44475a");
    const SELECTION: Rgba8 = Rgba8::from_hex(b"#44475a");
    const FOREGROUND: Rgba8 = Rgba8::from_hex(b"#f8f8f2");
    const _COMMENT: Rgba8 = Rgba8::from_hex(b"#6272a4");
    const CYAN: Rgba8 = Rgba8::from_hex(b"#8be9fd");
    const GREEN: Rgba8 = Rgba8::from_hex(b"#50fa7b");
    const ORANGE: Rgba8 = Rgba8::from_hex(b"#ffb86c");
    const PINK: Rgba8 = Rgba8::from_hex(b"#ff79c6");
    const PURPLE: Rgba8 = Rgba8::from_hex(b"#bd93f9");
    const RED: Rgba8 = Rgba8::from_hex(b"#ff5555");
    const YELLOW: Rgba8 = Rgba8::from_hex(b"#f1fa8c");
}

impl Colors for Alucard {
    const BACKGROUND: Rgba8 = Rgba8::from_hex(b"#fffbeb");
    const _CURRENT_LINE: Rgba8 = Rgba8::from_hex(b"#6c664b");
    const SELECTION: Rgba8 = Rgba8::from_hex(b"#cfcfde");
    const FOREGROUND: Rgba8 = Rgba8::from_hex(b"#1f1f1f");
    const _COMMENT: Rgba8 = Rgba8::from_hex(b"#6c664b");
    const CYAN: Rgba8 = Rgba8::from_hex(b"#036a96");
    const GREEN: Rgba8 = Rgba8::from_hex(b"#14710a");
    const ORANGE: Rgba8 = Rgba8::from_hex(b"#a34d14");
    const PINK: Rgba8 = Rgba8::from_hex(b"#a3144d");
    const PURPLE: Rgba8 = Rgba8::from_hex(b"#644ac9");
    const RED: Rgba8 = Rgba8::from_hex(b"#cb3a2a");
    const YELLOW: Rgba8 = Rgba8::from_hex(b"#846e15");
}
