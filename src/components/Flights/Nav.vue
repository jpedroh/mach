<template>
  <b-navbar toggleable='md' type='light'>
    <b-navbar-toggle target='nav_collapse'></b-navbar-toggle>
    <b-navbar-brand>mach</b-navbar-brand>
    <b-collapse is-nav id='nav_collapse'>
      <b-navbar-nav right>
        <b-nav-item class='link' @click="logout" href='javascript:void(0)'>Nova Pesquisa</b-nav-item>
        <b-nav-item class='link' @click="$router.push('/briefing')">Briefing</b-nav-item>
        <b-nav-item class='link' href='mailto:joao.pedro.hsd@gmail.com'>Enviar Feedback/Reportar Bug</b-nav-item>
        <b-nav-item class='link' target='_blank' href='https://github.com/jpedroh/mach'>Ver o código no GitHub</b-nav-item>
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
