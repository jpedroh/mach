<template>
  <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class='container-fluid'>
            <span class="navbar-brand">mach</span>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class='navbar-nav'>
                    <li class='nav-item'>
                        <a class='nav-link' href='mailto:joao.pedro.hsd@gmail.com'>Contato</a>
                    </li>
                    <li class='nav-item'>
                        <a class='nav-link' href='https://github.com/jpedroh/mach' target='_blank'>GitHub</a>
                    </li>
                    <li class='nav-item'>
                        <router-link class='nav-link' v-bind:to="'/'">Voltar</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>