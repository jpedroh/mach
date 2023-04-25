import { FlightModel } from "@mach/database";
import { QueryTypes } from "sequelize";

export async function fetchAircraftIcaoCodes() {
    const companies = await FlightModel.sequelize?.query(
        `SELECT DISTINCT(aircraft#>>'{icaoCode}') AS "aircraftIcaoCode" FROM "flights" AS "flight";`,
        { type: QueryTypes.SELECT }
    );

    return companies?.map((v: any) => v.aircraftIcaoCode) ?? [];
}
