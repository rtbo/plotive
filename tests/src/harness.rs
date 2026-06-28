use std::path::{Path, PathBuf};

use plotive::{Prepare, Style, des};
use plotive_pxl::PxlSurface;
use plotive_svg::SvgSurface;

use crate::pixelmatch;

const FORCE_REGENERATE_REFS: bool = false;

pub trait TestHarness {
    type DrawnFig;
    type DiffFig;

    fn id() -> &'static str;
    fn fig_file_ext() -> &'static str;
    fn diff_file_suffix() -> &'static str;

    fn ref_file_path(ref_name: &str) -> PathBuf {
        let file_name = format!("{}{}", ref_name, Self::fig_file_ext());
        let tests_dir = env!("CARGO_MANIFEST_DIR");
        Path::new(tests_dir).join("refs").join(file_name)
    }

    fn failed_file_path(ref_name: &str) -> PathBuf {
        let file_name = format!("{}{}", ref_name, Self::fig_file_ext());
        let tests_dir = env!("CARGO_MANIFEST_DIR");
        Path::new(tests_dir).join("failed").join(file_name)
    }

    fn failed_json_file_path(ref_name: &str) -> PathBuf {
        let file_name = format!("{}.json", ref_name);
        let tests_dir = env!("CARGO_MANIFEST_DIR");
        Path::new(tests_dir).join("failed").join(file_name)
    }

    fn failed_diff_file_path(ref_name: &str) -> PathBuf {
        let file_name = format!("{}{}", ref_name, Self::diff_file_suffix());
        let tests_dir = env!("CARGO_MANIFEST_DIR");
        Path::new(tests_dir).join("failed").join(file_name)
    }

    fn draw_fig(fig: &des::Figure, style: &Style) -> Self::DrawnFig;

    fn diff_fig(actual: &Self::DrawnFig, ref_: &Self::DrawnFig) -> Option<Self::DiffFig>;

    fn save_fig(file: &Path, fig: &Self::DrawnFig);
    fn load_fig(file: &Path) -> Self::DrawnFig;
    fn save_diff(file: &Path, diff: &Self::DiffFig);

    fn regenerate_refs() -> bool;

    fn check_fig_eq_ref(fig: &des::Figure, ref_name: &str, style: &Style) -> Result<(), String> {
        let ref_file = Self::ref_file_path(&ref_name);
        let failed_file = Self::failed_file_path(&ref_name);
        let failed_diff_file = Self::failed_diff_file_path(&ref_name);
        let failed_json_file = Self::failed_json_file_path(&ref_name);

        let actual_fig = Self::draw_fig(fig, style);

        if Self::regenerate_refs() {
            std::fs::create_dir_all(ref_file.parent().unwrap()).unwrap();
            Self::save_fig(&ref_file, &actual_fig);

            if std::fs::exists(&failed_file).unwrap() {
                std::fs::remove_file(&failed_file).unwrap();
            }
            if std::fs::exists(&failed_diff_file).unwrap() {
                std::fs::remove_file(&failed_diff_file).unwrap();
            }

            return Ok(());
        }

        if !std::fs::exists(&ref_file).unwrap() {
            std::fs::create_dir_all(failed_file.parent().unwrap()).unwrap();
            Self::save_fig(failed_file.as_path(), &actual_fig);
            return Err(format!(
                "No such {} ref: \"{}\"\n  Actual figure written to {}",
                Self::id(),
                ref_name,
                failed_file.display()
            ));
        }

        let ref_fig = Self::load_fig(&ref_file);

        if let Some(diff_fig) = Self::diff_fig(&actual_fig, &ref_fig) {
            std::fs::create_dir_all(failed_file.parent().unwrap()).unwrap();
            std::fs::create_dir_all(failed_diff_file.parent().unwrap()).unwrap();
            Self::save_fig(failed_file.as_path(), &actual_fig);
            Self::save_diff(failed_diff_file.as_path(), &diff_fig);

            return Err(format!(
                "{} assertion failed\n  Actual figure: {}\n     Ref figure: {}\n           Diff: {}",
                Self::id(),
                failed_file.display(),
                ref_file.display(),
                failed_diff_file.display(),
            ));
        }

        let json = serde_json::to_string_pretty(fig)
            .unwrap()
            .replace("  ", "    ");
        let des_fig: des::Figure = match serde_json::from_str(&json) {
            Ok(fig) => fig,
            Err(err) => {
                std::fs::create_dir_all(failed_file.parent().unwrap()).unwrap();
                std::fs::write(failed_json_file.as_path(), json).unwrap();
                return Err(format!(
                    "{} deserialization failed for ref \"{}\": {}\n  Failed JSON written to {}",
                    Self::id(),
                    ref_name,
                    err,
                    failed_json_file.display()
                ));
            }
        };
        let des_drawn_fig = Self::draw_fig(&des_fig, style);
        if let Some(diff_fig) = Self::diff_fig(&actual_fig, &des_drawn_fig) {
            std::fs::create_dir_all(failed_file.parent().unwrap()).unwrap();
            std::fs::create_dir_all(failed_diff_file.parent().unwrap()).unwrap();
            std::fs::create_dir_all(failed_json_file.parent().unwrap()).unwrap();
            Self::save_fig(failed_file.as_path(), &des_drawn_fig);
            Self::save_diff(failed_diff_file.as_path(), &diff_fig);
            std::fs::write(failed_json_file.as_path(), json).unwrap();

            return Err(format!(
                concat!(
                    "{} serde round-trip assertion failed\n",
                    "  Actual figure: {}\n",
                    "     Ref figure: {}\n",
                    "           Diff: {}\n",
                    "    Failed JSON: {}",
                ),
                Self::id(),
                failed_file.display(),
                ref_file.display(),
                failed_diff_file.display(),
                failed_json_file.display(),
            ));
        }

        if std::fs::exists(&failed_file).unwrap() {
            std::fs::remove_file(&failed_file).unwrap();
        }
        if std::fs::exists(&failed_diff_file).unwrap() {
            std::fs::remove_file(&failed_diff_file).unwrap();
        }
        if std::fs::exists(&failed_json_file).unwrap() {
            std::fs::remove_file(&failed_json_file).unwrap();
        }
        Ok(())
    }
}

pub struct PxlHarness;

impl TestHarness for PxlHarness {
    type DrawnFig = tiny_skia::Pixmap;
    type DiffFig = tiny_skia::Pixmap;

    fn id() -> &'static str {
        "PXL"
    }

    fn fig_file_ext() -> &'static str {
        ".png"
    }

    fn diff_file_suffix() -> &'static str {
        "-diff.png"
    }

    fn draw_fig(fig: &des::Figure, style: &Style) -> Self::DrawnFig {
        let size = fig.size();
        let mut pxl = PxlSurface::new(size.width() as u32, size.height() as u32).unwrap();
        fig.draw(&(), None, &mut pxl, style).unwrap();
        pxl.into_pixmap()
    }

    fn diff_fig(actual_fig: &Self::DrawnFig, ref_fig: &Self::DrawnFig) -> Option<Self::DiffFig> {
        // highlight in green what is darker in actual, and in red what is darker in ref
        let opts = pixelmatch::Options {
            diff_color: tiny_skia::ColorU8::from_rgba(0, 200, 0, 255),
            diff_color_alt: Some(tiny_skia::ColorU8::from_rgba(200, 0, 0, 255)),
            ..Default::default()
        };
        let (diff_pxl, diff_count) =
            pixelmatch::pixelmatch(actual_fig.as_ref(), ref_fig.as_ref(), Some(opts));
        if diff_count > 0 {
            Some(diff_pxl.unwrap())
        } else {
            None
        }
    }

    fn regenerate_refs() -> bool {
        FORCE_REGENERATE_REFS
            || std::env::var("REGENERATE_REFS").is_ok()
            || std::env::var("REGENERATE_PNG_REFS").is_ok()
    }

    fn save_fig(file: &Path, fig: &Self::DrawnFig) {
        fig.save_png(file).unwrap();
    }

    fn load_fig(file: &Path) -> Self::DrawnFig {
        tiny_skia::Pixmap::load_png(file).unwrap()
    }

    fn save_diff(file: &Path, diff: &Self::DiffFig) {
        diff.save_png(file).unwrap();
    }
}

pub struct SvgHarness;

impl TestHarness for SvgHarness {
    type DrawnFig = String;
    type DiffFig = String;

    fn id() -> &'static str {
        "SVG"
    }

    fn fig_file_ext() -> &'static str {
        ".svg"
    }

    fn diff_file_suffix() -> &'static str {
        ".svg.diff"
    }

    fn draw_fig(fig: &des::Figure, style: &Style) -> Self::DrawnFig {
        let size = fig.size();
        let mut svg = SvgSurface::new(size.width() as u32, size.height() as u32);
        fig.draw(&(), None, &mut svg, style).unwrap();
        let mut buf = Vec::new();
        svg.write(&mut buf).unwrap();
        String::from_utf8(buf).unwrap()
    }

    fn diff_fig(actual_fig: &Self::DrawnFig, ref_fig: &Self::DrawnFig) -> Option<Self::DiffFig> {
        if actual_fig != ref_fig {
            let diff = similar::TextDiff::from_lines(ref_fig.as_str(), actual_fig.as_str());
            let udiff = diff.unified_diff();
            Some(udiff.to_string())
        } else {
            None
        }
    }

    fn regenerate_refs() -> bool {
        FORCE_REGENERATE_REFS
            || std::env::var("REGENERATE_REFS").is_ok()
            || std::env::var("REGENERATE_SVG_REFS").is_ok()
    }

    fn save_fig(file: &Path, fig: &Self::DrawnFig) {
        std::fs::write(file, fig).unwrap();
    }

    fn load_fig(file: &Path) -> Self::DrawnFig {
        let buf = std::fs::read(file).unwrap();
        String::from_utf8(buf).unwrap()
    }

    fn save_diff(file: &Path, diff: &Self::DiffFig) {
        std::fs::write(file, diff).unwrap();
    }
}
