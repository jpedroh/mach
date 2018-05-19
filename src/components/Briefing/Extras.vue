<template>
  <div>
    <h4>Outros</h4>
    <hr>
    <b-row>
      <b-col>
        <b-button block outlined variant=outline-primary size=lg @click="fplIvao">Gerar plano de voo da IVAO</b-button>
      </b-col>
      <b-col>
        <b-button target="_blank" :href="`https://cert.vatsim.net/fp/file.php?2=${data.callsign}&3=${data.aircraft}&4=${data.speed}&5=${data.departure}&6=${data.eobt}&7=${data.fl}&8=${data.route}&9=${data.arrival}&10a=${data.eet.substr(0,2)}&10b=${data.eet.substr(2,2)}&11=${data.rmk}&12a=${data.fob.substr(0,2)}&12b=${data.fob.substr(2,2)}&13=${data.alternate}`" block outlined variant=outline-primary size=lg>Gerar plano de voo da VATSIM</b-button>
      </b-col>
      <b-col>
        <b-button block outlined variant=outline-primary size=lg :href="'https://skyvector.com/?fpl=' + data.speed +'F' + data.fl + ' ' + data.departure + ' ' + data.route + ' ' + data.arrival"
          target='_blank'>Ver essa rota no SkyVector</b-button>
      </b-col>
    </b-row>
    <br>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  export default {
    props: ['data'],
    methods: {
      fplIvao () {
        let blob = new Blob(['[FLIGHTPLAN]\r\nID=' + this.data.callsign + '\r\nDEPTIME=' + this.data.eobt + '\r\nRULES=' + this.data.rules + '\r\nFLIGHTTYPE=S\r\nNUMBER=1\r\nACTYPE=' + this.data.aircraft + '\r\nWAKECAT=' + this.data.wakeTurbulence + '\r\nEQUIPMENT=' + this.data.eqpt + '\r\nDEPICAO=' + this.data.departure + '\r\nSPEEDTYPE=N\r\nSPEED=' + this.data.speed.match(/\d+/)[0] + '\r\nLEVELTYPE=F\r\nLEVEL=' + this.data.fl + '\r\nROUTE=' + this.data.route + '\r\nDESTICAO=' + this.data.arrival + '\r\nEET=' + this.data.eet + '\r\nALTICAO=' + this.data.alternate + '\r\nOTHER=' + this.data.rmk + '\r\nPOB=' + this.data.pob + '\r\nENDURANCE=' + this.data.fob], {type: 'application/save'})
        FileSaver.saveAs(blob, this.data.callsign + '.fpl')
      }
    }
  }
</script>
