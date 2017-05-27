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
    <div class='container'><br>
        <div class="right-align">
            <a href='logout.php'>Voltar ao mach</a> | <a href='mailto:joao.pedro.hsd@gmail.com'>Contato</a> | <a target='_blank' href='https://github.com/jpedroh/mach'>Ver o código no GitHub</a>
        </div>
        <header class='header center-align'>
            <h1 class='blue-text text-darken-3' style='font-size:800%;font-weight:100'>mach<sup class='green-text text-darken-3' style='font-size:50%;'><i class="fa fa-code" aria-hidden="true"></i></sup></h1>
            <h4>Seja bem vindo ao espaço do desenvolvedor.<br>Aqui você pode verificar nossa API e deixar a parte chata com a gente.</h4>
        </header><br>
        <main>
            <!--Primeiros Passsos-->
            <h4>Primeiros Passos</h4>
            <p class='flow-text'>Antes de começarmos, vamos dar uma olhada em como funciona a nossa API.</p>
            <?
            $rpl = file_get_contents('http://parsec.pe.hu/rplapi/rpl.php');
            $decodifica = json_decode($rpl, true);
            
            
            // Mostra o cabeçalho da tabela
echo '
    <table width="100%">
        <tr>
            <td><b>ICAO</b></td>
            <td><b>Subtipo</b></td>
            <td><b>Nome</b></td>
            <td><b>Data</b></td>
            <td><b>Download</b></td>
        </tr>
';
            
            $count = 0;
            foreach($decodifica as $voo)
            {
                if ($count > 4)
                break;

                echo '
                    <tr>
                        <td>'.$voo['callsign'].'</td>
                        <td>'.$voo['partida'].'</td>
                        <td>'.$voo['rota'].'</td>
                        <td>'.$voo['chegada'].'</td>
                    </tr>
                ';

                $count++;
            }
            
            
            
            echo '
    </table>
';
            
            ?>
            
            <br>
            <!--Documentação-->
            <h4>Como funciona e como faço para começar?</h4>
            <p class='flow-text'>Nosso sistema está diariamente buscando por novos dados do CGNA. Ao receber os dados atualizados, o sistema converte os RPLs do CGNA em JSONs, formatos que são aceitos em todas as linguagens back-end (PHP, Ruby, Java, Python, etc.). Você só precisa se preocupar em gerenciar a sua VA. A parte chata, deixa com a gente.</p>
            <p class='flow-text'>Para ver exemplos e começar é bastante simples, basta dar uma olhada na nossa <a href='doc.php'>documentação</a></p>
        </main>
    </div>
    <footer class='page-footer blue darken-3'>
        <div class='footer-copyright'>
            <div class='container'> <i class="fa fa-copyright" aria-hidden="true"></i>
                <?= date('Y') ?> Copyright - Desenvolvido por <a class='white-text' target='_blank' href='https://jpedroh.github.io/'>João Pedro Henrique</a> <a class='grey-text text-lighten-4 right' target='_blank' href='https://github.com/jpedroh/parsec'><i class="fa fa-github" aria-hidden="true"></i></a></div>
        </div>
    </footer>
    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>
    <script src="https://use.fontawesome.com/b19f6a7abc.js"></script>
</body>

</html>
