use rocket::serde::Serialize;
use rocket_db_pools::sqlx;
use sqlx::types::chrono;
use sqlx::FromRow;

#[derive(Serialize, FromRow)]
#[sqlx(rename_all = "camelCase")]
#[serde(crate = "rocket::serde")]
pub struct Flight {
    pub id: sqlx::types::Uuid,
    pub callsign: String,
    pub beginDate: sqlx::types::chrono::DateTime<chrono::Utc>,
    pub endDate: Option<sqlx::types::chrono::DateTime<chrono::Utc>>,
    pub company: String,
    pub flightNumber: i32,
    pub aircraft: serde_json::Value,
    pub departureIcao: String,
    pub estimatedOffBlockTime: String,
    pub cruisingSpeed: String,
    pub remarks: String,
    pub flightRules: String,
    pub estimatedEnrouteMinutes: i32,
    pub arrivalIcao: String,
    pub route: String,
    pub cruisingLevel: i32,
    pub weekdays: serde_json::Value,
    pub updatedAt: sqlx::types::chrono::DateTime<chrono::Utc>,
    pub createdAt: sqlx::types::chrono::DateTime<chrono::Utc>,
}
