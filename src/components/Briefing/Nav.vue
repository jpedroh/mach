<template>
  <b-navbar toggleable='md' type='light'>
    <b-navbar-toggle target='nav_collapse'></b-navbar-toggle>
    <b-navbar-brand>mach</b-navbar-brand>
    <b-collapse is-nav id='nav_collapse'>
      <b-navbar-nav right>
        <b-nav-item class='link' v-on:click="$router.push('/')" href='javascript:void(0)'>Voltar para a seleção</b-nav-item>
        <b-nav-item class='link' href='mailto:joao.pedro.hsd@gmail.com'>Enviar Feedback/Reportar Bug</b-nav-item>
        <b-nav-item class='link' v-on:click="$router.push('/developers')" href='javascript:void(0)'>Desenvolvedores</b-nav-item>
        <b-nav-item class='link' v-on:click="logout" href='javascript:void(0)'>Sair</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/landing')
    }
  }
}
</script>
