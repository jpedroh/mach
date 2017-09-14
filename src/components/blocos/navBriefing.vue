<template>
  <!-- Navbar -->
    <nav class='navbar navbar-expand-lg navbar-light bg-light'>
        <div class='container-fluid'>
            <span class='navbar-brand'>mach</span>
            <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span class='navbar-toggler-icon'></span>
          </button>
            <div class='collapse navbar-collapse' id='navbarNav'>
                <ul class='navbar-nav'>
                    <li class='nav-item'>
                        <router-link class='nav-link' v-bind:to="'/'">Voltar a seleção</router-link>
                    </li>
                    <li class='nav-item'>
                        <a class='nav-link' v-on:click="logout" href='javascript:void(0)'>Sair</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>  
</template>

<script>
  export default {
    methods: {
      logout: function () {
        localStorage.clear()
        window.location.href = '#/selecao'
      }
    }
  }
</script>