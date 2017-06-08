<?
class RPL{    
    //Métodos
    public function __construct($a,$b,$c){
        if($c != null){
            $api = file_get_contents('http://jpedroh.com/mach/api/rpl.php?dep=' . $a . '&arr=' . $b . '&cia=' . $c);
        }else{
            $api = file_get_contents('http://jpedroh.com/mach/api/rpl.php?dep=' . $a . '&arr=' . $b);
        }
        $this->rotas = json_decode($api, true);
    }
}