import Axios from "axios";

type HttpClient = {
    get: (url: string, parameters: { responseType: 'arraybuffer' }) => Promise<{ data: string }>
}

const firRplFileDownloader = ({ http }: { http: HttpClient }) => {
    return async (fir: string, date: string) => {
        const fileLink = `http://portal.cgna.gov.br/files/abas/${date}/painel_rpl/bdr/RPL${fir}.zip`;

        const { data } = await Axios.get(fileLink, { responseType: "arraybuffer" });

        return Buffer.from(data, 'binary')
    }
}

export default firRplFileDownloader