<?
class RPL{    
    //Métodos
    public function __construct(){
        $rpl = file('rpl.txt');    
        foreach($rpl as $c){
            $etapa = substr($c, 40, 4) . substr($c, strpos($c, "EQPT")-9, 4);
            $callsign = substr($c, 25, 7);
            $this->lista[$etapa][$callsign]['voo'] = $callsign;
            $this->lista[$etapa][$callsign]['rota'] = substr($c, '59', strpos($c, "EQPT")-68);
            $this->lista[$etapa][$callsign]['fl'] = 'F' . substr($c, '55', 3);
            $this->lista[$etapa][$callsign]['velocidade'] = substr($c, 49, 5);
            $this->lista[$etapa][$callsign]['eobt'] = substr($c, 44, 4);
            $this->lista[$etapa][$callsign]['eet'] = substr($c, strpos($c, "EQPT")-5, 4);
            $this->lista[$etapa][$callsign]['aeronave'] = substr($c, 33, 6);
            $this->lista[$etapa][$callsign]['rmk'] = substr($c, strpos($c, "PBN"));
            $this->lista[$etapa][$callsign]['eqpt'] = substr($c, strpos($c, "EQPT")+5, strpos($c, "PBN")-strpos($c, "EQPT")-6);
        }
    }
}