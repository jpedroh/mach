import rplFileLinesExtractor from '../../src/rpl-file-lines-extractor'
import * as fs from 'fs'
import * as path from 'path';

describe('rpl-file-lines-extractor', () => {
    describe('Given a Buffer from a RPL File was provided', () => {
        const file = fs.readFileSync(path.resolve(__dirname, "./__fixtures__/RPLSBRE.zip"));

        describe('When lines are parsed', () => {
            const lines = rplFileLinesExtractor(file)

            test('Only flights lines are outputed', async (done) => {
                const expectedLines = await require('./__fixtures__/expected-rpl-file-lines-extractor-output.json')
                expect(lines).toEqual(expectedLines);
                done()
            })
        })
    })
})
