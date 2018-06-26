<template>
  <b-form @submit="getFlights">
    <!-- Departure -->
    <b-form-group>
      <b-form-input style='padding:15px' size='lg' v-model='query.departure' type='text' placeholder='Partida (Ex.: SBGR)'></b-form-input>
    </b-form-group>
    <!-- Arrival -->
    <b-form-group>
      <b-form-input style='padding:15px' size='lg' v-model='query.arrival' type='text' placeholder='Chegada (Ex.: SBGL)'></b-form-input>
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
        <b-button type='submit' size='lg' block variant='primary'>
          <span v-if="!loading">Começar</span>
          <Spinner v-if="loading"/>
        </b-button>
      </b-col>
    </b-row>
    <notifications group="error" position="bottom"/>
  </b-form>
</template>

<script>

import Spinner from 'vue-simple-spinner'

export default {
  components: {
    Spinner
  },
  data () {
    return {
      query: { departure: null, arrival: null, company: null },
      loading: false
    }
  },
  methods: {
    getFlights (evt) {
      evt.preventDefault()
      this.loading = true
      this.$store.dispatch('fetchFlights', this.query)
        .then(_ => this.$router.push('/'))
        .catch(error => {
          console.error(error)
          this.$notify({
            group: 'error',
            type: 'error',
            title: 'Ops!',
            text: 'Nenhum voo encontrado.',
            classes: 'vue-notification notification'
          })
          this.loading = false
          this.query = { departure: null, arrival: null, company: null }
        })
    }
  }
}

</script>
