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
    <!-- Start button -->
    <b-row>
      <b-col>
        <b-button size='lg' block @click='getFlights' variant='primary'>Começar</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>

import { getFlightsDepArr, getFlightsDep, getFlightsArr } from '../../data/firebase/functions/getFlights'

export default {
  data () {
    return {
      query: { departure: null, arrival: null }
    }
  },
  methods: {
    async getFlights () {
      let flights = []
      if (this.query.departure && this.query.arrival) {
        flights = await getFlightsDepArr(this.query).catch(() => this.$emit('error'))
      } else if (this.query.departure && !this.query.arrival) {
        flights = await getFlightsDep(this.query).catch(() => this.$emit('error'))
      } else if (this.query.arrival && !this.query.departure) {
        flights = await getFlightsArr(this.query).catch(() => this.$emit('error'))
      }
      if (flights.length === 0) {
        return this.$emit('noFlights')
      }
      localStorage.setItem('flights', JSON.stringify(flights))
      return this.$router.push('/')
    }
  }
}

</script>