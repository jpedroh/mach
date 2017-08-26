<?
date_default_timezone_set('UTC');

class RPLatualiza{
    //Atributos
    public $servidor;
    public $username;
    public $password;
    public $dataname;
    public $banco;
    
    //Métodos
    public function __construct(){
        $this->baixar('SBAZ');
        $this->baixar('SBBS');
        $this->baixar('SBCW');
        $this->baixar('SBRE');
    }
    
    public function baixar($fir){
        $url = 'http://portal.cgna.gov.br/files/abas/' . date('Y-m-d') . '/painel_rpl/bdr/RPL' . $fir .'.zip';
        $urlcgna = curl_init($url);
        curl_setopt($urlcgna,  CURLOPT_RETURNTRANSFER, TRUE);
        $exec = curl_exec($urlcgna);
        $httpcdd = curl_getinfo($urlcgna, CURLINFO_HTTP_CODE);
        if ($httpcdd != '404'){
            //Baixa o arquivo RPL atualizado
            file_put_contents('public_html/mach/api/rpl/' . $fir .'.zip', file_get_contents('http://portal.cgna.gov.br/files/abas/' . date('Y-m-d') . '/painel_rpl/bdr/RPL' . $fir .'.zip'));
            $log = $fir . ' baixado em ' . date('r');
            $logfile = fopen("cgna.log", "a");
            fwrite($logfile, "\n" . $log);
            echo $log;
            //Atualiza o DB
            //Reseta a tabela
            $this->banco = mysqli_connect("localhost","root","","mach");
            $this->banco->query("TRUNCATE TABLE rpl");
            //Salva os valores
            $this->salvar();
            //Otimiza a tabela
            $this->banco->query("OPTIMIZE TABLE rpl");
        }else{
            echo 'Sem atualizações para ' .  $fir . ' hoje';
        }
    }
    
    public function getArquivo($fir){
        $zip = new ZipArchive();
        if ($zip->open('public_html/mach/api/rpl/' . $fir . '.zip') == TRUE) {
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
        $arquivo = 'public_html/mach/api/rpl/' . $fir . '.zip';
        $zip->open($arquivo);
        return $zip->getFromName(@$this->getArquivo($fir));
    }
    
public function salvar(){
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
                $this->rota = trim(substr($aeronave, '59', strpos($aeronave, "EQPT")-68));
                $this->chegada = substr($aeronave, strpos($aeronave, "EQPT")-9, 4);
                $this->eet = substr($aeronave, strpos($aeronave, "EQPT")-5, 4);
                $this->rmk = substr($aeronave, strpos($aeronave, "EQPT"), -1);
                $this->eqpt = substr($this->rmk, 5, strpos($this->rmk, " ")-4);
                $query = "INSERT INTO rpl VALUES ('$this->id', '$this->callsign', '$this->cia', '$this->voo', '$this->aeronave', '$this->esteira', '$this->partida', '$this->std', '$this->velocidade', '$this->fl', '$this->rota', '$this->chegada', '$this->eet', '$this->rmk', '$this->eqpt')";
                $this->banco->query($query);
                $id++;
                
            }
        }        
    }
}

//Instancia a classe
$RPL = new RPLatualiza();