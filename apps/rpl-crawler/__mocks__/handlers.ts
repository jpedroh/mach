import { readFileSync } from 'fs'
import { http } from 'msw'
import { join } from 'path'

export const handlers = [
  http.get(
    `http://portal.cgna.decea.mil.br/files/abas/:date/painel_rpl/companhias/Cia_GLO_CS.txt`,
    ({ params }) => {
      return new Response(null, {
        status: params.date === '2022-08-22' ? 200 : 404,
      })
    }
  ),
  http.get(`https://aisweb.decea.mil.br/api`, () => {
    const airportsContent = readFileSync(
      join(__dirname, './airports_response.xml')
    ).toString('utf-8')

    return new Response(airportsContent, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
      },
    })
  }),
]
