<template>
  <b-navbar toggleable='md' type='light'>
    <b-navbar-toggle target='nav_collapse'></b-navbar-toggle>
    <b-navbar-brand class='text-white'>mach</b-navbar-brand>
    <b-collapse is-nav id='nav_collapse'>
      <b-navbar-nav right>
        <b-nav-item class='link' href='mailto:joao.pedro.hsd@gmail.com'>Enviar Feedback</b-nav-item>
        <b-nav-item class='link' target='_blank' href='https://github.com/jpedroh/mach'>Desenvolvedores</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style scoped>

.link a {
  color: #fff !important
}

.link a:hover {
  color: #ccc !important
}

</style>
