<?php
class RPLatualiza{
    //Atributos
    public $data = '2017-09-23';
    public $rotas = [];
    public $arquivo_rpl;
    public $rota;
    
    //Métodos
    public function __construct(){
        $this->arquivo_rpl = file_get_contents('rpl.txt');
        $this->decodifica();
        file_put_contents('rpl-' . $this->data . '.json', json_encode($this->rotas));
        echo 'Dados atualizados com sucesso em ' . date('d-m-Y H:m');
    }

    public function verificaRegra($rota){
        if (strrpos($rota, ' IFR ') !== false)
            return 'Y';
        elseif (strrpos($rota, ' VFR ') !== false)
            return 'Z';
        else
            return 'I';
    }
    
    public function decodifica(){
        $array = explode("\n", $this->arquivo_rpl);
        foreach($array as $rota){
            if(strpos($rota, 'EQPT')){
                $this->rota['callsign'] = substr($rota, 25, 7);
                $this->rota['cia'] = substr($rota, 25, 3);
                $this->rota['voo'] = substr($rota, 28, 4);
                $this->rota['aeronave'] = substr($rota, 33, 4);
                $this->rota['esteira'] = substr($rota, 38, 1);
                $this->rota['partida'] = substr($rota, 40, 4);
                $this->rota['eobt'] = substr($rota, 44, 4);
                $this->rota['velocidade'] = substr($rota, 49, 5);
                $this->rota['dias'] = substr($rota, 17, 8);
                $this->rota['fl'] = substr($rota, 55, 3);
                $this->rota['rota'] = trim(substr($rota, 59, strpos($rota, "EQPT")-68));
                $this->rota['chegada'] = substr($rota, strpos($rota, "EQPT")-9, 4);
                $this->rota['eet'] = substr($rota, strpos($rota, "EQPT")-5, 4);
                $this->rota['rmk'] = substr($rota, strpos($rota, "EQPT"), -1);
                $this->rota['eqpt'] = trim(substr($this->rota['rmk'], 5, strpos($this->rota['rmk'], " ")-4));
                $this->rota['id'] = $this->rota['callsign'] . $this->rota['partida'] . $this->rota['chegada'] . $this->rota['eobt'];
                $this->rota['regra'] = $this->verificaRegra($this->rota['rota']);
                $this->rota['trecho'] = $this->rota['partida'] . $this->rota['chegada'];
                $this->rotas['rotas'][$this->rota['id']] = $this->rota;
            }
        }
    }
}

//Instancia a classe
new RPLatualiza();