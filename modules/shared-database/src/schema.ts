import { relations } from 'drizzle-orm'
import { Weekdays, flightRules, wakeTurbulence } from './enum'
import { int, text, sqliteTable, index } from 'drizzle-orm/sqlite-core'

export const flights = sqliteTable(
  'flights',
  {
    id: text('id', { length: 36 }).primaryKey(),
    callsign: text('callsign', { length: 7 }).notNull(),
    beginDate: text('begin_date').notNull(),
    endDate: text('end_date'),
    company: text('company', { length: 3 }).notNull(),
    flightNumber: int('flight_number').notNull(),
    aircraftIcaoCode: text('aircraft_icao_code').notNull(),
    aircraftEquipment: text('aircraft_equipment').notNull(),
    aircraftWakeTurbulence: text('aircraft_wake_turbulence', {
      enum: wakeTurbulence,
    }).notNull(),
    departureIcao: text('departure_icao', { length: 4 }).notNull(),
    estimatedOffBlockTime: text('estimated_off_block_time', {
      length: 4,
    }).notNull(),
    cruisingSpeed: text('cruising_speed', { length: 5 }).notNull(),
    weekdays: text('weekdays', { mode: 'json' }).notNull().$type<Weekdays[]>(),
    cruisingLevel: int('cruising_level').notNull(),
    route: text('route').notNull(),
    arrivalIcao: text('arrival_icao', { length: 4 }).notNull(),
    estimatedEnrouteMinutes: int('estimated_enroute_minutes').notNull(),
    flightRules: text('flight_rules', { enum: flightRules }).notNull(),
    remarks: text('remarks').notNull(),
    cycle: text('cycle').notNull(),
  },
  (table) => {
    return {
      cycleIdx: index('cycle_idx').on(table.cycle),
      cycleDepartureArrivalCompanyAircraftIdx: index(
        'cycle_departure_arrival_company_aircraft_idx'
      ).on(
        table.cycle,
        table.departureIcao,
        table.arrivalIcao,
        table.company,
        table.aircraftIcaoCode
      ),
    }
  }
)

export const flightsRelations = relations(flights, ({ one }) => ({
  departure: one(airports, {
    fields: [flights.departureIcao],
    references: [airports.id],
  }),
  arrival: one(airports, {
    fields: [flights.arrivalIcao],
    references: [airports.id],
  }),
  cycle: one(cycles, {
    fields: [flights.cycle],
    references: [cycles.cycle],
  }),
  company: one(companies, {
    fields: [flights.company],
    references: [companies.company],
  }),
}))

export type Flight = typeof flights.$inferSelect

export const airports = sqliteTable('airports', {
  id: text('id', { length: 4 }).primaryKey(),
  name: text('name', { length: 255 }).notNull(),
  city: text('city', { length: 255 }).notNull(),
})

export type Airport = typeof airports.$inferSelect

export const cycles = sqliteTable('cycles', {
  cycle: text('cycle', { length: 10 }).notNull().primaryKey(),
  totalFlights: int('total_flights').notNull(),
})

export const companies = sqliteTable('companies', {
  company: text('company', { length: 3 }).notNull().primaryKey(),
})
