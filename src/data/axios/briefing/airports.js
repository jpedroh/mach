import axios from 'axios'

export function getAirport (apt) {
  return axios.get(`https://us-central1-mach-app.cloudfunctions.net/getAirport?apt=${apt}`)
    .then(data => data.data)
}

export async function getMeteorology (apt) {
  const metar = await getMetar(apt)
  const taf = await getTaf(apt)
  return { metar, taf }
}

function getMetar (apt) {
  return axios.get(`https://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=${apt}&msg=metar&data_hora=nao`).then(dados => dados.data.split('\n'))
}

function getTaf (apt) {
  return axios.get(`https://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=${apt}&msg=taf&data_hora=nao&saida_html=sim`).then(dados => dados.data.split('<br />'))
}
