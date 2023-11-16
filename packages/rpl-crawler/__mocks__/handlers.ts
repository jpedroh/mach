import { http } from 'msw'

export const handlers = [
  http.get(
    `http://portal.cgna.decea.mil.br/files/abas/:date/painel_rpl/companhias/Cia_GLO_CS.txt`,
    ({ params }) => {
      return new Response(null, {
        status: params.date === '2022-08-22' ? 200 : 404,
      })
    }
  ),
]
