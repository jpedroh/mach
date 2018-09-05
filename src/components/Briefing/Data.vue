<template>
  <div>
    <h4>Plano de voo simplificado</h4>
    <hr>
    <!-- Linha 1 -->
    <b-row>
      <!-- Partida -->
      <b-col>
        <b-form-group id="departure" label="Partida" style='font-weight:500' label-for="departure">
          <b-form-input id="departure" plaintext v-model='departure'/>
        </b-form-group>
      </b-col>
      <!-- Chegada -->
      <b-col>
        <b-form-group id="arrival" label="Chegada" style='font-weight:500' label-for="arrival">
          <b-form-input id="arrival" plaintext v-model='arrival'/>
        </b-form-group>
      </b-col>
      <!-- Alternado -->
      <b-col>
        <b-form-group id="alternate" label="Alternado" style='font-weight:500' label-for="alternate">
          <b-form-input id="alternate" v-model='alternate' @keyup.enter.native="changeAlternate"/>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Linha 2 -->
    <b-row>
      <!-- EOBT -->
      <b-col cols="4">
        <b-form-group id="EOBT" label="EOBT" style='font-weight:500' label-for="EOBT">
          <b-input-group append="Z">
            <b-form-input id="EOBT" v-model="eobt"/>
          </b-input-group>
        </b-form-group>
      </b-col>
      <!-- Aeronave -->
      <b-col cols="4">
        <b-form-group id="Aeronave" label="Aeronave" style='font-weight:500' label-for="Aeronave">
          <b-input-group>
            <b-form-input id="Aeronave" v-model="aircraft"/>
            <b-input-group-text>/</b-input-group-text>
            <b-form-input id="Esteira" v-model="wakeTurbulence"/>
          </b-input-group>
        </b-form-group>
      </b-col>
      <!-- EQPT -->
      <b-col cols="4">
        <b-form-group id="EQPT" label="EQPT" style='font-weight:500' label-for="EQPT">
          <b-form-input id="EQPT" v-model="eqpt"/>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Linha 3 -->
    <b-row>
      <!-- FL -->
      <b-col>
        <b-form-group id="FL" label="FL" style='font-weight:500' label-for="FL">
          <b-form-input id="FL" v-model="fl"/>
        </b-form-group>
      </b-col>
      <!-- Velocidade -->
      <b-col>
        <b-form-group id="Velocidade" label="Velocidade" style='font-weight:500' label-for="Velocidade">
          <b-form-input id="Velocidade" v-model="speed"/>
        </b-form-group>
      </b-col>
      <!-- EET -->
      <b-col>
        <b-form-group id="EET" label="EET" style='font-weight:500' label-for="EET">
          <b-form-input id="EET" v-model="eet" @keyup.enter.native="$store.commit('calculateFob')"/>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Linha 4 -->
    <b-row>
      <!-- Rota -->
      <b-col>
        <b-form-group id="rota" label="Rota" style='font-weight:500' label-for="rota">
          <b-form-textarea v-model="route" :rows="3"/>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Linha 5 -->
    <b-row>
      <!-- FOB -->
      <b-col>
        <b-form-group id="FOB" label="FOB" style='font-weight:500' label-for="FOB">
          <b-form-input id="FOB" v-model="fob"/>
        </b-form-group>
      </b-col>
      <!-- Vazio -->
      <b-col>
      </b-col>
      <!-- POB -->
      <b-col>
        <b-form-group id="POB" label="POB" style='font-weight:500' label-for="POB">
          <b-form-input id="POB" v-model="pob"/>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Linha 6 -->
    <b-row>
      <!-- Rmks -->
      <b-col>
        <b-form-group id="RMKS" label="RMKS" style='font-weight:500' label-for="RMKS">
          <b-form-textarea v-model="rmk" :rows="3"/>
        </b-form-group>
      </b-col>
    </b-row>
    <notifications group="error" position="bottom"/>
  </div>
</template>

<script>

export default {
  computed: {
    callsign () {
      return this.$store.getters.callsign
    },
    aircraft: {
      get () {
        return this.$store.getters.aircraft
      },
      set (value) {
        this.$store.commit('setAircraft', value)
      }
    },
    arrival: {
      get () {
        return this.$store.getters.arrival
      },
      set (value) {
        this.$store.commit('setArrival', value)
      }
    },
    departure: {
      get () {
        return this.$store.getters.departure
      },
      set (value) {
        this.$store.commit('setDeparture', value)
      }
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
    },
    eet: {
      get () {
        return this.$store.getters.eet
      },
      set (value) {
        this.$store.commit('setEet', value)
      }
    },
    eobt: {
      get () {
        return this.$store.getters.eobt
      },
      set (value) {
        this.$store.commit('setEobt', value)
      }
    },
    eqpt: {
      get () {
        return this.$store.getters.eqpt
      },
      set (value) {
        this.$store.commit('setEqpt', value)
      }
    },
    fl: {
      get () {
        return this.$store.getters.fl
      },
      set (value) {
        this.$store.commit('setFl', value)
      }
    },
    rmk: {
      get () {
        return this.$store.getters.rmk
      },
      set (value) {
        this.$store.commit('setRmk', value)
      }
    },
    route: {
      get () {
        return this.$store.getters.route
      },
      set (value) {
        this.$store.commit('setRoute', value)
      }
    },
    fob: {
      get () {
        return this.$store.getters.fob
      },
      set (value) {
        this.$store.commit('setFob', value)
      }
    },
    rules: {
      get () {
        return this.$store.getters.rules
      },
      set (value) {
        this.$store.commit('setRules', value)
      }
    },
    speed: {
      get () {
        return this.$store.getters.speed
      },
      set (value) {
        this.$store.commit('setSpeed', value)
      }
    },
    wakeTurbulence: {
      get () {
        return this.$store.getters.wakeTurbulence
      },
      set (value) {
        this.$store.commit('setWakeTurbulence', value)
      }
    }
  },
  methods: {
    changeAlternate () {
      this.$notify({
        group: 'error',
        type: 'info',
        title: 'Campo alternado alterado',
        text: 'Recalculando autonomia e procurando um novo Airport Briefing.',
        classes: 'vue-notification notification'
      })
      this.$store.commit('calculateFob')
      this.$store.dispatch('newAlternate', this.alternate)
        .then((success) => {
          this.$notify({
            group: 'error',
            type: 'success',
            title: 'Tudo pronto!',
            classes: 'vue-notification notification'
          })
        })
        .catch(error => {
          console.error(error)
          this.$notify({
            group: 'error',
            type: 'error',
            title: 'Ops!',
            text: `Não foi possível encontrar um Airport Briefing para ${this.alternate}.`,
            classes: 'vue-notification notification'
          })
        })
    }
  }
}
</script>
