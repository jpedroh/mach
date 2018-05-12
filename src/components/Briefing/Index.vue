<template>
  <b-container fluid>
    <CcNav/><br>
    <h2>Voo {{ data.callsign }} de {{ data.departure }} para {{ data.arrival }}</h2><hr><br>
    <CcData @chgAltn='changeAlternate()' @chgField="$refs.sb.snackbar('Campo alterado com sucesso')" :data='data'/>
    <CcAirports ref='aptBriefing' :data='data'/><br>
    <CcExtras :data='data'/>
    <!-- Snackbar -->
    <CcSnackbar ref='sb'></CcSnackbar>
    <CcFooter/>
  </b-container>
</template>

<script>

import CcNav from './Nav'
import CcData from './Data'
import CcExtras from './Extras'
import CcAirports from './Airports'
import CcFooter from '../Common/Footer'
import CcSnackbar from '../Common/Snackbar'

export default {
  data () {
    return {
      data: JSON.parse(localStorage.getItem('flight'))
    }
  },
  components: {
    CcData,
    CcAirports,
    CcExtras,
    CcNav,
    CcSnackbar,
    CcFooter
  },
  mounted () {
    if (localStorage.getItem('flight') === null || !localStorage.getItem('flight')) {
      this.$router.push('/landing')
    }
  },
  methods: {
    changeAlternate () {
      this.$refs.aptBriefing.changeAlternate()
      this.$refs.aptBriefing.weather()
      this.$refs.sb.snackbar('Campo alterado. Recalculando a autonomia.')
    }
  }
}

</script>
