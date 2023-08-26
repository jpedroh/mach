import { db, flights } from '@mach/database'
import { sql } from 'drizzle-orm'
import { XMLParser } from 'fast-xml-parser'
import z from 'zod'
import { environment } from '../utils/env'

async function fetchAirportsFromDb(column: 'departureIcao' | 'arrivalIcao') {
  const airports = await db
    .select({ icaoCode: sql`DISTINCT(${flights[column]})` })
    .from(flights)

  return airports.map((v) => String(v.icaoCode))
}

const airportSchema = z.object({
  AeroCode: z.string(),
  name: z.string(),
  city: z.string(),
})

export type Airport = z.infer<typeof airportSchema>

const parser = new XMLParser({ ignoreAttributes: true })

const xmlSchema = z.object({
  aisweb: z.object({
    rotaer: z.object({
      item: z.array(airportSchema),
    }),
  }),
})

export async function fetchAirportsData(icaoCodes: string[]) {
  const endpoint = new URL('https://aisweb.decea.mil.br/api')
  endpoint.searchParams.set('apiKey', environment.AISWEB_API_KEY)
  endpoint.searchParams.set('apiPass', environment.AISWEB_API_PASSWORD)
  endpoint.searchParams.set('area', 'rotaer')
  endpoint.searchParams.set('rowstart', '0')
  endpoint.searchParams.set('rowend', '30000')
  new Set(icaoCodes).forEach((icaoCode) => {
    endpoint.searchParams.append('aero', icaoCode)
  })

  const response = await fetch(endpoint).then((r) => r.text())

  return xmlSchema.parse(parser.parse(response)).aisweb.rotaer.item
}

export async function fetchAirports() {
  const [departureIcaos, arrivalIcaos] = await Promise.all([
    fetchAirportsFromDb('departureIcao'),
    fetchAirportsFromDb('arrivalIcao'),
  ])

  return fetchAirportsData([...departureIcaos, ...arrivalIcaos])
}
