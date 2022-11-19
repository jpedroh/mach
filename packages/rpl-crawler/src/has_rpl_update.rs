use chrono::NaiveDate;
use hyper::Client;

pub async fn has_rpl_update(date: NaiveDate) -> Result<bool, &'static str> {
    let client = Client::new();

    let uri = format!(
        "http://portal.cgna.decea.mil.br/files/abas/{}/painel_rpl/companhias/Cia_GLO_CS.txt",
        date
    )
    .as_str()
    .parse()
    .map_err(|_x| "Could not create url")?;

    client
        .get(uri)
        .await
        .map(|resp| resp.status() == 200)
        .map_err(|_x| "There was an error checking if there was an update for RPL")
}

#[cfg(test)]
mod tests {
    use chrono::NaiveDate;

    use crate::has_rpl_update::has_rpl_update;

    #[tokio::test]
    async fn there_was_an_update_in_2022_11_12() {
        let date = NaiveDate::parse_from_str("2022-11-12", "%Y-%m-%d").unwrap();
        let response = has_rpl_update(date).await.unwrap();
        assert_eq!(response, true);
    }

    #[tokio::test]
    async fn there_was_no_update_in_2022_11_13() {
        let date = NaiveDate::parse_from_str("2022-11-13", "%Y-%m-%d").unwrap();
        let response = has_rpl_update(date).await.unwrap();
        assert_eq!(response, false);
    }
}