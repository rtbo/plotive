use crate::{geom, style};

pub const FONT_FAMILY: &str = "sans-serif";

pub const FIG_SIZE: geom::Size = geom::Size::new(800.0, 600.0);
pub const FIG_PADDING: geom::Padding = geom::Padding::Even(20.0);

pub const TITLE_FONT_SIZE: f32 = 20.0;
pub const AXIS_TITLE_FONT_SIZE: f32 = 16.0;
pub const TICKS_LABEL_FONT_SIZE: f32 = 12.0;

pub const SERIES_STROKE_WIDTH: f32 = 1.5;
pub const MARKER_SIZE: f32 = 8.5 * 8.5;

pub const LEGEND_LABEL_FONT_SIZE: f32 = 13.0;
pub const LEGEND_SHAPE_SPACING: f32 = 10.0;
pub const LEGEND_SHAPE_SIZE: geom::Size = geom::Size::new(25.0, 14.0);
pub const LEGEND_PADDING: f32 = 8.0;
pub const LEGEND_H_SPACING: f32 = 16.0;
pub const LEGEND_V_SPACING: f32 = 10.0;
pub const LEGEND_MARGIN: f32 = 12.0;
pub const fn legend_fill() -> Option<style::theme::Fill> {
    Some(style::theme::Fill::Solid {
        color: style::theme::Color::Theme(style::theme::Col::LegendFill),
        opacity: Some(0.5),
    })
}

pub const COLORBAR_WIDTH: f32 = 20.0;
pub const COLORBAR_TITLE_FONT_SIZE: f32 = 16.0;
pub const COLORBAR_TICKS_FONT_SIZE: f32 = 12.0;
pub const COLORBAR_MARGIN: f32 = LEGEND_MARGIN;

pub const PLOT_XY_AUTO_INSETS: geom::Padding = geom::Padding::Even(20.0);
pub const PLOT_VER_BARS_AUTO_INSETS: geom::Padding = geom::Padding::Custom {
    top: 20.0,
    right: 20.0,
    bottom: 0.0,
    left: 20.0,
};
pub const PLOT_HOR_BARS_AUTO_INSETS: geom::Padding = geom::Padding::Custom {
    top: 20.0,
    right: 20.0,
    bottom: 20.0,
    left: 0.0,
};
pub const PLOT_AXIS_ARROW_SIZE: f32 = 10.0;
pub const PLOT_AXIS_ARROW_OVERFLOW: f32 = 10.0;
