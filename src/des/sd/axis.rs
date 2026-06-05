use std::borrow::Cow;
use std::marker::PhantomData;

use serde::ser::{SerializeSeq, SerializeStruct};
use serde_value::Value;

use crate::des::sd::{deserialize_map_fields, deserialize_tagged_map_fields};
use crate::des::{axis, sd};
use crate::style::theme;

// MARK: axis::Title

impl serde::Serialize for axis::Title {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        if self.spans().is_empty() && self.props() == &axis::TitleProps::default() {
            self.text().serialize(serializer)
        } else {
            let mut state = serializer.serialize_struct("Title", 2)?;
            state.serialize_field("text", self.text())?;
            todo!("Serialize rich props and spans")
            //state.end()
        }
    }
}

impl<'de> serde::Deserialize<'de> for axis::Title {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct TitleVisitor;

        impl<'de> serde::de::Visitor<'de> for TitleVisitor {
            type Value = axis::Title;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("an axis title string or rich text")
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(axis::Title::from(value.to_string()))
            }

            fn visit_map<A>(self, _map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                todo!("Deserialize rich title with props and spans")
            }
        }
        deserializer.deserialize_any(TitleVisitor)
    }
}

// MARK: axis::Ref

impl serde::Serialize for axis::Ref {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            axis::Ref::Id(id) => serializer.serialize_str(id),
            axis::Ref::Idx(idx) => serializer.serialize_u32(*idx as _),
        }
    }
}

impl<'de> serde::Deserialize<'de> for axis::Ref {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(AxisRefVisitor)
    }
}

struct AxisRefVisitor;

impl<'de> serde::de::Visitor<'de> for AxisRefVisitor {
    type Value = axis::Ref;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("an axis id string or a non-negative axis index")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(axis::Ref::Id(value.to_string()))
    }

    fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(axis::Ref::Idx(value as usize))
    }

    fn visit_i64<E>(self, value: i64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        if value < 0 {
            Err(E::custom("axis index cannot be negative"))
        } else {
            Ok(axis::Ref::Idx(value as usize))
        }
    }
}

// MARK: axis::Range

impl serde::Serialize for axis::Range {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        (self.0, self.1).serialize(serializer)
    }
}

impl<'de> serde::Deserialize<'de> for axis::Range {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let (min, max) = <(Option<f64>, Option<f64>)>::deserialize(deserializer)?;
        Ok(axis::Range(min, max))
    }
}

// MARK: axis::Scale

impl serde::Serialize for axis::Scale {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            axis::Scale::Auto => "auto".serialize(serializer),
            axis::Scale::Linear(range) => {
                if range == &axis::Range::default() {
                    "linear".serialize(serializer)
                } else {
                    range.serialize(serializer)
                }
            }
            axis::Scale::Log(log_scale) => {
                sd::serialize_tagged_map_variant!(
                    serializer, "log",
                    (log_scale, axis::LogScale),
                    "base" => base,
                    "range" => range,
                )
            }
            axis::Scale::Shared(id) => id.serialize(serializer),
        }
    }
}

impl<'de> serde::Deserialize<'de> for axis::Scale {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(ScaleVisitor)
    }
}

struct ScaleVisitor;

impl<'de> serde::de::Visitor<'de> for ScaleVisitor {
    type Value = axis::Scale;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a scale type string, a shared scale id string, or a scale object")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        match value {
            "auto" => Ok(axis::Scale::Auto),
            "linear" => Ok(axis::Scale::Linear(axis::Range::default())),
            "log" => Ok(axis::Scale::Log(axis::LogScale::default())),
            other => Ok(axis::Scale::Shared(other.to_string().into())),
        }
    }

    fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(axis::Scale::Shared(axis::Ref::Idx(value as usize)))
    }

    fn visit_i64<E>(self, value: i64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        if value < 0 {
            Err(E::custom("axis index cannot be negative"))
        } else {
            Ok(axis::Scale::Shared(axis::Ref::Idx(value as usize)))
        }
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        // deserialize linear scale from [min, max] array
        // both min and max can be null to indicate automatic bounds
        let Some(min) = seq.next_element()? else {
            return Err(serde::de::Error::invalid_length(0, &self));
        };
        let Some(max) = seq.next_element()? else {
            return Err(serde::de::Error::invalid_length(1, &self));
        };
        let range = axis::Range(min, max);
        Ok(axis::Scale::Linear(range))
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        let mut buffered = Vec::<(String, Value)>::new();

        while let Some(key) = map.next_key::<String>()? {
            if key == "type" {
                let tag = map.next_value::<String>()?;
                return match tag.as_str() {
                    // If type is first, `buffered` is empty and we deserialize directly from map.
                    // If not, only the fields before `type` are buffered.
                    "linear" | "lin" => {
                        deserialize_lin_scale(&mut map, buffered).map(axis::Scale::Linear)
                    }
                    "logarithmic" | "log" => {
                        deserialize_log_scale(&mut map, buffered).map(axis::Scale::Log)
                    }
                    _ => Err(serde::de::Error::unknown_variant(&tag, &["lin", "log"])),
                };
            }

            let value = map.next_value::<Value>()?;
            buffered.push((key, value));
        }

        Err(serde::de::Error::missing_field("type"))
    }
}

fn deserialize_lin_scale<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<axis::Range, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields!(
        'de, map, buffered,
        "range" => range: Option<axis::Range>,
    );
    if let Some(range) = range {
        Ok(range)
    } else {
        Ok(axis::Range::default())
    }
}

fn deserialize_log_scale<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<axis::LogScale, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields!(
        'de, map, buffered,
        "base" => base: Option<f64>,
        "range" => range: Option<axis::Range>,
    );
    let mut log_scale = axis::LogScale::default();
    if let Some(base) = base {
        log_scale.base = base;
    }
    if let Some(range) = range {
        log_scale.range = range;
    }
    Ok(log_scale)
}

// MARK: ticks::Locator

impl serde::Serialize for axis::ticks::Locator {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            axis::ticks::Locator::Auto => "auto".serialize(serializer),
            axis::ticks::Locator::List(locator) => locator.0.serialize(serializer),
            axis::ticks::Locator::MaxN(locator) => {
                sd::serialize_tagged_map_variant!(
                    serializer, "maxn",
                    (locator, axis::ticks::MaxNLocator),
                    "bins" => bins,
                    "steps" => steps,
                )
            }
            axis::ticks::Locator::PiMultiple(locator) => {
                sd::serialize_tagged_map_variant!(
                    serializer, "pimultiple",
                    (locator, axis::ticks::PiMultipleLocator),
                    "bins" => bins,
                )
            }
            axis::ticks::Locator::Log(locator) => {
                sd::serialize_tagged_map_variant!(
                    serializer, "log",
                    (locator, axis::ticks::LogLocator),
                    "base" => base,
                )
            }
            #[allow(unreachable_patterns)]
            _ => todo!("Serialize other locator types"),
        }
    }
}

impl<'de> serde::Deserialize<'de> for axis::ticks::Locator {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(LocatorVisitor)
    }
}

struct LocatorVisitor;

impl<'de> serde::de::Visitor<'de> for LocatorVisitor {
    type Value = axis::ticks::Locator;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a ticks locator type string or a locator object")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        match value {
            "auto" => Ok(axis::ticks::Locator::Auto),
            other => Err(E::unknown_variant(other, &["auto"])),
        }
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        let mut buffered = Vec::<(String, Value)>::new();

        while let Some(key) = map.next_key::<String>()? {
            if key == "type" {
                let tag = map.next_value::<String>()?;
                return match tag.as_str() {
                    "maxn" => {
                        deserialize_maxn_locator(&mut map, buffered).map(axis::ticks::Locator::MaxN)
                    }
                    "pimultiple" => deserialize_pimultiple_locator(&mut map, buffered)
                        .map(axis::ticks::Locator::PiMultiple),
                    "log" => {
                        deserialize_log_locator(&mut map, buffered).map(axis::ticks::Locator::Log)
                    }
                    _ => Err(serde::de::Error::unknown_variant(
                        &tag,
                        &["maxn", "pimultiple", "log"],
                    )),
                };
            }

            let value = map.next_value::<Value>()?;
            buffered.push((key, value));
        }

        Err(serde::de::Error::missing_field("type"))
    }
}

fn deserialize_maxn_locator<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<axis::ticks::MaxNLocator, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields!(
        'de, map, buffered,
        "bins" => bins: Option<u32>,
        "steps" => steps: Option<Vec<f64>>,
    );
    let mut locator = axis::ticks::MaxNLocator::default();
    if let Some(bins) = bins {
        locator.bins = bins;
    }
    if let Some(steps) = steps {
        locator.steps = steps;
    }
    Ok(locator)
}

fn deserialize_pimultiple_locator<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<axis::ticks::PiMultipleLocator, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields!(
        'de, map, buffered,
        "bins" => bins: Option<u32>,
    );
    let mut locator = axis::ticks::PiMultipleLocator::default();
    if let Some(bins) = bins {
        locator.bins = bins;
    }
    Ok(locator)
}

fn deserialize_log_locator<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<axis::ticks::LogLocator, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields!(
        'de, map, buffered,
        "base" => base: Option<f64>,
    );
    let mut locator = axis::ticks::LogLocator::default();
    if let Some(base) = base {
        locator.base = base;
    }
    Ok(locator)
}

// MARK: ticks::Formatter

impl serde::Serialize for axis::ticks::Formatter {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            axis::ticks::Formatter::Auto => "auto".serialize(serializer),
            axis::ticks::Formatter::SharedAuto => "shared-auto".serialize(serializer),
            axis::ticks::Formatter::Prec(prec) => {
                let mut map = serializer.serialize_struct("PrecFormatter", 2)?;
                map.serialize_field("type", "prec")?;
                map.serialize_field("digits", prec)?;
                map.end()
            }
            axis::ticks::Formatter::Percent(formatter) => {
                if let Some(decimals) = formatter.decimal_places {
                    let mut map = serializer.serialize_struct("PercentFormatter", 2)?;
                    map.serialize_field("type", "percent")?;
                    map.serialize_field("decimals", &decimals)?;
                    map.end()
                } else {
                    "percent".serialize(serializer)
                }
            }
            #[allow(unreachable_patterns)]
            _ => todo!("Serialize other formatter types"),
        }
    }
}

impl<'de> serde::Deserialize<'de> for axis::ticks::Formatter {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(FormatterVisitor)
    }
}

struct FormatterVisitor;

impl<'de> serde::de::Visitor<'de> for FormatterVisitor {
    type Value = axis::ticks::Formatter;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a ticks formatter type string or a formatter object")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        match value {
            "auto" => Ok(axis::ticks::Formatter::Auto),
            "shared-auto" => Ok(axis::ticks::Formatter::SharedAuto),
            other => Err(E::unknown_variant(other, &["auto", "shared-auto"])),
        }
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        let mut buffered = Vec::<(String, Value)>::new();

        while let Some(key) = map.next_key::<String>()? {
            if key == "type" {
                let tag = map.next_value::<String>()?;
                return match tag.as_str() {
                    "prec" => deserialize_prec_formatter(&mut map, buffered)
                        .map(axis::ticks::Formatter::Prec),
                    "percent" => deserialize_percent_formatter(&mut map, buffered)
                        .map(axis::ticks::Formatter::Percent),
                    _ => Err(serde::de::Error::unknown_variant(
                        &tag,
                        &["prec", "percent"],
                    )),
                };
            }

            let value = map.next_value::<Value>()?;
            buffered.push((key, value));
        }

        Err(serde::de::Error::missing_field("type"))
    }
}

fn deserialize_prec_formatter<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<usize, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields!(
        'de, map, buffered,
        "digits" => digits: Option<usize>,
    );
    let Some(prec) = digits else {
        return Err(serde::de::Error::missing_field("digits"));
    };
    Ok(prec)
}

fn deserialize_percent_formatter<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<axis::ticks::PercentFormatter, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields!(
        'de, map, buffered,
        "decimals" => decimals: Option<usize>,
    );
    Ok(axis::ticks::PercentFormatter {
        decimal_places: decimals,
    })
}

// MARK: axis::Ticks

impl serde::Serialize for axis::Ticks {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let default = axis::Ticks::default();
        if self == &default {
            return "auto".serialize(serializer);
        }

        let has_default_locator = self.locator() == default.locator();
        let has_default_formatter = self.formatter() == default.formatter();
        let has_default_color = self.color() == default.color();

        match (
            has_default_locator,
            has_default_formatter,
            has_default_color,
        ) {
            (true, true, true) => "auto".serialize(serializer),
            (false, true, true) => self.locator().serialize(serializer),
            (true, false, true) => self.formatter().serialize(serializer),
            (true, true, false) => self.color().serialize(serializer),
            _ => {
                let len = 3
                    - has_default_locator as usize
                    - has_default_formatter as usize
                    - has_default_color as usize;
                let mut state = serializer.serialize_struct("Ticks", len)?;
                if !has_default_locator {
                    state.serialize_field("locator", self.locator())?;
                }
                if !has_default_formatter {
                    state.serialize_field("formatter", &self.formatter())?;
                }
                if !has_default_color {
                    state.serialize_field("color", &self.color())?;
                }
                state.end()
            }
        }
    }
}

impl<'de> serde::Deserialize<'de> for axis::Ticks {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(TicksVisitor)
    }
}

struct TicksVisitor;

impl<'de> serde::de::Visitor<'de> for TicksVisitor {
    type Value = axis::Ticks;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a ticks object or a ticks locator/formatter/color")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        match value {
            "auto" | "linear" => Ok(axis::Ticks::default()),
            "maxn" => {
                Ok(axis::Ticks::default().with_locator(axis::ticks::MaxNLocator::default().into()))
            }
            "pimultiple" => Ok(axis::Ticks::default()
                .with_locator(axis::ticks::PiMultipleLocator::default().into())),
            "log" => {
                Ok(axis::Ticks::default().with_locator(axis::ticks::LogLocator::default().into()))
            }
            "percent" => Ok(axis::Ticks::default()
                .with_formatter(Some(axis::ticks::PercentFormatter::default().into()))),
            _ => {
                let color = value.parse::<theme::Color>().map_err(|_| {
                    E::unknown_variant(
                        value,
                        &["auto", "linear", "maxn", "pimultiple", "log", "percent", "[color string]"],
                    )
                })?;
                Ok(axis::Ticks::default().with_color(color))
            }
        }
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let mut locs = Vec::<f64>::with_capacity(seq.size_hint().unwrap_or(0));
        while let Some(loc) = seq.next_element()? {
            locs.push(loc);
        }
        Ok(axis::Ticks::default().with_locator(locs.into()))
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where     A: serde::de::MapAccess<'de>,
    {
        let mut ticks = axis::Ticks::default();

        while let Some(key) = map.next_key::<Cow<'de, str>>()? {
            match &*key {
                "locator" => {
                    let locator = map.next_value()?;
                    ticks = ticks.with_locator(locator);
                }
                "formatter" => {
                    let formatter = map.next_value()?;
                    ticks = ticks.with_formatter(formatter);
                }
                "color" => {
                    let color = map.next_value()?;
                    ticks = ticks.with_color(color);
                }
                _ => return Err(serde::de::Error::unknown_field(&key, &["locator", "formatter", "color"])),
            }
        }

        Ok(ticks)
    }

}

// MARK: Grids

impl serde::Serialize for axis::Grid {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let default_stroke = Some(axis::Grid::default().0);
        sd::style::serialize_stroke(&self.0, default_stroke, "Grid", serializer)
    }
}

impl<'de> serde::Deserialize<'de> for axis::Grid {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let default_stroke = Some(axis::Grid::default().0);
        let visitor = sd::style::StrokeVisitor::new("Grid", default_stroke);
        let stroke = deserializer.deserialize_any(visitor)?;
        Ok(axis::Grid(stroke))
    }
}

impl serde::Serialize for axis::MinorGrid {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let default_stroke = Some(axis::MinorGrid::default().0);
        sd::style::serialize_stroke(&self.0, default_stroke, "MinorGrid", serializer)
    }
}

impl<'de> serde::Deserialize<'de> for axis::MinorGrid {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let default_stroke = Some(axis::MinorGrid::default().0);
        let visitor = sd::style::StrokeVisitor::new("MinorGrid", default_stroke);
        let stroke = deserializer.deserialize_any(visitor)?;
        Ok(axis::MinorGrid(stroke))
    }
}

// MARK: Axis

#[derive(Debug, Clone, Copy)]
pub enum Dir {
    X,
    Y,
    Unknown,
}

pub struct SerAxis<'a> {
    pub axis: &'a axis::Axis,
    pub dir: Dir,
}

impl SerAxis<'_> {
    fn side_str(&self) -> &'static str {
        use axis::Side;
        match (self.axis.side(), &self.dir) {
            (Side::Main, Dir::Y) => "left",
            (Side::Main, Dir::X) => "bottom",
            (Side::Main, Dir::Unknown) => "main",
            (Side::Opposite, Dir::Y) => "right",
            (Side::Opposite, Dir::X) => "top",
            (Side::Opposite, Dir::Unknown) => "opposite",
        }
    }
}

pub struct SerAxes<'a> {
    pub axes: &'a [axis::Axis],
    pub dir: Dir,
}

impl<'a> serde::Serialize for SerAxes<'a> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_seq(Some(self.axes.len()))?;

        for axis in self.axes {
            let axis = SerAxis {
                axis,
                dir: self.dir,
            };
            state.serialize_element(&axis)?;
        }

        state.end()
    }
}

impl<'a> serde::Serialize for SerAxis<'a> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("Axis", 3)?;

        if let Some(id) = self.axis.id() {
            state.serialize_field("id", id)?;
        }

        if let Some(title) = self.axis.title() {
            state.serialize_field("title", title)?;
        }

        if self.axis.side() != axis::Side::default() {
            let side_str = self.side_str();
            state.serialize_field("side", side_str)?;
        }

        if let Some(ticks) = self.axis.ticks() {
            state.serialize_field("ticks", ticks)?;
        }

        state.end()
    }
}

impl serde::Serialize for axis::Axis {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let axis = SerAxis {
            axis: self,
            dir: Dir::Unknown,
        };
        axis.serialize(serializer)
    }
}

trait DeDir {
    fn dir() -> Dir;
}

pub struct DeX;
pub struct DeY;
struct DeUnknown;

impl DeDir for DeX {
    fn dir() -> Dir {
        Dir::X
    }
}

impl DeDir for DeY {
    fn dir() -> Dir {
        Dir::Y
    }
}

impl DeDir for DeUnknown {
    fn dir() -> Dir {
        Dir::Unknown
    }
}

pub type DeXAxis = DeAxis<DeX>;
pub type DeYAxis = DeAxis<DeY>;

pub struct DeAxis<Dr> {
    pub axis: axis::Axis,
    phantom: PhantomData<Dr>,
}

impl<'de, Dr> serde::Deserialize<'de> for DeAxis<Dr>
where
    Dr: DeDir,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(AxisVisitor {
            phantom: PhantomData,
        })
    }
}

impl<'de> serde::Deserialize<'de> for axis::Axis {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let axis = deserializer.deserialize_map(AxisVisitor {
            phantom: PhantomData::<DeUnknown>,
        })?;
        Ok(axis.axis)
    }
}

struct AxisVisitor<Dr> {
    phantom: PhantomData<Dr>,
}

impl<'de, Dr> serde::de::Visitor<'de> for AxisVisitor<Dr>
where
    Dr: DeDir,
{
    type Value = DeAxis<Dr>;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("an axis object")
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        deserialize_map_fields!(
            'de, map,
            "id" => id: Option<String>,
            "title" => title: Option<axis::Title>,
            "side" => side: Option<String>,
            "ticks" => ticks: Option<axis::Ticks>,
        );

        let side = match (side.as_deref(), Dr::dir()) {
            (Some("main"), _) => axis::Side::Main,
            (Some("opposite"), _) => axis::Side::Opposite,
            (Some("bottom"), Dir::X) => axis::Side::Main,
            (Some("top"), Dir::X) => axis::Side::Opposite,
            (Some("left"), Dir::Y) => axis::Side::Main,
            (Some("right"), Dir::Y) => axis::Side::Opposite,
            (Some("bottom") | Some("top"), Dir::Y) => {
                return Err(serde::de::Error::custom(format!(
                    "Invalid side '{}' for y-axis",
                    side.unwrap()
                )));
            }
            (Some("left") | Some("right"), Dir::X) => {
                return Err(serde::de::Error::custom(format!(
                    "Invalid side '{}' for x-axis",
                    side.unwrap()
                )));
            }
            (Some(other), _) => {
                return Err(serde::de::Error::custom(format!(
                    "Invalid side '{}'",
                    other
                )));
            }
            (None, _) => axis::Side::default(),
        };

        let mut axis = axis::Axis::new();
        if let Some(id) = id {
            axis = axis.with_id(id);
        }
        if let Some(title) = title {
            axis = axis.with_title(title);
        }
        if side == axis::Side::Opposite {
            axis = axis.with_opposite_side();
        }
        if let Some(ticks) = ticks {
            axis = axis.with_ticks(ticks);
        }

        Ok(DeAxis {
            axis,
            phantom: PhantomData,
        })
    }
}
