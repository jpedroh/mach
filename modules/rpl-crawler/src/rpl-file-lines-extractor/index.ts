import AdmZip from 'adm-zip'
import makeRplFileLinesExtractor from './rpl-file-lines-extractor.ts'

export default makeRplFileLinesExtractor({
  zip: {
    fileFromBuffer: (buffer: Buffer) => {
      const file = new AdmZip(buffer)

      return {
        listZipFileNames: () => file.getEntries().map((file) => file.entryName),
        readFileLines: (fileName) => file.readAsText(fileName),
      }
    },
  },
})
