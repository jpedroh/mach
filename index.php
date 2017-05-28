<!DOCTYPE html>
<?
session_start();
if(!isset($_SESSION['partida'])){
    $_SESSION['erro'] = 0;
    header('location:selecao.php');
}
//Inclui a classe e instancia
include_once 'classes/rpl.php';
$rota = new RPL($_SESSION['partida'], $_SESSION['chegada'], $_SESSION['cia']);
?>
    <html>
    <head>
        <meta charset="UTF-8"> 
        <!--Import materialize.css-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
        <!--Import dataTables.css-->
        <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.15/css/jquery.dataTables.css">
        <!--Import style.css-->
        <link rel="stylesheet" href="css/index.css">
        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MACH - Planejamento de voo online</title>
    </head>
    <body class='grey lighten-5'>
            <header>
                <div class='container'>
                <div class="right-align">
                    <br><a href='logout.php'>Trocar Plano</a> | <a href='mailto:joao.pedro.hsd@gmail.com'>Enviar Feedback</a> | <a target='_blank' href='https://github.com/jpedroh/mach'>Ver o código no GitHub</a> | <a href='api/index.php'>Desenvolvedores</a>
                </div>
                <div class='center-align'>
                    <h1 class='blue-text text-darken-3' style='font-size:800%;font-weight:100'>mach<sup class='green-text text-darken-3' style='font-size:50%;'>beta</sup></h1>
                    <h5>Encontrei <?= sizeof($rota->rotas) ?> sugestões para a rota <?= $_SESSION['partida'] ?> <i class="fa fa-long-arrow-right" aria-hidden="true"></i> <?= $_SESSION['chegada'] ?>.</h5>
                    <br>
                </div>
                </div>
            </header>
            <main>
                <div class='container'>
                <table id="voos" class="display">
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
                            echo '<td><a class="blue-text text-darken-3" href="fpl.php?id=' . $voo['id'] . '">Gerar plano da IVAO</a></td>';
                            //echo '<td><a class="blue-text text-darken-3" href="monta_briefing.php?id=' . $voo['id'] . '">Gerar briefing do voo</a></td>';
                            echo '</tr>';
                        }
                        ?>
                    </tbody>                    
                </table>
                </div><br>
        </main>
        <footer class='page-footer blue darken-3'>
            <div class='footer-copyright'>
                <div class='container'> <i class="fa fa-copyright" aria-hidden="true"></i> <?= date('Y') ?> Copyright - Desenvolvido por <a class='white-text' target='_blank' href='https://jpedroh.github.io/'>João Pedro Henrique</a> <a class='grey-text text-lighten-4 right' target='_blank' href='https://github.com/jpedroh/mach'><i class="fa fa-github" aria-hidden="true"></i></a></div>
            </div>
        </footer>
        <!--Import jQuery before materialize.js-->
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
        <script src="https://use.fontawesome.com/b19f6a7abc.js"></script>
        <script type="text/javascript" charset="utf8" src="//cdn.datatables.net/1.10.15/js/jquery.dataTables.js"></script>
        <script src="js/script.js"></script>
    </body>
    </html>