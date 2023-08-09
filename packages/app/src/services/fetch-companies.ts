import { db, flights } from "@mach/database";
import { sql } from "drizzle-orm";

export async function fetchCompanies() {
  const companies = await db
    .select({
      company: sql`DISTINCT(${flights.company})`,
    })
    .from(flights);

  return companies.map((v) => String(v.company));
}
