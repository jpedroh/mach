<?
class RPL{
    //Atributos
    public $servidor;
    public $username;
    public $password;
    public $dataname;
    
    //Métodos
    public function __construct(){
        //Variáveis localhost
        $this->servidor = "localhost";
        $this->username = "root";
        $this->password = "";
        $this->dataname = "mach";
        echo $this->retorna();
    }
    
    public function retorna(){
        //Conecta
        $banco = mysqli_connect($this->servidor, $this->username, $this->password, $this->dataname);
        //Faz as Restrições
        $where = '';
        $a = '';
        if (isset($_GET['cia'])){
            $where = "cia='".addslashes($_GET['cia'])."'";
            $a = ' and ';
        }
        if (isset($_GET['dep'])){
            $where = $where . $a . "partida='".addslashes($_GET['dep'])."'";
            $a = ' and ';
        }
        if (isset($_GET['arr'])){
            $where = $where . $a . "chegada='".addslashes($_GET['arr'])."'";
            $a = ' and ';
        }
        if (isset($_GET['id'])){
            $where = $where . $a . "id='".addslashes($_GET['id'])."'";
            $a = ' and ';
        }
        //Monta a query
        if($where != ''){
            $query = "SELECT * FROM rpl WHERE " . $where;
        }else{
            $query = "SELECT * FROM rpl";
        }        
        //Faz a busca
        $busca = $banco->query($query);
        //Salva o resultado numa array
        foreach($busca as $resultado){
            $json[] = $resultado;
        }
        //Retorna a JSON
        return json_encode($json);
    }
}

//Instancia a classe
$RPL = new RPL();