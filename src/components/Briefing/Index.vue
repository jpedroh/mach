<template>
  <b-container fluid>
    <CcNav/><br>
    <h2>Voo {{ flight.callsign }} de {{ flight.departure }} para {{ flight.arrival }}</h2><hr><br>
    <CcData/>
    <CcAirports/><br>
    <CcMap/>
    <CcExtras/>
    <CcFooter/>
  </b-container>
</template>

<script>

import CcNav from './Nav'
import CcData from './Data'
import CcExtras from './Extras'
import CcMap from './Map'
import CcAirports from './Airports'
import CcFooter from '../Common/Footer'

export default {
  computed: {
    flight () {
      return this.$store.getters.flight
    }
  },
  components: {
    CcData,
    CcAirports,
    CcExtras,
    CcNav,
    CcMap,
    CcFooter
  },
  mounted () {
    if (this.$store.getters.flightsTable.length === 0) {
      this.$router.push('/landing')
    }
  }
}

</script>
