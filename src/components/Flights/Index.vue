<template>
  <b-container fluid>
    <CcNav></CcNav><br>
    <CcTable></CcTable>
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
    if (localStorage.getItem('flights') === null || !localStorage.getItem('flights')) {
      this.$router.push('/landing')
    }
  }
}

</script>