<template>
  <div>
    <h4>Outros</h4>
    <hr>
    <b-row>
      <b-col class='d-none d-lg-block'>
        <b-button block outlined variant=outline-primary size=lg @click="downloadIvaoFpl()">Gerar plano de voo da IVAO</b-button>
      </b-col>
      <b-col class='d-none d-lg-block'>
        <b-button target="_blank" :href="`https://cert.vatsim.net/fp/file.php?2=${flight.callsign}&3=${flight.aircraft}&4=${flight.speed}&5=${flight.departure}&6=${flight.eobt}&7=${flight.fl}&8=${flight.route}&9=${flight.arrival}&10a=${flight.eet.substr(0,2)}&10b=${flight.eet.substr(2,2)}&11=${flight.rmk}&12a=${flight.fob.substr(0,2)}&12b=${flight.fob.substr(2,2)}&13=${flight.alternate}`" block outlined variant=outline-primary size=lg>Gerar plano de voo da VATSIM</b-button>
      </b-col>
      <b-col>
        <b-button block outlined variant=outline-primary size=lg :href="`https://skyvector.com/?fpl=${flight.speed}F${flight.fl} ${flight.departure} ${flight.route} ${flight.arrival}`" target='_blank'>Ver essa rota no SkyVector</b-button>
      </b-col>
    </b-row>
    <br>
  </div>
</template>

<script>
import FileSaver from 'file-saver'

export default {
  computed: {
    flight () {
      return this.$store.getters.flight
    }
  },
  methods: {
    downloadIvaoFpl () {
      let blob = new Blob([`[FLIGHTPLAN]\r\nID=${this.flight.callsign}\r\nDEPTIME=${this.flight.eobt}\r\nRULES=${this.flight.rules}\r\nFLIGHTTYPE=S\r\nNUMBER=1\r\nACTYPE=${this.flight.aircraft}\r\nWAKECAT=${this.flight.wakeTurbulence}\r\nEQUIPMENT=${this.flight.eqpt}\r\nDEPICAO=${this.flight.departure}\r\nSPEEDTYPE=N\r\nSPEED=${this.flight.speed.match(/\d+/)[0]}\r\nLEVELTYPE=F\r\nLEVEL=${this.flight.fl}\r\nROUTE=${this.flight.route}\r\nDESTICAO=${this.flight.arrival}\r\nEET=${this.flight.eet}\r\nALTICAO=${this.flight.alternate}\r\nOTHER=${this.flight.rmk}\r\nPOB=${this.flight.pob}\r\nENDURANCE=${this.flight.fob}`], {type: 'application/save'})
      return FileSaver.saveAs(blob, `${this.flight.callsign}.fpl`)
    }
  }
}
</script>
