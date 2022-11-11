mod models;

#[macro_use]
extern crate rocket;
use rocket::http::Status;
use rocket::serde::uuid::Uuid;
use rocket::Request;

use rocket::response::status::NotFound;
use rocket_db_pools::sqlx;
use rocket_db_pools::{Connection, Database};

use models::{error_message::ErrorMessage, flight::Flight};

#[derive(Database)]
#[database("main")]
struct MainDatabase(sqlx::PgPool);

use rocket::serde::json::Json;

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

    sqlx::query_as("SELECT * FROM flights OFFSET $1 LIMIT $2")
        .bind(an_offset)
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
    rocket::build()
        .attach(MainDatabase::init())
        .mount("/", routes![get_flights, get_flight_by_id])
        .register("/", catchers![not_found, internal_server_error])
}
