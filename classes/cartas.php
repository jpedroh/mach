<?
class Cartas{
    //Atributos
    public $ais;
    public $nome;
    public $url;
    public $id;
    public $data;
    public $tipo;
    
    //Métodos
    public function __construct($a){
        //Busca na API do AIS
        $this->ais = new SimpleXMLElement(file_get_contents('http://www.aisweb.aer.mil.br/api/?apiKey=1934217367&apiPass=e9062beb-43f1-11e7-a4c1-00505680c1b4&area=cartas&IcaoCode=' . $a));
    }

    public function montaLinhas(){
        foreach($this->ais->cartas->item as $carta){
            echo '<tr>';
            echo '<td>' . $carta->tipo . '</td>';
            echo '<td>' . $carta->nome . '</td>';
            echo '<td>' . $carta->dt . '</td>';
            echo '<td><a class="blue-text text-darken-3" href="http://www.aisweb.aer.mil.br/download/?arquivo=' . $carta['id'] . '">Download</a></td>';
            echo '</tr>';
        }
    }
    
}
