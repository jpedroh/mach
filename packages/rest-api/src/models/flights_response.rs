use serde::Serialize;

use super::flight;

#[derive(Serialize)]
pub struct FlightsResponse {
    pub count: u64,
    pub items: Vec<flight::Model>,
}
