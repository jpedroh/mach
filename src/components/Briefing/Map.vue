<template>
  <div>
    <h4>Mapa de Voo</h4>
    <hr>
    <GmapMap :center="mapCenter" :zoom="7" map-type-id="terrain" style="width: 100%; height: 450px">
      <!-- Route -->
      <GmapPolyline :path="sita" />
      <!-- Info window -->
      <GmapInfoWindow :opened="infoWindowOpened" @closeclick="infoWindowOpened=false" :position="infoWindow">
        <h6>{{infoWindow.fix}}</h6>
        <p>
          <b>Latitude:</b> {{ infoWindow.lat.toFixed(2) }}
          <br>
          <b>Longitude:</b> {{ infoWindow.lng.toFixed(2) }}</p>
      </GmapInfoWindow>
      <!-- Route Markers -->
      <GmapMarker :key=index v-for="(fix, index) in sita.slice(1, sita.length-2)" :position="fix" @click='openWindow(fix)'></GmapMarker>
      <!-- Airports Markers -->
      <GmapMarker :position="sita[0]" @click='openWindow(sita[0])'></GmapMarker>
      <GmapMarker :position="sita[sita.length-1]" @click='openWindow(sita[sita.length-1])'></GmapMarker>
    </GmapMap>
  </div>
</template>


<script>

import { getRoute } from '../../data/axios/briefing'

export default {
  props: ['data'],
  data () {
    return {
      sita: [],
      mapCenter: { lat: 0, lng: 0 },
      infoWindow: { lat: 0, lng: 0, fix: null },
      infoWindowOpened: false
    }
  },
  mounted () {
    this.startSita()
  },
  methods: {
    async startSita () {
      try {
        this.sita = await getRoute(this.data)
        this.mapCenter = { lat: (this.sita[0].lat + this.sita[this.sita.length - 1].lat) / 2, lng: (this.sita[0].lng + this.sita[this.sita.length - 1].lng) / 2 }
      } catch (error) {
        console.error(error)
        this.$emit('error')
      }
    },
    openWindow (fix) {
      this.infoWindow = fix
      this.infoWindowOpened = true
    }
  }
}

</script>
