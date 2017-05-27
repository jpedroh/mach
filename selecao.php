<!DOCTYPE html>
<?
//Declara a sessão
session_start();
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
    <div class='container center-align'>
        <h1 class='blue-text text-darken-3' style='font-size:800%;font-weight:100'>mach<sup class='green-text text-darken-3' style='font-size:50%;'>beta</sup></h1>
        <h5>Seja bem vindo ao mach, a maneira mais fácil de se criar um plano de voo.</h5>
        <h5>Para começar, digite os ICAOs de partida e da chegada.</h5>
        <h5 class='red-text text-darken-4'>
            <?
            if(isset($_SESSION['erro']) && $_SESSION['erro'] == 1){
               echo "ERRO! Não foi encontrada nenhuma rota entre os dois aeródromos no sistema.";
            }
            ?>
        </h5> 
        <div class="row">
            <form action='valida.php' method="post" class="col s12">
                <div class="row">
                    <div class="input-field col s5">
                        <input id='partida' name='partida' type="text">
                        <label for="partida">Partida</label>
                    </div>
                    <div class="input-field col s5">
                        <input id='chegada' name='chegada' type="text">
                        <label for="chegada">Destino</label>
                    </div>
                    <div class="input-field col s2">
                        <button class="blue darken-3 btn waves-effect waves-light" type="submit">Iniciar <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </div>
        <p class='center-align'>Desenvolvido por <a target='_blank' href='https://jpedroh.github.io/'>João Pedro Henrique</a></p>
        </div>
        <!--Import jQuery before materialize.js-->
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
        <script src="https://use.fontawesome.com/b19f6a7abc.js"></script>
</body>
</html>
