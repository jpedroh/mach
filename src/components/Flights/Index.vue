<template>
  <b-container fluid>
    <CcNav></CcNav><br>
    <CcTable @noAlternate="$refs.sb.snackbar('Ocorreu um erro ao procurar alternativos para esta rota', '#d9534f')"></CcTable>
    <CcFooter></CcFooter>
    <CcSnackbar ref='sb'></CcSnackbar>
  </b-container>
</template>

<script>

import CcNav from './Nav'
import CcTable from './Table'
import CcFooter from '../Common/Footer'
import CcSnackbar from '../Common/Snackbar'

export default {
  components: {
    CcNav,
    CcTable,
    CcFooter,
    CcSnackbar
  },
  mounted () {
    if (localStorage.getItem('flights') === null || !localStorage.getItem('flights')) {
      this.$router.push('/landing')
    }
  }
}

</script>
