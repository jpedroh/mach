import { FlightModel } from "@mach/database";
import { Sequelize } from "sequelize";

export async function fetchCompanies() {
  const companies = await FlightModel.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("company")), "company"],
    ],
    raw: true,
  });

  return companies.map((v) => v.company);
}
