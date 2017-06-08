<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <!--Import materialize.css-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MACH - Central do Desenvolvedor - Documentação</title>
</head>

<body class='grey lighten-5'>
    <?
    //Analytics
    include_once('../analytics.php');
    ?>
    <div class='container'><br>
        <div class="right-align">
            <a href='http://parsec.pe.hu/mach/'>Voltar ao mach</a> | <a href='mailto:joao.pedro.hsd@gmail.com'>Contato</a> | <a target='_blank' href='https://github.com/jpedroh/mach'>Ver o código no GitHub</a>
        </div>
        <header class='header center-align'>
            <a href='index.php'><h1 class='blue-text text-darken-3' style='font-size:800%;font-weight:100'>mach<sup class='green-text text-darken-3' style='font-size:50%;'><i class="fa fa-code" aria-hidden="true"></i></sup></h1></a>
            <h4>Seja bem vindo ao espaço do desenvolvedor.<br>Aqui você pode verificar nossa API e deixar a parte chata com a gente.</h4>
        </header><br>
        <main>
            <!--Exemplo-->
            <h4>Mach em ação</h4>
            <p class='flow-text'>Antes de começarmos, vamos dar uma olhada em como funciona a nossa API.</p>
            <table width="100%">
                <tr>
                    <td><b>Voo</b></td>
                    <td><b>Partida</b></td>
                    <td><b>Rota</b></td>
                    <td><b>Chegada</b></td>
                </tr>
            <?
            //Decodifica o json para uma array associativa
            $decodifica = json_decode(file_get_contents('http://jpedroh.com/mach/api/rpl.php?dep=SBBV&arr=SBBR'), true);        
            //Escreve os dados em uma tabela
            foreach($decodifica as $voo){
                echo '<tr>
                        <td>'.$voo['callsign'].'</td>
                        <td>'.$voo['partida'].'</td>
                        <td>'.$voo['rota'].'</td>
                        <td>'.$voo['chegada'].'</td>
                     </tr>';
                    }
            ?>
            </table>
            <br>
            <!--Documentação-->
            <h4>Buscando os dados do sistema e convertendo o JSON</h4>
            <p class='flow-text'>Para buscar os dados do Mach para o seu sistema você somente precisa utilizar alguma função que receba dados de outra fonte, e após isso decodificar o JSON que será retornado. Um exemplo em php é o uso conjunto das funções <a target='_blank' href='http://php.net/manual/pt_BR/function.file-get-contents.php'>file_get_contents();</a> e <a target='_blank' href='http://php.net/manual/pt_BR/function.json-decode.php'>json_decode();</a>, e.g.:</p>
            <script src="https://gist.github.com/jpedroh/0743aa8221b0e77d867a24b418ad2551.js"></script>
            <p class='flow-text'>Após executar essas funções, você terá um array com as rotas do sistema que possui os seguintes valores:</p>
            <li class='flow-text'><b>id</b> um id único, associado a cada rota (o ID é a chave de cada elemento do array)</li>
            <li class='flow-text'><b>callsign</b> o indicativo de chamada da rota</li>
            <li class='flow-text'><b>cia</b> o ICAO da companhia aéra que realizará o voo</li>
            <li class='flow-text'><b>voo</b> o número do voo na base de dados da companhia</li>
            <li class='flow-text'><b>aeronave</b> tipo da aeronave que realiza o voo</li>
            <li class='flow-text'><b>esteira</b> esteira de turbulência da aeronave que realiza o voo</li>
            <li class='flow-text'><b>partida</b> aeródromo de partida do voo</li>
            <li class='flow-text'><b>std</b> Standard Time of Departure, ou o horário de partida presente no plano</li>
            <li class='flow-text'><b>velocidade</b> velocidade na qual é realizada o voo</li>
            <li class='flow-text'><b>fl</b> nível de voo no qual é realizada a rota</li>
            <li class='flow-text'><b>rota</b> rota informada no plano de voo</li>
            <li class='flow-text'><b>chegada</b> aeródromo de destino</li>
            <li class='flow-text'><b>eet</b> tempo estimado em voo</li>
            <li class='flow-text'><b>rmks</b> observações informadas no plano de voo</li>
            <li class='flow-text'><b>eqpt</b> observações da aeronave utilizada no voo</li>
            <p class='flow-text'>De posse disso, você pode utilizar essas informações para fazer o que quiser, como escrever aquela tabela lá de cima, por exemplo:</p>
            <script src="https://gist.github.com/jpedroh/c67fbf8961ee41529e32b147a683e583.js"></script>

            <h4>Utilizando o REST</h4>
            <p class='flow-text'>Nossa api tem suporte à condições REST. No momento, é possível filtrar os resultados por Companhia, Aeródromo de partida e Aeródromo de chegada. Basta adicionar os seguintes comandos após a url da api, e.g.:</p>
            <h5>http://jpedroh.com/mach/api/rpl.php<b>?cia=GLO&dep=SBGR&arr=SBGL</b></h5>
            <li class='flow-text'><b>cia</b> filtra por companhia</li>
            <li class='flow-text'><b>dep</b> filtra por aeroporto de partida</li>
            <li class='flow-text'><b>arr</b> filtra por aeroporto de destino</li>
            <li class='flow-text'><b>id</b> filtra pelo id da rota no banco de dados</li>

            <h4>Recomendações Finais</h4>
            <p class='flow-text'>Para ajudar na questão de largura de banda do servidor e acelerar o carregamento do seu site, recomendamos a utilização de um sistema de cache.</p>
            <p class='flow-text'>Ainda tem dúvidas? Deixe uma mensagem na nossa comunidade no <a target='_blank' href='https://github.com/jpedroh/parsec/issues'>GitHub</a> ou me <a href='mailto:joao.pedro.hsd@gmail.com'>mande um e-mail</a>.</p>
        </main>
    </div>
    <footer class='page-footer blue darken-3'>
        <div class='footer-copyright'>
            <div class='container'> <i class="fa fa-copyright" aria-hidden="true"></i>
                <?= date('Y') ?> Copyright - Desenvolvido por <a class='white-text' target='_blank' href='https://jpedroh.github.io/'>João Pedro Henrique</a> <a class='grey-text text-lighten-4 right' target='_blank' href='https://github.com/jpedroh/mach'><i class="fa fa-github" aria-hidden="true"></i></a></div>
        </div>
    </footer>
    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
    <script src="https://use.fontawesome.com/b19f6a7abc.js"></script>
</body>

</html>