<?
//Dados
$call = $_GET['call'];
$acft = $_GET['acft'];
$wake = $_GET['wake'];
$eqpt = $_GET['eqpt'];
$part = $_GET['part'];
$cheg = $_GET['cheg'];
$velo = $_GET['velo'];
$alti = $_GET['alti'];
$rota = $_GET['rota'];
$veet = $_GET['veet'];
$rmks = $_GET['rmks'];
$pob = $_GET['pob'];
$altn = $_GET['altn'];
$fob = $_GET['fob'];

//Escreve o plano de voo
$IVAOFPL = "[FLIGHTPLAN]\nID=$call\nFLIGHTTYPE=S\nNUMBER=1\nACTYPE=$acft\nWAKECAT=$wake\nEQUIPMENT=$eqpt\nDEPICAO=$part\nSPEEDTYPE=N\nSPEED=$velo[1]$velo[2]$velo[3]$velo[4]\nLEVELTYPE=F\nLEVEL=$alti\nROUTE=$rota\nDESTICAO=$cheg\nEET=$veet\nOTHER=$rmks\nPOB=$pob\nALTICAO=$altn\nENDURANCE=$fob";

//Salva o arquivo
$file_name =  $call . ".fpl";
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
