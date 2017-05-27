<!DOCTYPE html>
<?
//Declara a sessão
session_start();
if(!isset($_SESSION['voo'])){$_SESSION['voo'] = $_POST['voo'];}
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
    <div class='container'>
        <h3>Voo <?=$_SESSION['voo'] ?> de <?=$_SESSION['partida'] ?> para <?=$_SESSION['chegada'] ?></h3>
        <p class='center-align'>Desenvolvido por <a target='_blank' href='https://jpedroh.github.io/'>João Pedro Henrique</a></p>
        </div>
        <!--Import jQuery before materialize.js-->
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
        <script src="https://use.fontawesome.com/b19f6a7abc.js"></script>
</body>

</html>
