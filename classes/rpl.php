<?
class RPL{    
    //Métodos
    public function __construct(){
        $rpl = file('rpl.txt');
        //Log
        $log = 'cgna.log';
        //Verifica se a última atualização ainda é valida. O sistema atualiza uma vez diariamente.
        if (time() - file_get_contents($log) >= 86400) {
        //Se a atualização não for mais válida
        $this->baixar('SBAZ');
        $this->baixar('SBBS');
        $this->baixar('SBCW');
        $this->baixar('SBRE');
        $this->escrever();
        //Atualiza o log com a última atualização
        file_put_contents($log, time());
        }
        //Cria as arrays
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
    
    public function baixar($fir){
        $url = 'http://portal.cgna.gov.br/files/abas/' . date('Y-m-d') . '/painel_rpl/bdr/RPL' . $fir .'.zip';
        $urlcgna = curl_init($url);
        curl_setopt($urlcgna,  CURLOPT_RETURNTRANSFER, TRUE);
        $exec = curl_exec($urlcgna);
        $httpcdd = curl_getinfo($urlcgna, CURLINFO_HTTP_CODE);
        if ($httpcdd != '404'){
            //Baixa o arquivo RPL atualizado
            file_put_contents('rpl/' . $fir .'.zip', file_get_contents('http://portal.cgna.gov.br/files/abas/' . date('Y-m-d') . '/painel_rpl/bdr/RPL' . $fir .'.zip'));
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
    
    public function escrever(){
        //Decodifica
        $SBAZ = $this->parse('SBAZ');
        $SBBS = $this->parse('SBBS');
        $SBCW = $this->parse('SBCW');
        $SBRE = $this->parse('SBRE');
        //Salva tudo em um array
        $lista = explode("\n", $SBAZ . $SBBS . $SBCW . $SBRE);
        //Abre o txt para escrita dos resultados
        $txt = fopen('rpl.txt','wb');
        //Foreach para escrita dos resultados
        foreach($lista as $a){
            $rpl = false;
                if(strpos($a, 'EQPT')){
                    $rpl = $a . "\n";
                }
                fwrite($txt,$rpl);
        }
        fclose($txt);
        }
    

    
}

