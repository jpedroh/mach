<template>
  <b-form>
    <!-- Departure -->
    <b-form-group>
      <b-form-input @keyup.enter.native='getFlights' style='padding:15px' size='lg' v-model='query.departure' type='text' placeholder='Partida (Ex.: SBGR)'></b-form-input>
    </b-form-group>
    <!-- Arrival -->
    <b-form-group>
      <b-form-input @keyup.enter.native='getFlights' style='padding:15px' size='lg' v-model='query.arrival' type='text' placeholder='Chegada (Ex.: SBGL)'></b-form-input>
    </b-form-group>
    <!-- Company -->
    <b-form-group>
      <b-form-select size='lg' style='padding:15px;height:60px' v-model="query.company" class="mb-3">
        <option :value="null">Companhia (Ex.: GOL)</option>
        <option value="AZU">AZUL</option>
        <option value="GLO">GOL</option>
        <option value="LAP">LINHAS AÉREAS PARAGUAIAS</option>
        <option value="MAP">MAP</option>
        <option value="MWM">MODERN LOGISTICS</option>
        <option value="ONE">AVIANCA</option>
        <option value="PTB">PASSAREDO</option>
        <option value="SID">SIDERAL</option>
        <option value="TAM">LATAM</option>
        <option value="TTL">TOTAL</option>
      </b-form-select>
    </b-form-group>
    <!-- Start button -->
    <b-row>
      <b-col>
        <b-button size='lg' block @click='getFlights' variant='primary'>Começar</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      query: { departure: null, arrival: null, company: null }
    }
  },
  methods: {
    getFlights () {
      const query = this.query
      Object.keys(query).forEach((key) => {
        if (query[key] !== null) {
          query[key] = query[key].toUpperCase()
        }
        query[key] == null && delete query[key]
      })
      axios.get(`https://us-central1-mach-app.cloudfunctions.net/api/flights`, {
        params: query
      }).then(data => {
        localStorage.setItem('flights', JSON.stringify(data.data))
        this.$router.push('/')
      })
      .catch(err => {
        this.$emit('noFlights', err)
        this.query = { departure: null, arrival: null, company: null }
      })
    }
  }
}

</script>
