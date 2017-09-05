# mach
An open-source flight planning tool for flight simulation, heavily based on JS and HTML.

## changelog
- v1.4
  - Inseridas sugestões de alternados no pré-briefing.
  - Documentação atualizada.

- v1.3
  - Alterações nos dados salvos pelo DB.

- v1.2.1
  - Pequenas alterações.
  
- v1.2
  - Reformulação da função briefing, permitindo interatividade com o usuário
  
- v1.1.1
  - Início de experiências com AngularJS
  
- v1.1
  - Inserida função "Estou com sorte!"
  
- v1.0.2
  - Minor adjusts.
  
- v1.0.1
  - Minor bug corrections.
  - Fixed cron jobs.

- v1.0
  - Release the KRAKEN!
  - Conversion to JavaScript, reducing PHP necessity.
  - Preparations for offline version.
  
- v0.5.1 (BETA)
  - Inserted SkyVector link.
  - Adjusts on API update.
  
- v0.5.0 (BETA)
  - Inserted Endurance calculation.
  
- v0.4.1 (BETA)
  - Inserted Pre-Briefing.
  - Minor bug corrections.
  
- v0.4 (BETA)
  - Landing page redesign.
  - Inserted Google Analytics tracking.
  - Minor bugs correction.

- v0.3.2 (BETA)
  - Server migration changes.
  - Minor bugs corrected.

- v0.3.1 (BETA)
  - Inserted cron job handling on API.
  - Minor improvements

- v0.3 (BETA)
  - Inserted flight briefing funcionality.
  - Minor changes.
 
- v0.2.2 (BETA)
  - Bugfix: IVAO fpl generation on EQPT and OTHER fields.
  - Added company filtering on selection.
  - FL colunm inserted.
  
- v0.2.1 (BETA)
  - Change from cards to Datatables.
  
- v0.2 (BETA)
  - API system inserted;
  - System migration to API.
  
- v0.1 (BETA)
  - BETA Release.
 
## Documentação API (PT-BR)
### RPL CGNA
#### Sobre
O sistema de API para o RPL do Mach visa retornar de maneira simples e rápida os voos em vigor no RPL da base de dados do CGNA. A API retorna os voos selecionados em uma JSON que pode ser lida com funções básicas de qualquer linguagem de progamação e então adicionadas a banco de dados, por exemplo. Para iniciar o uso dessa api, basta apontar para **http://jpedroh.com/mach/api/rpl.php** e começar.

#### Quais dados a API fornece?
Por enquanto, a API fornece os seguintes dados, sendo possível utilizar alguns filtros como será mostrado mais adiante.
- **id** um id único, associado a cada rota (o ID é a chave de cada elemento do array)
- **callsign** o indicativo de chamada da rota
- **cia** o ICAO da companhia aéra que realizará o voo
- **voo** o número do voo na base de dados da companhia
- **aeronave** tipo da aeronave que realiza o voo
- **esteira** esteira de turbulência da aeronave que realiza o voo
- **partida** aeródromo de partida do voo
- **std** Standard Time of Departure, ou o horário de partida presente no plano
- **velocidade** velocidade na qual é realizada o voo
- **fl** nível de voo no qual é realizada a rota
- **rota** rota informada no plano de voo
- **chegada** aeródromo de destino
- **eet** tempo estimado em voo
- **rmks** observações informadas no plano de voo
- **eqpt** observações da aeronave utilizada no voo

#### Utilizando os filtros da API (REST)
Em algumas situações pode ser útil utilizar filtros para selecionar voos que cumpram determinadas condições. No momento, a API suporta os seguintes filtros:
- **cia** filtra por companhia
- **dep** filtra por aeroporto de partida
- **arr** filtra por aeroporto de destino
- **id** filtra pelo id da rota no banco de dados
Para utilizar os filtros, basta adicionar o comando **?=** e o filtro desejado no final da URL, como será mostrado em exemplos mais abaixo.

#### Exemplo em PHP
O exemplo abaixo, visa mostrar como recuperar os dados da API e transformá-las em um array associativo, utilizando as funções ```file_get_contents``` e ```json_decode```.

```php
//Recebe a API do Mach
$api = file_get_contents('http://parsec.pe.hu/mach/api/rpl.php');

//Decodifica o json para uma array associativa
$decodifica = json_decode($api, true);
```

Porém, em alguns casos pode ser interessante filtrar os resultados utilizando o REST. Nesse caso, basta inserir o filtro no final da URL como no exemplo abaixo, em que filtramos os resultados pela companhia GOL.

```php
//Recebe a API do Mach
$api = file_get_contents('http://parsec.pe.hu/mach/api/rpl.php?cia=GLO');

//Decodifica o json para uma array associativa
$decodifica = json_decode($api, true);
```

Com isso, você receberá uma array com os dados de cada rota, e fica fácil a inserção deles em uma tabela, como por exemplo:

```php
<!--Gera o cabeçalho da tabela-->
<table width="100%">
  <tr>
    <td><b>Voo</b></td>
    <td><b>Partida</b></td>
    <td><b>Rota</b></td>
    <td><b>Chegada</b></td>
  </tr>
  
<?
//Escreve os dados nas linhas
foreach($decodifica as $voo){
    echo '<tr>
            <td>'.$voo['callsign'].'</td>
            <td>'.$voo['partida'].'</td>
            <td>'.$voo['rota'].'</td>
            <td>'.$voo['chegada'].'</td>
         </tr>';
}
?>
  
<!--Fecha a Tabela-->
</table>
```

#### Bastidores da API
A API funciona com apenas dois scripts em PHP e uma tarefa CRON rodando no back-end do servidor. Os arquivos (atualiza.php e rpl.php) estão localizados no diretório API do source do projeto. O fluxograma abaixo mostra, de forma simplificada, como o script funciona:

![Fluxograma API RPL - Mach](http://i.imgur.com/YjMUauZ.png)

Olhando o código, fica fácil de compreender como cada arquivo trabalha.

##### Análise do código de atualiza.php
O código de atualiza.php cria uma classe e a instancia. Esse script é rodado com um cron job diariamente no servidor e sua responsabilidade é de atualizar a base de dados do Mach. A classe é composta de 4 métodos e um construtor.

###### O método construtor
Esse método é o responsável por verificar e executar todas as funções da Classe, representados pelo método baixar.

```php
public function __construct(){
  $this->baixar('SBAZ');
  $this->baixar('SBBS');
  $this->baixar('SBCW');
  $this->baixar('SBRE');
}
```

Esse construtor chama o método baixar, responsável por baixar e atualizar cada FIR.

###### Os métodos independentes
Esse métodos são responsáveis por dar vida ao sistema, sendo o método baixar o que invoca todos os outros.

```php
public function baixar($fir){
  $url = 'http://portal.cgna.gov.br/files/abas/' . date('Y-m-d') . '/painel_rpl/bdr/RPL' . $fir .'.zip';
  $urlcgna = curl_init($url);
  curl_setopt($urlcgna,  CURLOPT_RETURNTRANSFER, TRUE);
  $exec = curl_exec($urlcgna);
  $httpcdd = curl_getinfo($urlcgna, CURLINFO_HTTP_CODE);
  if ($httpcdd != '404'){
    //Baixa o arquivo RPL atualizado
    file_put_contents('rpl/' . $fir .'.zip', file_get_contents('http://portal.cgna.gov.br/files/abas/' . date('Y-m-d') . '/painel_rpl/bdr/RPL' . $fir .'.zip'));
    $log = $fir . ' baixado em ' . date('r');
    $logfile = fopen("cgna.log", "a");
    fwrite($logfile, "\n" . $log);
    //Atualiza o DB
    //Reseta a tabela
    $this->banco = mysqli_connect("localhost","root","","mach");
    $this->banco->query("TRUNCATE TABLE rpl");
    //Salva os valores
    $this->salvar();
    //Otimiza a tabela
    $this->banco->query("OPTIMIZE TABLE rpl");
  }
}
```

Ao receber o atributo ``` $fir ```, a função é iniciada, verificando se existe o arquivo .zip do tipo BDR, que contém todos os planos RPL para aquela FIR na data fornecida pelo servidor, através de uma CURL. Se essa data existe, o sistema baixa esses arquivos para a memória do servidor, que ficam salvos na pasta rpl. No arquivo cgna.log, ficam salvos a fir o qual o RPL foi baixado e o horário em que isso foi feito, para posteriores comparações e verificações.
Após isso, é necessário manipular esse arquivo .zip para que se possa receber o RPL por EOBT. Para isso a função ```getArquivo``` analisa o nome de cada .txt contido no .zip a fim de encontrar tal classificação, através de um ```preg_match``` e da classe ```ZipArchive``` como mostra o seu código:

```php
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
```

Com o retorno do nome do arquivo, o sistema pode então iniciar o processo de salvamento no banco de dados. Para isso, ocorre uma limpeza na tabela, fazendo com que todos os voos sejam removidos. Após isso, a função ```salvar``` é chamada para que possam ser inseridos os novos registros.

```php
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
            $this->rota = substr($aeronave, '59', strpos($aeronave, "EQPT")-68);
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
```

Logo no começo, a função ```parse``` é chamada, pegando os dados dos arquivos já baixados anteriormente. Com isso, todos os arquivos são juntos em uma só variável e transformadas em uma array através do comando ```explode``` utilizando quebras de linha como divisor. Após isso, é necessário filtrar linhas indesejadas dos arquivos, deixando apenas os dados que realmente interessam em uso. Para isso, o sistema filtra pelo termo EQPT - presente em todos os RPLs enviados - removendo cabeçalhos e espaços em branco que não são relevantes. Após isso, o sistema apenas gera as variáveis para cada aeronave e as salva no DB, com um ID único e as informações de cada RPL, dando fim a cadeia de atualização da API.

##### Análise do código de rpl.php
O arquivo rpl.php é o responsável por realizar as pesquisas na base de dados da API do Mach. De maneira semelhante, o método construtor chama o método ```retorna```, responsável por fazer a consulta e gerar um JSON. O código é bastante auto-explicativo, dispensando comentários.

```php
public function retorna(){
    //Conecta
    $banco = mysqli_connect("localhost","root","","mach");
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
```

##### Desafios da criação da API do Mach
Embora bastante informação seja divulgada a respeito da aviação no Brasil, alguns desafios ainda são encontrados. Os dados não são entregues de maneira legível para máquinas, sendo necessários malabarismos para receber e processar essas informações. Sendo assim, a ideia da API é de facilitar essa digestão de maneira rápida, segura e simples.
