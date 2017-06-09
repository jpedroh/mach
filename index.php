<!DOCTYPE html>
<?
//Declara a seção
session_start();

//Validadores
$_SESSION['erro'] == 2 ? header('location:selecao.php') : false;
isset($_SESSION['partida']) ? false : header('location:selecao.php');

//Inclui a classe e instancia
include_once 'classes/rpl.php';
$rota = new RPL($_SESSION['partida'], $_SESSION['chegada']);

//Session globais
$_SESSION['altn'] = null;
$_SESSION['pob'] = null;
?>
<html>
<head>
    <meta charset='UTF-8'>
    <!--Import materialize.css-->
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css'>
    <!--Import dataTables.css-->
    <link rel='stylesheet' type='text/css' href='//cdn.datatables.net/1.10.15/css/jquery.dataTables.css'>
    <!--Import style.css-->
    <link rel='stylesheet' href='css/index.css'>
    <!--Let browser know website is optimized for mobile-->
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>MACH - Planejamento de voo online</title>
</head>
<style>
#altn:valid {
    text-transform: uppercase;
}
</style>    
<body class='grey lighten-5'>
    <?
    //Analytics
    include_once('analytics.php');
    ?>
    <header>
        <div class='container'>
            <div class='right-align'>
                <br><a class='blue-text text-darken-4' href='logout.php'>Trocar Plano</a> | <a class='blue-text text-darken-4' href='mailto:joao.pedro.hsd@gmail.com'>Enviar Feedback</a> | <a class='blue-text text-darken-4' target='_blank' href='https://github.com/jpedroh/mach'>Ver o código no GitHub</a> | <a class='blue-text text-darken-4' href='api/index.php'>Desenvolvedores</a>
                </div>
            <div class='center-align'>
                <h1 class='blue-text text-darken-4' style='font-size:800%;font-weight:100'>mach<sup class='green-text text-darken-4' style='font-size:50%;'>beta</sup></h1>
                <h5>Encontrei <?= sizeof($rota->rotas) ?> sugestões para a rota <?= $_SESSION['partida'] ?> <i class='fa fa-long-arrow-right' aria-hidden='true'></i> <?= $_SESSION['chegada'] ?>.</h5><br>
            </div>
        </div>
    </header>
    <main>
        <?= $_SESSION['altn'] . $_SESSION['pob'] ?>
        <div class='container'>
            <table id='voos' class='display'>
                <thead>
                    <tr>
                        <th>VOO</th>
                        <th>ROTA</th>
                        <th>FL</th>
                        <th>STD</th>
                        <th>AERONAVE</th>
                        <th>EET</th>
                        <th>AÇÃO</th>
                    </tr>
                </thead>
                <tbody>
                    <?
                    //Lista
                    foreach($rota->rotas as $voo){
                        echo '<tr>';
                        echo '<td>' . $voo['callsign'] . '</td>';
                        echo '<td>' . $voo['rota'] . '</td>';
                        echo '<td>' . $voo['fl'] . '</td>';
                        echo '<td>' . $voo['std'] . 'Z</td>';
                        echo '<td>' . $voo['aeronave'] . '</td>';
                        echo '<td>' . $voo['eet'] . '</td>';
                    ?>
                        <td><a class='blue-text text-darken-4' href='#modal<?= $voo['id'] ?>'>Ver Briefing</a> | <a class='blue-text text-darken-4' href='fpl.php?id=<?= $voo['id'] ?>'>IVAO FPL</a></td>
                        <!--Modal pré-briefing-->
                        <div id='modal<?= $voo['id'] ?>' class='modal'>
                            <div class='modal-content'>
                                <h4>Pré-briefing - <?= $voo['callsign'] ?></h4>
                                <p class='flow-text'>Antes de começarmos, você precisa preencher umas coisinhas.</p>
                                <form action='monta_briefing.php?id=<?= $voo['id'] ?>' id='form<?= $voo['id'] ?>' method='post'>
                                    <!--ALTN-->
                                    <div class="row">
                                        <div class="col s12">Escolha um alternado:
                                            <div class="input-field inline">
                                                <input id="altn" type="text" name='altn' required>
                                                <label for="altn">Alternado</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!--POB-->
                                    <div class="row">
                                        <div class="col s12">Insira um POB:
                                            <div class="input-field inline">
                                                <input id="pob" type="number" name='pob' required>
                                                <label for="pob">POB</label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div class='modal-footer'>
                                <a href='#!' class='modal-action modal-close waves-effect btn-flat'>Voltar a seleção</a> 
                                <button class="btn modal-action waves-effect waves-light btn-flat" type="submit" name="action">Ir para o briefing</button>
                                </form>
                            </div>
                        </div>
                </tr>
                    <?
                    }
                    ?>
                </tbody>
            </table>
        </div><br>
    </main>
    <footer class='page-footer blue darken-3'>
        <div class='footer-copyright'>
            <div class='container'> <i class='fa fa-copyright' aria-hidden='true'></i>
                <?= date('Y') ?> Copyright - Desenvolvido por <a class='white-text' target='_blank' href='https://jpedroh.github.io/'>João Pedro Henrique</a> <a class='grey-text text-lighten-4 right' target='_blank' href='https://github.com/jpedroh/mach'><i class='fa fa-github' aria-hidden='true'></i></a></div>
        </div>
    </footer>
    <!--Import jQuery before materialize.js-->
    <script type='text/javascript' src='https://code.jquery.com/jquery-2.1.1.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js'></script>
    <script src='https://use.fontawesome.com/b19f6a7abc.js'></script>
    <script type='text/javascript' charset='utf8' src='//cdn.datatables.net/1.10.15/js/jquery.dataTables.js'></script>
    <script src='js/index.js'></script>
</body>
</html>