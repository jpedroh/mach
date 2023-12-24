type ZipPort = {
  fileFromBuffer: (buffer: Buffer) => {
    listZipFileNames: () => string[]
    readFileLines: (fileName: string) => string
  }
}

const makeRplFileLinesExtractor = ({ zip }: { zip: ZipPort }) => {
  return (buffer: Buffer) => {
    const zipFile = zip.fileFromBuffer(buffer)

    const flightsFileName = zipFile
      .listZipFileNames()
      .find((fileName) => fileName.startsWith('RPL'))

    return zipFile
      .readFileLines(flightsFileName)
      .split('\n')
      .slice(1, -1)
      .map((v) => v.trim())
  }
}

export default makeRplFileLinesExtractor
