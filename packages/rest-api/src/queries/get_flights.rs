use ::models::flight;
use sea_orm::*;

pub enum GetFlightsError {
    InternalError,
}

pub async fn get_flights(
    db: &DbConn,
    offset: Option<u32>,
    limit: Option<u32>,
    company: Option<String>,
    departure_icao: Option<String>,
    arrival_icao: Option<String>,
) -> Result<(Vec<flight::Model>, u64), GetFlightsError> {
    let an_offset = offset.unwrap_or(0);
    let a_limit = limit.unwrap_or(15);

    let mut query = flight::Entity::find().order_by_asc(flight::Column::Id);

    if let Some(company) = company {
        query = query.filter(flight::Column::Company.eq(company));
    }
    if let Some(departure_icao) = departure_icao {
        query = query.filter(flight::Column::DepartureIcao.eq(departure_icao));
    }
    if let Some(arrival_icao) = arrival_icao {
        query = query.filter(flight::Column::ArrivalIcao.eq(arrival_icao));
    }

    let count = query
        .clone()
        .paginate(db, a_limit.into())
        .num_items()
        .await
        .map_err(|_| GetFlightsError::InternalError)?;

    let items = query
        .offset(an_offset.into())
        .limit(a_limit.into())
        .all(db)
        .await
        .map_err(|_| GetFlightsError::InternalError)?;

    Ok((items, count))
}
