import {
  date,
  int,
  json,
  mysqlEnum,
  mysqlSchema,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import { WakeTurbulence, Weekdays } from "@mach/common";

export const schema = mysqlSchema("mach");

export const flights = schema.table("flights", {
  id: varchar("id", { length: 36 }).primaryKey(),
  callsign: varchar("callsign", { length: 7 }).notNull(),
  beginDate: date("begin_date", { mode: "date" }).notNull(),
  endDate: date("end_date", { mode: "date" }),
  company: varchar("company", { length: 3 }).notNull(),
  flightNumber: int("flight_number").notNull(),
  aircraft: json("aircraft").notNull().$type<{
    icaoCode: string;
    equipment: string;
    wakeTurbulence: WakeTurbulence;
  }>(),
  departureIcao: varchar("departure_icao", { length: 4 }).notNull(),
  estimatedOffBlockTime: varchar("estimated_off_block_time", {
    length: 4,
  }).notNull(),
  cruisingSpeed: varchar("cruising_speed", { length: 5 }).notNull(),
  weekdays: json("weekdays").notNull().$type<Weekdays[]>(),
  cruisingLevel: int("cruising_level").notNull(),
  route: text("route").notNull(),
  arrivalIcao: varchar("arrival_icao", { length: 4 }).notNull(),
  estimatedEnrouteMinutes: int("estimated_enroute_minutes").notNull(),
  flightRules: mysqlEnum("flight_rules", ["IFR", "Y", "Z"]).notNull(),
  remarks: text("remarks").notNull(),
});
