<template>
    <nav class='navbar navbar-expand-lg navbar-light bg-light'>
        <div class='container'>
            <a class='navbar-brand'>mach</a>
            <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                <span class='navbar-toggler-icon'></span>
            </button>
            <div class='collapse navbar-collapse' id='navbarNav'>
                <ul class='navbar-nav'>
                    <li class='nav-item'>
                        <router-link class='nav-link' v-bind:to='"/api"'>Desenvolvedores</router-link>
                    </li>
                    <li class='nav-item'>
                        <a class='nav-link' href='mailto:joao.pedro.hsd@gmail.com'>Enviar Feedback</a>
                    </li>
                    <li class='nav-item'>
                        <a class='nav-link' target='_blank' href='https://github.com/jpedroh/mach'>Ver o código no GitHub</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>