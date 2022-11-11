use rocket::serde::Serialize;

#[derive(Serialize)]
pub struct ErrorMessage {
    pub status: i32,
    pub message: &'static str,
}
