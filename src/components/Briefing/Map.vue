<template>
  <div class='d-none d-lg-block'>
    <h4>Tracking em tempo real <b-badge variant="info">BETA</b-badge></h4>
    <hr>
    <p class='lead'>O Mach agora permite que você acompanhe seu voo em tempo real! Baixe a ferramenta de acompanhamento <a target='_blank' href='https://drive.google.com/open?id=1EAcU6rqzRXJR0wIryZ8U0sJEz5m4-aN-'>clicando aqui</a>, execute o arquivo e o sistema fará a conexão automaticamente. Não se preocupe, todo o processo é feito localmente e em nenhum momento seus dados estarão sendo enviados aos servidores do Mach.</p>
    <b-row>
      <b-col>
    <h5>Status:
      <b-badge v-if='connected' variant="success">Conectado</b-badge>
      <b-badge v-else variant="danger">Desconectado</b-badge>
    </h5>
      </b-col>
      <b-col>
        <b-button style=float:right variant=primary @click=centerAircraft() size=sm>Ir até a aeronave</b-button>
      </b-col>
    </b-row>

    <GmapMap :center="mapCenter" :zoom="4" map-type-id="terrain" style="width: 100%; height: 550px">
      <!-- Flown Route -->
      <GmapPolyline :options='{visible:connected}' :path="flownRoute"/>
      <!-- Info window -->
      <GmapInfoWindow :opened="infoWindowOpened" @closeclick="infoWindowOpened=false" :position="infoWindow">
        <h6>{{infoWindow.fix}}</h6>
        <p>
          <b>Latitude:</b> {{ infoWindow.lat.toFixed(2) }}
          <br>
          <b>Longitude:</b> {{ infoWindow.lng.toFixed(2) }}</p>
      </GmapInfoWindow>
      <!-- Telemetry -->
      <GmapInfoWindow :opened="telemetryWindowOpened" @closeclick="telemetryWindowOpened=false" :position="airplane">
        <h6>Telemetria</h6>
        <p>
          <b>Latitude:</b> {{ airplane.lat.toFixed(2) }}
          <br>
          <b>Longitude:</b> {{ airplane.lng.toFixed(2) }}
          <br>
          <b>Altitude:</b> {{ airplane.altitude.toFixed() }} ft
          <br>
          <b>GS:</b> {{ airplane.speed.toFixed() }} knots</p>
      </GmapInfoWindow>
      <!-- Route Markers -->
      <GmapMarker :visible='connected' :rotation='90' @click='openTelemetry()' :position="airplane"/>
    </GmapMap><br>
    <b-alert show><b-badge variant="info">AVISO</b-badge> O Watt é um projeto experimental. Experimente a ferramenta e mande seu feedback. Para mais informações, acesse o repositório no <a href='https://github.com/jpedroh/watt' target="_blank">GitHub</a>.</b-alert>
  </div>
</template>


<script>

export default {
  data () {
    return {
      mapCenter: { lat: -15.7942287, lng: -47.8821658 },
      infoWindow: { lat: 0, lng: 0, fix: null },
      infoWindowOpened: false,
      telemetryWindowOpened: false,
      airplane: { lat: 0, lng: 0, altitude: 0, speed: 0 },
      flownRoute: [],
      connected: false
    }
  },
  sockets: {
    connect: function (data) {
      this.telemetryWindowOpened = true
    },
    airplaneData: function (data) {
      this.airplane = data
      this.flownRoute.push(data)
      this.connected = true
    },
    disconnect: function (data) {
      this.connected = false
      this.telemetryWindowOpened = false
    }
  },
  methods: {
    centerAircraft () {
      this.mapCenter = this.airplane
    },
    openTelemetry () {
      this.telemetryWindowOpened = true
    },
    openWindow (fix) {
      this.infoWindow = fix
      this.infoWindowOpened = true
    }
  }
}

</script>
