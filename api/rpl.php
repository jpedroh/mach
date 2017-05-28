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
        //Log
        $log = 'cgna.log';
        //Verifica se a última atualização ainda é valida. O sistema atualiza uma vez diariamente.
        if (time() - file_get_contents($log) >= 86400) {
        //Se a atualização não for mais válida
        $this->baixar('SBAZ');
        $this->baixar('SBBS');
        $this->baixar('SBCW');
        $this->baixar('SBRE');
        //Salva no database
        //$this->salvar();
        //Atualiza o log com a última atualização
        file_put_contents($log, time());
        }
        echo $this->retorna();
    }
    
    public function baixar($fir){
        $url = 'http://portal.cgna.gov.br/files/abas/' . date('Y-m-d') . '/painel_rpl/bdr/RPL' . $fir .'.zip';
        $urlcgna = curl_init($url);
        curl_setopt($urlcgna,  CURLOPT_RETURNTRANSFER, TRUE);
        $exec = curl_exec($urlcgna);
        $httpcdd = curl_getinfo($urlcgna, CURLINFO_HTTP_CODE);
        if ($httpcdd != '404'){
            //Baixa o arquivo RPL atualizado
            file_put_contents('rpl/' . $fir .'.zip', file_get_contents('http://portal.cgna.gov.br/files/abas/' . date('Y-m-d') . '/painel_rpl/bdr/RPL' . $fir .'.zip'));
            $banco = mysqli_connect($this->servidor, $this->username, $this->password, $this->dataname);
            //Reseta a tabela
            $banco->query("TRUNCATE TABLE rpl");
            //Salva os valores
            $this->salvar();
            //Otimiza a tabela
            $banco->query("OPTIMIZE TABLE rpl");
        }
    }
    
    public function getArquivo($fir){
        $zip = new ZipArchive();
        if ($zip->open('rpl/' . $fir . '.zip') == TRUE) {
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $arquivos[] = $zip->getNameIndex($i);
            }
        }
        $busca = 'EOBT';
        $nome = array_values(array_filter($arquivos, function($var) use ($busca) { return preg_match("/\_$busca\_/", $var); }))[0];
        return $nome;
    }
    
    public function parse($fir){
        $zip = new ZipArchive();
        $arquivo = 'rpl/' . $fir . '.zip';
        $zip->open($arquivo);
        return $zip->getFromName(@$this->getArquivo($fir));
    }
    
    public function salvar(){
        //Conecta ao DB
        $banco = mysqli_connect($this->servidor, $this->username, $this->password, $this->dataname);
        //Decodifica
        $SBAZ = $this->parse('SBAZ');
        $SBBS = $this->parse('SBBS');
        $SBCW = $this->parse('SBCW');
        $SBRE = $this->parse('SBRE');
        //Salva os dados em um array
        $lista = explode("\n", $SBAZ . $SBBS . $SBCW . $SBRE);
        //Gera o json
        $id = 0;
        foreach($lista as $aeronave){
            if(strpos($aeronave, 'EQPT')){
                $this->id = $id;
                $this->callsign = substr($aeronave, 25, 7);
                $this->cia = substr($aeronave, 25, 3);
                $this->voo = substr($aeronave, 28, 4);
                $this->aeronave = substr($aeronave, 33, 4);
                $this->esteira = substr($aeronave, 38, 1);
                $this->partida = substr($aeronave, 40, 4);
                $this->std = substr($aeronave, 44, 4);
                $this->velocidade = substr($aeronave, 49, 5);
                $this->fl = substr($aeronave, '55', 3);
                $this->rota = substr($aeronave, '59', strpos($aeronave, "EQPT")-68);
                $this->chegada = substr($aeronave, strpos($aeronave, "EQPT")-9, 4);
                $this->eet = substr($aeronave, strpos($aeronave, "EQPT")-5, 4);
                $this->rmk = substr($aeronave, strpos($aeronave, "EQPT"), -1);
                $this->eqpt = substr($this->rmk, 5, strpos($this->rmk, " ")-4);
                $query = "INSERT INTO rpl VALUES ('$this->id', '$this->callsign', '$this->cia', '$this->voo', '$this->aeronave', '$this->esteira', '$this->partida', '$this->std', '$this->velocidade', '$this->fl', '$this->rota', '$this->chegada', '$this->eet', '$this->rmk', '$this->eqpt')";
                $banco->query($query);
                $id++;
                
            }
        }        
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