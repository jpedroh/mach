<?
//Inicia a sessão
session_start();

//Puxa o voo
$id = $_GET['id'];

//Puxa a JSON do voo
$dados = json_decode(file_get_contents('http://jpedroh.com/mach/api/rpl.php?id='.$id),true);

//Dados
$call = $dados[0]['callsign'];
$acft = $dados[0]['aeronave'];
$wake = $dados[0]['esteira'];
$eqpt = $dados[0]['eqpt'];
$part = $_SESSION['partida'];
$cheg = $_SESSION['chegada'];
$velo = $dados[0]['velocidade'];
$alti = $dados[0]['fl'];
$rota = trim($dados[0]['rota']);
$veet = $dados[0]['eet'];
$rmks = $dados[0]['rmk'];
$pob = isset($_GET['pob']) ? $_GET['pob'] : null;
$altn = isset($_GET['altn']) ? $_GET['altn'] : null;
$fob = isset($_GET['aut']) ? $_GET['aut'] : null;

//Escreve o plano de voo
$IVAOFPL = "[FLIGHTPLAN]\nID=$call\nFLIGHTTYPE=S\nNUMBER=1\nACTYPE=$acft\nWAKECAT=$wake\nEQUIPMENT=$eqpt\nDEPICAO=$part\nSPEEDTYPE=N\nSPEED=$velo[1]$velo[2]$velo[3]$velo[4]\nLEVELTYPE=F\nLEVEL=$alti\nROUTE=$rota\nDESTICAO=$cheg\nEET=$veet\nOTHER=$rmks\nPOB=$pob\nALTICAO=$altn\nENDURANCE=$fob";

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
