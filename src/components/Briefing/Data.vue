<template>
  <div>
    <h4>Plano de voo simplificado</h4>
    <hr>

    <!-- Linha 1 -->
    <b-row>
      <!-- Partida -->
      <b-col>
        <b-form-group id="departure" label="Partida" style='font-weight:500' label-for="departure">
          <b-form-input id="departure" plaintext v-model.trim='data.departure'></b-form-input>
        </b-form-group>
      </b-col>
      <!-- Chegada -->
      <b-col>
        <b-form-group id="arrival" label="Chegada" style='font-weight:500' label-for="arrival">
          <b-form-input id="arrival" plaintext v-model.trim='data.arrival'></b-form-input>
        </b-form-group>
      </b-col>
      <!-- Alternado -->
      <b-col>
        <b-form-group id="alternate" label="Alternado" style='font-weight:500' label-for="alternate">
          <b-form-input id="alternate" v-model.lazy='data.alternate' @change='change("alt")'></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Linha 2 -->
    <b-row>
      <!-- EOBT -->
      <b-col cols="4">
        <b-form-group id="EOBT" label="EOBT" style='font-weight:500' label-for="EOBT">
          <b-input-group append="Z">
            <b-form-input id="EOBT" v-model.trim="data.eobt" @change='change()'></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <!-- Aeronave -->
      <b-col cols="4">
        <b-form-group id="Aeronave" label="Aeronave" style='font-weight:500' label-for="Aeronave">
          <b-input-group>
            <b-form-input id="Aeronave" v-model.trim="data.aircraft" @change='change()'></b-form-input>
            <b-input-group-text>/</b-input-group-text>
            <b-form-input id="Esteira" v-model.trim="data.wakeTurbulence" @change='change()'></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <!-- EQPT -->
      <b-col cols="4">
        <b-form-group id="EQPT" label="EQPT" style='font-weight:500' label-for="EQPT">
          <b-form-input id="EQPT" v-model.trim="data.eqpt" @change='change()'></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Linha 3 -->
    <b-row>
      <!-- FL -->
      <b-col>
        <b-form-group id="FL" label="FL" style='font-weight:500' label-for="FL">
          <b-form-input id="FL" v-model.trim="data.fl" @change='change()'></b-form-input>
        </b-form-group>
      </b-col>
      <!-- Velocidade -->
      <b-col>
        <b-form-group id="Velocidade" label="Velocidade" style='font-weight:500' label-for="Velocidade">
          <b-form-input id="Velocidade" v-model.trim="data.speed" @change='change()'></b-form-input>
        </b-form-group>
      </b-col>
      <!-- EET -->
      <b-col>
        <b-form-group id="EET" label="EET" style='font-weight:500' label-for="EET">
          <b-form-input id="EET" v-model.trim="data.eet" @change='change("eet")'></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Linha 4 -->
    <b-row>
      <!-- Rota -->
      <b-col>
        <b-form-group id="rota" label="Rota" style='font-weight:500' label-for="rota">
          <b-form-textarea v-model.trim="data.route" :rows="3" @keyup.enter.native='change("route")'></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Linha 5 -->
    <b-row>
      <!-- FOB -->
      <b-col>
        <b-form-group id="FOB" label="FOB" style='font-weight:500' label-for="FOB">
          <b-form-input id="FOB" v-model.trim="data.fob" @keyup.enter.native='change()'></b-form-input>
        </b-form-group>
      </b-col>
      <!-- Vazio -->
      <b-col>
      </b-col>
      <!-- POB -->
      <b-col>
        <b-form-group id="POB" label="POB" style='font-weight:500' label-for="POB">
          <b-form-input id="POB" v-model.trim="data.pob" @keyup.enter.native='change()'></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Linha 6 -->
    <b-row>
      <!-- Rmks -->
      <b-col>
        <b-form-group id="RMKS" label="RMKS" style='font-weight:500' label-for="RMKS">
          <b-form-textarea v-model.trim="data.rmk" :rows="3" @keyup.enter.native='change()'></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-row>

  </div>
</template>

<script>

import { getEET } from '../../data/axios/briefing'

export default {
  props: ['data'],
  async mounted () {
    this.getFOB()
  },
  methods: {
    change (field) {
      localStorage.setItem('flight', JSON.stringify(this.data))
      switch (field) {
        case 'route':
          return this.$emit('chgRoute')
        case 'alt':
          this.$emit('chgAltn')
          return this.getFOB()
        case 'eet':
          this.$emit('chgAltn')
          return this.getFOB()
        default:
          return this.$emit('chgField')
      }
    },
    async getFOB () {
      if (this.data.fob) {
        return
      }
      // EETs
      const altEET = await getEET(this.data.arrival, this.data.alternate)
      const rteEET = this.data.eet
      // Caso não ache um EET para o alternativo no DB mata a função
      if (altEET === null) {
        this.data.fob = '0000'
        return localStorage.setItem('flight', JSON.stringify(this.data))
      }
      // Calcula a autonomia
      let ab = this.hoursToMinutes(rteEET)
      let bc = this.hoursToMinutes(altEET)
      let autonomia = (ab + Math.ceil(0.1 * ab) + 30 + bc)
      // Formata o FOB
      var hrs = Math.trunc(autonomia / 60) < 10 ? '0' + Math.trunc(autonomia / 60) : Math.trunc(autonomia / 60)
      var min = autonomia % 60
      if (min < 60 && min > 9) {} else if (min > 0 && min < 9) {
        min = '0' + min
      } else {
        min = '00'
      }
      this.data.fob = hrs + min
      return localStorage.setItem('flight', JSON.stringify(this.data))
    },
    hoursToMinutes (a) {
      return parseInt((a[0] + a[1]) * 60) + parseInt((a[2] + a[3]))
    }
  }
}
</script>
