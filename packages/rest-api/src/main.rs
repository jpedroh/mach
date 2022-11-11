mod models;

#[macro_use]
extern crate rocket;
use rocket::http::Status;
use rocket::serde::uuid::Uuid;
use rocket::Request;

use rocket_db_pools::sqlx;
use rocket_db_pools::{Connection, Database};
use serde::Serialize;
use sqlx::Row;

use models::{error_message::ErrorMessage, flight::Flight};

#[derive(Database)]
#[database("main")]
struct MainDatabase(sqlx::PgPool);

use rocket::serde::json::Json;

#[derive(Serialize)]
struct FlightsResponse {
    count: i64,
    items: Vec<Flight>,
}

#[get("/flights?<offset>&<limit>&<company>&<departureIcao>&<arrivalIcao>")]
async fn get_flights(
    mut db: Connection<MainDatabase>,
    offset: Option<u32>,
    limit: Option<u32>,
    company: Option<String>,
    departureIcao: Option<String>,
    arrivalIcao: Option<String>,
) -> Result<Json<FlightsResponse>, Status> {
    let an_offset = offset.map_or(0, |x| x);
    let a_limit: i64 = limit.map_or(15, |x| x.into());

    let mut clauses: Vec<String> = vec![];
    let mut binds: Vec<String> = vec![];

    if company.is_some() {
        clauses.push(format!("company = ${}", clauses.len() + 1));
        binds.push(company.unwrap());
    }
    if departureIcao.is_some() {
        clauses.push(format!("\"departureIcao\" = ${}", clauses.len() + 1));
        binds.push(departureIcao.unwrap());
    }
    if arrivalIcao.is_some() {
        clauses.push(format!("\"arrivalIcao\" = ${}", clauses.len() + 1));
        binds.push(arrivalIcao.unwrap());
    }

    let where_clause = if clauses.len() > 0 {
        format!("where {}", clauses.join(" and "))
    } else {
        "".to_string()
    };

    let count_query_string = format!("SELECT COUNT(*) as count FROM flights {}", where_clause);

    let query_string = format!(
        "SELECT * FROM flights {} OFFSET ${} LIMIT ${}",
        where_clause,
        clauses.len() + 1,
        clauses.len() + 2
    );
    let mut count_query = sqlx::query(&count_query_string);

    let mut query = sqlx::query_as(&query_string);

    for bind in &binds {
        count_query = count_query.bind(bind);
    }
    for bind in &binds {
        query = query.bind(bind);
    }

    let count = count_query
        .fetch_one(&mut *db)
        .await
        .map_err(|err| {
            println!("{}", err.to_string());
            Status { code: 500 }
        })
        .map(|x| x.get::<i64, _>("count"))?;

    return query
        .bind(an_offset)
        .bind(a_limit)
        .fetch_all(&mut *db)
        .await
        .map(|items| Json(FlightsResponse { count, items }))
        .map_err(|err| {
            println!("{}", err.to_string());
            Status { code: 500 }
        });
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
            err => {
                println!("{}", err.to_string());
                Status { code: 500 }
            },
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
