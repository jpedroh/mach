use crate::models::flight;
use sea_orm::*;
use uuid::Uuid;

pub enum GetFlightByIdError {
    FlightNotFound,
    InternalError,
}

pub async fn get_flight_by_id(db: &DbConn, id: Uuid) -> Result<flight::Model, GetFlightByIdError> {
    let flight = flight::Entity::find_by_id(id)
        .one(db)
        .await
        .map_err(|err| {
            println!("{}", err.to_string());
            GetFlightByIdError::InternalError
        })?;

    match flight {
        Some(flight) => Ok(flight),
        None => Err(GetFlightByIdError::FlightNotFound),
    }
}
