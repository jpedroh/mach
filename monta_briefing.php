<?
//Declara a sessão
session_start();

//Busca o valor do voo
$_SESSION['id'] = isset($_GET['id']) ? $_GET['id'] : $_SESSION['id'];

//Busca os dados do voo na API
$dados = json_decode(file_get_contents('http://parsec.pe.hu/mach/api/rpl.php?id='.$_SESSION['id']),true);

//Monta as variáveis globais para o briefing
$_SESSION['voo'] = $dados[0]['callsign'];
$_SESSION['aeronave'] = $dados[0]['aeronave'];
$_SESSION['esteira'] = $dados[0]['esteira'];
$_SESSION['eqpt'] = $dados[0]['eqpt'];
$_SESSION['velocidade'] = $dados[0]['velocidade'];
$_SESSION['altitude'] = $dados[0]['fl'];
$_SESSION['rota'] = $dados[0]['rota'];
$_SESSION['eet'] = $dados[0]['eet'];
$_SESSION['rmks'] = $dados[0]['rmk'];

//Redireciona para o briefing
header('location:briefing.php');