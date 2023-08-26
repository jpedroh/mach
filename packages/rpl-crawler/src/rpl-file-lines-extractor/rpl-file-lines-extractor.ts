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
      .find((fileName) => fileName.includes('RVSM'))

    const fileLines = zipFile.readFileLines(flightsFileName)
    const tokens = fileLines.matchAll(new RegExp(/(?<=#C \d{6})[^@]*/gs))

    return Array.from(tokens).map(([token]) => token.trim())
  }
}

export default makeRplFileLinesExtractor
