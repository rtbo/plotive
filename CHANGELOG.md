# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# [0.5.0] - 2026-05-27

### Added

 - Color gradient in rendering surface
 - Id prefix and `<defs>` for SVG
 - new color types and colorspaces (Rgba8, Rgb8, etc.)
 - colormaps and colorbar, scatters with colors
 - scatter with sizes
 - xkcd colors
 - Area series
 - MPL style shorthands

### Changed

 - Drop support of polars

## [0.4.0] - 2026-03-26

### Changed

- Annotation accessors (#19)

### Fixed

- Handling nulls in line series (#22)
- Compilation warnings (#21)

## [0.3.0] - 2026-02-19

### Changed

- `des::axis::Range` is a tuple struct
- `plotive-pxl` and `plotive-svg` accept `?Sized` data source

### Fixed

- `time::DateTime::to_comps` not handling correctly negative timestamps

## [0.2.0] - 2026-01-15

### Added

- support for different interpolation for line series

### Changed

- traits `SavePng` and `SaveSvg` are implemented by `des::Figure` directly
- `des::Legend` has generic position parameter
- remove `plotive-iced` unused features
- updated some dependencies
- `style::Stroke` instead of `style::Line`

## [0.1.0] - 2026-01-07

### Initial release
