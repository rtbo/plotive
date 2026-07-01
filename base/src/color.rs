//! This module defines color types and conversions between them.
use std::str::FromStr;
use std::{error, fmt};

pub(crate) mod css4;
pub(crate) mod xkcd;

pub use css4::*;

/// A simple color type with 8-bit RGB components, including an alpha channel.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Rgba8(u8, u8, u8, u8);

impl Rgba8 {
    pub const fn new(r: u8, g: u8, b: u8, a: u8) -> Self {
        Self(r, g, b, a)
    }

    /// Get the red component of the color.
    pub const fn r(&self) -> u8 {
        self.0
    }

    /// Get the green component of the color.
    pub const fn g(&self) -> u8 {
        self.1
    }

    /// Get the blue component of the color.
    pub const fn b(&self) -> u8 {
        self.2
    }

    /// Get the alpha channel of the color.
    pub const fn a(&self) -> u8 {
        self.3
    }

    /// Get the HTML hex string representation of the color, e.g. `#ff0000` for red.
    /// If the alpha channel is not 255, the form "rgba(r, g, b, a)" is used instead (with alpha normalized to [0, 1]).
    pub fn html(&self) -> String {
        if self.a() == 255 {
            format!("#{:02x}{:02x}{:02x}", self.r(), self.g(), self.b())
        } else {
            format!(
                "rgba({}, {}, {}, {})",
                self.r(),
                self.g(),
                self.b(),
                self.a() as f32 / 255.0
            )
        }
    }

    /// Get the RGBA components of the color as an array.
    pub const fn arr(&self) -> [u8; 4] {
        [self.0, self.1, self.2, self.3]
    }

    /// Get the Rgb8 representation of the color, ignoring the alpha channel.
    pub const fn rgb(&self) -> Rgb8 {
        Rgb8(self.0, self.1, self.2)
    }

    /// Split the representation into Rgb8 representation and the optional opacity value.
    /// The opacity value is None if the alpha channel is 255 (fully opaque), otherwise it is Some(alpha / 255.0).
    pub const fn split_rgb_opacity(&self) -> (Rgb8, Option<f32>) {
        let opacity = if self.a() == 255 {
            None
        } else {
            Some(self.a() as f32 / 255.0)
        };
        (Rgb8(self.0, self.1, self.2), opacity)
    }

    /// Compute the relative luminance of the color, in linear RGB space.
    /// The alpha channel is ignored for this computation.
    pub fn luminance(&self) -> f32 {
        let lin: LinRgb = self.rgb().into();
        lin.luminance()
    }

    /// Parse a color from an HTML hex string, e.g. `#ff0000` or `#f00` for red.
    /// Supports also alpha channel: `#ff000080` or `#f008`.
    /// The hex string must start with a `#` and be followed by either 3, 4, 6, or 8 hexadecimal digits.
    ///
    /// Panics if the hex string is invalid, e.g. if it contains non-hexadecimal characters or has an invalid length.
    pub const fn from_hex(hex: &[u8]) -> Self {
        if hex[0] != b'#' {
            panic!("Hex color must start with a #");
        }
        match hex.len() {
            4 => {
                let r = hex_to_u8(hex[1]);
                let g = hex_to_u8(hex[2]);
                let b = hex_to_u8(hex[3]);
                let r = r << 4 | r;
                let g = g << 4 | g;
                let b = b << 4 | b;
                Rgba8::new(r, g, b, 255)
            }
            5 => {
                let r = hex_to_u8(hex[1]);
                let g = hex_to_u8(hex[2]);
                let b = hex_to_u8(hex[3]);
                let a = hex_to_u8(hex[4]);
                let r = r << 4 | r;
                let g = g << 4 | g;
                let b = b << 4 | b;
                let a = a << 4 | a;
                Rgba8::new(r, g, b, a)
            }
            7 => {
                let r = hex_to_u8(hex[1]) << 4 | hex_to_u8(hex[2]);
                let g = hex_to_u8(hex[3]) << 4 | hex_to_u8(hex[4]);
                let b = hex_to_u8(hex[5]) << 4 | hex_to_u8(hex[6]);
                Rgba8::new(r, g, b, 255)
            }
            9 => {
                let r = hex_to_u8(hex[1]) << 4 | hex_to_u8(hex[2]);
                let g = hex_to_u8(hex[3]) << 4 | hex_to_u8(hex[4]);
                let b = hex_to_u8(hex[5]) << 4 | hex_to_u8(hex[6]);
                let a = hex_to_u8(hex[7]) << 4 | hex_to_u8(hex[8]);
                Rgba8::new(r, g, b, a)
            }
            _ => panic!("Invalid hex color"),
        }
    }
}

/// A simple color type with 8-bit RGB components.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Rgb8(u8, u8, u8);

impl Rgb8 {
    pub const fn new(r: u8, g: u8, b: u8) -> Self {
        Self(r, g, b)
    }

    /// Get the red component of the color.
    pub const fn r(&self) -> u8 {
        self.0
    }

    /// Get the green component of the color.
    pub const fn g(&self) -> u8 {
        self.1
    }

    /// Get the blue component of the color.
    pub const fn b(&self) -> u8 {
        self.2
    }

    /// Get the HTML hex string representation of the color, e.g. `#ff0000` for red.
    pub fn html(&self) -> String {
        format!("#{:02x}{:02x}{:02x}", self.r(), self.g(), self.b())
    }

    /// Get the RGB components of the color as an array.
    pub const fn arr(&self) -> [u8; 3] {
        [self.0, self.1, self.2]
    }

    /// Compute the relative luminance of the color, in linear RGB space.
    pub fn luminance(&self) -> f32 {
        let lin: LinRgb = (*self).into();
        lin.luminance()
    }

    /// Get this color with an alpha channel, with the given alpha value.
    pub const fn with_a(&self, a: u8) -> Rgba8 {
        Rgba8(self.0, self.1, self.2, a)
    }

    /// Get this color with an opaque alpha channel
    pub const fn opaque(&self) -> Rgba8 {
        Rgba8(self.0, self.1, self.2, 255)
    }

    /// Parse a color from an HTML hex string, e.g. `#ff0000` or `#f00` for red.
    /// The hex string must start with a `#` and be followed by either 3 or 6 hexadecimal digits.
    ///
    /// Panics if the hex string is invalid, e.g. if it contains non-hexadecimal characters or has an invalid length.
    pub const fn from_hex(hex: &[u8]) -> Self {
        if hex[0] != b'#' {
            panic!("Hex color must start with a #");
        }
        match hex.len() {
            4 => {
                let r = hex_to_u8(hex[1]);
                let g = hex_to_u8(hex[2]);
                let b = hex_to_u8(hex[3]);
                let r = r << 4 | r;
                let g = g << 4 | g;
                let b = b << 4 | b;
                Rgb8::new(r, g, b)
            }
            7 => {
                let r = hex_to_u8(hex[1]) << 4 | hex_to_u8(hex[2]);
                let g = hex_to_u8(hex[3]) << 4 | hex_to_u8(hex[4]);
                let b = hex_to_u8(hex[5]) << 4 | hex_to_u8(hex[6]);
                Rgb8::new(r, g, b)
            }
            _ => panic!("Invalid hex color"),
        }
    }
}

const fn hex_to_u8(hex: u8) -> u8 {
    match hex {
        b'0'..=b'9' => hex - b'0',
        b'a'..=b'f' => hex - b'a' + 10,
        b'A'..=b'F' => hex - b'A' + 10,
        _ => panic!("Invalid hex character"),
    }
}

const fn is_hex_char(c: u8) -> bool {
    matches!(c, b'0'..=b'9' | b'a'..=b'f' | b'A'..=b'F')
}

/// Rgba8 and Rgb8 are considered equal if their RGB components are equal and the alpha channel of Rgba8 is 255.
impl PartialEq<Rgb8> for Rgba8 {
    fn eq(&self, other: &Rgb8) -> bool {
        self.0 == other.0 && self.1 == other.1 && self.2 == other.2 && self.3 == 255
    }
}

/// Rgba8 and Rgb8 are considered equal if their RGB components are equal and the alpha channel of Rgba8 is 255.
impl PartialEq<Rgba8> for Rgb8 {
    fn eq(&self, other: &Rgba8) -> bool {
        self.0 == other.0 && self.1 == other.1 && self.2 == other.2 && other.3 == 255
    }
}

/// Parsing error for Rgba8
#[derive(Debug)]
pub enum ParseError {
    InvalidFormat,
    InvalidComponent,
    InvalidAlphaComponent,
    InvalidHex,
    UnknownName,
    IntError,
}

impl fmt::Display for ParseError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ParseError::InvalidFormat => write!(f, "invalid color format"),
            ParseError::InvalidComponent => write!(f, "invalid color component"),
            ParseError::InvalidAlphaComponent => write!(f, "invalid alpha component"),
            ParseError::InvalidHex => write!(f, "invalid hex color"),
            ParseError::UnknownName => write!(f, "unknown color name"),
            ParseError::IntError => write!(f, "integer parse error"),
        }
    }
}

impl error::Error for ParseError {}

fn parse_component_0_255(s: &str) -> Result<u8, ParseError> {
    let s = s.trim();
    if s.ends_with('%') {
        let val = s[..s.len() - 1]
            .trim()
            .parse::<f32>()
            .map_err(|_| ParseError::InvalidComponent)?;
        if !(0.0..=100.0).contains(&val) {
            return Err(ParseError::InvalidComponent);
        }
        Ok(((val / 100.0) * 255.0).round().clamp(0.0, 255.0) as u8)
    } else {
        // integer 0-255
        let v: i32 = s.parse().map_err(|_| ParseError::InvalidComponent)?;
        if !(0..=255).contains(&v) {
            return Err(ParseError::InvalidComponent);
        }
        Ok(v as u8)
    }
}

fn parse_alpha(s: &str) -> Result<u8, ParseError> {
    let s = s.trim();
    if s.ends_with('%') {
        // percentage alpha 0-100%
        let val = s[..s.len() - 1]
            .trim()
            .parse::<f32>()
            .map_err(|_| ParseError::InvalidAlphaComponent)?;
        if !(0.0..=100.0).contains(&val) {
            return Err(ParseError::InvalidAlphaComponent);
        }
        Ok(((val / 100.0) * 255.0).round().clamp(0.0, 255.0) as u8)
    } else {
        // try float 0.0-1.0
        if let Ok(f) = s.parse::<f32>() {
            if !(0.0..=1.0).contains(&f) {
                return Err(ParseError::InvalidAlphaComponent);
            }
            return Ok((f * 255.0).round().clamp(0.0, 255.0) as u8);
        }
        // try integer 0-255
        let v: i32 = s.parse().map_err(|_| ParseError::InvalidAlphaComponent)?;
        if !(0..=255).contains(&v) {
            return Err(ParseError::InvalidAlphaComponent);
        }
        Ok(v as u8)
    }
}

/// Implement FromStr for Rgb8 to parse color from strings
/// Supported formats:
///  - HTML hex: `#rrggbb`, `#rgb`
///  - CSS rgb(): `rgb(r,g,b)` where r,g,b are 0-255 or percentages
///  - named color from CSS4 or XKCD color names
impl FromStr for Rgb8 {
    type Err = ParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let raw = s.trim();
        if raw.is_empty() {
            return Err(ParseError::InvalidFormat);
        }

        // HTML hex: starts with '#'
        if raw.starts_with('#') {
            // safe to call from_hex, but we should validate length first
            let bytes = raw.as_bytes();
            match bytes.len() {
                4 | 7 => {
                    if bytes[1..].iter().all(|&c| is_hex_char(c)) {
                        Ok(Rgb8::from_hex(bytes))
                    } else {
                        Err(ParseError::InvalidHex)
                    }
                }
                _ => Err(ParseError::InvalidHex),
            }
        }
        // rgb(...)
        else if raw.to_ascii_lowercase().starts_with("rgb(") && raw.ends_with(')') {
            let inner = &raw[4..raw.len() - 1];
            let parts: Vec<&str> = inner.split(',').collect();
            if parts.len() != 3 {
                return Err(ParseError::InvalidFormat);
            }
            let r = parse_component_0_255(parts[0])?;
            let g = parse_component_0_255(parts[1])?;
            let b = parse_component_0_255(parts[2])?;
            Ok(Rgb8::new(r, g, b))
        }
        // named color
        else {
            if let Some(col) = names::lookup(raw) {
                if col.a() != 255 {
                    return Err(ParseError::InvalidAlphaComponent);
                }
                Ok(col.rgb())
            } else {
                Err(ParseError::UnknownName)
            }
        }
    }
}

/// Implement FromStr for Rgba8 to parse color from strings
/// Supported formats:
///  - HTML hex: `#rrggbb`, `#rgb`, `#rrggbbaa`, `#rgba`
///  - CSS rgb(): `rgb(r,g,b)` where r,g,b are 0-255 or percentages
///  - CSS rgba(): `rgba(r,g,b,a)` where r,g,b are 0-255 or percentages, a is 0.0-1.0
impl FromStr for Rgba8 {
    type Err = ParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let raw = s.trim();
        if raw.is_empty() {
            return Err(ParseError::InvalidFormat);
        }

        // HTML hex: starts with '#'
        if raw.starts_with('#') {
            // safe to call from_hex, but we should validate length first
            let bytes = raw.as_bytes();
            match bytes.len() {
                4 | 5 | 7 | 9 => {
                    if bytes[1..].iter().all(|&c| is_hex_char(c)) {
                        Ok(Rgba8::from_hex(bytes))
                    } else {
                        Err(ParseError::InvalidHex)
                    }
                }
                _ => Err(ParseError::InvalidHex),
            }
        }
        // rgb(...) or rgba(...)
        else if raw.to_ascii_lowercase().starts_with("rgb(") && raw.ends_with(')') {
            let inner = &raw[4..raw.len() - 1];
            let parts: Vec<&str> = inner.split(',').collect();
            if parts.len() != 3 {
                return Err(ParseError::InvalidFormat);
            }
            let r = parse_component_0_255(parts[0])?;
            let g = parse_component_0_255(parts[1])?;
            let b = parse_component_0_255(parts[2])?;
            Ok(Rgb8::new(r, g, b).with_a(255))
        } else if raw.to_ascii_lowercase().starts_with("rgba(") && raw.ends_with(')') {
            let inner = &raw[5..raw.len() - 1];
            let parts: Vec<&str> = inner.split(',').collect();
            if parts.len() != 4 {
                return Err(ParseError::InvalidFormat);
            }
            let r = parse_component_0_255(parts[0])?;
            let g = parse_component_0_255(parts[1])?;
            let b = parse_component_0_255(parts[2])?;
            let a = parse_alpha(parts[3])?;
            Ok(Rgba8::new(r, g, b, a))
        }
        // named color
        else {
            if let Some(col) = names::lookup(raw) {
                Ok(col)
            } else {
                Err(ParseError::UnknownName)
            }
        }
    }
}

pub(crate) mod names {
    use std::collections::HashMap;
    use std::sync::LazyLock;

    use crate::Rgba8;
    use crate::color::{css4, xkcd};

    static MAP: LazyLock<HashMap<&'static str, Rgba8>> = LazyLock::new(|| {
        // Start with XKCD colors, then CSS4 so CSS4 names take precedence on collisions.
        let mut map = HashMap::with_capacity(xkcd::COLORS.len() + css4::COLORS.len());
        map.extend(xkcd::COLORS.iter().map(|(name, rgba)| (*name, *rgba)));
        map.extend(css4::COLORS.iter().map(|(name, rgba)| (*name, *rgba)));
        map
    });

    pub(crate) fn lookup(name: &str) -> Option<Rgba8> {
        let key = name.trim().to_lowercase();
        MAP.get(key.as_str()).copied()
    }
}

/// A trait for interpolating between two colors, used for color scales in heatmaps and similar plots.
pub trait Lerp {
    /// Interpolate between two colors using a parameter t in the range [0.0, 1.0].
    fn lerp(self, other: Self, t: f32) -> Self;
}

/// Non-linear sRGB color with f32 RGB components in the range [0.0, 1.0].
/// This is the same colorspace as Rgb8 but represented as f32.
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct SRgb(f32, f32, f32);

impl SRgb {
    /// Create a Srgb from the 3 components, already in the sRGB colorspace, in the range [0.0, 1.0].
    /// Returns None if any component is out of range.
    pub const fn new(r: f32, g: f32, b: f32) -> Option<Self> {
        if r >= 0.0 && r <= 1.0 && g >= 0.0 && g <= 1.0 && b >= 0.0 && b <= 1.0 {
            Some(Self(r, g, b))
        } else {
            None
        }
    }

    /// Get the red component of the color.
    pub const fn r(&self) -> f32 {
        self.0
    }

    /// Get the green component of the color.
    pub const fn g(&self) -> f32 {
        self.1
    }

    /// Get the blue component of the color.
    pub const fn b(&self) -> f32 {
        self.2
    }

    /// Compute the relative luminance of the color, in linear RGB space.
    pub fn luminance(&self) -> f32 {
        let lin: LinRgb = (*self).into();
        lin.luminance()
    }
}

// It is checked that the components of the color are valid, so we can safely implement Eq.
impl Eq for SRgb {}

impl Lerp for SRgb {
    fn lerp(self, other: Self, t: f32) -> Self {
        debug_assert!(
            t >= 0.0 && t <= 1.0,
            "t must be in the range [0.0, 1.0] (got {})",
            t
        );
        let r = self.0 * (1.0 - t) + other.0 * t;
        let g = self.1 * (1.0 - t) + other.1 * t;
        let b = self.2 * (1.0 - t) + other.2 * t;
        Self(r, g, b)
    }
}

/// A linear RGB color with f32 components in the range [0.0, 1.0].
/// This is a linear colorspace where the components are proportional to the actual light intensity.
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct LinRgb(f32, f32, f32);

impl LinRgb {
    /// Create a LinRgb from the 3 components, already in the linear RGB colorspace, in the range [0.0, 1.0].
    /// Returns None if any component is out of range.
    pub const fn new(r: f32, g: f32, b: f32) -> Option<Self> {
        if r >= 0.0 && r <= 1.0 && g >= 0.0 && g <= 1.0 && b >= 0.0 && b <= 1.0 {
            Some(Self(r, g, b))
        } else {
            None
        }
    }

    /// Get the red component of the color.
    pub const fn r(&self) -> f32 {
        self.0
    }

    /// Get the green component of the color.
    pub const fn g(&self) -> f32 {
        self.1
    }

    /// Get the blue component of the color.
    pub const fn b(&self) -> f32 {
        self.2
    }

    /// Compute the relative luminance of the color, in linear RGB space.
    pub const fn luminance(&self) -> f32 {
        0.2126 * self.0 + 0.7152 * self.1 + 0.0722 * self.2
    }
}

// It is checked that the components of the color are valid, so we can safely implement Eq.
impl Eq for LinRgb {}

impl Lerp for LinRgb {
    fn lerp(self, other: Self, t: f32) -> Self {
        debug_assert!(
            t >= 0.0 && t <= 1.0,
            "t must be in the range [0.0, 1.0] (got {})",
            t
        );
        let r = self.0 * (1.0 - t) + other.0 * t;
        let g = self.1 * (1.0 - t) + other.1 * t;
        let b = self.2 * (1.0 - t) + other.2 * t;
        Self(r, g, b)
    }
}

/// A perceptually uniform color space based on the OkLab model, with f32 components.
/// Very useful for interpolation of colors, as it produces much smoother gradients than sRGB or linear RGB.
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct OkLab(f32, f32, f32);

impl OkLab {
    /// Create a OkLab from the 3 components, already in the OkLab colorspace.
    /// Returns None if it can't be mapped to a valid linear RGB color.
    pub fn new(l: f32, a: f32, b: f32) -> Option<Self> {
        let lin: LinRgb = LinRgb::from(Self(l, a, b));
        if LinRgb::new(lin.0, lin.1, lin.2).is_none() {
            return None;
        }

        Some(Self(l, a, b))
    }

    /// Get the L component of the color.
    pub const fn l(&self) -> f32 {
        self.0
    }

    /// Get the a component of the color.
    pub const fn a(&self) -> f32 {
        self.1
    }

    /// Get the b component of the color.
    pub const fn b(&self) -> f32 {
        self.2
    }
}

// It is checked that the components of the color are valid, so we can safely implement Eq.
impl Eq for OkLab {}

impl Lerp for OkLab {
    fn lerp(self, other: Self, t: f32) -> Self {
        debug_assert!(
            t >= 0.0 && t <= 1.0,
            "t must be in the range [0.0, 1.0], got {}",
            t
        );
        let r = self.0 * (1.0 - t) + other.0 * t;
        let g = self.1 * (1.0 - t) + other.1 * t;
        let b = self.2 * (1.0 - t) + other.2 * t;
        Self(r, g, b)
    }
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Xyz(f32, f32, f32);

impl Xyz {
    pub const fn new(x: f32, y: f32, z: f32) -> Option<Self> {
        if x >= 0.0 && y >= 0.0 && z >= 0.0 {
            Some(Self(x, y, z))
        } else {
            None
        }
    }
}

impl Eq for Xyz {}

impl Lerp for Xyz {
    fn lerp(self, other: Self, t: f32) -> Self {
        debug_assert!(t >= 0.0 && t <= 1.0, "t must be in the range [0.0, 1.0]");
        let x = self.0 * (1.0 - t) + other.0 * t;
        let y = self.1 * (1.0 - t) + other.1 * t;
        let z = self.2 * (1.0 - t) + other.2 * t;
        Self(x, y, z)
    }
}

impl From<SRgb> for Rgb8 {
    fn from(srgb: SRgb) -> Self {
        let r = (srgb.0 * 255.0).round() as u8;
        let g = (srgb.1 * 255.0).round() as u8;
        let b = (srgb.2 * 255.0).round() as u8;
        Self(r, g, b)
    }
}

impl From<Rgb8> for SRgb {
    fn from(rgb: Rgb8) -> Self {
        let r = rgb.0 as f32 / 255.0;
        let g = rgb.1 as f32 / 255.0;
        let b = rgb.2 as f32 / 255.0;
        Self(r, g, b)
    }
}

impl From<SRgb> for LinRgb {
    fn from(srgb: SRgb) -> Self {
        fn comp(c: f32) -> f32 {
            if c >= 0.04045 {
                ((c + 0.055) / 1.055).powf(2.4)
            } else {
                c / 12.92
            }
        }

        Self(comp(srgb.0), comp(srgb.1), comp(srgb.2))
    }
}

impl From<LinRgb> for SRgb {
    fn from(linrgb: LinRgb) -> Self {
        fn comp(c: f32) -> f32 {
            if c >= 0.0031308 {
                1.055 * c.powf(1.0 / 2.4) - 0.055
            } else {
                12.92 * c
            }
        }

        Self(comp(linrgb.0), comp(linrgb.1), comp(linrgb.2))
    }
}

impl From<LinRgb> for OkLab {
    fn from(linrgb: LinRgb) -> Self {
        let l = 0.4122214708 * linrgb.0 + 0.5363325363 * linrgb.1 + 0.0514459929 * linrgb.2;
        let m = 0.2119034982 * linrgb.0 + 0.6806995451 * linrgb.1 + 0.1073969566 * linrgb.2;
        let s = 0.0883024619 * linrgb.0 + 0.2817188376 * linrgb.1 + 0.6299787005 * linrgb.2;

        let l = l.cbrt();
        let m = m.cbrt();
        let s = s.cbrt();

        Self(
            0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
        )
    }
}

impl From<OkLab> for LinRgb {
    fn from(oklab: OkLab) -> Self {
        let l = oklab.0 + 0.3963377774 * oklab.1 + 0.2158037573 * oklab.2;
        let m = oklab.0 - 0.1055613458 * oklab.1 - 0.0638541728 * oklab.2;
        let s = oklab.0 - 0.0894841775 * oklab.1 - 1.2914855480 * oklab.2;

        let l = l * l * l;
        let m = m * m * m;
        let s = s * s * s;

        Self(
            4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
            -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
            -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
        )
    }
}

impl From<LinRgb> for Xyz {
    fn from(LinRgb(r, g, b): LinRgb) -> Self {
        let x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
        let y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
        let z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;
        Self(x, y, z)
    }
}

impl From<Xyz> for LinRgb {
    fn from(Xyz(x, y, z): Xyz) -> Self {
        let r = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
        let g = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z;
        let b = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
        Self(r, g, b)
    }
}

impl From<Rgb8> for LinRgb {
    fn from(rgb: Rgb8) -> Self {
        let srgb: SRgb = SRgb::from(rgb);
        Self::from(srgb)
    }
}

impl From<Rgb8> for OkLab {
    fn from(rgb: Rgb8) -> Self {
        let linrgb: LinRgb = LinRgb::from(rgb);
        Self::from(linrgb)
    }
}

impl From<Rgb8> for Xyz {
    fn from(rgb: Rgb8) -> Self {
        let linrgb: LinRgb = LinRgb::from(rgb);
        Self::from(linrgb)
    }
}

impl From<LinRgb> for Rgb8 {
    fn from(linrgb: LinRgb) -> Self {
        let srgb: SRgb = SRgb::from(linrgb);
        Self::from(srgb)
    }
}

impl From<OkLab> for Rgb8 {
    fn from(oklab: OkLab) -> Self {
        let linrgb: LinRgb = LinRgb::from(oklab);
        Self::from(linrgb)
    }
}

impl From<Xyz> for Rgb8 {
    fn from(xyz: Xyz) -> Self {
        let linrgb: LinRgb = LinRgb::from(xyz);
        Self::from(linrgb)
    }
}

impl From<SRgb> for OkLab {
    fn from(srgb: SRgb) -> Self {
        let linrgb: LinRgb = LinRgb::from(srgb);
        Self::from(linrgb)
    }
}

impl From<SRgb> for Xyz {
    fn from(srgb: SRgb) -> Self {
        let linrgb: LinRgb = LinRgb::from(srgb);
        Self::from(linrgb)
    }
}

impl From<OkLab> for SRgb {
    fn from(oklab: OkLab) -> Self {
        let linrgb: LinRgb = LinRgb::from(oklab);
        Self::from(linrgb)
    }
}

impl From<Xyz> for SRgb {
    fn from(xyz: Xyz) -> Self {
        let linrgb: LinRgb = LinRgb::from(xyz);
        Self::from(linrgb)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_html_hex() {
        // full and short hex
        assert_eq!("#ff0000".parse::<Rgb8>().unwrap(), RED);
        assert_eq!("#f00".parse::<Rgb8>().unwrap(), RED);

        // hex with alpha
        let c = "#ff000080".parse::<Rgba8>().unwrap();
        assert_eq!(c.arr(), [255, 0, 0, 128]);
    }

    #[test]
    fn parse_css_rgb_rgba() {
        // integer rgb
        assert_eq!("rgb(255,0,0)".parse::<Rgb8>().unwrap(), RED);

        // percentage rgb
        assert_eq!(
            "rgb(40.5%,0%,0%)".parse::<Rgb8>().unwrap(),
            Rgb8::new(103, 0, 0)
        );

        // rgb with spaces
        let c = "rgb(255, 0, 0)".parse::<Rgb8>().unwrap();
        assert_eq!(c.arr(), [255, 0, 0]);

        // rgba with float alpha
        let c = "rgba(255,0,0,0.5)".parse::<Rgba8>().unwrap();
        assert_eq!(c.arr(), [255, 0, 0, 128]);

        // rgba with percentage alpha
        let c = "rgba(255,0,0,50%)".parse::<Rgba8>().unwrap();
        assert_eq!(c.arr(), [255, 0, 0, 128]);

        // rgba with float alpha 0.0-1.0
        let c = "rgba(255, 0, 0, 0.5)".parse::<Rgba8>().unwrap();
        assert_eq!(c.arr(), [255, 0, 0, 128]);
    }

    #[test]
    fn parse_named_colors() {
        // simple name
        assert_eq!("red".parse::<Rgb8>().unwrap(), RED);

        // case-insensitive
        assert_eq!("AliceBlue".parse::<Rgb8>().unwrap(), ALICEBLUE);
    }

    #[test]
    fn parse_errors() {
        // empty
        assert!(matches!(
            "".parse::<Rgba8>(),
            Err(ParseError::InvalidFormat)
        ));

        // invalid hex length
        assert!(matches!(
            "#12345".parse::<Rgba8>(),
            Err(ParseError::InvalidHex)
        ));

        // invalid rgb component (out of 0-255)
        assert!(matches!(
            "rgb(300,0,0)".parse::<Rgba8>(),
            Err(ParseError::InvalidComponent)
        ));

        // invalid rgba alpha (float > 1.0)
        assert!(matches!(
            "rgba(255,0,0,2.0)".parse::<Rgba8>(),
            Err(ParseError::InvalidAlphaComponent)
        ));

        // unknown name
        assert!(matches!(
            "notacolor".parse::<Rgba8>(),
            Err(ParseError::UnknownName)
        ));
    }

    #[test]
    fn test_srgb_nan_fails() {
        assert!(SRgb::new(f32::NAN, 0.0, 0.0).is_none());
        assert!(SRgb::new(0.0, f32::NAN, 0.0).is_none());
        assert!(SRgb::new(0.0, 0.0, f32::NAN).is_none());
    }
}
