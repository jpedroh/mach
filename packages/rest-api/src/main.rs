#[macro_use]
extern crate rocket;

mod dto;
mod pool;
mod queries;

use ::models::flight;
use dto::{error_message::ErrorMessage, flights_response::FlightsResponse};
use pool::MainDatabase;
use queries::{
    get_flight_by_id::{get_flight_by_id, GetFlightByIdError},
    get_flights::get_flights,
};

use rocket::http::Status;
use rocket::serde::json::Json;
use rocket::serde::uuid::Uuid;
use rocket::Request;
use rocket_cors::{AllowedHeaders, AllowedOrigins};

use sea_orm_rocket::{Connection, Database};

use std::str::FromStr;

#[get("/flights?<offset>&<limit>&<company>&<departureIcao>&<arrivalIcao>")]
async fn get_flights_handler(
    db: Connection<'_, MainDatabase>,
    offset: Option<u32>,
    limit: Option<u32>,
    company: Option<String>,
    departureIcao: Option<String>,
    arrivalIcao: Option<String>,
) -> Result<Json<FlightsResponse>, Status> {
    get_flights(
        db.into_inner(),
        offset,
        limit,
        company,
        departureIcao,
        arrivalIcao,
    )
    .await
    .map(|(items, count)| Json(FlightsResponse { count, items }))
    .map_err(|_| Status { code: 500 })
}

#[get("/flights/<id>")]
async fn get_flight_by_id_handler(
    db: Connection<'_, MainDatabase>,
    id: Uuid,
) -> Result<Json<flight::Model>, Status> {
    get_flight_by_id(db.into_inner(), id)
        .await
        .map(|flight| Json(flight))
        .map_err(|err| match err {
            GetFlightByIdError::FlightNotFound => Status { code: 404 },
            GetFlightByIdError::InternalError => Status { code: 500 },
        })
}

#[get("/")]
async fn index() -> Result<Json<serde_json::Value>, Status> {
    let bytes = include_bytes!("openapi.json");

    serde_json::from_slice::<serde_json::Value>(bytes)
        .map_err(|e| {
            println!("{}", e.to_string());
            Status { code: 500 }
        })
        .map(|v| Json(v))
}

#[catch(404)]
fn not_found(_req: &Request) -> Json<ErrorMessage> {
    Json(ErrorMessage {
        status: 404,
        message: "No results found",
    })
}

#[catch(500)]
fn internal_server_error(_req: &Request) -> Json<ErrorMessage> {
    Json(ErrorMessage {
        status: 500,
        message: "Internal server error",
    })
}

#[launch]
fn rocket() -> _ {
    // You can also deserialize this
    let cors = rocket_cors::CorsOptions {
        allowed_origins: AllowedOrigins::all(),
        allowed_headers: AllowedHeaders::all(),
        allowed_methods: vec!["Get"]
            .into_iter()
            .map(|s| FromStr::from_str(s).unwrap())
            .collect(),
        ..Default::default()
    }
    .to_cors()
    .unwrap();

    rocket::build()
        .attach(MainDatabase::init())
        .attach(cors)
        .mount(
            "/",
            routes![get_flights_handler, get_flight_by_id_handler, index],
        )
        .register("/", catchers![not_found, internal_server_error])
}
