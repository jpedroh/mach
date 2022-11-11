#[macro_use]
extern crate rocket;
use rocket::serde::uuid::Uuid;

#[get("/flights?<offset>&<limit>&<company>&<departureIcao>&<arrivalIcao>")]
fn get_flights(
    offset: Option<u32>,
    limit: Option<u32>,
    company: Option<String>,
    departureIcao: Option<String>,
    arrivalIcao: Option<String>,
) -> String {
    let an_offset = offset.map_or(0, |x| x);
    let a_limit = limit.map_or(15, |x| x);

    format!("Offset is {} and limit is {}", an_offset, a_limit)
}

#[get("/flights/<id>")]
fn get_flight_by_id(id: Uuid) -> String {
    format!("Called with {}", id)
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![get_flights, get_flight_by_id])
}
