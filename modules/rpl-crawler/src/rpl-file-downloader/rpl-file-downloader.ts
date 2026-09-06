const rplFileDownloader = async (date: string) => {
  const fileLink = `http://portal.cgna.decea.mil.br/files/abas/${date}/painel_rpl/bdr/RPL_NAVBRASIL.zip`

  const response = await fetch(fileLink)

  if (!response.ok) {
    throw new Error(`Unexpected response status while downloading ${fileLink}: ${response.status}`)
  }

  return Buffer.from(await response.arrayBuffer())
}

export default rplFileDownloader
