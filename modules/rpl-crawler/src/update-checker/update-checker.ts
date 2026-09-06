const updateChecker = async (date: string) => {
  const checkUrl = `http://portal.cgna.decea.mil.br/files/abas/${date}/painel_rpl/companhias/Cia_GLO_CS.txt`

  const response = await fetch(checkUrl)

  if (response.status !== 200 && response.status !== 404) {
    throw new Error(`Unexpected response status while checking ${checkUrl}: ${response.status}`)
  }

  return response.status === 200
}

export default updateChecker
