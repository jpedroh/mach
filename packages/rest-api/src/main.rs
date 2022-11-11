#[macro_use]
extern crate rocket;
use rocket::http::Status;
use rocket::serde::uuid::Uuid;
use rocket::Request;

use rocket::response::status::NotFound;
use rocket_db_pools::sqlx::{self};
use rocket_db_pools::{Connection, Database};

#[derive(Database)]
#[database("main")]
struct MainDatabase(sqlx::PgPool);

use rocket::serde::{json::Json, Serialize};
use sqlx::types::chrono::{self};
use sqlx::FromRow;

#[derive(Serialize, FromRow)]
#[serde(crate = "rocket::serde")]
struct Flight {
    id: sqlx::types::Uuid,
    callsign: String,
    beginDate: sqlx::types::chrono::DateTime<chrono::Utc>,
    endDate: Option<sqlx::types::chrono::DateTime<chrono::Utc>>,
    company: String,
    flightNumber: i32,
    aircraft: serde_json::Value,
    departureIcao: String,
    estimatedOffBlockTime: String,
    cruisingSpeed: String,
    remarks: String,
    flightRules: String,
    estimatedEnrouteMinutes: i32,
    arrivalIcao: String,
    route: String,
    cruisingLevel: i32,
    weekdays: serde_json::Value,
    updatedAt: sqlx::types::chrono::DateTime<chrono::Utc>,
    createdAt: sqlx::types::chrono::DateTime<chrono::Utc>,
}

#[derive(Serialize)]
struct ErrorMessage {
    status: i32,
    message: &'static str,
}

#[get("/flights?<offset>&<limit>&<company>&<departureIcao>&<arrivalIcao>")]
async fn get_flights(
    mut db: Connection<MainDatabase>,
    offset: Option<u32>,
    limit: Option<u32>,
    company: Option<String>,
    departureIcao: Option<String>,
    arrivalIcao: Option<String>,
) -> Result<Json<Vec<Flight>>, NotFound<String>> {
    let an_offset = offset.map_or(0, |x| x);
    let a_limit: i64 = limit.map_or(15, |x| x.into());

    sqlx::query_as("SELECT * FROM flights LIMIT $1")
        .bind(a_limit)
        .fetch_all(&mut *db)
        .await
        .map(|x| Json(x))
        .map_err(|e| NotFound(e.to_string()))
}

#[get("/flights/<id>")]
async fn get_flight_by_id(
    mut db: Connection<MainDatabase>,
    id: Uuid,
) -> Result<Json<Flight>, Status> {
    let uuid = uuid::Uuid::from_bytes(id.into_bytes());

    sqlx::query_as!(Flight, "SELECT * FROM flights where id = $1", uuid)
        .fetch_one(&mut *db)
        .await
        .map(|x| Json(x))
        .map_err(|e| match e {
            sqlx::Error::RowNotFound => Status { code: 404 },
            _ => Status { code: 500 },
        })
}

#[catch(404)]
fn not_found(req: &Request) -> Json<ErrorMessage> {
    Json(ErrorMessage {
        status: 404,
        message: "No results found",
    })
}

#[catch(500)]
fn internal_server_error(req: &Request) -> Json<ErrorMessage> {
    Json(ErrorMessage {
        status: 500,
        message: "Internal server error",
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(MainDatabase::init())
        .mount("/", routes![get_flights, get_flight_by_id])
        .register("/", catchers![not_found, internal_server_error])
}
