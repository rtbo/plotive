use std::collections::HashMap;
use std::hash::{DefaultHasher, Hash, Hasher};
use std::sync::Arc;

use plotive_base::Rgba8;
use plotive_base::color::{Lerp, LinRgb, OkLab, SRgb, Xyz};

use crate::des::cmap::{LerpColorMap, LerpMethod};
use crate::des::{self};
use crate::drawing::scale::CoordMap;
use crate::drawing::{Categories, axis};
use crate::{Rgb8, data, style};

pub trait ColorMapBuild: std::fmt::Debug {
    /// Get a unique hash for the color map that is built by this builder.
    fn hash(&self, bounds: axis::BoundsRef<'_>) -> u64;

    /// Build a color map that will be used to map data samples to colors.
    fn build(&self, bounds: axis::BoundsRef<'_>) -> Result<Arc<dyn ColorMap>, super::Error>;

    /// Build a color map that will be used to map normalized values from [0, 1] to colors.
    /// This is used by the color bar to create the color bar gradient.
    fn build_num(
        &self,
        _bounds: axis::BoundsRef<'_>,
    ) -> Option<(Option<des::axis::Scale>, Arc<dyn NumColorMap>)>;

    /// Build a color map that will be used to map category values to colors.
    /// This is used by the color bar to create the color bar category map
    fn build_cat(&self, _bounds: axis::BoundsRef<'_>) -> Option<Arc<dyn CatColorMap>>;
}

/// A color map to map data samples to colors
pub trait ColorMap: std::fmt::Debug {
    fn hash(&self) -> u64;
    /// Map a data sample to a color
    fn map_data_to_color(&self, val: data::SampleRef<'_>) -> Option<style::series::Color>;
}

/// A color map to map normalized values from [0, 1] to colors
pub trait NumColorMap: std::fmt::Debug {
    /// Map a normalized value in [0, 1] to a color
    fn map_num_to_color(&self, val: f32) -> Rgb8;
}

/// A color map to map category values to colors
pub trait CatColorMap: std::fmt::Debug {
    /// Map a category value to a color
    fn map_cat_to_color(&self, val: &str) -> Option<style::series::Color>;
}

impl ColorMapBuild for des::cmap::ColorMap {
    fn hash(&self, bounds: axis::BoundsRef<'_>) -> u64 {
        match self {
            des::cmap::ColorMap::Auto => match bounds {
                axis::BoundsRef::Num(..) => auto_num_hash(),
                axis::BoundsRef::Cat(..) => auto_cat_hash(),
                #[allow(unreachable_patterns)]
                _ => unreachable!("unsupported data type for auto color map"),
            },
            des::cmap::ColorMap::Lerp(lerp) => hash_lerp_cmap(lerp),
            des::cmap::ColorMap::Cat(cat) => hash_cat_cmap(cat),
            des::cmap::ColorMap::Literal(..) => literal_hash(),
        }
    }

    fn build_num(
        &self,
        bounds: axis::BoundsRef<'_>,
    ) -> Option<(Option<des::axis::Scale>, Arc<dyn NumColorMap>)> {
        match (self, bounds) {
            (des::cmap::ColorMap::Auto, axis::BoundsRef::Num(_)) => {
                let cmap = make_lerp_num_color_map(&des::cmap::LerpColorMap::default());
                Some((Some(des::axis::Scale::Auto), cmap))
            }
            (des::cmap::ColorMap::Lerp(lerp), axis::BoundsRef::Num(_)) => {
                let cmap = make_lerp_num_color_map(lerp);
                Some((Some(lerp.scale().clone()), cmap))
            }
            _ => None,
        }
    }

    fn build_cat(&self, bounds: axis::BoundsRef<'_>) -> Option<Arc<dyn CatColorMap>> {
        match (self, bounds) {
            (des::cmap::ColorMap::Auto, axis::BoundsRef::Cat(categories)) => {
                let map = categories_to_color_map(categories);
                Some(Arc::new(CatColorMapImpl {
                    hash: self.hash(bounds),
                    map,
                }))
            }
            (des::cmap::ColorMap::Cat(cat), axis::BoundsRef::Cat(categories)) => {
                let map = match cat {
                    des::cmap::CatColorMap::Auto => categories_to_color_map(categories),
                    des::cmap::CatColorMap::Strings(map) => map
                        .iter()
                        .map(|(cat_val, color)| (cat_val.clone(), *color))
                        .collect(),
                    des::cmap::CatColorMap::Integers(..) => {
                        todo!("Integer category color map is not implemented yet")
                    }
                };
                Some(Arc::new(CatColorMapImpl {
                    hash: self.hash(bounds),
                    map,
                }))
            }
            _ => None,
        }
    }

    fn build(&self, bounds: axis::BoundsRef<'_>) -> Result<Arc<dyn ColorMap>, super::Error> {
        match (self, bounds) {
            (des::cmap::ColorMap::Auto, axis::BoundsRef::Num(num_bounds)) => {
                let hash = auto_num_hash();
                let lerp = des::cmap::LerpColorMap::default();
                Ok(make_lerp_cmap(&lerp, num_bounds, hash))
            }
            (des::cmap::ColorMap::Lerp(lerp), axis::BoundsRef::Num(num_bounds)) => {
                let hash = hash_lerp_cmap(lerp);
                Ok(make_lerp_cmap(lerp, num_bounds, hash))
            }
            (des::cmap::ColorMap::Auto, axis::BoundsRef::Cat(categories)) => {
                let hash = auto_cat_hash();
                let map = categories_to_color_map(categories);
                Ok(Arc::new(CatColorMapImpl { hash, map }))
            }
            (des::cmap::ColorMap::Cat(cat), axis::BoundsRef::Cat(categories)) => {
                let map = match cat {
                    des::cmap::CatColorMap::Auto => categories_to_color_map(categories),
                    des::cmap::CatColorMap::Strings(map) => map
                        .iter()
                        .map(|(cat_val, color)| (cat_val.clone(), *color))
                        .collect(),
                    des::cmap::CatColorMap::Integers(..) => {
                        todo!("Integer category color map is not implemented yet")
                    }
                };
                Ok(Arc::new(CatColorMapImpl {
                    hash: self.hash(bounds),
                    map,
                }))
            }
            (des::cmap::ColorMap::Literal(..), axis::BoundsRef::Num(num_bounds)) => {
                if num_bounds.start() < 0.0 || num_bounds.end() > u32::MAX as f64 {
                    return Err(super::Error::InconsistentData(format!(
                        "literal color data outside of the u32 range"
                    )));
                }
                Ok(Arc::new(LiteralColorMapImpl {
                    hash: literal_hash(),
                }))
            }
            (des::cmap::ColorMap::Literal(..), axis::BoundsRef::Cat(categories)) => {
                // we parse everything upfront, so we can check the bounds here and cache the parsed colors in a cat color map
                let map = {
                    let mut map = HashMap::new();
                    for cat in categories.iter() {
                        if let Ok(col) = cat.parse::<Rgba8>() {
                            map.insert(cat.to_string(), style::series::Color::Fixed(col));
                        } else {
                            return Err(super::Error::InconsistentData(format!(
                                "literal color data is not a valid color: {}",
                                cat
                            )));
                        }
                    }
                    map
                };
                Ok(Arc::new(CatColorMapImpl {
                    hash: literal_hash(),
                    map,
                }))
            }
            _ => Err(super::Error::InconsistentData(format!(
                "Color map type {:?} is not compatible with bounds type {:?}",
                self, bounds
            ))),
        }
    }
}

fn auto_num_hash() -> u64 {
    let mut hasher = DefaultHasher::new();
    "auto-num".hash(&mut hasher);
    hasher.finish()
}

fn auto_cat_hash() -> u64 {
    let mut hasher = DefaultHasher::new();
    "auto-cat".hash(&mut hasher);
    hasher.finish()
}

fn literal_hash() -> u64 {
    let mut hasher = DefaultHasher::new();
    "literal".hash(&mut hasher);
    hasher.finish()
}

fn hash_range(rng: &des::axis::Range, hasher: &mut DefaultHasher) {
    match rng {
        des::axis::Range(Some(val1), Some(val2)) => {
            val1.to_bits().hash(hasher);
            val2.to_bits().hash(hasher);
        }
        des::axis::Range(Some(val1), None) => {
            val1.to_bits().hash(hasher);
            "none".hash(hasher);
        }
        des::axis::Range(None, Some(val2)) => {
            "none".hash(hasher);
            val2.to_bits().hash(hasher);
        }
        des::axis::Range(None, None) => {
            "none".hash(hasher);
            "none".hash(hasher);
        }
    }
}

fn hash_lerp_cmap(lerp: &LerpColorMap) -> u64 {
    let mut hasher = DefaultHasher::new();
    lerp.method().hash(&mut hasher);
    lerp.start().hash(&mut hasher);
    lerp.end().hash(&mut hasher);
    for stop in lerp.stops() {
        // reinterpret the f32 position as u32 for hashing
        // it is checked that the position can't be invalid or -0.0
        let pos_bits = stop.0.to_bits();
        pos_bits.hash(&mut hasher);
        stop.1.hash(&mut hasher);
    }
    match lerp.scale() {
        des::axis::Scale::Auto => "auto".hash(&mut hasher),
        des::axis::Scale::Linear(rng) => {
            "lin".hash(&mut hasher);
            hash_range(rng, &mut hasher);
        }
        des::axis::Scale::Log(log_scale) => {
            "log".hash(&mut hasher);
            log_scale.base.to_bits().hash(&mut hasher);
            hash_range(&log_scale.range, &mut hasher);
        }
        _ => unreachable!(),
    }
    hasher.finish()
}

fn make_lerp_cmap(
    lerp: &LerpColorMap,
    num_bounds: axis::NumBounds,
    hash: u64,
) -> Arc<dyn ColorMap> {
    let normalizer = super::scale::map_scale_coord_num(lerp.scale(), 1.0, &num_bounds, (0.0, 0.0));
    let valid_bounds = normalizer.axis_bounds().to_bounds();

    let cmap = make_lerp_num_color_map(lerp);
    Arc::new(LerpColorMapImpl {
        hash,
        valid_bounds,
        normalizer,
        cmap,
    })
}

#[derive(Debug, Clone)]
struct LerpColorMapImpl {
    hash: u64,
    valid_bounds: axis::Bounds,
    normalizer: Arc<dyn CoordMap>,
    cmap: Arc<dyn NumColorMap>,
}

impl ColorMap for LerpColorMapImpl {
    fn hash(&self) -> u64 {
        self.hash
    }

    fn map_data_to_color(&self, val: data::SampleRef<'_>) -> Option<style::series::Color> {
        if self.valid_bounds.contains(val) {
            let norm = self.normalizer.map_coord(val).unwrap().clamp(0.0, 1.0);
            let rgb = self.cmap.map_num_to_color(norm);
            Some(style::series::Color::Fixed(rgb.opaque()))
        } else {
            None
        }
    }
}

fn make_lerp_num_color_map(lerp: &LerpColorMap) -> Arc<dyn NumColorMap> {
    let start = lerp.start();
    let end = lerp.end();
    let stops = lerp.stops().iter().copied();

    let cmap: Arc<dyn NumColorMap> = match lerp.method() {
        LerpMethod::Nearest => Arc::new(NearestColorMap::new(start, end, stops)),
        LerpMethod::SRgb => Arc::new(SRgbColorMap::new(start, end, stops)),
        LerpMethod::LinearRgb => Arc::new(LinearColorMap::new(start, end, stops)),
        LerpMethod::Perceptual => Arc::new(PerceptualColorMap::new(start, end, stops)),
        LerpMethod::Xyz => Arc::new(XyzColorMap::new(start, end, stops)),
    };
    cmap
}

#[derive(Debug, Clone)]
pub struct NearestColorMap {
    start: Rgb8,
    end: Rgb8,
    stops: Vec<(f32, Rgb8)>,
}

impl NearestColorMap {
    pub fn new<S>(start: Rgb8, end: Rgb8, stops: S) -> Self
    where
        S: IntoIterator<Item = (f32, Rgb8)>,
    {
        Self {
            start,
            end,
            stops: stops.into_iter().collect(),
        }
    }
}

impl NumColorMap for NearestColorMap {
    fn map_num_to_color(&self, val: f32) -> Rgb8 {
        if val <= 0.0 {
            self.start
        } else if val >= 1.0 {
            self.end
        } else {
            let mut nearest = self.start;
            let mut nearest_pos = 0.0;
            for stop in &self.stops {
                if (stop.0 - val).abs() < (nearest_pos - val).abs() {
                    nearest = stop.1;
                    nearest_pos = stop.0;
                }
                if stop.0 > val {
                    break;
                }
            }
            nearest
        }
    }
}

/// A color map that interpolates between two colors and optional stops in the linear RGB color space
pub type SRgbColorMap = GenColorMap<SRgb>;

/// A color map that interpolates between two colors and optional stops in the linear RGB color space
pub type LinearColorMap = GenColorMap<LinRgb>;

/// A color map that interpolates between two colors and optional stops in a perceptual color space
pub type PerceptualColorMap = GenColorMap<OkLab>;

/// A color map that interpolates between two colors and optional stops in a XYZ color space
pub type XyzColorMap = GenColorMap<Xyz>;

/// A generic color map that interpolates between two colors and optional stops in the color space defined by the color type `C`.
#[derive(Debug, Clone)]
pub struct GenColorMap<C> {
    start: C,
    end: C,
    stops: Vec<(f32, C)>,
}

impl<C: From<Rgb8>> GenColorMap<C> {
    /// Creates a new `CColorMap` with the specified start and end colors, and optional stops.
    pub fn new<S>(start: Rgb8, end: Rgb8, stops: S) -> Self
    where
        S: IntoIterator<Item = (f32, Rgb8)>,
    {
        Self {
            start: start.into(),
            end: end.into(),
            stops: stops
                .into_iter()
                .map(|(pos, color)| (pos, color.into()))
                .collect(),
        }
    }
}

impl<C: Lerp + Copy + Into<Rgb8> + std::fmt::Debug> NumColorMap for GenColorMap<C> {
    fn map_num_to_color(&self, val: f32) -> Rgb8 {
        let mut start = (0.0, self.start);
        let mut end = (1.0, self.end);

        for stop in &self.stops {
            if stop.0 <= val {
                start = *stop;
            } else {
                end = *stop;
                break;
            }
        }
        let t = if end.0 != start.0 {
            (val - start.0) / (end.0 - start.0)
        } else {
            0.0
        };
        start.1.lerp(end.1, t).into()
    }
}

fn hash_cat_cmap(cat: &des::cmap::CatColorMap) -> u64 {
    match cat {
        des::cmap::CatColorMap::Auto => auto_cat_hash(),
        des::cmap::CatColorMap::Strings(map) => {
            let mut hasher = DefaultHasher::new();
            for (cat_val, color) in map.iter() {
                cat_val.hash(&mut hasher);
                color.hash(&mut hasher);
            }
            hasher.finish()
        }
        des::cmap::CatColorMap::Integers(map) => {
            let mut hasher = DefaultHasher::new();
            for (cat_val, color) in map.iter() {
                cat_val.hash(&mut hasher);
                color.hash(&mut hasher);
            }
            hasher.finish()
        }
    }
}

fn categories_to_color_map(categories: &Categories) -> HashMap<String, style::series::Color> {
    let mut map = HashMap::new();
    for (idx, cat) in categories.iter().enumerate() {
        let color = style::series::IndexColor(idx).into();
        map.insert(cat.to_string(), color);
    }
    map
}

#[derive(Debug, Clone)]
struct CatColorMapImpl {
    hash: u64,
    map: HashMap<String, style::series::Color>,
}

impl CatColorMap for CatColorMapImpl {
    fn map_cat_to_color(&self, val: &str) -> Option<style::series::Color> {
        self.map.get(val).copied()
    }
}

impl ColorMap for CatColorMapImpl {
    fn hash(&self) -> u64 {
        self.hash
    }

    fn map_data_to_color(&self, val: data::SampleRef<'_>) -> Option<style::series::Color> {
        match val {
            data::SampleRef::Cat(cat) => self.map_cat_to_color(cat),
            _ => None,
        }
    }
}

#[derive(Debug, Clone)]
struct LiteralColorMapImpl {
    hash: u64,
}

impl ColorMap for LiteralColorMapImpl {
    fn hash(&self) -> u64 {
        self.hash
    }

    fn map_data_to_color(&self, val: data::SampleRef<'_>) -> Option<style::series::Color> {
        match val {
            data::SampleRef::Num(num) => {
                if num < 0.0 || num > u32::MAX as f64 {
                    return None;
                }
                let int = num as i64 as u32;
                let col = Rgba8::from_u32(int);
                Some(style::series::Color::Fixed(col))
            }
            data::SampleRef::Cat(cat) => {
                let col: Rgba8 = cat.parse().ok()?;
                Some(style::series::Color::Fixed(col))
            }
            _ => None,
        }
    }
}
