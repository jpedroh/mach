<?
//Inicia a sessão
session_start();

//Includes
include_once 'classes/rpl.php';

//Puxa o voo
$etap = $_GET['e'];
$call = $_GET['voo'];

//Instancia o RPL
$RPL = new RPL();
$dados = $RPL->lista[$etap][$call];

//Dados
$acft = explode('/', $dados['aeronave']);
$eqpt = $dados['eqpt'];
$part = $_SESSION['partida'];
$cheg = $_SESSION['chegada'];
$velo = $dados['velocidade'];
$alti = $dados['fl'];
$rota = $dados['rota'];
$veet = $dados['eet'];
$rmks = $dados['rmk'];

//Escreve o plano de voo
$IVAOFPL = "[FLIGHTPLAN]\nID=$call\nFLIGHTTYPE=S\nNUMBER=1\nACTYPE=$acft[0]\nWAKECAT=$acft[1]\nEQUIPMENT=$eqpt\nDEPICAO=$part\nSPEEDTYPE=$velo[0]\nSPEED=$velo[1]$velo[2]$velo[3]$velo[4]\nLEVELTYPE=$alti[0]\nLEVEL=$alti[1]$alti[2]$alti[3]\nROUTE=$rota\nDESTICAO=$cheg\nEET=$veet\nOTHER=$rmks";

//Salva o arquivo
$file_name =  $call . '.fpl'; 
$file = fopen($file_name, "w"); 
fputs($file, $IVAOFPL); 
fclose($file);

//Força o download e apaga do servidor depois
header("Content-Type: application/save"); 
header("Content-Length:".filesize($file_name)); 
header('Content-Disposition: attachment; filename="' . $file_name . '"'); 
header("Content-Transfer-Encoding: binary"); 
header('Expires: 0'); 
header('Pragma: no-cache'); 
$fp = fopen( $file_name, "r" ); 
fpassthru($fp); 
fclose($fp); 
unlink($file_name);