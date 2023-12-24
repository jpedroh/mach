import { XMLParser } from 'fast-xml-parser'
import { z } from 'zod'

const airportSchema = z.object({
  AeroCode: z.string(),
  name: z.string(),
  city: z.string(),
})

const parser = new XMLParser({ ignoreAttributes: true })

const xmlSchema = z.object({
  aisweb: z.object({
    rotaer: z.object({
      item: z.array(airportSchema),
    }),
  }),
})

export function makeFetchAirportsData(props: {
  apiKey: string
  apiPassword: string
}) {
  return async function (icaoCodes: Set<string>) {
    const endpoint = new URL('https://aisweb.decea.mil.br/api')
    endpoint.searchParams.set('apiKey', props.apiKey)
    endpoint.searchParams.set('apiPass', props.apiPassword)
    endpoint.searchParams.set('area', 'rotaer')
    endpoint.searchParams.set('rowstart', '0')
    endpoint.searchParams.set('rowend', (icaoCodes.size + 1).toString())
    icaoCodes.forEach((icaoCode) => {
      endpoint.searchParams.append('aero', icaoCode)
    })

    const response = await fetch(endpoint).then((r) => r.text())

    return xmlSchema
      .parse(parser.parse(response))
      .aisweb.rotaer.item.map((item) => {
        return {
          id: item.AeroCode,
          city: item.city,
          name: item.name,
        }
      })
  }
}
