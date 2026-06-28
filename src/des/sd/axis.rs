use std::borrow::Cow;
use std::marker::PhantomData;

use serde::de::{Error, SeqAccess};
use serde::ser::{SerializeSeq, SerializeStruct};
use serde::{Deserializer, Serializer};
use serde_value::Value;

use crate::des::sd::{deserialize_map_fields, deserialize_tagged_map_fields};
use crate::des::{self, axis, sd};
use crate::style::theme;

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

    fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(axis::Ref::Idx(value as usize))
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(axis::Ref::Id(value.to_string()))
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

struct BoundDeser(f64);

impl<'de> serde::de::Deserialize<'de> for BoundDeser {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct Visitor;

        impl<'de> serde::de::Visitor<'de> for Visitor {
            type Value = BoundDeser;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a number or null")
            }

            fn visit_f64<E>(self, value: f64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(BoundDeser(value))
            }

            fn visit_i64<E>(self, value: i64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(BoundDeser(value as f64))
            }

            fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(BoundDeser(value as f64))
            }

            #[cfg(feature = "time")]
            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                const FMT: &str = "%Y-%m-%d %H:%M:%S%.f";
                let datetime= crate::time::DateTime::fmt_parse(value, FMT)
                    .map_err(|err| E::custom(format!(
                        "Bound string only allowed for DateTime, got '{}' which can't be parsed as such: {}",
                        value, err
                    )))?;
                Ok(BoundDeser(datetime.timestamp()))
            }

            fn visit_none<E>(self) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Err(E::custom("null is not allowed for this bound"))
            }
        }
        deserializer.deserialize_any(Visitor)
    }
}

impl<'de> serde::Deserialize<'de> for axis::Range {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        // deserialize range from [min, max] seq
        // both min and max can be null to indicate automatic bounds

        deserializer.deserialize_seq(RangeVisitor)
    }
}

struct RangeVisitor;

impl<'de> serde::de::Visitor<'de> for RangeVisitor {
    type Value = axis::Range;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a range as a [min, max] sequence")
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let min: Option<Option<BoundDeser>> = seq.next_element()?;
        let max: Option<Option<BoundDeser>> = seq.next_element()?;

        if min.is_none() || max.is_none() {
            return Err(serde::de::Error::invalid_length(
                seq.size_hint().unwrap_or(0),
                &self,
            ));
        }
        let min = min.unwrap().map(|b| b.0);
        let max = max.unwrap().map(|b| b.0);

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
                    "lin".serialize(serializer)
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
            axis::Scale::Shared(id) => {
                let mut map = serializer.serialize_struct("SharedScale", 1)?;
                map.serialize_field("type", "shared")?;
                map.serialize_field("ref", id)?;
                map.end()
            }
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

    fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(axis::Scale::Shared(axis::Ref::Idx(value as usize)))
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        match value {
            "auto" => Ok(axis::Scale::Auto),
            "lin" => Ok(axis::Scale::Linear(axis::Range::default())),
            "log" => Ok(axis::Scale::Log(axis::LogScale::default())),
            other => Ok(axis::Scale::Shared(other.to_string().into())),
        }
    }

    fn visit_seq<A>(self, seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let visitor = RangeVisitor;
        visitor.visit_seq(seq).map(axis::Scale::Linear)
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
                    "lin" => deserialize_lin_scale(&mut map, buffered).map(axis::Scale::Linear),
                    "log" => deserialize_log_scale(&mut map, buffered).map(axis::Scale::Log),
                    "shared" => {
                        deserialize_shared_scale(&mut map, buffered).map(axis::Scale::Shared)
                    }
                    _ => Err(serde::de::Error::unknown_variant(
                        &tag,
                        &["lin", "log", "shared"],
                    )),
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

fn deserialize_shared_scale<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<axis::Ref, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields!(
        'de, map, buffered,
        "ref" => id: Option<axis::Ref>,
    );
    let Some(id) = id else {
        return Err(serde::de::Error::missing_field("ref"));
    };
    Ok(id)
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
            #[cfg(feature = "time")]
            axis::ticks::Locator::DateTime(locator) => {
                let mut map = serializer.serialize_struct("DateTimeLocator", 2)?;
                map.serialize_field("type", "datetime")?;
                match locator {
                    axis::ticks::DateTimeLocator::Auto => {}
                    axis::ticks::DateTimeLocator::Years(years) => {
                        map.serialize_field("years", years)?;
                    }
                    axis::ticks::DateTimeLocator::Months(months) => {
                        map.serialize_field("months", months)?;
                    }
                    axis::ticks::DateTimeLocator::Weeks(weeks) => {
                        map.serialize_field("weeks", weeks)?;
                    }
                    axis::ticks::DateTimeLocator::Days(days) => {
                        map.serialize_field("days", days)?;
                    }
                    axis::ticks::DateTimeLocator::Hours(hours) => {
                        map.serialize_field("hours", hours)?;
                    }
                    axis::ticks::DateTimeLocator::Minutes(minutes) => {
                        map.serialize_field("minutes", minutes)?;
                    }
                    axis::ticks::DateTimeLocator::Seconds(seconds) => {
                        map.serialize_field("seconds", seconds)?;
                    }
                    axis::ticks::DateTimeLocator::Micros(micros) => {
                        map.serialize_field("micros", micros)?;
                    }
                }
                map.end()
            }
            #[cfg(feature = "time")]
            axis::ticks::Locator::TimeDelta(locator) => {
                let mut map = serializer.serialize_struct("TimeDeltaLocator", 2)?;
                map.serialize_field("type", "timedelta")?;
                match locator {
                    axis::ticks::TimeDeltaLocator::Auto => {}
                    axis::ticks::TimeDeltaLocator::Days(days) => {
                        map.serialize_field("days", days)?;
                    }
                    axis::ticks::TimeDeltaLocator::Hours(hours) => {
                        map.serialize_field("hours", hours)?;
                    }
                    axis::ticks::TimeDeltaLocator::Minutes(minutes) => {
                        map.serialize_field("minutes", minutes)?;
                    }
                    axis::ticks::TimeDeltaLocator::Seconds(seconds) => {
                        map.serialize_field("seconds", seconds)?;
                    }
                    axis::ticks::TimeDeltaLocator::Micros(micros) => {
                        map.serialize_field("micros", micros)?;
                    }
                }
                map.end()
            }
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
            "maxn" => Ok(axis::ticks::Locator::MaxN(Default::default())),
            "pimultiple" => Ok(axis::ticks::Locator::PiMultiple(Default::default())),
            "log" => Ok(axis::ticks::Locator::Log(Default::default())),
            other => Err(E::unknown_variant(
                other,
                &["auto", "maxn", "pimultiple", "log"],
            )),
        }
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: SeqAccess<'de>,
    {
        let mut ticks: Vec<f64> = Vec::with_capacity(seq.size_hint().unwrap_or(0));
        while let Some(tick) = seq.next_element()? {
            ticks.push(tick);
        }
        Ok(axis::ticks::Locator::List(ticks.into()))
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
                    #[cfg(feature = "time")]
                    "datetime" => deserialize_datetime_locator(&mut map, buffered)
                        .map(axis::ticks::Locator::DateTime),
                    #[cfg(feature = "time")]
                    "timedelta" => deserialize_timedelta_locator(&mut map, buffered)
                        .map(axis::ticks::Locator::TimeDelta),
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

#[cfg(feature = "time")]
fn deserialize_datetime_locator<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<axis::ticks::DateTimeLocator, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    super::deserialize_tagged_enum!(
        'de, map, buffered, axis::ticks::DateTimeLocator,
        "years" => Years,
        "months" => Months,
        "weeks" => Weeks,
        "days" => Days,
        "hours" => Hours,
        "minutes" => Minutes,
        "seconds" => Seconds,
        "micros" => Micros,
    )
}

#[cfg(feature = "time")]
fn deserialize_timedelta_locator<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<axis::ticks::TimeDeltaLocator, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    super::deserialize_tagged_enum!(
        'de, map, buffered, axis::ticks::TimeDeltaLocator,
        "days" => Days,
        "hours" => Hours,
        "minutes" => Minutes,
        "seconds" => Seconds,
        "micros" => Micros,
    )
}

fn deserialize_locator<'de, A>(type_: &str, mut map: A) -> Result<axis::ticks::Locator, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    match type_ {
        "maxn" => Ok(deserialize_maxn_locator(&mut map, Vec::new())?.into()),
        "pimultiple" => Ok(deserialize_pimultiple_locator(&mut map, Vec::new())?.into()),
        "log" => Ok(deserialize_log_locator(&mut map, Vec::new())?.into()),
        #[cfg(feature = "time")]
        "datetime" => Ok(deserialize_datetime_locator(&mut map, Vec::new())?.into()),
        #[cfg(feature = "time")]
        "timedelta" => Ok(deserialize_timedelta_locator(&mut map, Vec::new())?.into()),
        _ => Err(A::Error::unknown_variant(
            type_,
            &["maxn", "pimultiple", "log"],
        )),
    }
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
            #[cfg(feature = "time")]
            axis::ticks::Formatter::DateTime(formatter) => {
                let mut map = serializer.serialize_struct("DateTimeFormatter", 2)?;
                map.serialize_field("type", "datetime")?;
                let fmt_str = formatter.fmt_str();
                if let Some(fmt_str) = fmt_str {
                    map.serialize_field("format", &fmt_str)?;
                }
                map.end()
            }
            #[cfg(feature = "time")]
            axis::ticks::Formatter::TimeDelta(formatter) => {
                let mut map = serializer.serialize_struct("TimeDeltaFormatter", 2)?;
                map.serialize_field("type", "timedelta")?;
                if let Some(fmt_str) = formatter.fmt_str() {
                    map.serialize_field("format", &fmt_str)?;
                }
                map.end()
            }
            #[allow(unreachable_patterns)]
            _ => todo!("Serialize other formatter types: {:?}", self),
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
                    #[cfg(feature = "time")]
                    "datetime" => deserialize_datetime_formatter(&mut map, buffered)
                        .map(axis::ticks::Formatter::DateTime),
                    #[cfg(feature = "time")]
                    "timedelta" => deserialize_timedelta_formatter(&mut map, buffered)
                        .map(axis::ticks::Formatter::TimeDelta),
                    _ => Err(serde::de::Error::unknown_variant(
                        &tag,
                        &["prec", "percent", "datetime", "timedelta"],
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

#[cfg(feature = "time")]
fn deserialize_datetime_formatter<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<axis::ticks::DateTimeFormatter, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields!(
        'de, map, buffered,
        "format" => format: Option<String>,
    );
    match format {
        Some(fmt_str) => {
            if &fmt_str == "%Y-%m-%d %H:%M:%S" {
                return Ok(axis::ticks::DateTimeFormatter::DateTime);
            }
            if &fmt_str == "%Y-%m-%d" {
                return Ok(axis::ticks::DateTimeFormatter::Date);
            }
            if &fmt_str == "%H:%M:%S" {
                return Ok(axis::ticks::DateTimeFormatter::Time);
            }
            if &fmt_str == "auto" {
                return Ok(axis::ticks::DateTimeFormatter::Auto);
            }
            Ok(axis::ticks::DateTimeFormatter::Custom(fmt_str))
        }
        None => Ok(axis::ticks::DateTimeFormatter::Auto),
    }
}

#[cfg(feature = "time")]
fn deserialize_timedelta_formatter<'de, A>(
    map: &mut A,
    buffered: Vec<(String, Value)>,
) -> Result<axis::ticks::TimeDeltaFormatter, A::Error>
where
    A: serde::de::MapAccess<'de>,
{
    deserialize_tagged_map_fields!(
        'de, map, buffered,
        "format" => format: Option<String>,
    );
    match format {
        Some(fmt_str) => {
            if &fmt_str == "auto" {
                return Ok(axis::ticks::TimeDeltaFormatter::Auto);
            }
            Ok(axis::ticks::TimeDeltaFormatter::Custom(fmt_str))
        }
        None => Ok(axis::ticks::TimeDeltaFormatter::Auto),
    }
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
            "auto" => Ok(axis::Ticks::default()),
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
                        &[
                            "auto",
                            "maxn",
                            "pimultiple",
                            "log",
                            "percent",
                            "[color string]",
                        ],
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
    where
        A: serde::de::MapAccess<'de>,
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
                // serialized directly as a locator or formatter
                "type" => {
                    let type_: &str = map.next_value()?;
                    match type_ {
                        "maxn" | "pimultiple" | "log" => {
                            ticks =
                                ticks.with_locator(deserialize_locator(type_, &mut map)?.into());
                        }
                        #[cfg(feature = "time")]
                        "datetime" | "timedelta" => {
                            ticks =
                                ticks.with_locator(deserialize_locator(type_, &mut map)?.into());
                        }
                        "percent" => {
                            ticks = ticks.with_formatter(Some(
                                deserialize_percent_formatter(&mut map, Vec::new())?.into(),
                            ));
                        }
                        _ => {
                            return Err(A::Error::unknown_variant(
                                type_,
                                &[
                                    "maxn",
                                    "pimultiple",
                                    "log",
                                    "timedelta",
                                    "datetime",
                                    "percent",
                                ],
                            ));
                        }
                    }
                }
                _ => {
                    return Err(serde::de::Error::unknown_field(
                        &key,
                        &["locator", "formatter", "color", "type"],
                    ));
                }
            }
        }

        Ok(ticks)
    }
}

// MARK: MinorTicks

impl serde::Serialize for axis::MinorTicks {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let default = axis::MinorTicks::default();
        let has_default_locator = self.locator() == default.locator();
        let has_default_color = self.color() == default.color();

        match (has_default_locator, has_default_color) {
            (true, true) => "auto".serialize(serializer),
            (false, true) => self.locator().serialize(serializer),
            (true, false) => self.color().serialize(serializer),
            _ => {
                let len = 2 - has_default_locator as usize - has_default_color as usize;
                let mut state = serializer.serialize_struct("MinorTicks", len)?;
                if !has_default_locator {
                    state.serialize_field("locator", self.locator())?;
                }
                if !has_default_color {
                    state.serialize_field("color", &self.color())?;
                }
                state.end()
            }
        }
    }
}

impl<'de> serde::Deserialize<'de> for axis::MinorTicks {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let visitor = MinorTicksVisitor;
        deserializer.deserialize_any(visitor)
    }
}

struct MinorTicksVisitor;

impl<'de> serde::de::Visitor<'de> for MinorTicksVisitor {
    type Value = axis::MinorTicks;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a minor ticks object or string")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        if value == "auto" {
            return Ok(axis::MinorTicks::default());
        }
        let color: Result<theme::Color, _> = value.parse();
        if let Ok(color) = color {
            Ok(axis::MinorTicks::default().with_color(color))
        } else {
            let locator = LocatorVisitor
                .visit_str::<serde::de::value::Error>(value)
                .map_err(|_| {
                    serde::de::Error::custom("expecting a color or locator string for Minor axis")
                })?;
            Ok(axis::MinorTicks::default().with_locator(locator))
        }
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::MapAccess<'de>,
    {
        let mut minor_ticks = axis::MinorTicks::default();

        while let Some(key) = map.next_key::<Cow<'de, str>>()? {
            match &*key {
                "locator" => {
                    let locator = map.next_value()?;
                    minor_ticks = minor_ticks.with_locator(locator);
                }
                "color" => {
                    let color = map.next_value()?;
                    minor_ticks = minor_ticks.with_color(color);
                }
                "type" => {
                    // directly a locator
                    let type_: &str = map.next_value()?;
                    let locator = deserialize_locator(type_, &mut map)?;
                    minor_ticks = minor_ticks.with_locator(locator);
                }
                _ => {
                    return Err(serde::de::Error::unknown_field(&key, &["locator", "color"]));
                }
            }
        }

        Ok(minor_ticks)
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

        if self.axis.scale() != &axis::Scale::default() {
            state.serialize_field("scale", self.axis.scale())?;
        }

        if let Some(ticks) = self.axis.ticks() {
            state.serialize_field("ticks", ticks)?;
        }

        if let Some(minor_ticks) = self.axis.minor_ticks() {
            state.serialize_field("minorTicks", minor_ticks)?;
        }

        if let Some(grid) = self.axis.grid() {
            state.serialize_field("grid", grid)?;
        }

        if let Some(minor_grid) = self.axis.minor_grid() {
            state.serialize_field("minorGrid", minor_grid)?;
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
            "title" => title: Option<des::Text>,
            "side" => side: Option<String>,
            "scale" => scale: Option<axis::Scale>,
            "ticks" => ticks: Option<axis::Ticks>,
            "minorTicks" => minor_ticks: Option<axis::MinorTicks>,
            "grid" => grid: Option<axis::Grid>,
            "minorGrid" => minor_grid: Option<axis::MinorGrid>,
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
        if let Some(scale) = scale {
            axis = axis.with_scale(scale);
        }
        if let Some(ticks) = ticks {
            axis = axis.with_ticks(ticks);
        }
        if let Some(minor_ticks) = minor_ticks {
            axis = axis.with_minor_ticks(minor_ticks);
        }
        if let Some(grid) = grid {
            axis = axis.with_grid(grid);
        }
        if let Some(minor_grid) = minor_grid {
            axis = axis.with_minor_grid(minor_grid);
        }

        Ok(DeAxis {
            axis,
            phantom: PhantomData,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const SHARED_SCALE_JSON: &str = r#"
{
  "scale": {
    "type": "shared",
    "ref": "x2"
  }
}
"#;

    #[test]
    fn test_shared_scale_ser() {
        let input =
            axis::Axis::new().with_scale(axis::Scale::Shared(axis::Ref::Id("x2".to_string())));
        let result = serde_json::to_string_pretty(&input).unwrap();
        let expected = SHARED_SCALE_JSON.trim();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_shared_scale_deser() {
        let input = SHARED_SCALE_JSON;
        let result: axis::Axis = serde_json::from_str(input).unwrap();
        let expected =
            axis::Axis::new().with_scale(axis::Scale::Shared(axis::Ref::Id("x2".to_string())));
        assert_eq!(result, expected);
    }
}
