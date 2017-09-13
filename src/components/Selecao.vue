<template>
    <div>
        <!-- Navbar -->
        <CcNav></CcNav>
        
        <!--Saudação e formulário-->
        <div class='container text-center' id='mensagem'>
            <h1 class='display-3'>Seja bem vindo ao mach</h1>
            <br>
            <p class='lead' style='font-size:180%'>A maneira mais fácil de se criar um plano de voo.<br>Para começar, preencha ambos os campos.</p>
            <div class='form-group' id='formulario'>
                <input id='partida' type='text' v-model="partida" v-on:keyup.enter="comecar" required class='form-control form-control-lg' placeholder='Partida'><br>
                <input id='chegada' type='text' v-model="chegada" v-on:keyup.enter="comecar" required class='form-control form-control-lg' placeholder='Chegada'><br>
                <div class='row'>
                    <div class='col'><button v-on:click='comecar' class='btn-block btn btn-primary btn-lg'>Começar</button></div>
                </div>
            </div>
        </div>

        <!-- Snackbar -->
        <Snackbar id='snackbar'></Snackbar>
    </div>
</template>

<script>
import CcNav from './blocos/headers/selecao'
import Snackbar from './blocos/snackbar'

export default {
  data () {
    return {
      partida: null,
      chegada: null
    }
  },
  methods: {
    comecar: function () {
      if (this.partida != null && this.chegada != null) {
        localStorage.setItem('chegada', this.chegada.toUpperCase())
        localStorage.setItem('partida', this.partida.toUpperCase())
        window.location.href = '#'
      } else {
        this.snackbar('Preencha ambos os campos', '#d9534f')
      }
    },
    snackbar: function (mensagem, cor) {
      this.mensagem = mensagem
      let x = document.getElementById('snackbar')
      x.innerText = this.mensagem
      x.style.backgroundColor = cor
      x.className = 'show'
      setTimeout(function () {
        x.className = x.className.replace('show', '')
      }, 3000)
    }
  },
  mounted () {
    if (localStorage.getItem('erro') === 'rota nula') {
      this.snackbar('Nenhuma rota encontrada', '#d9534f')
      localStorage.removeItem('erro')
    }
  },
  components: {
    CcNav,
    Snackbar
  }
}
</script>

<style scoped>
  #mensagem {
    padding: 5% 0;
  }

  .btn{
    padding: 10px;
    cursor: pointer;
  }

  #formulario {
    margin: 0 auto;
    width: 60%;
  }

  input {
    padding: 20px;
  }

  #iniciar {
    padding: 2% 7%;
    float: right;
  }

  input:valid {
    text-transform: uppercase;
  }

  @media only screen and (max-width: 990px) {
    #formulario {
      margin: 0 auto;
      width: 80%
    }
    .display-3{
      font-size:400%;
    }
  }

  @media only screen and (max-width: 1200px) {
    #formulario {
      margin: 0 auto;
      width: 60%
    }
  }
</style>