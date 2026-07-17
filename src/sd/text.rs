use des::Text;
use serde::ser::{SerializeMap, SerializeSeq};

use crate::des;

#[derive(Debug)]
struct SerPropsMap<'a>(&'a [(String, des::TextProps)]);

#[derive(Debug)]
struct DePropsMap(Vec<(String, des::TextProps)>);

impl<'a> serde::Serialize for SerPropsMap<'a> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut map = serializer.serialize_map(Some(self.0.len()))?;
        for (key, value) in self.0 {
            map.serialize_entry(key, value)?;
        }
        map.end()
    }
}

impl<'de> serde::Deserialize<'de> for DePropsMap {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct Visitor;

        impl<'de> serde::de::Visitor<'de> for Visitor {
            type Value = DePropsMap;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a text properties object")
            }

            fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                let mut result = Vec::new();

                while let Some((key, value)) = map.next_entry::<String, des::TextProps>()? {
                    result.push((key, value));
                }
                Ok(DePropsMap(result))
            }
        }

        deserializer.deserialize_map(Visitor)
    }
}

#[derive(Debug, serde::Deserialize)]
#[serde(untagged)]
enum StringOrPropsMap {
    String(String),
    Props(DePropsMap),
}

#[derive(Debug, serde::Deserialize)]
#[serde(untagged)]
enum StringOrVecString {
    String(String),
    VecString(Vec<String>),
}

// impl<'de> serde::Deserialize<'de> for PropsMapOrString {
//     fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
//     where
//         D: serde::Deserializer<'de>,
//     {
//         struct Visitor;

//         impl<'de> serde::de::Visitor<'de> for Visitor {
//             type Value = PropsMapOrString;

//             fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
//                 formatter.write_str("a string or a text properties object")
//             }

//             fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
//             where
//                 E: serde::de::Error,
//             {
//                 Ok(PropsMapOrString::String(value.to_string()))
//             }

//             fn visit_map<A>(self, map: A) -> Result<Self::Value, A::Error>
//             where
//                 A: serde::de::MapAccess<'de>,
//             {
//                 let DePropsMap(props) = PropsMapVisitor.visit_map(map)?;
//                 Ok(PropsMapOrString::Props(props))
//             }
//         }

//         deserializer.deserialize_any(Visitor)
//     }
// }

impl serde::Serialize for Text {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self {
            Text::Plain(text) => serializer.serialize_str(text),
            Text::Rich(fmt) => {
                let mut seq = serializer.serialize_seq(None)?;
                for l in fmt.lines() {
                    seq.serialize_element(l)?;
                }
                seq.end()
            }
            Text::RichWithProps { fmt, props } => {
                let mut seq = serializer.serialize_seq(Some(2))?;
                seq.serialize_element(fmt)?;
                let props = SerPropsMap(props.as_slice());
                seq.serialize_element(&props)?;
                seq.end()
            }
        }
    }
}

impl<'de> serde::Deserialize<'de> for Text {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        struct TextVisitor;

        impl<'de> serde::de::Visitor<'de> for TextVisitor {
            type Value = Text;

            fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
                formatter.write_str("a string or a rich text array")
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
            where
                E: serde::de::Error,
            {
                Ok(Text::Plain(value.to_string()))
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::SeqAccess<'de>,
            {
                let fmt: String = seq
                    .next_element()?
                    .ok_or_else(|| serde::de::Error::invalid_length(0, &self))?;

                let next = seq.next_element::<StringOrPropsMap>()?;
                match next {
                    Some(StringOrPropsMap::String(s2)) => {
                        let mut fmt = fmt + "\n" + &s2;
                        while let Some(s) = seq.next_element::<String>()? {
                            fmt.push('\n');
                            fmt.push_str(&s);
                        }
                        Ok(Text::Rich(fmt))
                    }
                    Some(StringOrPropsMap::Props(DePropsMap(props))) => {
                        Ok(Text::RichWithProps { fmt, props })
                    }
                    None => Ok(Text::Rich(fmt)),
                }
            }

            fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
            where
                A: serde::de::MapAccess<'de>,
            {
                let mut fmt = Option::<String>::None;
                let mut props = Vec::new();
                while let Some(key) = map.next_key::<std::borrow::Cow<'de, str>>()? {
                    match key.as_ref() {
                        "fmt" => {
                            if fmt.is_some() {
                                return Err(serde::de::Error::duplicate_field("fmt"));
                            }
                            let defmt = map.next_value::<StringOrVecString>()?;
                            fmt = match defmt {
                                StringOrVecString::String(s) => Some(s),
                                StringOrVecString::VecString(vec) => Some(vec.join("\n")),
                            };
                        }
                        "props" => {
                            if !props.is_empty() {
                                return Err(serde::de::Error::duplicate_field("props"));
                            }
                            let DePropsMap(map) = map.next_value::<DePropsMap>()?;
                            props = map;
                        }
                        _ => {
                            return Err(serde::de::Error::unknown_field(
                                key.as_ref(),
                                &["fmt", "props"],
                            ));
                        }
                    }
                }

                let Some(fmt) = fmt else {
                    return Err(serde::de::Error::missing_field("fmt"));
                };
                Ok(Text::RichWithProps { fmt, props })
            }
        }
        deserializer.deserialize_any(TextVisitor)
    }
}
