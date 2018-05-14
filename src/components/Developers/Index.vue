<template>
<div>
  <CcNav/><br>
  <b-container fluid>
    <CcIntro/>
  </b-container>
  <CcFooter/>
</div>
</template>

<script>

import CcNav from './Nav'
import CcIntro from './Intro'
import CcFooter from '../Common/Footer'

export default {
  components: {
    CcNav,
    CcIntro,
    CcFooter
  }
}
</script>

<style>

</style>
