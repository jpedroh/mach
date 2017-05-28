<!DOCTYPE html>
<?
session_start();
if(!isset($_SESSION['partida'])){
    $_SESSION['erro'] = 0;
    header('location:selecao.php');
}
?>
    <html>
    <head>
        <meta charset="UTF-8"> 
        <!--Import materialize.css-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MACH - Planejamento de voo online</title>
    </head>

    <body class='grey lighten-5'>
        <div class='container'>
            <br>
            <div class="right-align">
                <a href='logout.php'>Trocar Plano</a> | <a href='mailto:joao.pedro.hsd@gmail.com'>Enviar Feedback</a> | <a target='_blank' href='https://github.com/jpedroh/mach'>Ver o código no GitHub</a> | <a href='api/index.php'>Desenvolvedores</a>
            </div>
            <div class='center-align'>
                <h1 class='blue-text text-darken-3' style='font-size:800%;font-weight:100'>mach<sup class='green-text text-darken-3' style='font-size:50%;'>beta</sup></h1>
                <h5>Aqui estão algumas sugestões de <?= $_SESSION['partida'] ?> para <?= $_SESSION['chegada'] ?>.</h5>
                <br>
            </div>
            <div id='voos'>
                <?
                //Inclui a classe e instancia
                include_once 'classes/rpl.php';
                $rota = new RPL($_SESSION['partida'],$_SESSION['chegada']);
                //Lista
                foreach($rota->rotas as $voo){
                    
                ?>
                <div class="row">
                    <div class="col s12">
                      <div class="card">
                        <div class="card-content black-text">
                          <span class="card-title"><?= $voo['callsign'] ?></span><br>
                            <div class='row'>
                                <div class='col s12'>
                                    <span class='grey-text '>ROTA: </span>
                                    <?= $voo['rota'] ?>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col s6'>
                                    <span class='grey-text '>FL: </span>
                                    <?= $voo['fl'] ?>
                                </div>
                                <div class='col s6'>
                                    <span class='grey-text '>VELOCIDADE: </span>
                                    <?= $voo['velocidade'] ?>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col s6'>
                                    <span class='grey-text '>AERONAVE: </span>
                                    <?= $voo['aeronave'] ?>
                                </div>
                                <div class='col s6'>
                                    <span class='grey-text '>EET: </span>
                                    <?= $voo['eet'] ?>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col s6'>
                                    <span class='grey-text '>STD: </span>
                                    <?= $voo['std'] ?>Z
                                </div>
                            </div>
                          </div>
                        <div class="card-action right-align">
                            <a class='blue-text text-darken-3' href="fpl.php?id=<?= $voo['id'] ?>">Gerar plano da IVAO</a>
                        </div>
                      </div>
                    </div>
                </div>
                <? } ?>
            </div>
        </div>
        <footer class='page-footer blue darken-3'>
            <div class='footer-copyright'>
                <div class='container'> <i class="fa fa-copyright" aria-hidden="true"></i> <?= date('Y') ?> Copyright - Desenvolvido por <a class='white-text' target='_blank' href='https://jpedroh.github.io/'>João Pedro Henrique</a> <a class='grey-text text-lighten-4 right' target='_blank' href='https://github.com/jpedroh/mach'><i class="fa fa-github" aria-hidden="true"></i></a></div>
            </div>
        </footer>
        <!--Import jQuery before materialize.js-->
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
        <script src="https://use.fontawesome.com/b19f6a7abc.js"></script>
    </body>
    </html>