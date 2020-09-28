type ZipPort = {
  fileFromBuffer: (
    buffer: Buffer
  ) => {
    listZipFileNames: () => string[]
    readFileLines: (fileName: string) => string[]
  }
}

const makeRplFileLinesExtractor = ({ zip }: { zip: ZipPort }) => {
  return (buffer: Buffer) => {
    const zipFile = zip.fileFromBuffer(buffer)

    const flightsFileName = zipFile
      .listZipFileNames()
      .find(fileName => fileName.includes('EOBT'))

    return zipFile
      .readFileLines(flightsFileName)
      .filter(line => line.includes('EQPT'))
  }
}

export default makeRplFileLinesExtractor
