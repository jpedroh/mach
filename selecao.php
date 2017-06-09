<?
//Declara a sessão
session_start();
?>
<!DOCTYPE html>
<html lang='pt-br'>
<head>
    <!--Let browser know website is optimized for mobile-->
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta charset='utf-8'>
    <!--Import Google Icon Font-->
    <link href='http://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
    <!--Import materialize.css-->
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css'>
    <!--Import selecao.css-->
    <link type='text/css' rel='stylesheet' href='css/selecao.css' media='screen,projection' />
    <title>MACH - Planejamento de voo online</title>
</head>
<body>
        <!--Google Analytics-->
        <? include_once('analytics.php'); ?>

            <!--Cabeçalho-->
            <nav class='transparent z-depth-0'>
                <div class='nav-wrapper container'>
                    <a href='/' class='brand-logo white-text'>
                        <h2 style='margin-top:6px;font-weight:100'>mach<sup style='font-size:50%'>beta</sup></h2>
                    </a>
                    <ul class='right hide-on-med-and-down'>
                        <li><a href='api/index.php'>API</a></li>
                        <li><a href='mailto:joao.pedro.hsd@gmail.com'>Enviar Feedback</a></li>
                        <li><a target='_blank' href='https://github.com/jpedroh/mach'>Ver o código no GitHub</a></li>
                    </ul>
                </div>
            </nav>

            <!--Greetings-->
            <div class='container white-text center' id='mensagem'>
                <h2 style='font-weight:300'>Seja bem vindo ao mach.</h2>
                <h4 style='font-weight:300'>A maneira mais fácil de se criar um plano de voo.</h4>
                <h4 id='largura' style='font-weight:300'>Para começar, digite os ICAOs de partida e chegada.</h4>
            </div>

            <!--Formulario-->
            <form id='formulario' action='valida.php' method='post'>
                <div class='row'>
                    <input id='partida' name='partida' type='text' placeholder='PARTIDA' required>
                </div>
                <div class='row'>
                    <input id='chegada' name='chegada' type='text' placeholder='CHEGADA' required>
                </div>
                <div class='row'>
                    <button id='iniciar' class='waves-effect waves-light btn-large white blue-text text-darken-2' type='submit'>Começar</button>
                </div>
            </form>

            <!--Footer-->
            <footer class='white-text center'>
                <div id='links'><a class='grey-text text-lighten-2' href='mailto:joao.pedro.hsd@gmail.com'>Enviar Feedback</a> | <a class='grey-text text-lighten-2' href='api/index.php'>API</a></div>
                <h6>Desenvolvido por <a class='grey-text text-lighten-2' href='http://jpedroh.com/' target='_blank'>João Pedro Henrique</a></h6>
            </footer>
    <!--Import jQuery before materialize.js-->
    <script type='text/javascript' src='https://code.jquery.com/jquery-2.1.1.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js'></script>
    <!--Retorna o toast com erro-->
    <? 
        if(isset($_SESSION['erro']) && $_SESSION['erro'] == 1){
            echo '
                    <script>
                        $(document).ready(function(){
                           Materialize.toast("Ops, nenhum plano de voo encontrado.", 5000, "red");
                        });
                    </script>  
                ';
            $_SESSION['erro'] = 2;
        }    
    ?>
</body>
</html>