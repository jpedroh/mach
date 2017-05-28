<!DOCTYPE html>
<?
//Declara a sessão
session_start();

//Verifica se a sessão existe
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
    <!--Import style.css-->
    <link rel="stylesheet" href="css/index.css">
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MACH - Planejamento de voo online</title>
</head>
<body class='grey lighten-5'>
    <header>
        <nav class='blue darken-3'>
            <div class="container nav-wrapper">
                <span style='font-weight:100' class="brand-logo">mach<sup style='font-size:50%;'>beta</sup></span>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a href="index.php">Voltar a seleção</a></li>
                    <li><a href="logout.php">Sair</a></li>
                </ul>
            </div>
        </nav>
    </header>
    <main>
        <div class='container'>
            <h3>Voo  <?= $_SESSION['voo'] ?> de <?=$_SESSION['partida'] ?> para <?=$_SESSION['chegada'] ?></h3>
            <div class="divider"></div><br>
            <h5>Resumo</h5>
            <div class="divider"></div>
            <table class="striped">
                <tbody>
                    <tr><td><b>Voo</b> <?=$_SESSION['voo'] ?></td></tr>
                    <tr><td><b>Partida</b> <?=$_SESSION['partida'] ?></td></tr>
                    <tr><td><b>Chegada</b> <?=$_SESSION['chegada'] ?></td></tr>
                    <tr><td><b>Rota</b> <?=$_SESSION['rota'] ?></td></tr>
                </tbody>
            </table>
            <h5>Meteorologia</h5>
            <div class="divider"></div>
            <table class="striped">
                <tbody>
                    <tr><td><b>METAR da partida</b> <?= file_get_contents('http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=' . $_SESSION['partida'] . '&msg=metar&data_hora=nao') ?></td></tr>
                    <tr><td><b>METAR da chegada</b> <?= file_get_contents('http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=' . $_SESSION['chegada'] . '&msg=metar&data_hora=nao') ?></td></tr>
                </tbody>
            </table>
        </div>
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
</body>

</html>
