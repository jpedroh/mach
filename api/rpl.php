<?
class RPL{    
    //Métodos
    public function __construct(){
        //Log
        $log = 'cgna.log';
        //Verifica se a última atualização ainda é valida. O sistema atualiza uma vez diariamente.
        if (time() - file_get_contents($log) >= 86400) {
        //Se a atualização não for mais válida
        $this->baixar('SBAZ');
        $this->baixar('SBBS');
        $this->baixar('SBCW');
        $this->baixar('SBRE');
        //Atualiza o log com a última atualização
        file_put_contents($log, time());
        }
        //Escreve o json
        $this->escrever();
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
        //Salva os dados em um array
        $lista = explode("\n", $SBAZ . $SBBS . $SBCW . $SBRE);
        //Gera o json
        $id = 0;
        foreach($lista as $aeronave){
            if(strpos($aeronave, 'EQPT')){
                $voos[$id]['id'] = $id;
                $voos[$id]['callsign'] = substr($aeronave, 25, 7);
                $voos[$id]['cia'] = substr($aeronave, 25, 3);
                $voos[$id]['voo'] = substr($aeronave, 28, 4);
                $voos[$id]['aeronave'] = substr($aeronave, 33, 4);
                $voos[$id]['esteira'] = substr($aeronave, 38, 1);
                $voos[$id]['partida'] = substr($aeronave, 40, 4);
                $voos[$id]['std'] = substr($aeronave, 44, 4);
                $voos[$id]['velocidade'] = substr($aeronave, 49, 5);
                $voos[$id]['fl'] = substr($aeronave, '55', 3);
                $voos[$id]['rota'] = substr($aeronave, '59', strpos($aeronave, "EQPT")-68);
                $voos[$id]['chegada'] = substr($aeronave, strpos($aeronave, "EQPT")-9, 4);
                $voos[$id]['eet'] = substr($aeronave, strpos($aeronave, "EQPT")-5, 4);
                $voos[$id]['rmk'] = substr($aeronave, strpos($aeronave, "PBN"), -1);
                $voos[$id]['eqpt'] = substr($aeronave, strpos($aeronave, "EQPT")+5, strpos($aeronave, "PBN")-strpos($aeronave, "EQPT")-6);
                $id++;
            }
        }
        //Retorna o JSON
        echo json_encode($voos);
        }    
}

//Instancia a classe
new RPL();