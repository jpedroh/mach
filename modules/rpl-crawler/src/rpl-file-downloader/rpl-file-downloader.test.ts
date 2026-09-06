import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { expect, test } from 'vitest'

import rplFileDownloader from './index'

test('It downloads the RPL zip file', async () => {
  const expectedFile = readFileSync(join(__dirname, '../../__mocks__/RPL_NAVBRASIL.zip'))

  const file = await rplFileDownloader('2022-08-22')

  expect(file).toBeInstanceOf(Buffer)
  expect(file.equals(expectedFile)).toBeTruthy()
})
