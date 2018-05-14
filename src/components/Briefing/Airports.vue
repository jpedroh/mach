<template>
  <div>
    <h4>Airports Briefings</h4>
    <hr>
    <b-progress :max="100" class="mb-3" v-if="loading">
      <b-progress-bar :value="progress" label="Aguarde, carregando" />
    </b-progress>
<b-card no-body>
  <b-tabs pills card>
    <!-- Departure tab -->
    <b-tab :title="this.data.departure" active>
      <b-card no-body>
        <b-tabs pills card vertical>
          <!-- Airport Data -->
          <b-tab title="Dados" active>
            <h5>{{ departure.data.icao }} - {{ departure.data.iata }} - {{ departure.data.name }}</h5>
            <p class='lead'>{{ departure.data.city }} - {{ departure.data.city }}</p>
            <br>
            <h6>Pistas</h6>
            <b-table striped hover :fields="runwayFields" :items="departure.data.runways">
            </b-table>
          </b-tab>

          <!-- Airport Meteorology -->
          <b-tab title="Meteorologia">
            <h6>METAR</h6>
            <p v-bind:key="key + '-metar-dep'" v-for="(metar, key) in meteorology.departure.metar">{{ metar }}</p>
            <hr>
            <h6>TAF</h6>
            <p v-bind:key="key + '-taf-dep'" v-for="(taf, key) in meteorology.departure.taf">{{ taf }}</p>
            <p class='text-right'>Esta aba é atualizada a cada 10 minutos. <b-link @click='weather' href="#">Atualizar agora</b-link></p>
          </b-tab>

          <!-- Cartas -->
          <b-tab title="Cartas">
            <b-row>
              <b-col>
                <b-form-input id='Procurar' type='text' v-model='filter.departure' placeholder="Procurar"></b-form-input>
              </b-col>
            </b-row>
            <br>
            <b-table :filter="filter.departure" striped hover :fields="chartsFields" :items="departure.charts">
              <template slot="link" slot-scope="data">
                <a v-on:click="openModal(data.item)" href='javascript:void(0)'>
                  <i class="fa fa-search" aria-hidden="true"></i> Visualizar</a> |
                <a v-bind:href="data.item.link">
                  <i class="fa fa-download" aria-hidden="true"></i> Download</a>
              </template>
            </b-table>
          </b-tab>

          <!-- Notams -->
          <b-tab title="Notams">
            <div v-bind:key="key+100" v-for="(notam, key) in departure.notams">
              <h6>{{ notam.indent }}
                <span class='text-muted font-weight-normal'>{{ notam.inicio }} à {{ notam.termino }}</span>
              </h6>
              <p> {{ notam.mensagem }} </p>
              <p> {{ notam.f }} </p>
              <p> {{ notam.g}} </p>
              <hr>
            </div>
          </b-tab>

        </b-tabs>
      </b-card>
    </b-tab>

    <!-- Arrival tab -->
    <b-tab :title="this.data.arrival" active>
      <b-card no-body>
        <b-tabs pills card vertical>
          <!-- Airport Data -->
          <b-tab title="Dados" active>
            <h5>{{ arrival.data.icao }} - {{ arrival.data.iata }} - {{ arrival.data.name }}</h5>
            <p class='lead'>{{ arrival.data.city }} - {{ arrival.data.city }}</p>
            <br>
            <h6>Pistas</h6>
            <b-table striped hover :fields="runwayFields" :items="arrival.data.runways">
            </b-table>
          </b-tab>

          <!-- Airport Meteorology -->
          <b-tab title="Meteorologia">
            <h6>METAR</h6>
            <p v-bind:key="key + '-metar-arr'" v-for="(metar, key) in meteorology.arrival.metar">{{ metar }}</p>
            <hr>
            <h6>TAF</h6>
            <p v-bind:key="key + '-taf-arr'" v-for="(taf, key) in meteorology.arrival.taf">{{ taf }}</p>
            <p class='text-right'>Esta aba é atualizada a cada 10 minutos. <b-link @click='weather' href="#">Atualizar agora</b-link></p>
          </b-tab>

          <!-- Cartas -->
          <b-tab title="Cartas">
            <b-row>
              <b-col>
                <b-form-input id='Procurar' type='text' v-model='filter.arrival' placeholder="Procurar"></b-form-input>
              </b-col>
            </b-row>
            <br>
            <b-table :filter="filter.arrival" striped hover :fields="chartsFields" :items="arrival.charts">
              <template slot="link" slot-scope="data">
                <a v-on:click="openModal(data.item)" href='javascript:void(0)'>
                  <i class="fa fa-search" aria-hidden="true"></i> Visualizar</a> |
                <a v-bind:href="data.item.link">
                  <i class="fa fa-download" aria-hidden="true"></i> Download</a>
              </template>
            </b-table>
          </b-tab>

          <!-- Notams -->
          <b-tab title="Notams">
            <div v-bind:key="key+300" v-for="(notam, key) in arrival.notams">
              <h6>{{ notam.indent }}
                <span class='text-muted font-weight-normal'>{{ notam.inicio }} à {{ notam.termino }}</span>
              </h6>
              <p> {{ notam.mensagem }} </p>
              <p> {{ notam.f }} </p>
              <p> {{ notam.g}} </p>
              <hr>
            </div>
          </b-tab>

        </b-tabs>
      </b-card>
    </b-tab>

    <!-- Alternate tab -->
    <b-tab :title="this.data.alternate" active>
      <b-card no-body>
        <b-tabs pills card vertical>
          <!-- Airport Data -->
          <b-tab title="Dados" active>
            <h5>{{ alternate.data.icao }} - {{ alternate.data.iata }} - {{ alternate.data.name }}</h5>
            <p class='lead'>{{ alternate.data.city }} - {{ alternate.data.city }}</p>
            <br>
            <h6>Pistas</h6>
            <b-table striped hover :fields="runwayFields" :items="alternate.data.runways">
            </b-table>
          </b-tab>

          <!-- Airport Meteorology -->
          <b-tab title="Meteorologia">
            <h6>METAR</h6>
            <p v-bind:key="key + '-metar-alt'" v-for="(metar, key) in meteorology.alternate.metar">{{ metar }}</p>
            <hr>
            <h6>TAF</h6>
            <p v-bind:key="key + '-taf-alt'" v-for="(taf, key) in meteorology.alternate.taf">{{ taf }}</p>
            <p class='text-right'>Esta aba é atualizada a cada 10 minutos. <b-link @click='weather' href="#">Atualizar agora</b-link></p>
          </b-tab>

          <!-- Cartas -->
          <b-tab title="Cartas">
            <b-row>
              <b-col>
                <b-form-input id='Procurar' type='text' v-model='filter.alternate' placeholder="Procurar"></b-form-input>
              </b-col>
            </b-row>
            <br>
            <b-table :filter="filter.alternate" striped hover :fields="chartsFields" :items="alternate.charts">
              <template slot="link" slot-scope="data">
                <a v-on:click="openModal(data.item)" href='javascript:void(0)'>
                  <i class="fa fa-search" aria-hidden="true"></i> Visualizar</a> |
                <a v-bind:href="data.item.link">
                  <i class="fa fa-download" aria-hidden="true"></i> Download</a>
              </template>
            </b-table>
          </b-tab>

          <!-- Notams -->
          <b-tab title="Notams">
            <div v-bind:key="key+600" v-for="(notam, key) in alternate.notams">
              <h6>{{ notam.indent }}
                <span class='text-muted font-weight-normal'>{{ notam.inicio }} à {{ notam.termino }}</span>
              </h6>
              <p> {{ notam.mensagem }} </p>
              <p> {{ notam.f }} </p>
              <p> {{ notam.g}} </p>
              <hr>
            </div>
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
      <b-btn class="mt-3" variant="outline-danger" block @click="closeModal()">Fechar carta</b-btn>
        </b-col>
      </b-row>
    </b-modal>

  </div>
</template>

<script>

import { getAirport, getMeteorology } from '../../data/axios/briefing'

export default {
  props: ['data'],
  data () {
    return {
      progress: 0,
      loading: true,
      departure: { data: { icao: null, iata: null, city: null, elevation: null, lat: null, lng: null, name: null, runways: [], tz: null } },
      arrival: { data: { icao: null, iata: null, city: null, elevation: null, lat: null, lng: null, name: null, runways: [], tz: null } },
      alternate: { data: { icao: null, iata: null, city: null, elevation: null, lat: null, lng: null, name: null, runways: [], tz: null } },
      filter: {},
      modal: {},
      meteorology: { departure: {metar: null, taf: null}, arrival: {metar: null, taf: null}, alternate: {metar: null, taf: null} },
      chartsFields: [
        {
          key: 'tipo',
          sortable: true
        },
        {
          key: 'nome',
          sortable: true
        },
        {
          key: 'data',
          sortable: true
        },
        {
          key: 'link',
          label: 'Ação',
          sortable: true
        }
      ],
      runwayFields: [
        {
          key: 'runway',
          label: 'Cabeceira'
        },
        {
          key: 'length',
          label: 'Comprimento'
        },
        {
          key: 'heading',
          label: 'Curso'
        },
        {
          key: 'altitude',
          label: 'Elevação'
        },
        {
          key: 'ilsFrequency',
          label: 'Frequencia ILS'
        },
        {
          key: 'ilsCourse',
          label: 'Curso ILS'
        }
      ]
    }
  },
  methods: {
    async startAirport () {
      try {
        this.loading = true
        this.departure = await getAirport(this.data.departure)
        this.progress = 30
        this.arrival = await getAirport(this.data.arrival)
        this.progress = 60
        this.alternate = await getAirport(this.data.alternate)
        this.progress = 90
        this.weather()
        this.loading = false
      } catch (e) {
        this.$emit('error')
        this.loading = false
      }
    },
    async weather () {
      try {
        this.meteorology.departure = await getMeteorology(this.data.departure)
        this.meteorology.arrival = await getMeteorology(this.data.arrival)
        this.meteorology.alternate = await getMeteorology(this.data.alternate)
        setTimeout(this.weather, 600000)
      } catch (e) {
        this.$emit('error')
      }
    },
    async changeAlternate () {
      try {
        this.loading = true
        this.progress = 0
        this.alternate = await getAirport(this.data.alternate)
        this.progress = 75
        this.meteorology.alternate = await getMeteorology(this.data.alternate)
        this.progress = 90
        this.loading = false
      } catch (e) {
        this.$emit('error')
        this.loading = false
      }
    },
    openModal (item) {
      this.modal = { title: `[${item.tipo}] - ${item.nome}`, link: item.link }
      this.$refs.chartsModal.show()
    },
    closeModal () {
      this.modal = { title: null, link: null }
      this.$refs.chartsModal.hide()
    }
  },
  mounted () {
    this.startAirport()
  }
}
</script>
