import { readFile } from 'fs/promises'
import { join } from 'path'
import { test, expect } from 'vitest'
import rplFileLinesExtractor from '.'

test('It extracts the lines from the zip file', async () => {
  const file = await readFile(
    join(__dirname, '../../__mocks__/RPL_NAVBRASIL.zip')
  )
  const lines = rplFileLinesExtractor(file)

  expect(lines).toEqual([
    `161123 161123 0004000 ACN5135 C208/L SBAC1730 N0155 065 DCT 0427S03754W/N0150F080 IFR DCT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                SBFZ0030 EQPT/SDFGR/S PBN/B2C2D2O2S1 OPR/AZUL CONECTA LTDA PER/A RMK/JAH VOADO VMC`,
  ])
})
