<template>
  <b-container fluid class='landing'>
    <div class='vertical-center'>
      <!-- Nav -->
      <CcNav class='nav'/>
      <!-- Greetings -->
      <div>
        <h1 class='display-4'>Seja bem vindo ao mach</h1>
        <h4 class='font-weight-light' style='line-height:170%'>A maneira mais fácil de se criar um plano de voo.
          <br>Para começar, preencha pelo menos um dos campos abaixo.</h4>
      </div>
      <!-- Form -->
      <CcForm/>
    </div>
  </b-container>
</template>

<script>

import CcNav from './Nav'
import CcForm from './Form'

export default {
  components: {
    CcForm,
    CcNav
  }
}

</script>

<style scoped>

.landing {
  background: #3c3d97 url('../../assets/background.jpg') repeat;
  height: 100vh;
  display:block;
  color: #fff
}

.vertical-center {
  display:table-cell;
  vertical-align:middle;
  height: 100vh;
}

.nav {
  position: fixed;
  top: 0
}

</style>
