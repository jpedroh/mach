<template>
<div>
    <CcNav></CcNav>

    <!-- App -->
    <div class='container-fluid conteudo'>
        <!-- Saudação -->
        <h2 v-if="tipo === 'rota'">Encontrei {{ tamanho }} sugestões para a rota {{ partida }} <i class='fa fa-long-arrow-right' aria-hidden='true'></i> {{ chegada }}</h2>
        <h2 v-else-if="tipo === 'partida'">Encontrei {{ tamanho }} rotas que partem de {{ partida }}</h2>
        <h2 v-else-if="tipo === 'chegada'">Encontrei {{ tamanho }} rotas que chegam em {{ chegada }}</h2>
        
        <!-- Tabelas -->
        <input type="text" class="form-control" v-model="pesquisa" placeholder="Filtrar resultados"/>
        <vue-good-table :externalSearchQuery="pesquisa" :columns="colunas" :rows="voos" :defaultSortBy="{field: 'callsign', type: 'asc'}" :globalSearch="true" :paginate="false" styleClass="table table-striped">
             <template slot="table-row" scope="props">
                <td>{{ props.row.callsign }}</td>
                <td v-if="tipo === 'chegada'">{{ props.row.partida }}</td>
                <td v-if="tipo === 'partida'">{{ props.row.chegada }}</td>
                <td>{{ props.row.rota }}</td>
                <td v-if="tipo === 'rota'">{{ props.row.fl }}</td>
                <td>{{ props.row.std }}Z</td>
                <td>{{ props.row.aeronave }}</td>
                <td>{{ props.row.eet }}</td>
                <td id='acao'><a data-toggle='modal' v-bind:href="'#modal'+props.row.callsign+''">Ver Briefing</a> | <a class='blue-text text-darken-4' href="javascript:void(0)" v-on:click="fpl(props.row.id)">IVAO FPL</a>
                </td>
            </template>
        </vue-good-table>
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
  import FileSaver from 'file-saver'

  export default {
    data () {
      return {
        pesquisa: '',
        partida: localStorage.getItem('partida'),
        chegada: localStorage.getItem('chegada'),
        voos: [],
        tamanho: 0,
        tipo: localStorage.getItem('selecao'),
        alternados: [],
        alternado: 'TBA',
        pob: 1,
        i: 0,
        colunas: [
          {
            label: 'VOO',
            field: 'callsign',
            filterable: true,
            sortable: true
          },
          {
            label: 'DESTINO',
            field: 'destino',
            filterable: true,
            hidden: this.defineCol('chegada'),
            sortable: true
          },
          {
            label: 'PARTIDA',
            field: 'partida',
            filterable: true,
            hidden: this.defineCol('partida'),
            sortable: true
          },
          {
            label: 'ROTA',
            field: 'rota',
            filterable: true,
            sortable: true
          },
          {
            label: 'FL',
            field: 'fl',
            filterable: true,
            hidden: this.defineCol('fl'),
            sortable: true
          },
          {
            label: 'STD',
            field: 'std',
            filterable: true,
            sortable: true
          },
          {
            label: 'EQPT',
            field: 'eqpt',
            filterable: true,
            sortable: true
          },
          {
            label: 'EET',
            field: 'eet',
            filterable: true,
            sortable: true
          },
          {
            label: 'AÇÃO',
            filterable: true,
            sortable: true
          }
        ]
      }
    },
    components: {
      CcNav
    },
    mounted () {
      this.inicializar()
      this.verifica()
    },
    computed: {
      orderedUsers: function () {
        return _.orderBy(this.alternados, 'eet', 'asc')
      }
    },
    methods: {
      verifica: function () {
        if (localStorage.getItem('selecao') === null) {
          window.location.href = '#/selecao'
        }
      },
      fpl: function (id) {
        this.$http.get('http://jpedroh.com/mach/api/rpl.php?id=' + id).then((response) => {
          let dados = response.body[0]
          let blob = new Blob(['[FLIGHTPLAN]\r\nID=' + dados.callsign + '\r\nRULES=I\r\nFLIGHTTYPE=S\r\nNUMBER=1\r\nACTYPE=' + dados.aeronave + '\r\nWAKECAT=' + dados.esteira + '\r\nEQUIPMENT=' + dados.eqpt + '\r\nDEPICAO=' + dados.partida + '\r\nSPEEDTYPE=N\r\nSPEED=' + dados.velocidade.match(/\d+/)[0] + '\r\nLEVELTYPE=F\r\nLEVEL=' + dados.fl + '\r\nROUTE=' + dados.rota + '\r\nDESTICAO=' + dados.chegada + '\r\nEET=' + dados.eet + '\r\nOTHER=' + dados.rmk], {type: 'text/plain;charset=utf-8'})
          FileSaver.saveAs(blob, dados.callsign + '.fpl')
        })
      },
      inicializar: function () {
        switch (localStorage.getItem('selecao')) {
          case 'rota':
            this.puxa(1)
            break
          case 'partida':
            this.puxa(2)
            localStorage.removeItem('chegada')
            break
          case 'chegada':
            this.puxa(3)
            localStorage.removeItem('partida')
            break
        }
      },
      puxa: function (a) {
        let query = null
        switch (a) {
          case 1:
            query = 'http://jpedroh.com/mach/api/rpl.php?dep=' + localStorage.getItem('partida') + '&arr=' + localStorage.getItem('chegada')
            break
          case 2:
            query = 'http://jpedroh.com/mach/api/rpl.php?dep=' + localStorage.getItem('partida')
            break
          case 3:
            query = 'http://jpedroh.com/mach/api/rpl.php?arr=' + localStorage.getItem('chegada')
            break
        }
        this.$http.get(query).then((response) => {
          if (response.body === 'null') {
            window.location.href = '#/selecao'
            localStorage.setItem('erro', 'rota nula')
          }
          this.voos = response.body
          this.tamanho = response.body.length
          this.pegaAlternados()
        })
        this.partida = localStorage.getItem('partida')
        this.chegada = localStorage.getItem('chegada')
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
          localStorage.setItem('partida', response.body[0].partida)
          localStorage.setItem('chegada', response.body[0].chegada)
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
          localStorage.setItem('briefing', 'true')
          window.location.href = '#/briefing'
        })
      },
      defineCol: function (a) {
        switch (localStorage.getItem('selecao')) {
          case 'rota':
            if (a === 'fl') {
              return false
            } else {
              return true
            }
          case 'partida':
            if (a === 'chegada') {
              return false
            } else {
              return true
            }
          case 'chegada':
            if (a === 'partida') {
              return false
            } else {
              return true
            }
        }
      }
    }
  }

</script>

<style scoped>
  input {
    margin-bottom: 10px;
  }

  #acao {
    white-space: nowrap;
    overflow: hidden;
  }
</style>