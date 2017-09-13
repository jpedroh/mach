<template>
<div>
    <CcNav></CcNav>

    <!-- App -->
    <div class='container conteudo'>
        <h2>Encontrei {{ tamanho }} sugestões para a rota {{ partida }} <i class='fa fa-long-arrow-right' aria-hidden='true'></i> {{ chegada }}</h2>
        <vue-good-table :globalSearchPlaceholder="'Filtrar resultados'" :columns="columns" :rows="voos" :defaultSortBy="{field: 'callsign', type: 'asc'}" :globalSearch="true" :paginate="false" styleClass="table table-striped">
            <template slot="table-row" scope="props">
                <td>{{ props.row.callsign }}</td>
                <td>{{ props.row.rota }}</td>
                <td>{{ props.row.fl }}</td>
                <td>{{ props.row.std }}Z</td>
                <td>{{ props.row.aeronave }}</td>
                <td>{{ props.row.eet }}</td>
                <td id='acao'><a data-toggle='modal' v-bind:href="'#modal'+props.row.callsign+''">Ver Briefing</a> | <a class='blue-text text-darken-4' v-bind:href="'fpl.php?id='+props.row.id+''">IVAO FPL</a>
                </td>
            </template>
        </vue-good-table>
    </div>

    <!-- Modal - Alteração -->
    <div class='modal fade' id='trocar' tabindex='-1' role='dialog' aria-labelledby='label' aria-hidden='true'>
        <form @submit.prevent class='form-signin'>
            <div class='modal-dialog' role='document'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class='modal-title' id='label'>Alterar rota</h5>
                        <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div class='modal-body'>
                        <p class='lead'>Escolha a rota</p>
                        <div class='form-group'>
                            <div class='form-group'>
                                <label class='form-control-label' for='partida'>Aeródromo de partida</label>
                                <input type='text' required class='form-control' id='partida' placeholder='Partida'>
                            </div>
                            <div class='form-group'>
                                <label class='form-control-label' for='partida'>Aeródromo de chegada</label>
                                <input type='text' required class='form-control' id='chegada' placeholder='Chegada'>
                            </div>
                        </div>
                    </div>
                    <div class='modal-footer'>
                        <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancelar</button>
                        <button class='btn btn-primary' v-on:click="alterar" data-dismiss='modal'>Alterar</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <!--Modais Pré-Briefing-->
    <div v-for="voo in voos" class='modal fade' :id="'modal'+ voo.callsign +''" tabindex='-1' role='dialog' aria-labelledby='label' aria-hidden='true'>
        <form @submit.prevent class='form-signin'>
            <div class='modal-dialog' role='document'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class='modal-title' id='label'>Pré-briefing - Voo {{ voo.callsign }}</h5>
                        <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div class='modal-body'>
                        <p class='lead'>Para começarmos:</p>
                        <div class='form-group'>
                            <label class='form-control-label' for='alternado'>Escolha um alternado</label>
                            <select class="form-control" v-model="alternado" required>
                                <option value="TBA">Outro</option>
                                <option v-for='sugestao in alternados' v-bind:value='sugestao'>{{sugestao}}</option>
                            </select>
                        </div>
                        <div class='form-group'>
                            <label class='form-control-label' for='pob'>Insira um POB</label>
                            <input v-model="pob" type='number' required class='form-control'> </div>
                    </div>
                    <div class='modal-footer'>
                        <button type='button' class='btn btn-secondary' data-dismiss='modal'>Voltar a seleção</button>
                        <button class='btn btn-primary' v-on:click="montaBriefing(voo.id)" data-dismiss='modal'>Ir para o briefing</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
  import CcNav from './blocos/navVoos.vue'
  import uniq from 'lodash/uniq'
  import _ from 'lodash'

  export default {
    data () {
      return {
        partida: localStorage.getItem('partida'),
        chegada: localStorage.getItem('chegada'),
        voos: [],
        tamanho: 0,
        alternados: [],
        alternado: 'TBA',
        pob: 1,
        columns: [
          {
            label: 'VOO',
            field: 'callsign',
            filterable: true
          },
          {
            label: 'ROTA',
            field: 'rota',
            filterable: true
          },
          {
            label: 'FL',
            field: 'fl',
            filterable: true
          },
          {
            label: 'STD',
            field: 'std',
            filterable: true
          },
          {
            label: 'EQPT',
            field: 'eqpt',
            filterable: true
          },
          {
            label: 'EET',
            field: 'eet',
            filterable: true
          },
          {
            label: 'AÇÃO',
            filterable: true
          }
        ]
      }
    },
    components: {
      CcNav
    },
    mounted () {
      this.puxa()
      this.verifica()
    },
    computed: {
      orderedUsers: function () {
        return _.orderBy(this.alternados, 'eet', 'asc')
      }
    },
    methods: {
      verifica: function () {
        if (localStorage.getItem('partida') === null) {
          window.location.href = '#/selecao'
        }
      },
      puxa: function () {
        this.$http.get('http://jpedroh.com/mach/api/rpl.php?dep=' + localStorage.getItem('partida') + '&arr=' + localStorage.getItem('chegada')).then((response) => {
          if (response.body === 'null') {
            window.location.href = '#/selecao'
            localStorage.setItem('erro', 'rota nula')
          }
          this.voos = response.body
          this.tamanho = response.body.length
          document.getElementById('partida').value = ''
          document.getElementById('chegada').value = ''
          this.pegaAlternados()
        })
        this.partida = localStorage.getItem('partida')
        this.chegada = localStorage.getItem('chegada')
      },
      alterar: function () {
        if (document.getElementById('partida').value !== '' && document.getElementById('chegada').value !== '') {
          localStorage.setItem('partida', document.getElementById('partida').value.toUpperCase())
          localStorage.setItem('chegada', document.getElementById('chegada').value.toUpperCase())
        }
        this.puxa()
      },
      pegaAlternados: function () {
        this.$http.get('http://jpedroh.com/mach/api/rpl.php?dep=' + localStorage.getItem('chegada')).then((response) => {
          this.alternados = uniq(_.orderBy(response.body, 'eet', 'asc').map(p => p.chegada))
        })
      },
      montaBriefing: function (id) {
        localStorage.setItem('id', id)
        localStorage.setItem('alternado', this.alternado)
        localStorage.setItem('pob', this.pob)
        localStorage.setItem('briefing', true)
        this.$http.get('http://jpedroh.com/mach/api/rpl.php?id=' + localStorage.getItem('id')).then((response) => {
          localStorage.setItem('callsign', response.body[0].callsign)
          localStorage.setItem('aeronave', response.body[0].aeronave)
          localStorage.setItem('esteira', response.body[0].esteira)
          localStorage.setItem('eqpt', response.body[0].eqpt)
          localStorage.setItem('velocidade', response.body[0].velocidade)
          localStorage.setItem('altitude', response.body[0].fl)
          localStorage.setItem('rota', response.body[0].rota)
          localStorage.setItem('eet', response.body[0].eet)
          localStorage.setItem('eobt', response.body[0].std)
          localStorage.setItem('rmks', response.body[0].rmk)
          localStorage.setItem('eqpt', response.body[0].eqpt)
          window.location.href = '#/briefing'
        })
      }
    }
  }

</script>

<style scoped>
  #partida:valid,
  #chegada:valid {
    text-transform: uppercase;
  }

  #acao,
  #rota {
    white-space: nowrap;
    overflow: hidden;
  }
</style>