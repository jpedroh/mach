import { db, flights } from "@mach/database";
import { sql } from "drizzle-orm";

export async function fetchAircraftIcaoCodes() {
  const aircrafts = await db
    .select({
      aircraftIcaoCode: sql`DISTINCT(${flights.aircraft}->>"$.icaoCode")`,
    })
    .from(flights);

  return aircrafts?.map((v: any) => v.aircraftIcaoCode) ?? [];
}
