type HttpClient = {
    get: (url: string, parameters: { validateStatus: (status: number) => boolean }) => Promise<{ status: number }>
}

const makeUpdateChecker = ({ http }: { http: HttpClient }) => {
    return async (date: string) => {
        const checkUrl = `http://portal.cgna.gov.br/files/abas/${date}/painel_rpl/companhias/Cia_GLO_CS.txt`

        const { status } = await http.get(checkUrl, {
            validateStatus: status => status === 200
        })
        
        return status === 200
    }
}

export default makeUpdateChecker;