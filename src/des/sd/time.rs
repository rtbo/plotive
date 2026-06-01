use crate::time;


impl serde::Serialize for time::DateTime {
    fn serialize<S>(&self, _serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        todo!("Serialize DateTime as ISO 8601 string")
    }
}

impl<'de> serde::Deserialize<'de> for time::DateTime {
    fn deserialize<D>(_deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        todo!("Deserialize DateTime from ISO 8601 string")
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
