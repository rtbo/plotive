use crate::time;

const FMT: &str = "%Y-%m-%d %H:%M:%S%.f";

impl serde::Serialize for time::DateTime {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        self.fmt_to_string(FMT).serialize(serializer)
    }
}

impl<'de> serde::Deserialize<'de> for time::DateTime {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct Visitor;
        impl<'de> serde::de::Visitor<'de> for Visitor {
            type Value = time::DateTime;
            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a string or timestamp")
            }
            fn visit_i64<E>(self, value: i64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                println!("parsing '{}' as time", value);
                time::DateTime::from_timestamp(value as f64)
                    .ok_or_else(|| serde::de::Error::custom("invalid time"))
            }

            fn visit_f64<E>(self, value: f64) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                println!("parsing '{}' as time", value);
                time::DateTime::from_timestamp(value)
                    .ok_or_else(|| serde::de::Error::custom("invalid time"))
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                println!("parsing '{}' as time", value);
                time::DateTime::fmt_parse(value, FMT)
                    .map_err(|_| serde::de::Error::custom("invalid time"))
            }
        }
        deserializer.deserialize_any(Visitor)
    }
}

impl serde::Serialize for time::TimeDelta {
    fn serialize<S>(&self, _serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        todo!("Serialize TimeDelta")
    }
}

impl<'de> serde::Deserialize<'de> for time::TimeDelta {
    fn deserialize<D>(_deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        todo!("Deserialize TimeDelta")
    }
}
