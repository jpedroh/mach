<?
//Inicia a sessão
session_start();

//Puxa o voo
$id = $_GET['id'];

//Puxa a JSON do voo
$dados = json_decode(file_get_contents('http://jpedroh.com/mach/api/rpl.php?id='.$id),true);

function minHrs($mins){
      $min = $mins; 
    // Arredonda a hora
    $h = floor($min / 60); 
    $m = ($min - ($h * 60)) / 100; 
    $horas = $h + $m; 
    // Matemática da quinta série
    // Detalhe: Aqui também pode se usar o abs()
    if ($mins < 0)
      $horas *= -1; 
    // Separa a hora dos minutos
    $sep = explode('.', $horas); 
    $h = $sep[0]; 
    if (empty($sep[1]))
      $sep[1] = 00; 
    $m = $sep[1]; 
    // Aqui um pequeno artifício pra colocar um zero no final
    if (strlen($m) < 2)
      $m = $m . 0; 
    return sprintf('%02d%02d', $h, $m); 
  } 

//Dados
$call = $dados[0]['callsign'];
$acft = $dados[0]['aeronave'];
$wake = $dados[0]['esteira'];
$eqpt = $dados[0]['eqpt'];
$part = $_SESSION['partida'];
$cheg = $_SESSION['chegada'];
$velo = $dados[0]['velocidade'];
$alti = $dados[0]['fl'];
$rota = $dados[0]['rota'];
$veet = $dados[0]['eet'];
$rmks = $dados[0]['rmk'];
$pob = isset($_SESSION['pob']) ? $_SESSION['pob'] : null;
$altn = isset($_SESSION['altn']) ? $_SESSION['altn'] : null;
$fob = isset($_SESSION['altn']) ? minHrs($_SESSION['autonomia']) : null;

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
