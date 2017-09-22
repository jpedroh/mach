<template>
   <div>
      <!-- Navbar -->
      <CcNav></CcNav>
      <!--Saudação e formulário-->
      <div class='container-fluid text-center' id='mensagem'>
         <h1 class='display-3'>Seja bem vindo ao mach</h1>
         <br>
         <p class='lead' style='font-size:180%'>A maneira mais fácil de se criar um plano de voo.<br>Para começar, escolha como você quer filtrar os voos.</p>
         <div class='form-group' id='formulario'>
            <select style='height:70px' class="form-control form-control-lg" v-model="pesquisa" required>
               <option value="rota">Por rota</option>
               <option value="partida">Por partida</option>
               <option value="chegada">Por chegada</option>
            </select>
            <br>
          <div v-if="pesquisa === 'rota'">
               <input id='partida' type='text' v-model="partida" v-on:keyup.enter="comecar" required class='form-control form-control-lg' placeholder='Partida (Ex.: SBGR)'><br>
               <input id='chegada' type='text' v-model="chegada" v-on:keyup.enter="comecar" required class='form-control form-control-lg' placeholder='Chegada (Ex.: SBGR)'><br>
            </div>
            <div v-else-if="pesquisa === 'partida'">
               <input id='partida' type='text' v-model="partida" v-on:keyup.enter="comecar" required class='form-control form-control-lg' placeholder='Partida (Ex.: SBGR)'><br>
            </div>
            <div v-else-if="pesquisa === 'chegada'">
               <input id='partida' type='text' v-model="chegada" v-on:keyup.enter="comecar" required class='form-control form-control-lg' placeholder='Chegada (Ex.: SBGR)'><br>
            </div>
            <div class='row'>
               <div class='col'><button v-on:click='sorte' class='btn-block btn btn-primary btn-lg'>Estou com sorte</button></div>
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
      chegada: null,
      voo: null,
      pesquisa: 'rota'
    }
  },
  methods: {
    comecar: function () {
      switch (this.pesquisa) {
        case 'rota':
          if (this.partida != null && this.chegada != null) {
            localStorage.setItem('chegada', this.chegada.toUpperCase())
            localStorage.setItem('partida', this.partida.toUpperCase())
            localStorage.setItem('selecao', 'rota')
            window.location.href = '#'
          } else {
            this.snackbar('Preencha os campos corretamente', '#d9534f')
          }
          break
        case 'partida':
          if (this.partida != null) {
            localStorage.setItem('partida', this.partida.toUpperCase())
            localStorage.setItem('selecao', 'partida')
            window.location.href = '#'
          } else {
            this.snackbar('Preencha os campos corretamente', '#d9534f')
          }
          break
        case 'chegada':
          if (this.chegada != null) {
            localStorage.setItem('chegada', this.chegada.toUpperCase())
            localStorage.setItem('selecao', 'chegada')
            window.location.href = '#'
          } else {
            this.snackbar('Preencha os campos corretamente', '#d9534f')
          }
          break
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
    },
    sorte: function () {
      this.snackbar('Função em manutenção', '#d9534f')
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