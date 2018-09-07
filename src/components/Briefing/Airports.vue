<template>
  <div>
    <h4>Airports Briefings</h4>
    <hr>

    <b-alert show><b-badge variant="info">AVISO</b-badge> Algum briefing está faltando ou está incompleto? A API do AisWeb está instável e com alguns erros, o que pode resultar nesse problema.</b-alert>
    <b-card no-body>
      <b-tabs pills card>
        <!-- Airport tab -->
        <b-tab :title="airport.icao" v-for='(airport, index) in airports' :key='index+2500'>
          <b-card no-body>
            <b-tabs pills card vertical>
              <!-- ROTAER -->
              <b-tab v-if='airport.rotaer' title="ROTAER" active>
                <h4>{{ airport.rotaer.AeroCode }} - {{ airport.rotaer.name }}<span class='lead'> - {{ airport.rotaer.city }}/{{ airport.rotaer.state }}</span></h4><hr>
                <!-- Lead -->
                <p>
                      <b-badge variant="primary" v-b-tooltip.hover title="Tipo e categoria do aeródromo: Internacional/Doméstico">{{ airport.rotaer.type }} {{ airport.rotaer.category }}</b-badge>
                      <b-badge variant="primary" v-b-tooltip.hover title="Propriedade do aeródromo: público/privado e disposição militar">{{ airport.rotaer.typeUtil }}</b-badge>
                      <b-badge variant="primary" v-b-tooltip.hover title="Operador do aeródromo">{{ airport.rotaer.organization.name }}</b-badge>
                      <b-badge variant="primary" v-b-tooltip.hover title="Distância do centro da cidade (em Km)">{{ airport.rotaer.distance }}</b-badge>
                      <b-badge variant="primary" v-b-tooltip.hover title="Fuso horário">UTC{{ airport.rotaer.UTC }}</b-badge>
                      <b-badge variant="primary" v-b-tooltip.hover title="FIR e Jurisdição">{{ airport.rotaer.fir }} ({{ airport.rotaer.jurisdiction }})</b-badge>
                      <b-badge variant="primary" v-b-tooltip.hover title="Altitude em pés">{{ airport.rotaer.altitude }}ft</b-badge>
                  </p>

                <b-tabs pills card>
                  <b-tab title="Remarks" active>
                    <p :key='index' v-for="(remark, index) in airport.rotaer.remarks">
                      <b-badge variant="info" v-b-tooltip.hover :title="remark.code">{{ remark.code }}</b-badge> {{ remark.remark }}
                    </p>
                  </b-tab>
                  <b-tab title="Complementos">
                    <p :key='index+100' v-for="(complement, index) in airport.rotaer.complements">
                      <b-badge variant="info" v-b-tooltip.hover :title="complement.code">{{ complement.code }}</b-badge> {{ complement.complement }}
                    </p>
                  </b-tab>

                  <b-tab title="Pistas">
                    <div :key='index+200' v-for="(runway, index) in airport.rotaer.runways">
                      <h5>{{runway.type }} {{ runway.ident }}</h5><hr>
                      <p>
                        <b>Dimensões</b> {{ runway.length }}m x {{ runway.width }}m<br>
                        <b>PCN</b> {{ runway.surface }}<br>
                        <b>Luzes</b> <b-badge style='margin-right:5px' :key='index+1000' v-for="(light, index) in runway.lights" variant="info" v-b-tooltip.hover :title="light.description">{{ light.code }}</b-badge><br>
                        <span :key='index+1100' v-for="(threshold, index) in runway.thresholds">
                          <b>Luzes da cabeceira {{ threshold.ident }}</b> <b-badge style='margin-right:5px' :key='index+1200' v-for="(light, index) in threshold.lights" variant="info" v-b-tooltip.hover :title="light.description">{{ light.code }}</b-badge><br>
                        </span>
                    </p>

                    </div>
                  </b-tab>

                  <b-tab title="Balizamento">
                    <p :key='index+300' v-for="(light, index) in airport.rotaer.lights" >
                      <b-badge variant="info" v-b-tooltip.hover :title="light.description">{{ light.code }}</b-badge> {{ light.description }}
                    </p>
                  </b-tab>
                </b-tabs>

                <br>
              </b-tab>
              <!-- AIP Sup -->
              <b-tab v-if='airport.aip.length > 0' title="Suplemento AIP">
                  <span v-for='suplement in airport.aip' :key='suplement.id'>
                    <h5><b-badge variant="info">{{ suplement.serie }}{{ suplement.n }} | {{ formatDate(suplement.date) }}</b-badge> {{ suplement.title }}</h5>
                    <p style='font-size:112%' v-html="suplement.text.replace(/(?:\r\n|\r|\n)/g, '<br />')"/>
                    <p style='font-size:90%; color: #777'>
                      <b><font-awesome-icon icon="calendar-alt" /> Período</b> {{ suplement.duration }}<br>
                      <b>Ref</b> {{ suplement.ref }}<br>
                      <span v-if='suplement.anexo != ""'><b>Anexo</b>
                        <a target='_blank' v-bind:href="`https://docs.google.com/viewer?url=${suplement.anexo}`">
                          Visualizar <font-awesome-icon icon="external-link-alt" />
                        </a> |
                        <a v-bind:href="suplement.anexo">
                          <font-awesome-icon icon="download" /> Download
                        </a>
                      </span>
                    </p>
                  <hr>
                  </span>
              </b-tab>
              <!-- Cartas -->
              <b-tab v-if='airport.charts.length > 0' title="Cartas">
                  <b-row>
                  <b-col>
                    <b-form-input id='Procurar' type='text' v-model='filter' placeholder="Procurar"></b-form-input>
                  </b-col>
                </b-row>
                <br>
                <b-table :filter="filter" striped hover :fields="chartsFields" :items="airport.charts">
                  <template slot="name" slot-scope="data">
                    <b-badge variant="info" v-b-tooltip.hover :title="data.item.typeDescription">{{ data.item.type }}</b-badge> {{ data.item.name }}
                  </template>
                  <template slot="date" slot-scope="data">
                    {{ formatDate(data.item.date) }}
                  </template>
                  <template slot="link" slot-scope="data">
                    <a v-on:click="openModal(data.item)" href='javascript:void(0)'>
                      <i class="fa fa-search" aria-hidden="true"></i> Visualizar</a>
                      <a target='_blank' v-bind:href="`https://docs.google.com/viewer?url=${data.item.link}`">
                        <font-awesome-icon icon="external-link-alt" />
                      </a>|
                      <a v-bind:href="data.item.link">
                        <i class="fa fa-download" aria-hidden="true"></i> Download
                      </a>
                  </template>
                </b-table>
              </b-tab>
              <!-- Notams -->
              <b-tab v-if='airport.notams.length > 0' title="Notams">
                <div :key="notam.id" v-for="notam in airport.notams">
                  <h5><b-badge v-b-tooltip.hover :title="notam.tp" :variant="resolveVariant(notam.tp)">{{ notam.n }}</b-badge> <b-badge :variant="resolveVariant(notam.tp)">{{ notam.tp.substr(-1) }}</b-badge>
                      <b-badge v-if="notam.ref !== ''" variant="dark">{{ notam.ref }}</b-badge>
                  </h5>
                    <p style='font-size:112%' v-html="notam.e.replace(/(?:\r\n|\r|\n)/g, '<br />')"/>
                    <!-- Informações -->
                    <p style='font-size:90%; color: #777'>
                      <b><font-awesome-icon icon="calendar-alt"/> Data de expedição</b> {{ formatDate(notam.date) }}<br>
                      <b><font-awesome-icon icon="calendar-alt"/> Período</b> {{ formatNotamDate(notam.b) }} a {{ formatNotamDate(notam.c) }}<br>
                      <span v-if="notam.d != ''"><b><font-awesome-icon icon="clock"/> Vigência</b> {{ notam.d }}<br></span>
                    </p>
                  <hr>
                </div>
              </b-tab>
              <!-- Meteorologia -->
              <b-tab v-if='airport.meteorology' title="Meteorologia">
                <h5>METAR</h5><hr>
                <p>{{ airport.meteorology.metar.substr(airport.meteorology.metar.indexOf('-') + 2) }}</p>
                <h5>TAF</h5><hr>
                <p>{{ airport.meteorology.taf.substr(airport.meteorology.taf.indexOf('-') + 2) }}</p>
                <p style='float:right'>Esta aba é atualizada automaticamente a cada 10 minutos. <a href='javascript:void(0)' @click='refreshWeatherNow'>Atualizar Agora.</a></p><br>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-card>

    <!-- Modal -->
    <b-modal ref="chartsModal" id="modal-sc" size="lg" centered :title="modal.title" hide-footer>
      <b-embed type="iframe" aspect="1by1" :src="'https://docs.google.com/viewer?url=' + modal.link +'&embedded=true'" allowfullscreen></b-embed>
      <b-row>
        <b-col>
          <b-button class="mt-3" variant="outline-primary" block :href="modal.link">Baixar carta</b-button>
        </b-col>
        <b-col>
          <b-button class="mt-3" target='_blank' :href="`https://docs.google.com/viewer?url=${modal.link}`" variant="outline-primary" block>Abrir em nova aba</b-button>
        </b-col>
        <b-col>
      <b-btn class="mt-3" variant="outline-danger" block @click="closeModal()">Fechar carta</b-btn>
        </b-col>
      </b-row>
    </b-modal>
    <notifications group="error" position="bottom"/>

  </div>
</template>

<script>

import moment from 'moment'

export default {
  mounted () {
    this.refreshWeather()
  },
  computed: {
    airports () {
      return this.$store.getters.airports
    }
  },
  data () {
    return {
      teste: [],
      charts: [],
      notams: [],
      filter: null,
      modal: { link: null, title: null },
      chartsFields: [
        {
          key: 'name',
          label: 'Carta',
          sortable: true
        },
        {
          key: 'date',
          label: 'Data',
          sortable: true
        },
        {
          key: 'link',
          label: 'Ação',
          sortable: true
        }
      ]
    }
  },
  methods: {
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    refreshWeather () {
      this.$store.dispatch('refreshMeteorology', this.airports)
        .then(() => {
          this.$notify({
            group: 'error',
            type: 'success',
            title: 'Tudo pronto',
            text: 'Meteorologia dos aeroportos atualizadas.',
            classes: 'vue-notification notification'
          })
        })
        .catch(error => {
          console.error(error)
          this.$notify({
            group: 'error',
            type: 'error',
            title: 'Ops!',
            text: 'Algo deu errado!',
            classes: 'vue-notification notification'
          })
        })
      setTimeout(this.refreshWeather, 600000)
    },
    refreshWeatherNow () {
      this.$notify({
        group: 'error',
        type: 'info',
        title: 'Aguarde',
        text: 'Atualizando a meteorologia dos aeroportos agora.',
        classes: 'vue-notification notification'
      })
      this.$store.dispatch('refreshMeteorology', this.airports)
        .then(() => {
          this.$notify({
            group: 'error',
            type: 'success',
            title: 'Tudo pronto',
            classes: 'vue-notification notification'
          })
        })
        .catch(error => {
          console.error(error)
          this.$notify({
            group: 'error',
            type: 'error',
            title: 'Ops!',
            text: 'Algo deu errado!',
            classes: 'vue-notification notification'
          })
        })
    },
    openModal (item) {
      this.modal = { title: `[${item.type}] - ${item.name}`, link: item.link }
      this.$refs.chartsModal.show()
    },
    closeModal () {
      this.modal = { title: null, link: null }
      this.$refs.chartsModal.hide()
    },
    resolveVariant (type) {
      return type === 'NOTAMN' ? 'success' : 'info'
    },
    formatNotamDate (date) {
      return date instanceof Date ? moment(date).format('DD/MM/YYYY HH:mm') : date
    }
  }
}
</script>
