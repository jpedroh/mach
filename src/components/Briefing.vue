<template>
    <div>
        <CcNav></CcNav>
        <!-- App -->
        <div class='container-fluid conteudo'>
            <!--Saudação-->
            <h2> Voo {{callsign}} de {{partida}} para {{chegada}}</h2>
            <hr>

            <!-- Snackbar -->
            <Snackbar id='snackbar'></Snackbar>

            <!--Plano de voo-->
            <h4>Plano de voo simplificado</h4>
            <hr>
            <!--Linha 1-->
            <div class='row linha_briefing'>
                <div class="col">
                    <h6>Partida</h6>
                    <input type="text" readonly class="form-control-plaintext" v-bind:value="partida">
                </div>
                <div class="col">
                    <h6>Chegada</h6>
                    <input type="text" readonly class="form-control-plaintext" v-bind:value="chegada">
                </div>
                <div class="col">
                    <h6>Alternado</h6>
                    <input type="text" id="alternado" class="form-control" v-model="alternado" v-on:keyup.enter="atualiza('alternado')" v-bind:value="alternado">
                </div>
            </div>
            <!--Linha 2-->
            <div class='row linha_briefing'>
                <div class="col-4">
                    <h6>EOBT</h6>
                    <div class="input-group">
                        <input type="text" id="eobt" class="form-control" v-on:keyup.enter="atualiza('eobt')" v-bind:value="eobt">
                        <div class="input-group-addon">Z</div>
                    </div>
                </div>
                <div class="col-4">
                    <h6>Aeronave</h6>
                    <div class="input-group">
                        <input type="text" id="aeronave" class="form-control" v-on:keyup.enter="atualiza('aeronave')" v-bind:value="aeronave">
                        <div class="input-group-addon">/</div>
                        <select v-on:change="atualiza('esteira')" id='esteira' class="form-control">
                            <option selected>{{esteira}}</option>
                            <option value="L">L</option>
                            <option value="M">M</option>
                            <option value="H">H</option>
                        </select>
                    </div>
                </div>
                <div class="col-4">
                    <h6>EQPT</h6>
                    <input type="text" id="eqpt" class="form-control" v-on:keyup.enter="atualiza('eqpt')" v-bind:value="eqpt">
                </div>
            </div>

            <!--Linha 3-->
            <div class='row linha_briefing'>
                <div class="col">
                    <h6>FL</h6>
                    <form @submit.prevent>
                        <input type="number" id="altitude" class="form-control" v-on:keyup.enter="atualiza('altitude')" v-bind:value="altitude">
                    </form>
                </div>
                <div class="col">
                    <h6>Velocidade</h6>
                    <form @submit.prevent>
                        <input type="text" id="velocidade" class="form-control" v-on:keyup.enter="atualiza('velocidade')" v-bind:value="velocidade">
                    </form>
                </div>
                <div class="col">
                    <h6>EET</h6>
                    <form @submit.prevent>
                        <input type="text" id="eet" class="form-control" v-on:keyup.enter="atualiza('eet')" v-bind:value="eet">
                    </form>
                </div>
            </div>

            <!--Linha 4-->
            <div class='row linha_briefing'>
                <div class="col">
                    <h6>Rota</h6>
                    <form @submit.prevent>
                        <textarea type="text" @keydown.enter.prevent.stop="atualiza('rota')" id="rota" class="form-control" v-bind:value="rota"></textarea>
                    </form>
                </div>
            </div>

            <!--Linha 5-->
            <div class='row linha_briefing'>
                <div class="col">
                    <h6>FOB</h6>
                    <form @submit.prevent>
                        <input type="text" id="autonomia" class="form-control" v-on:keyup.enter="atualiza('autonomia')" v-bind:value="autonomia">
                    </form>
                </div>
                <div class="col"></div>
                <div class="col">
                    <h6>POB</h6>
                    <form @submit.prevent>
                        <div class="input-group">
                            <input type="number" id="pob" class="form-control" v-on:keyup.enter="atualiza('pob')" v-bind:value="pob">
                            <div v-on:click="atualiza('pob_random')" class="btn btn-outline-primary">Aleatório</div>
                        </div>
                    </form>
                </div>
            </div>

            <!--Linha 6-->
            <div class='row linha_briefing'>
                <div class="col">
                    <h6>RMKS</h6>
                    <form @submit.prevent>
                        <textarea type="text" id="rmks" class="form-control" @keydown.enter.prevent.stop="atualiza('rmks')" v-bind:value="rmks"></textarea>
                    </form>
                </div>
            </div>

            <!--Meteorologia-->
            <h4>Meteorologia</h4>
            <hr>
            <table class="table table-striped">
                <tbody>
                    <tr v-for="resposta in meteorologia">
                        <td><b>{{resposta.split(" ")[0]}} para {{resposta.split(" ")[1]}}</b> {{resposta}}</td>
                    </tr>
                </tbody>
            </table>

            <!--Cartas Aéreas-->
            <h4>Cartas Aéreas</h4>
            <hr>
            <ul class="nav nav-pills nav-justified nav-tabs" id="cartas_nav" role="tablist">
                <li class="nav-item">
                    <a id='partida_tab' class="nav-link active" data-toggle="tab" href="#partida" role="tab">{{partida}}</a>
                </li>
                <li class="nav-item">
                    <a id='chegada_tab' class="nav-link" data-toggle="tab" href="#chegada" role="tab">{{chegada}}</a>
                </li>
                <li class="nav-item">
                    <a id='alterna_tab' class="nav-link" data-toggle="tab" href="#alterna" role="tab">{{alternado}}</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane fade show active" id="partida" role="tabpanel">
                    <br>
                    <vue-good-table :globalSearchPlaceholder="'Filtrar resultados'" :columns="colunas_cartas" :rows="cartaspartida" :defaultSortBy="{field: 'tipo', type: 'asc'}" :globalSearch="true" :paginate="false" styleClass="table table-striped">
                        <template slot="table-row" scope="props">
                            <td>{{ props.row.tipo }}</td>
                            <td>{{ props.row.nome }}</td>
                            <td>{{ props.row.dt }}</td>
                            <td><a v-bind:href="props.row.link">Download</a>
                            </td>
                        </template>
                    </vue-good-table>
                </div>
                <div class="tab-pane fade" id="chegada" role="tabpanel">
                    <br>
                    <vue-good-table :globalSearchPlaceholder="'Filtrar resultados'" :columns="colunas_cartas" :rows="cartaschegada" :defaultSortBy="{field: 'tipo', type: 'asc'}" :globalSearch="true" :paginate="false" styleClass="table table-striped">
                        <template slot="table-row" scope="props">
                            <td>{{ props.row.tipo }}</td>
                            <td>{{ props.row.nome }}</td>
                            <td>{{ props.row.dt }}</td>
                            <td><a v-bind:href="props.row.link">Download</a>
                            </td>
                        </template>
                    </vue-good-table>
                </div>
                <div class="tab-pane fade" id="alterna" role="tabpanel">
                    <br>
                    <vue-good-table :globalSearchPlaceholder="'Filtrar resultados'" :columns="colunas_cartas" :rows="cartasalternado" :defaultSortBy="{field: 'tipo', type: 'asc'}" :globalSearch="true" :paginate="false" styleClass="table table-striped">
                        <template slot="table-row" scope="props">
                            <td>{{ props.row.tipo }}</td>
                            <td>{{ props.row.nome }}</td>
                            <td>{{ props.row.dt }}</td>
                            <td><a v-bind:href="props.row.link">Download</a>
                            </td>
                        </template>
                    </vue-good-table>
                </div>
            </div>
            <br>

            <!--Notams-->
            <h4>NOTAMs</h4>
            <hr>
            <ul class="nav nav-pills nav-justified nav-tabs" id="notams_nav" role="tablist">
                <li class="nav-item">
                    <a id='partidanotam_tab' class="nav-link active" data-toggle="tab" href="#partidanotam" role="tab">{{partida}}</a>
                </li>
                <li class="nav-item">
                    <a id='chegadanotam_tab' class="nav-link" data-toggle="tab" href="#chegadanotam" role="tab">{{chegada}}</a>
                </li>
                <li class="nav-item">
                    <a id='alternanotam_tab' class="nav-link" data-toggle="tab" href="#alternanotam" role="tab">{{alternado}}</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane fade show active" id="partidanotam" role="tabpanel">
                    <br>
                    <div v-for="notam in notampartida">
                        <h6>{{ notam.ident }} <span class="text-muted font-weight-normal"> de {{notam.inicio}} à {{notam.termino}}</span></h6>
                        <h6>{{ notam.periodo }}</h6>
                        <p>{{notam.mensagem}}</p>
                        <p>{{notam.f}}</p>
                        <p>{{notam.g}}</p>
                        <hr>
                    </div>
                </div>
                <div class="tab-pane fade" id="chegadanotam" role="tabpanel">
                    <br>
                    <div v-for="notam in notamchegada">
                        <h6>{{ notam.ident }} <span class="text-muted font-weight-normal"> de {{notam.inicio}} à {{notam.termino}}</span></h6>
                        <h6>{{ notam.periodo }}</h6>
                        <p>{{notam.mensagem}}</p>
                        <p>{{notam.f}}</p>
                        <p>{{notam.g}}</p>
                        <hr>
                    </div>
                </div>
                <div class="tab-pane fade" id="alternanotam" role="tabpanel">
                    <br>
                    <div v-for="notam in notamalternado">
                        <h6>{{ notam.ident }} <span class="text-muted font-weight-normal"> de {{notam.inicio}} à {{notam.termino}}</span></h6>
                        <h6>{{ notam.periodo }}</h6>
                        <p>{{notam.mensagem}}</p>
                        <p>{{notam.f}}</p>
                        <p>{{notam.g}}</p>
                        <hr>
                    </div>
                </div>
            </div>
            <br>

            <!-- Outros -->
            <h4>Outros</h4>
            <hr>
            <div class='row' ng-controller='planoResumido_Ctrl'>
                <div class='col'>
                    <a href="javascript:void(0)" v-on:click="fpl()" class='btn-block btn btn-lg btn-outline-primary'>Gerar plano de voo da IVAO</a>
                </div>
                <div class='col'>
                    <a v-bind:href="'https://skyvector.com/?fpl=' + velocidade +'F' + altitude + ' ' + partida + ' ' + rota + ' ' + chegada" target='_blank' class='btn-block btn btn-lg btn-outline-primary'>Ver essa rota no SkyVector</a>
                </div>
            </div>
            <p>O sistema de meteorologia e de cartas aéreas são derivados do DECEA e podem estar indisponíveis por razões que fogem de nosso controle.</p>
        </div>

    </div>
</template>

<script>
  import CcNav from './blocos/navBriefing.vue'
  import $ from 'jQuery'
  import FileSaver from 'file-saver'
  import Snackbar from './blocos/snackbar'

  export default {
    data () {
      return {
        regra: localStorage.getItem('regra'),
        chegada: localStorage.getItem('chegada'),
        partida: localStorage.getItem('partida'),
        callsign: localStorage.getItem('callsign'),
        alternado: localStorage.getItem('alternado'),
        aeronave: localStorage.getItem('aeronave'),
        esteira: localStorage.getItem('esteira'),
        eqpt: localStorage.getItem('eqpt'),
        eobt: localStorage.getItem('eobt'),
        altitude: localStorage.getItem('altitude'),
        velocidade: localStorage.getItem('velocidade'),
        eet: localStorage.getItem('eet'),
        rota: localStorage.getItem('rota'),
        pob: localStorage.getItem('pob'),
        rmks: localStorage.getItem('rmks'),
        autonomia: this.calculaAutonomia(),
        cartaspartida: [],
        cartaschegada: [],
        cartasalternado: [],
        notampartida: [],
        notamchegada: [],
        notamalternado: [],
        meteorologia: this.met(),
        colunas_cartas: [
          {
            label: 'TIPO',
            field: 'tipo',
            filterable: true,
            width: '5%'
          },
          {
            label: 'NOME',
            field: 'nome',
            filterable: true,
            width: '70%'
          },
          {
            label: 'EMENDA',
            field: 'emenda',
            filterable: true,
            width: '15%'
          },
          {
            label: 'DOWNLOAD',
            width: '10%'
          }
        ]
      }
    },
    components: {
      CcNav,
      Snackbar
    },
    mounted () {
      if (localStorage.getItem('briefing') !== 'true') {
        window.location.href = '#'
      }
      // Puxa as cartas
      this.puxaCartas(localStorage.getItem('partida'), 'partida')
      this.puxaCartas(localStorage.getItem('chegada'), 'chegada')
      this.puxaCartas(localStorage.getItem('alternado'), 'alternado')
      // Puxa os notams
      this.puxaNotams(localStorage.getItem('partida'), 'partida')
      this.puxaNotams(localStorage.getItem('chegada'), 'chegada')
      this.puxaNotams(localStorage.getItem('alternado'), 'alternado')
    },
    methods: {
      snackbar (mensagem, cor) {
        this.mensagem = mensagem
        let x = document.getElementById('snackbar')
        x.innerText = this.mensagem
        x.style.backgroundColor = cor
        x.className = 'show'
        setTimeout(function () {
          x.className = x.className.replace('show', '')
        }, 3000)
      },
      atualiza (tipo) {
        if (tipo !== 'pob_random') {
          let campo = document.getElementById(tipo)
          localStorage.setItem(tipo, campo.value.toUpperCase())
          this.snackbar('Campo ' + tipo + ' atualizado')
          switch (tipo) {
            case 'alternado':
              this.alternado = localStorage.getItem(tipo)
              this.met()
              this.calculaAutonomia()
              this.cartasalternado = []
              this.notamalternado = []
              this.puxaCartas(localStorage.getItem('alternado'), 'alternado')
              this.puxaNotams(localStorage.getItem('alternado'), 'alternado')
              break
            case 'eet':
              this.calculaAutonomia()
              this.eet = localStorage.getItem(tipo)
              break
            case 'altitude':
              this.altitude = localStorage.getItem(tipo)
              break
            case 'velocidade':
              this.velocidade = localStorage.getItem(tipo)
              break
            case 'aeronave':
              this.aeronave = localStorage.getItem(tipo)
              break
            case 'eqpt':
              this.eqpt = localStorage.getItem(tipo)
              break
            case 'rota':
              this.rota = localStorage.getItem(tipo)
              break
            case 'rmks':
              this.rmks = localStorage.getItem(tipo)
              break
          }
        } else {
          this.pob = Math.floor(Math.random() * 250) + 2
        }
      },
      puxaCartas (aeroporto, local) {
        let self = this
        $.ajax({
          url: 'https://www.aisweb.aer.mil.br/api/?apiKey=1934217367&apiPass=e9062beb-43f1-11e7-a4c1-00505680c1b4&area=cartas&IcaoCode=' + aeroporto,
          async: true,
          dataType: 'xml',
          timeout: 3000,
          success: function (retorno) {
            let objeto = {}
            $(retorno).find('item').each(function () {
              objeto['tipo'] = $(this).find('tipo').text()
              objeto['nome'] = $(this).find('nome').text()
              objeto['dt'] = $(this).find('dt').text()
              objeto['link'] = $(this).find('link').text()
              switch (local) {
                case 'partida':
                  self.cartaspartida.push({tipo: objeto['tipo'], nome: objeto['nome'], dt: objeto['dt'], link: objeto['link']})
                  break
                case 'chegada':
                  self.cartaschegada.push({tipo: objeto['tipo'], nome: objeto['nome'], dt: objeto['dt'], link: objeto['link']})
                  break
                case 'alternado':
                  self.cartasalternado.push({tipo: objeto['tipo'], nome: objeto['nome'], dt: objeto['dt'], link: objeto['link']})
                  break
              }
            })
          }
        })
      },
      puxaNotams (aeroporto, local) {
        let self = this
        $.ajax({
          url: 'https://www.aisweb.aer.mil.br/api/?apiKey=1934217367&apiPass=e9062beb-43f1-11e7-a4c1-00505680c1b4&area=notam&IcaoCode=' + aeroporto,
          async: true,
          dataType: 'xml',
          timeout: 3000,
          success: function (retorno) {
            let objeto = {}
            $(retorno).find('item').each(function () {
              objeto['ident'] = $(this).find('n').text()
              objeto['inicio'] = self.dataNotam($(this).find('b').text())
              objeto['periodo'] = $(this).find('d').text()
              objeto['e'] = $(this).find('e').text()
              objeto['f'] = $(this).find('f').text()
              objeto['termino'] = self.dataNotam($(this).find('c').text())
              objeto['mensagem'] = $(this).find('e').text()
              switch (local) {
                case 'partida':
                  self.notampartida.push({ident: objeto['ident'], periodo: objeto['periodo'], e: objeto['e'], f: objeto['f'], inicio: objeto['inicio'], termino: objeto['termino'], mensagem: objeto['mensagem']})
                  break
                case 'chegada':
                  self.notamchegada.push({ident: objeto['ident'], periodo: objeto['periodo'], e: objeto['e'], f: objeto['f'], inicio: objeto['inicio'], termino: objeto['termino'], mensagem: objeto['mensagem']})
                  break
                case 'alternado':
                  self.notamalternado.push({ident: objeto['ident'], periodo: objeto['periodo'], e: objeto['e'], f: objeto['f'], inicio: objeto['inicio'], termino: objeto['termino'], mensagem: objeto['mensagem']})
                  break
              }
            })
          }
        })
      },
      met () {
        this.$http.get('https://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=' + localStorage.getItem('partida') + ',' + localStorage.getItem('chegada') + ',' + localStorage.getItem('alternado') + '&msg=metar,taf&data_hora=nao').then((response) => {
          this.meteorologia = response.body.substr(0, response.body.length - 1).split('\n')
        })
      },
      fpl () {
        let blob = new Blob(['[FLIGHTPLAN]\r\nID=' + this.callsign + '\r\nDEPTIME=' + this.eobt + '\r\nRULES=' + this.regra + '\r\nFLIGHTTYPE=S\r\nNUMBER=1\r\nACTYPE=' + this.aeronave + '\r\nWAKECAT=' + this.esteira + '\r\nEQUIPMENT=' + this.eqpt + '\r\nDEPICAO=' + this.partida + '\r\nSPEEDTYPE=N\r\nSPEED=' + this.velocidade.match(/\d+/)[0] + '\r\nLEVELTYPE=F\r\nLEVEL=' + this.altitude + '\r\nROUTE=' + this.rota + '\r\nDESTICAO=' + this.chegada + '\r\nEET=' + this.eet + '\r\nALTICAO=' + this.alternado + '\r\nOTHER=' + this.rmks + '\r\nPOB=' + this.pob + '\r\nENDURANCE=' + this.autonomia], {type: 'text/plain;charset=utf-8'})
        FileSaver.saveAs(blob, this.callsign + '.fpl')
      },
      calculaAutonomia () {
        // Query
        this.$http.get('https://mach-app.firebaseio.com/rotas.json?orderBy="trecho"&equalTo="' + localStorage.getItem('chegada') + localStorage.getItem('alternado') + '"&limitToFirst=1').then((resposta) => {
          let eetalternado = null
          // Converte a resposta da query em um array
          if (resposta.body !== null) {
            Object.keys(resposta.body).forEach(function (key) {
              eetalternado = resposta.body[key]['eet']
            })
          }
          // Verifica
          if (eetalternado === null) {
            this.autonomia = '0000'
            localStorage.setItem('autonomia', '0000')
          } else {
            // Monta a autonomia
            var eet = localStorage.getItem('eet')
            // Calcula a autonomia
            let ab = this.horasMinutos(eet)
            let bc = this.horasMinutos(eetalternado)
            // Seta a autonomia
            let autonomia = (ab + Math.ceil(0.1 * ab) + 30 + bc)
            // Formata o FOB
            if (autonomia !== 'false') {
              var hrs = Math.trunc(autonomia / 60) < 10 ? '0' + Math.trunc(autonomia / 60) : Math.trunc(autonomia / 60)
              var min = autonomia % 60
              if (min < 60 && min > 9) {
              } else if (min > 0 && min < 9) {
                min = '0' + min
              } else {
                min = '00'
              }
            } else {
              min = '00'
              hrs = '00'
            }
            this.autonomia = hrs + min
            localStorage.setItem('autonomia', hrs + min)
          }
        })
      },
      horasMinutos (a) {
        return parseInt((a[0] + a[1]) * 60) + parseInt((a[2] + a[3]))
      },
      dataNotam (a) {
        if (a === 'PERM') {
          return a
        } else {
          return a[4] + a[5] + '/' + a[2] + a[3] + '/' + a[0] + a[1] + ' ' + a[6] + a[7] + ':' + a[8] + a[9]
        }
      }
    }
  }

</script>

<style>

.linha_briefing {
    margin-bottom:20px;
}

</style>