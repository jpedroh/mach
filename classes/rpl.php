<?
class RPL{    
    //Métodos
    public function __construct($a,$b){
        $api = file_get_contents('http://jpedroh.com/mach/api/rpl.php?dep=' . $a . '&arr=' . $b);
        $this->rotas = json_decode($api, true);
    }
}