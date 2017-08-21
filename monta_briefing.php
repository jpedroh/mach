<?
//Declara a sessão
session_start();

//Busca o valor do voo
$_SESSION['id'] = isset($_GET['id']) ? $_GET['id'] : $_SESSION['id'];

//Busca os dados do voo na API
$dados = json_decode(file_get_contents('http://jpedroh.com/mach/api/rpl.php?id='.$_SESSION['id']),true);

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
$_SESSION['pob'] = $_POST['pob'];
$_SESSION['altn'] = strtoupper($_POST['altn']);

//Puxa os dados para a alternativa
$altn = json_decode(file_get_contents('http://jpedroh.com/mach/api/rpl.php?dep=' . $_SESSION['chegada'] . '&arr=' . $_SESSION['altn']),true);

//Monta autonomia
$eet = $dados[0]['eet'];
$eetaltn = $altn[0]['eet'];

//Calcula a autonomia
$a = horasMinutos($eet);
$b = horasMinutos($eetaltn);

$altn ? $_SESSION['autonomia'] = $a + ceil(0.1*$a) + 30 + $b : $_SESSION['autonomia'] = false;

echo $_SESSION['autonomia'];

//Converte horas em minutos
function horasMinutos($a){
    return (($a[0] . $a[1])*60) + ($a[2] . $a[3]);
}
//Redireciona para o briefing
header('location:briefing.php');