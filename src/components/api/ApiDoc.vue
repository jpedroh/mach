<template>
<div>
<CcNav></CcNav>
<div class='container conteudo'>
<!--Saudação-->
        <div class='text-center'>
            <h2 class='text-center'>Seja bem vindo à Documentação.</h2>
            <h3 class='text-center'>Aqui você pode aprender tudo sobre nossa API.</h3><br>
        </div>

<!--Puxando-->
        <h4>Buscando os dados do sistema e convertendo o JSON</h4><hr>
        <p>Para buscar os dados do Mach para o seu sistema você somente precisa utilizar alguma função que receba dados de outra fonte, e após isso decodificar o JSON que será retornado. Um exemplo em php é o uso conjunto das funções <a target='_blank' href='http://php.net/manual/pt_BR/function.file-get-contents.php'>file_get_contents();</a> e <a target='_blank' href='http://php.net/manual/pt_BR/function.json-decode.php'>json_decode();</a>, e.g.:</p>
        <!-- <script src="https://gist.github.com/jpedroh/0743aa8221b0e77d867a24b418ad2551.js"></script> -->
        <p>Após executar essas funções, você terá um array com as rotas do sistema que possui os seguintes valores:</p>
        <ul>
            <li><b>id</b> um id único, associado a cada rota (o ID é a chave de cada elemento do array)</li>
            <li><b>callsign</b> o indicativo de chamada da rota</li>
            <li><b>cia</b> o ICAO da companhia aéra que realizará o voo</li>
            <li><b>voo</b> o número do voo na base de dados da companhia</li>
            <li><b>aeronave</b> tipo da aeronave que realiza o voo</li>
            <li><b>esteira</b> esteira de turbulência da aeronave que realiza o voo</li>
            <li><b>partida</b> aeródromo de partida do voo</li>
            <li><b>std</b> Standard Time of Departure, ou o horário de partida presente no plano</li>
            <li><b>velocidade</b> velocidade na qual é realizada o voo</li>
            <li><b>fl</b> nível de voo no qual é realizada a rota</li>
            <li><b>rota</b> rota informada no plano de voo</li>
            <li><b>chegada</b> aeródromo de destino</li>
            <li><b>eet</b> tempo estimado em voo</li>
            <li><b>rmks</b> observações informadas no plano de voo</li>
            <li><b>eqpt</b> observações da aeronave utilizada no voo</li>
            <li><b>indentificador</b> uma forma de indentificar o voo no DB, utilizando o callsign+partida+chegada+std</li>
            <li><b>dias</b> dias em que a rota é operada informada no CGNA</li>
        </ul>
        <p>De posse disso, você pode utilizar essas informações para fazer o que quiser, como escrever esses dados em uma tabela, por exemplo:</p>
        <!-- <script src="https://gist.github.com/jpedroh/c67fbf8961ee41529e32b147a683e583.js"></script> -->

        
        <!--Filtrando-->
        <h4>Filtrando e refinando os resultados</h4><hr>
        <p>Nossa api tem suporte à condições REST. No momento, é possível filtrar os resultados por Companhia, Aeródromo de partida e Aeródromo de chegada. Basta adicionar os seguintes comandos após a url da api, e.g:</p>
        <h5>http://jpedroh.com/mach/api/rpl.php<b>?cia=GLO&dep=SBGR&arr=SBGL</b></h5>
        <ul>
            <li><b>cia</b> filtra por companhia</li>
            <li><b>dep</b> filtra por aeroporto de partida</li>
            <li><b>arr</b> filtra por aeroporto de destino</li>
            <li><b>id</b> filtra pelo id da rota no banco de dados</li>
        </ul>

        <!--Recomendações Finais-->
        <h4>Recomendações Finais</h4><hr>
        <p>Para ajudar na questão de largura de banda do servidor e acelerar o carregamento do seu site, recomendamos a utilização de um sistema de cache. Ainda tem dúvidas? Deixe uma mensagem na nossa comunidade no <a target='_blank' href='https://github.com/jpedroh/parsec/issues'>GitHub</a> ou me <a href='mailto:joao.pedro.hsd@gmail.com'>mande um e-mail</a>.</p>
</div>
</div>
</template>

<script>
import CcNav from '../blocos/navApi.vue'

export default {
  name: 'app',
  components: {
    CcNav
  }
}
</script>