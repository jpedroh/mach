<template>
  <div id="app">
    <router-view></router-view>
    <CcFooter></CcFooter>
  </div>

</template>

<script>
import CcFooter from './components/blocos/Footer.vue'

export default {
  name: 'app',
  components: {
    CcFooter
  }
}
</script>

<style>

.container-fluid{
  width: 90%
}

.conteudo {
    margin-top: 20px;
    margin-bottom: 20px
}

</style>