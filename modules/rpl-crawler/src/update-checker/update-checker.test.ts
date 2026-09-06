import { http } from 'msw'
import { expect, test } from 'vitest'

import { server } from '../../__mocks__/node'
import updateChecker from './index'

test('The update checker returns true if there are updates for the given date', async () => {
  const hasUpdate = await updateChecker('2022-08-22')
  expect(hasUpdate).toBeTruthy()
})

test('The update checker returns false if there are non updates for the given date', async () => {
  const hasUpdate = await updateChecker('2022-08-23')
  expect(hasUpdate).toBeFalsy()
})

test('The update checker throws for unexpected responses', async () => {
  server.use(
    http.get(
      'http://portal.cgna.decea.mil.br/files/abas/:date/painel_rpl/companhias/Cia_GLO_CS.txt',
      () => {
        return new Response(null, {
          status: 500,
        })
      },
    ),
  )

  await expect(updateChecker('2022-08-24')).rejects.toThrow(
    'Unexpected response status while checking',
  )
})
