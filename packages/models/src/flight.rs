use serde::{Deserialize, Serialize};
use sea_orm::entity::prelude::*;
use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
#[sea_orm(table_name = "flights")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: Uuid,
    pub callsign: String,
    #[sea_orm(column_name = "beginDate")]
    pub begin_date: chrono::DateTime<chrono::Utc>,
    #[sea_orm(column_name = "endDate")]
    pub end_date: Option<chrono::DateTime<chrono::Utc>>,
    pub company: String,
    #[sea_orm(column_name = "flightNumber")]
    pub flight_number: i32,
    pub aircraft: serde_json::Value,
    #[sea_orm(column_name = "departureIcao")]
    pub departure_icao: String,
    #[sea_orm(column_name = "estimatedOffBlockTime")]
    pub estimated_off_block_time: String,
    #[sea_orm(column_name = "cruisingSpeed")]
    pub cruising_speed: String,
    pub remarks: String,
    #[sea_orm(column_name = "flightRules")]
    pub flight_rules: String,
    #[sea_orm(column_name = "estimatedEnrouteMinutes")]
    pub estimated_enroute_minutes: i32,
    #[sea_orm(column_name = "arrivalIcao")]
    pub arrival_icao: String,
    pub route: String,
    #[sea_orm(column_name = "cruisingLevel")]
    pub cruising_level: i32,
    pub weekdays: serde_json::Value,
    #[sea_orm(column_name = "updatedAt")]
    pub updated_at: chrono::DateTime<chrono::Utc>,
    #[sea_orm(column_name = "createdAt")]
    pub created_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
