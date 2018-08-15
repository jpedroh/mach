<template>
  <div>
    <h2>Estes são os {{ flights.length }} resultados de sua busca</h2>
    <!-- Table -->
    <b-table responsive striped hover :items="flights" :fields="columns">
      <!-- EOBT -->
      <template slot="eobt" slot-scope="row">
        {{ row.item.eobt }}Z
      </template>
      <!-- Detalhes -->
      <template slot="detalhes" slot-scope="row">
        <b-button size="sm" block variant='primary' @click.stop="row.toggleDetails">
          Mais detalhes
        </b-button>
      </template>
      <!-- Linha Detalhes -->
      <template slot="row-details" slot-scope="row">
        <b-card>
          <!-- FL e Velocidade -->
          <b-row class="mb-2">
            <b-col>
              <b>FL</b> {{ row.item.fl }}
            </b-col>
            <b-col>
              <b>VELOCIDADE</b> {{ row.item.speed }}
            </b-col>
          </b-row>
          <!-- Aeronave e EQPT -->
          <b-row class="mb-2">
            <b-col>
              <b>AERONAVE</b> {{ row.item.aircraft }}/{{ row.item.wakeTurbulence }}
            </b-col>
            <b-col>
              <b>EQPT</b> {{ row.item.eqpt }}
            </b-col>
          </b-row>
          <!-- Inicio/Fim -->
          <b-row class="mb-2">
            <b-col>
              <b>PERIODICIDADE</b> {{ row.item.days }}
            </b-col>
            <b-col>
              <b>INICIO DO VOO</b> {{ row.item.beginDate }}
            </b-col>
            <b-col>
              <b>FINAL DO VOO</b> {{ row.item.endDate }}
            </b-col>
          </b-row>
          <!-- Rota -->
          <b-row class="mb-2">
            <b-col>
              <b>ROTA</b> {{ row.item.route }}
            </b-col>
          </b-row>
          <!-- Remarks -->
          <b-row class="mb-2">
            <b-col>
              <b>RMKS</b> {{ row.item.rmk }}
            </b-col>
          </b-row>
          <!-- Botões -->
          <b-row class='float-right mb-2'>
            <b-col>
              <b-button size="sm" variant='danger' @click="row.toggleDetails">Fechar</b-button>
              <b-button size="sm" variant='primary' target="_blank" :href="`https://skyvector.com/?fpl=${row.item.speed}F${row.item.fl} ${row.item.departure} ${row.item.route} ${row.item.arrival}`">Ver no SkyVector</b-button>
              <b-button size="sm" variant='primary' @click="fplIvao(row.item)">Plano de voo IVAO</b-button>
              <b-button size="sm" variant='primary' target="_blank" :href="`https://cert.vatsim.net/fp/file.php?2=${row.item.callsign}&3=${row.item.aircraft}&4=${row.item.speed}&5=${row.item.departure}&6=${row.item.eobt}&7=${row.item.fl}&8=${row.item.route}&9=${row.item.arrival}&10a=${row.item.eet.substr(0,2)}&10b=${row.item.eet.substr(2,2)}&11=${row.item.rmk}`" >Plano de voo VATSIM</b-button>
              <b-button size="sm" variant='success' @click.stop="openModal(row.item)">
                <span v-if="!loading">Briefing da rota</span>
                <Spinner :size="20" v-if="loading"/>
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>

    <!-- Pré modal -->
    <b-modal v-model='modalBriefing' id="modalBriefing" :title="`Pre briefing - Voo ${flight.callsign}`">
      <p class=lead>Para começarmos:</p>

      <!-- Alternado -->
      <b-form-group id="alternate" label="Escolha um alternado" label-for="pob">
        <b-form-select id='alternado-select' :options="this.alternates" v-model="alternate"/>
      </b-form-group>

      <!-- POB -->
      <b-form-group id="pob" label="Insira o POB" label-for="pob">
        <b-form-input @keyup.enter.native='startBriefing' type='number' id="pob" placeholder="Insira o POB" v-model="pob"></b-form-input>
      </b-form-group>
      <div slot="modal-footer">
        <b-btn size="sm" variant="secondary" @click="(modalBriefing = false)">
          Voltar
        </b-btn>
        <b-btn size="sm" variant="primary" @click="startBriefing">
          <span v-if="!loadingBriefing">Ir para o briefing</span>
          <Spinner :size="20" v-if="loadingBriefing"/>
        </b-btn>
      </div>
    </b-modal>

    <notifications group="error" position="bottom"/>
  </div>
</template>

<script>

import FileSaver from 'file-saver'
import Spinner from 'vue-simple-spinner'

export default {
  components: {
    Spinner
  },
  computed: {
    flights () {
      return this.$store.getters.flightsTable
    },
    flight () {
      return this.$store.getters.flight
    },
    alternate: {
      get () {
        return this.$store.getters.alternate
      },
      set (value) {
        this.$store.commit('setAlternate', value)
      }
    },
    pob: {
      get () {
        return this.$store.getters.pob
      },
      set (value) {
        this.$store.commit('setPob', value)
      }
    }
  },
  data () {
    return {
      alternates: [],
      loading: false,
      loadingBriefing: false,
      modalBriefing: false,
      columns: [
        {
          key: 'callsign',
          label: 'VOO',
          sortable: true
        },
        {
          key: 'departure',
          label: 'PARTIDA',
          sortable: true
        },
        {
          key: 'arrival',
          label: 'DESTINO',
          sortable: true
        },
        {
          key: 'eobt',
          label: 'EOBT',
          sortable: true
        },
        {
          key: 'aircraft',
          label: 'ACFT',
          sortable: true
        },
        {
          key: 'eet',
          label: 'EET',
          sortable: true
        },
        {
          key: 'detalhes',
          label: 'DETALHES'
        }]
    }
  },
  methods: {
    fplIvao (data) {
      let blob = new Blob(['[FLIGHTPLAN]\r\nID=' + data.callsign + '\r\nRULES=' + data.rules + '\r\nFLIGHTTYPE=S\r\nNUMBER=1\r\nACTYPE=' + data.aircraft + '\r\nWAKECAT=' + data.wakeTurbulence + '\r\nEQUIPMENT=' + data.eqpt + '\r\nDEPICAO=' + data.departure + '\r\nSPEEDTYPE=N\r\nSPEED=' + data.speed.match(/\d+/)[0] + '\r\nLEVELTYPE=F\r\nLEVEL=' + data.fl + '\r\nROUTE=' + data.route + '\r\nDESTICAO=' + data.arrival + '\r\nEET=' + data.eet + '\r\nOTHER=' + data.rmk], {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, data.callsign + '.fpl')
    },
    async openModal (item) {
      try {
        this.loading = true
        await this.$store.dispatch('flightModal', item)
        this.alternates = [{ value: null, text: 'Escolha um alternado' }].concat(this.flight.alternates[1])
        this.modalBriefing = true
        this.loading = false
      } catch (error) {
        console.error(error)
        this.$notify({
          group: 'error',
          type: 'error',
          title: 'Ops!',
          text: 'Um erro ocorreu.',
          classes: 'vue-notification notification'
        })
      }
    },
    startBriefing () {
      this.loadingBriefing = true
      this.$notify({
        group: 'error',
        type: 'info',
        title: 'Aguarde um pouco',
        text: 'Preparando o briefing do voo para você.',
        classes: 'vue-notification notification'
      })
      this.$store.dispatch('calculateFob')
        .then(fob => this.$store.dispatch('startAirports', this.flight))
        .then(airports => this.$router.push('/briefing'))
        .catch(error => {
          this.loadingBriefing = false
          console.error(error)
          return this.$router.push('/briefing')
        })
    }
  }
}
</script>
