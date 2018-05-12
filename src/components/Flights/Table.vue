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
              <b-button size="sm" variant='primary' @click="fplIvao(row.item)">Plano de voo IVAO</b-button>
              <b-button size="sm" variant='success' @click.stop="openModal(row.item)">Briefing da rota</b-button>
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
        <b-form-select id='alternado-select' v-model="flight.alternate">
          <option disabled selected :value='null'>Alternado</option>
          <option v-for="(alternate, key) in alternates" v-bind:key='key' v-bind:value="alternates">{{ alternate }}</option>
        </b-form-select>
      </b-form-group>
      <!-- POB -->
      <b-form-group id="pob" label="Insira um POB" label-for="pob">
        <b-form-input @keyup.enter.native='startBriefing' type='number' id="pob" v-model="flight.pob"></b-form-input>
      </b-form-group>
      <div slot="modal-footer">
        <b-btn size="sm" variant="secondary" @click="closeModal">
          Voltar
        </b-btn>
        <b-btn size="sm" variant="primary" @click="startBriefing">
          Ir para o briefing
        </b-btn>
      </div>
    </b-modal>

  </div>
</template>


<script>

import { getAlternates } from '../../data/firebase/functions/getAlternates'
import FileSaver from 'file-saver'

export default {
  data () {
    return {
      alternate: null,
      flights: JSON.parse(localStorage.getItem('flights')),
      flight: { },
      alternates: [],
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
    openModal (item) {
      this.flight = item
      this.getAlternate()
      this.modalBriefing = true
    },
    closeModal () {
      this.modalBriefing = false
    },
    async getAlternate () {
      this.alternates = await getAlternates(this.flight.arrival)
    },
    startBriefing () {
      this.flight.alternate = document.getElementById('alternado-select').options[document.getElementById('alternado-select').selectedIndex].text
      localStorage.setItem('flight', JSON.stringify(this.flight))
      this.$router.push('/briefing')
    }
  }
}
</script>
