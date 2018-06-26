<template>
  <b-container fluid>
    <CcNav></CcNav><br>
    <CcTable @noAlternate="$refs.sb.snackbar('Ocorreu um erro ao procurar alternativos para esta rota', '#d9534f')"></CcTable>
    <CcFooter></CcFooter>
  </b-container>
</template>

<script>

import CcNav from './Nav'
import CcTable from './Table'
import CcFooter from '../Common/Footer'

export default {
  components: {
    CcNav,
    CcTable,
    CcFooter
  },
  mounted () {
    if (this.$store.getters.flightsTable.length === 0) {
      this.$router.push('/landing')
    }
  }
}

</script>
