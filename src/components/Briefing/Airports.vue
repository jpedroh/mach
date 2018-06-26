<template>
  <div>
    <h4>Airports Briefings</h4>
    <hr>
<b-card no-body>
  <b-tabs pills card>
    <!-- Departure tab -->
    <b-tab :title="airports.departure.data.icao" active>
      <b-card no-body>
        <b-tabs pills card vertical>
          <!-- Airport Data -->
          <b-tab title="Dados" active>
            <h5>{{ airports.departure.data.icao }} - {{ airports.departure.data.iata }} - {{ airports.departure.data.name }}</h5>
            <p class='lead'>{{ airports.departure.data.city }} - {{ airports.departure.data.city }}</p>
            <br>
            <h6>Pistas</h6>
            <b-table striped hover :fields="runwayFields" :items="airports.departure.data.runways">
            </b-table>
          </b-tab>

          <!-- Airport Meteorology -->
          <b-tab title="Meteorologia">
            <h6>METAR</h6>
            <p v-bind:key="key + '-metar-dep'" v-for="(metar, key) in weathers.departure.metar">{{ metar }}</p>
            <hr>
            <h6>TAF</h6>
            <p v-bind:key="key + '-taf-dep'" v-for="(taf, key) in weathers.departure.taf">{{ taf }}</p>
            <p class='text-right'>Esta aba é atualizada a cada 10 minutos. <b-link @click='refreshWeatherNow' href="#">Atualizar agora</b-link></p>
          </b-tab>

          <!-- Cartas -->
          <b-tab title="Cartas">
            <b-row>
              <b-col>
                <b-form-input id='Procurar' type='text' v-model='filter.departure' placeholder="Procurar"></b-form-input>
              </b-col>
            </b-row>
            <br>
            <b-table :filter="filter.departure" striped hover :fields="chartsFields" :items="airports.departure.charts">
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
            <div v-bind:key="key+100" v-for="(notam, key) in airports.departure.notams">
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
    <b-tab :title="airports.arrival.data.icao" active>
      <b-card no-body>
        <b-tabs pills card vertical>
          <!-- Airport Data -->
          <b-tab title="Dados" active>
            <h5>{{ airports.arrival.data.icao }} - {{ airports.arrival.data.iata }} - {{ airports.arrival.data.name }}</h5>
            <p class='lead'>{{ airports.arrival.data.city }} - {{ airports.arrival.data.city }}</p>
            <br>
            <h6>Pistas</h6>
            <b-table striped hover :fields="runwayFields" :items="airports.arrival.data.runways">
            </b-table>
          </b-tab>

          <!-- Airport Meteorology -->
          <b-tab title="Meteorologia">
            <h6>METAR</h6>
            <p v-bind:key="key + '-metar-arr'" v-for="(metar, key) in weathers.arrival.metar">{{ metar }}</p>
            <hr>
            <h6>TAF</h6>
            <p v-bind:key="key + '-taf-arr'" v-for="(taf, key) in weathers.arrival.taf">{{ taf }}</p>
            <p class='text-right'>Esta aba é atualizada a cada 10 minutos. <b-link @click='refreshWeatherNow' href="#">Atualizar agora</b-link></p>
          </b-tab>

          <!-- Cartas -->
          <b-tab title="Cartas">
            <b-row>
              <b-col>
                <b-form-input id='Procurar' type='text' v-model='filter.arrival' placeholder="Procurar"></b-form-input>
              </b-col>
            </b-row>
            <br>
            <b-table :filter="filter.arrival" striped hover :fields="chartsFields" :items="airports.arrival.charts">
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
            <div v-bind:key="key+300" v-for="(notam, key) in airports.arrival.notams">
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
    <b-tab :title="airports.alternate.data.icao" active>
      <b-card no-body>
        <b-tabs pills card vertical>
          <!-- Airport Data -->
          <b-tab title="Dados" active>
            <h5>{{ airports.alternate.data.icao }} - {{ airports.alternate.data.iata }} - {{ airports.alternate.data.name }}</h5>
            <p class='lead'>{{ airports.alternate.data.city }} - {{ airports.alternate.data.city }}</p>
            <br>
            <h6>Pistas</h6>
            <b-table striped hover :fields="runwayFields" :items="airports.alternate.data.runways">
            </b-table>
          </b-tab>

          <!-- Airport Meteorology -->
          <b-tab title="Meteorologia">
            <h6>METAR</h6>
            <p v-bind:key="key + '-metar-alt'" v-for="(metar, key) in weathers.alternate.metar">{{ metar }}</p>
            <hr>
            <h6>TAF</h6>
            <p v-bind:key="key + '-taf-alt'" v-for="(taf, key) in weathers.alternate.taf">{{ taf }}</p>
            <p class='text-right'>Esta aba é atualizada a cada 10 minutos. <b-link @click='refreshWeatherNow' href="#">Atualizar agora</b-link></p>
          </b-tab>

          <!-- Cartas -->
          <b-tab title="Cartas">
            <b-row>
              <b-col>
                <b-form-input id='Procurar' type='text' v-model='filter.alternate' placeholder="Procurar"></b-form-input>
              </b-col>
            </b-row>
            <br>
            <b-table :filter="filter.alternate" striped hover :fields="chartsFields" :items="airports.alternate.charts">
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
            <div v-bind:key="key+600" v-for="(notam, key) in airports.alternate.notams">
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
    <notifications group="error" position="bottom"/>
  </div>
</template>

<script>

export default {
  mounted () {
    this.refreshWeather()
  },
  computed: {
    airports () {
      return this.$store.getters.airports
    },
    weathers () {
      return this.$store.getters.weathers
    }
  },
  data () {
    return {
      filter: {},
      modal: { link: null, title: null },
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
    refreshWeather () {
      this.$store.dispatch('refreshWheater', this.airports)
        .then(() => {
          this.$notify({
            group: 'error',
            type: 'success',
            title: 'Tudo pronto',
            text: 'Meteorologia dos aeroportos atualizadas.',
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
      this.$store.dispatch('refreshWheater', this.airports)
        .then(() => {
          this.$notify({
            group: 'error',
            type: 'success',
            title: 'Tudo pronto',
            classes: 'vue-notification notification'
          })
        })
    },
    openModal (item) {
      this.modal = { title: `[${item.tipo}] - ${item.nome}`, link: item.link }
      this.$refs.chartsModal.show()
    },
    closeModal () {
      this.modal = { title: null, link: null }
      this.$refs.chartsModal.hide()
    }
  }
}
</script>
