import axios from 'axios'

export function getRoute ({departure, arrival, route}) {
  if (localStorage.sita) {
    return JSON.parse(localStorage.sita)
  }
  return axios.get(`http://localhost:5000/mach-app/us-central1/api/sita`, {
    params: {
      departure: departure,
      arrival: arrival,
      route: route
    }
  })
  .then(data => {
    localStorage.sita = JSON.stringify(data.data)
    return data.data
  })
}

export function getAirport (apt) {
  if (localStorage[apt]) {
    return JSON.parse(localStorage[apt])
  }
  return axios.get(`https://us-central1-mach-app.cloudfunctions.net/api/airports/${apt}`)
    .then(data => {
      localStorage[apt] = JSON.stringify(data.data)
      return data.data
    })
}

export async function getMeteorology (apt) {
  const metar = await getMetar(apt)
  const taf = await getTaf(apt)
  return { metar, taf }
}

export function getEET (departure, arrival) {
  return axios.get(`https://us-central1-mach-app.cloudfunctions.net/api/flights`, {
    params: {
      departure: departure,
      arrival: arrival
    }
  }).then(data => data.data[0].eet)
}

function getMetar (apt) {
  return axios.get(`https://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=${apt}&msg=metar&data_hora=nao`).then(dados => dados.data.split('\n'))
}

function getTaf (apt) {
  return axios.get(`https://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=${apt}&msg=taf&data_hora=nao&saida_html=sim`).then(dados => dados.data.split('<br />'))
}
