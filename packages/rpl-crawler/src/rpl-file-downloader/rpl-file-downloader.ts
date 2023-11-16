type HttpClient = {
  get: (
    url: string,
    parameters: { responseType: 'arraybuffer' }
  ) => Promise<{ data: string }>
}

const rplFileDownloader = ({ http }: { http: HttpClient }) => {
  return async (date: string) => {
    const fileLink = `http://portal.cgna.decea.mil.br/files/abas/${date}/painel_rpl/bdr/RPL_NAVBRASIL.zip`

    const { data } = await http.get(fileLink, {
      responseType: 'arraybuffer',
    })

    return Buffer.from(data, 'binary')
  }
}

export default rplFileDownloader
