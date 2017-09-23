<template>
<div>
    <CcNav></CcNav>

    <!-- App -->
    <div class='container-fluid conteudo'>
        <!-- Saudação -->
        <h2 v-if="tipo === 'rota'">Encontrei {{ rotas.length }} sugestões para a rota {{ partida }} <i class='fa fa-long-arrow-right' aria-hidden='true'></i> {{ chegada }}</h2>
        <h2 v-else-if="tipo === 'partida'">Encontrei {{ rotas.length }} rotas que partem de {{ partida }}</h2>
        <h2 v-else-if="tipo === 'chegada'">Encontrei {{ rotas.length }} rotas que chegam em {{ chegada }}</h2>
        
        <!-- Tabelas -->
        <input type="text" class="form-control" v-model="pesquisa" placeholder="Filtrar resultados"/>
        <vue-good-table :externalSearchQuery="pesquisa" :columns="colunas" :rows="rotas" :defaultSortBy="{field: 'callsign', type: 'asc'}" :globalSearch="true" :paginate="false" styleClass="table table-striped">
             <template slot="table-row" scope="props">
                <td>{{ props.row.callsign }}</td>
                <td v-if="tipo === 'chegada'">{{ props.row.partida }}</td>
                <td v-if="tipo === 'partida'">{{ props.row.chegada }}</td>
                <td>{{ props.row.rota }}</td>
                <td v-if="tipo === 'rota'">{{ props.row.fl }}</td>
                <td>{{ props.row.eobt }}Z</td>
                <td>{{ props.row.aeronave }}</td>
                <td>{{ props.row.eet }}</td>
                <td id='acao'><a data-toggle='modal' v-bind:href="'#modal'+props.row.callsign+''">Ver Briefing</a> | <a class='blue-text text-darken-4' href="javascript:void(0)" v-on:click="fpl(props.row.id)">IVAO FPL</a>
                </td>
            </template>
        </vue-good-table>
    </div>

    <!--Modais Pré-Briefing-->
    <div v-for="rota in rotas" class='modal fade' :id="'modal'+ rota.callsign +''" tabindex='-1' role='dialog' aria-labelledby='label' aria-hidden='true'>
        <form @submit.prevent class='form-signin'>
            <div class='modal-dialog' role='document'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class='modal-title' id='label'>Pré-briefing - Voo {{ rota.callsign }}</h5>
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
                            <input v-model="pob" type='number' placeholder="POB" required class='form-control'> </div>
                    </div>
                    <div class='modal-footer'>
                        <button type='button' class='btn btn-secondary' data-dismiss='modal'>Voltar a seleção</button>
                        <button class='btn btn-primary' v-on:click="montaBriefing(rota)" data-dismiss='modal'>Ir para o briefing</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
  // Imports
  import CcNav from './blocos/navVoos.vue'
  import uniq from 'lodash/uniq'
  import _ from 'lodash'
  import FileSaver from 'file-saver'
  
  // Vue
  export default {
    // Dados
    data () {
      return {
        pesquisa: '',
        partida: localStorage.getItem('partida'),
        chegada: localStorage.getItem('chegada'),
        tipo: localStorage.getItem('selecao'),
        alternados: [],
        alternado: 'TBA',
        pob: null,
        rotas: [],
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
            label: 'EOBT',
            field: 'eobt',
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
      if (localStorage.getItem('selecao') === null || !localStorage.getItem('selecao')) {
        window.location.href = '#/selecao'
      }
      this.inicializar()
      this.pegaAlternados()
    },
    methods: {
      inicializar () {
        // Declaração de Variáveis
        let self = this // variável auxiliar
        let query = null // query no rest
        // Define o tipo da query
        switch (localStorage.getItem('selecao')) {
          case 'rota':
            query = 'https://mach-app.firebaseio.com/rotas.json?orderBy="trecho"&equalTo="' + this.partida + this.chegada + '"'
            break
          case 'partida':
            query = 'https://mach-app.firebaseio.com/rotas.json?orderBy="partida"&equalTo="' + this.partida + '"'
            break
          case 'chegada':
            query = 'https://mach-app.firebaseio.com/rotas.json?orderBy="chegada"&equalTo="' + this.chegada + '"'
            break
        }
        // Query
        this.$http.get(query).then(resposta => {
          // Converte a resposta da query em um array
          Object.keys(resposta.body).forEach(function (key) {
            self.rotas.push(resposta.body[key])
          })
          // Verifica se existe consulta prévia ou se a rota existe no DB
          if (!self.rotas.length) {
            window.location.href = '#/selecao'
            localStorage.setItem('erro', 'rota nula')
          }
        })
      },
      fpl (id) {
        // Query
        this.$http.get('https://mach-app.firebaseio.com/rotas/' + id + '.json').then((resposta) => {
          let dados = resposta.body
          // Gera o arquivo e salva
          let blob = new Blob(['[FLIGHTPLAN]\r\nID=' + dados.callsign + '\r\nRULES=' + dados.regra + '\r\nFLIGHTTYPE=S\r\nNUMBER=1\r\nACTYPE=' + dados.aeronave + '\r\nWAKECAT=' + dados.esteira + '\r\nEQUIPMENT=' + dados.eqpt + '\r\nDEPICAO=' + dados.partida + '\r\nSPEEDTYPE=N\r\nSPEED=' + dados.velocidade.match(/\d+/)[0] + '\r\nLEVELTYPE=F\r\nLEVEL=' + dados.fl + '\r\nROUTE=' + dados.rota + '\r\nDESTICAO=' + dados.chegada + '\r\nEET=' + dados.eet + '\r\nOTHER=' + dados.rmk], {type: 'text/plain;charset=utf-8'})
          FileSaver.saveAs(blob, dados.callsign + '.fpl')
        })
      },
      pegaAlternados () {
        // let self = this // variável auxiliar
        this.$http.get('https://mach-app.firebaseio.com/rotas.json?orderBy="partida"&equalTo="' + this.chegada + '"').then((resposta) => {
          this.alternados = uniq(_.orderBy(resposta.body, 'eet', 'asc').map(p => p.chegada))
        })
      },
      montaBriefing (voo) {
        localStorage.setItem('id', voo['id'])
        localStorage.setItem('alternado', this.alternado)
        localStorage.setItem('pob', this.pob)
        localStorage.setItem('briefing', true)
        localStorage.setItem('partida', voo['partida'])
        localStorage.setItem('chegada', voo['chegada'])
        localStorage.setItem('callsign', voo['callsign'])
        localStorage.setItem('aeronave', voo['aeronave'])
        localStorage.setItem('esteira', voo['esteira'])
        localStorage.setItem('eqpt', voo['eqpt'])
        localStorage.setItem('velocidade', voo['velocidade'])
        localStorage.setItem('altitude', voo['fl'])
        localStorage.setItem('rota', voo['rota'])
        localStorage.setItem('eet', voo['eet'])
        localStorage.setItem('eobt', voo['eobt'])
        localStorage.setItem('rmks', voo['rmk'])
        localStorage.setItem('eqpt', voo['eqpt'])
        localStorage.setItem('regra', voo['regra'])
        localStorage.setItem('briefing', 'true')
        // Redireciona
        window.location.href = '#/briefing'
      },
      defineCol (a) {
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