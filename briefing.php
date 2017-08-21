<!DOCTYPE html>
<?
//Declara a sessão
session_start();

//Validadores
$_SESSION['erro'] == 2 ? header('location:selecao.php') : false;
isset($_SESSION['partida']) ? false : header('location:selecao.php');

//Includes
include_once 'classes/cartas.php';

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
?>
<html>
<head>
    <meta charset='UTF-8'>
    <!--Import materialize.css-->
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css'>
    <!--Import dataTables.css-->
    <link rel='stylesheet' type='text/css' href='//cdn.datatables.net/1.10.15/css/jquery.dataTables.css'>
    <!--Import style.css-->
    <link rel='stylesheet' href='css/briefing.css'>
    <!--Let browser know website is optimized for mobile-->
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>MACH - Planejamento de voo online</title>
</head>
<body class='grey lighten-5'>
    <?
    //Analytics
    include_once('analytics.php');
    ?>
    <header>
        <nav class='blue darken-3'>
            <div class='container nav-wrapper'>
                <span style='font-weight:100' class='brand-logo'>mach<sup style='font-size:50%;'>beta</sup></span>
                <ul id='nav-mobile' class='right hide-on-med-and-down'>
                    <li><a href='index.php'>Voltar a seleção</a></li>
                    <li><a href='logout.php'>Sair</a></li>
                </ul>
            </div>
        </nav>
    </header>
    <main>
        <div class='container'>
            <!--Cabeçalho-->
            <h3>Voo  <?= $_SESSION['voo'] ?> de <?=$_SESSION['partida'] ?> para <?=$_SESSION['chegada'] ?></h3>
            <div class='divider'></div><br>

            <!--Resumo-->
            <h5>Resumo</h5>
            <div class='divider'></div>
            <table class='striped'>
                <tbody>
                    <tr><td><b>Voo</b> <?= $_SESSION['voo'] ?></td></tr>
                    <tr><td><b>Partida</b> <?= $_SESSION['partida'] ?></td></tr>
                    <tr><td><b>Chegada</b> <?= $_SESSION['chegada'] ?></td></tr>
                    <tr><td><b>Alternativa</b> <?= $_SESSION['altn'] ?></td></tr>
                    <tr><td><b>Aeronave</b> <?= $_SESSION['aeronave'] . '/' . $_SESSION['esteira'] ?></td></tr>
                    <tr><td><b>Velocidade</b> <?= $_SESSION['velocidade'] ?></td></tr>
                    <tr><td><b>FL</b> <?= $_SESSION['altitude'] ?></td></tr>
                    <tr><td><b>Rota</b> <?= $_SESSION['rota'] ?></td></tr>
                    <tr><td><b>POB</b> <?= $_SESSION['pob'] ?></td></tr>
                    <tr><td><b>Autonomia sugerida</b> <?
    if($_SESSION['autonomia'] !== false){
    echo minHrs($_SESSION['autonomia']) . 'h ou ' . $_SESSION['autonomia'] . ' minutos' ;
        }
                else{
                    echo " Não posso sugerir uma autonomia.";
                }
                        
                        ?></td></tr>
                </tbody>
            </table><br>

            <!--Meteorologia-->
            <h5>Meteorologia</h5>
            <div class='divider'></div>
            <table class='striped'>
                <tbody>
                    <tr><td><b>METAR em <?=$_SESSION['partida'] ?></b> <?= file_get_contents('http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=' . $_SESSION['partida'] . '&msg=metar&data_hora=nao') ?></td></tr>
                    <tr><td><b>METAR em <?=$_SESSION['chegada'] ?></b> <?= file_get_contents('http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=' . $_SESSION['chegada'] . '&msg=metar&data_hora=nao') ?></td></tr>
                    <tr><td><b>METAR em <?=$_SESSION['altn'] ?></b> <?= file_get_contents('http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=' . $_SESSION['altn'] . '&msg=metar&data_hora=nao') ?></td></tr>
                </tbody>
            </table><br>

            <!--Cartas Aéreas-->
            <h5>Cartas Aéreas</h5>
            <div class='divider'></div>
            <div id ='cartas' class='row'>
                <!--Menu-->
                <div class='col s12'>
                    <ul class='tabs tabs-fixed-width'>
                        <li class='tab col s3'><a class='blue-text text-darken-3' href='#partida'><?=$_SESSION['partida'] ?></a></li>
                        <li class='tab col s3'><a class='blue-text text-darken-3' href='#chegada'><?=$_SESSION['chegada'] ?></a></li>
                        <li class='tab col s3'><a class='blue-text text-darken-3' href='#alternado'><?=$_SESSION['altn'] ?></a></li>
                    </ul>
                </div>
                <!--Abas-->
                <div id='partida' class='col s12'>
                    <table id='partida_tbl' class='display'>
                        <thead>
                            <tr>
                                <th>TIPO</th>
                                <th>CARTA</th>
                                <th>DATA</th>
                                <th>DOWNLOAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?
                            $partida = new Cartas($_SESSION['partida']);
                            $partida->montaLinhas();
                            ?>
                        </tbody>
                    </table>
                </div>
                <div id='chegada' class='col s12'>
                    <table id='chegada_tbl' class='display'>
                        <thead>
                            <tr>
                                <th>TIPO</th>
                                <th>CARTA</th>
                                <th>DATA</th>
                                <th>DOWNLOAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?
                            $chegada = new Cartas($_SESSION['chegada']);
                            $chegada->montaLinhas();
                            ?>
                        </tbody>
                    </table>
                </div>
                <div id='alternado' class='col s12'>
                    <table id='alternado_tbl' class='display'>
                        <thead>
                            <tr>
                                <th>TIPO</th>
                                <th>CARTA</th>
                                <th>DATA</th>
                                <th>DOWNLOAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?
                            $chegada = new Cartas($_SESSION['altn']);
                            $chegada->montaLinhas();
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!--Outros-->
            <h5>Outros</h5>
            <div class='divider'></div><br>
            <a href='fpl.php?id=<?=$_SESSION['id'] ?>' class="blue darken-3 waves-effect waves-light btn-large">Gerar plano de voo da IVAO</a>

            <!--Aviso-->
            <p>O sistema de meteorologia e de cartas aéreas são derivados do DECEA e podem estar indisponíveis por razões que fogem de nosso controle.</p>

        </div>
    </main>
    <footer class='page-footer blue darken-3'>
            <div class='footer-copyright'>
                <div class='container'> <i class='fa fa-copyright' aria-hidden='true'></i> <?= date('Y') ?> Copyright - Desenvolvido por <a class='white-text' target='_blank' href='https://jpedroh.github.io/'>João Pedro Henrique</a> <a class='grey-text text-lighten-4 right' target='_blank' href='https://github.com/jpedroh/mach'><i class='fa fa-github' aria-hidden='true'></i></a></div>
            </div>
    </footer>
    <!--Import jQuery before materialize.js-->
    <script type='text/javascript' src='https://code.jquery.com/jquery-2.1.1.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js'></script>
    <script src='https://use.fontawesome.com/b19f6a7abc.js'></script>
    <script type='text/javascript' charset='utf8' src='//cdn.datatables.net/1.10.15/js/jquery.dataTables.js'></script>
    <script src='js/briefing.js'></script>
</body>
</html>