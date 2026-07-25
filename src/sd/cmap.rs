use plotive_base::Rgb8;
use serde::Deserializer;
use serde::de::{Error, SeqAccess};
use serde::ser::{SerializeMap, SerializeSeq};

use crate::des;
use crate::des::cmap;
use crate::des::cmap::{LerpColorMap, LerpMethod};

impl serde::Serialize for LerpMethod {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let name = match self {
            LerpMethod::Nearest => "nearest",
            LerpMethod::SRgb => "srgb",
            LerpMethod::LinearRgb => "linear-rgb",
            LerpMethod::Perceptual => "perceptual",
            LerpMethod::Xyz => "xyz",
        };
        serializer.serialize_str(name)
    }
}

impl<'de> serde::Deserialize<'de> for LerpMethod {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct LerpMethodVisitor;

        impl<'de> serde::de::Visitor<'de> for LerpMethodVisitor {
            type Value = LerpMethod;
            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("one of [nearest, srgb, linear-rgb, perceptual, xyz]")
            }
            fn visit_str<E>(self, value: &str) -> Result<LerpMethod, E>
            where
                E: serde::de::Error,
            {
                match value {
                    "nearest" => Ok(LerpMethod::Nearest),
                    "srgb" => Ok(LerpMethod::SRgb),
                    "linear-rgb" => Ok(LerpMethod::LinearRgb),
                    "perceptual" => Ok(LerpMethod::Perceptual),
                    "xyz" => Ok(LerpMethod::Xyz),
                    _ => Err(E::custom(format!("unknown lerp method: {}", value))),
                }
            }
        }

        deserializer.deserialize_str(LerpMethodVisitor)
    }
}

struct SerStops<'a> {
    monotonic: bool,
    start: Rgb8,
    end: Rgb8,
    stops: &'a [(f32, Rgb8)],
}

impl<'a> serde::Serialize for SerStops<'a> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut seq = serializer.serialize_seq(Some(self.stops.len() + 2))?;
        if self.monotonic {
            seq.serialize_element(&self.start)?;
            for stop in self.stops {
                seq.serialize_element(&stop.1)?;
            }
            seq.serialize_element(&self.end)?;
        } else {
            seq.serialize_element(&(0.0, self.start))?;
            for stop in self.stops {
                seq.serialize_element(stop)?;
            }
            seq.serialize_element(&(1.0, self.end))?;
        }
        seq.end()
    }
}

#[derive(Debug)]
struct DeStops {
    start: Rgb8,
    end: Rgb8,
    stops: Vec<(f32, Rgb8)>,
}

impl<'de> serde::Deserialize<'de> for DeStops {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        deserializer.deserialize_seq(StopsVisitor)
    }
}

struct StopsVisitor;

impl<'de> serde::de::Visitor<'de> for StopsVisitor {
    type Value = DeStops;
    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a sequence of stops")
    }

    fn visit_seq<A>(self, seq: A) -> Result<Self::Value, A::Error>
    where
        A: SeqAccess<'de>,
    {
        let mut seq = seq;
        let mut de_stops = Vec::with_capacity(seq.size_hint().unwrap_or(0));
        while let Some(de_stop) = seq.next_element::<DeStop>()? {
            de_stops.push(de_stop);
        }
        if de_stops.len() < 2 {
            return Err(A::Error::invalid_length(de_stops.len(), &"stops"));
        }
        let monotonic = de_stops[0].pos.is_none();
        if monotonic {
            if !de_stops.iter().skip(1).all(|stop| stop.pos.is_none()) {
                return Err(A::Error::custom(
                    "Can't mix stops with and without position",
                ));
            }
            let start = de_stops[0].color;
            let end = de_stops.pop().unwrap().color;
            let monotonic_div = 1.0 / (de_stops.len() as f32);
            let stops = de_stops
                .iter()
                .skip(1)
                .enumerate()
                .map(|(i, stop)| (monotonic_div * (i as f32 + 1.0), stop.color))
                .collect();
            Ok(DeStops { start, end, stops })
        } else {
            if !de_stops.iter().skip(1).all(|stop| stop.pos.is_some()) {
                return Err(A::Error::custom(
                    "Can't mix stops with and without position",
                ));
            }
            const EPS: f32 = 0.001;
            fn near(value: f32, target: f32) -> bool {
                target - EPS < value && value < target + EPS
            }
            if !near(*de_stops[0].pos.as_ref().unwrap(), 0.0) {
                return Err(A::Error::custom("First stop must have position 0.0"));
            }
            if !near(*de_stops.last().unwrap().pos.as_ref().unwrap(), 1.0) {
                return Err(A::Error::custom("Last stop must have position 1.0"));
            }
            let start = de_stops[0].color;
            let end = de_stops.pop().unwrap().color;
            let stops = de_stops
                .into_iter()
                .skip(1)
                .map(|stop| (stop.pos.unwrap(), stop.color))
                .collect();
            Ok(DeStops { start, end, stops })
        }
    }
}

#[derive(Debug)]
struct DeStop {
    pos: Option<f32>,
    color: Rgb8,
}

impl<'de> serde::Deserialize<'de> for DeStop {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        deserializer.deserialize_any(StopVisitor)
    }
}

struct StopVisitor;

impl<'de> serde::de::Visitor<'de> for StopVisitor {
    type Value = DeStop;
    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a color stop")
    }
    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        let color = value.parse::<Rgb8>().map_err(E::custom)?;
        Ok(DeStop { pos: None, color })
    }
    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: SeqAccess<'de>,
    {
        let pos = seq
            .next_element::<f32>()?
            .ok_or_else(|| serde::de::Error::custom("expected position"))?;
        let color = seq
            .next_element::<Rgb8>()?
            .ok_or_else(|| serde::de::Error::custom("expected color"))?;
        Ok(DeStop {
            pos: Some(pos),
            color,
        })
    }
}

impl serde::Serialize for LerpColorMap {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        if let Some(name) = self.name() {
            name.serialize(serializer)
        } else {
            let mut state = serializer.serialize_map(None)?;
            if self.method() != LerpMethod::default() {
                state.serialize_entry("method", &self.method())?;
            }
            let stops = SerStops {
                monotonic: self.is_monotonic(),
                start: self.start(),
                end: self.end(),
                stops: self.stops(),
            };
            state.serialize_entry("stops", &stops)?;
            state.serialize_entry("scale", self.scale())?;
            state.end()
        }
    }
}

impl<'de> serde::Deserialize<'de> for LerpColorMap {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct LerpColorMapVisitor;

        impl<'de> serde::de::Visitor<'de> for LerpColorMapVisitor {
            type Value = LerpColorMap;
            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a LerpColorMap")
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                if let Some(cmap) = cmap::from_name(value) {
                    Ok(cmap)
                } else {
                    Err(E::custom(format!("Unknown ColorMap name: {}", value)))
                }
            }

            fn visit_seq<A>(self, seq: A) -> Result<Self::Value, A::Error>
            where
                A: SeqAccess<'de>,
            {
                let stops = StopsVisitor.visit_seq(seq)?;

                Ok(
                    LerpColorMap::new(LerpMethod::default(), stops.start, stops.end)
                        .with_stops(stops.stops),
                )
            }

            fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                super::deserialize_map_fields!(
                    'de, map,
                    "method" => method: Option<LerpMethod>,
                    "cmap" => cmap: Option<String>,
                    "stops" => stops: Option<DeStops>,
                    "scale" => scale: Option<Option<des::axis::Scale>>,
                );

                let mut cmap = if let Some(cmap) = cmap {
                    if stops.is_some() {
                        return Err(A::Error::custom("Can't specify both cmap and stops"));
                    }
                    if method.is_some() {
                        return Err(A::Error::custom("Can't specify both cmap and method"));
                    }
                    let Some(cmap) = cmap::from_name(&cmap) else {
                        return Err(A::Error::custom(format!("Unknown ColorMap name: {}", cmap)));
                    };
                    cmap
                } else {
                    let Some(stops) = stops else {
                        return Err(A::Error::missing_field("stops"));
                    };
                    let method = method.unwrap_or(LerpMethod::default());
                    let mut cmap = LerpColorMap::new(method, stops.start, stops.end);
                    if !stops.stops.is_empty() {
                        cmap = cmap.with_stops(stops.stops);
                    }
                    cmap
                };

                if let Some(scale) = scale {
                    cmap = cmap.with_scale(scale.unwrap_or_default());
                }
                Ok(cmap)
            }
        }
        deserializer.deserialize_any(LerpColorMapVisitor)
    }
}
