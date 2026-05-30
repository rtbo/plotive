use crate::time;


impl serde::Serialize for time::DateTime {
    fn serialize<S>(&self, _serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        todo!("Serialize DateTime as ISO 8601 string")
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
