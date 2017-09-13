<template>
<div>
<CcNav></CcNav>
<div class='container conteudo'>
     <!--Saudação-->
        <div class='text-center'>
            <h2 class='text-center'>Seja bem vindo ao espaço do desenvolvedor.</h2>
            <h3 class='text-center'>Aqui você pode verificar nossa API e deixar a parte chata com a gente.</h3><br>
        </div>

        <!--Justificativa-->
        <h4>Porque utilizar a api do MACH?</h4><hr>
        <div class='row text-center'>
            <div class='col'>
                <i style='font-size:800%' class='fa fa-file-code-o' aria-hidden='true'></i><br><br>
                <h5>Open Source</h5>
                <p>Por que pagar por dados públicos?<br>Somos totalmente gratuitos. Hoje, amanhã e para sempre.</p>
            </div>
            <div class='col'>
                <i style='font-size:800%' class='fa fa-calendar-check-o' aria-hidden='true'></i><br><br>
                <h5>Atualizações</h5>
                <p>Atualizações automáticas a cada ciclo.<br>Garantimos que você sempre tenha os dados mais recentes.</p>
            </div>
            <div class='col'>
                <i style='font-size:800%' class='fa fa-cogs' aria-hidden='true'></i><br><br>
                <h5>Facilidade</h5>
                <p>Suporte a quase todas as linguagens de programação.<br>Fluxo de dados através de JSONs.</p>
            </div>
        </div><br>

        <!--Como funciona-->
        <h4>Como funciona e como faço para começar?</h4><hr>
        <p>Nosso sistema está diariamente buscando por novos dados do CGNA. Ao receber os dados atualizados, o sistema converte os RPLs do CGNA em JSONs, formatos que são aceitos em todas as linguagens back-end e front-end (PHP, Ruby, Java, Python, NodeJS, JavaScript, etc.). Você só precisa se preocupar em gerenciar a sua VA. A parte chata, deixa com a gente.<br>Para começar é bastante simples, basta dar uma olhada na <router-link v-bind:to="'/api/doc'">nossa documentação e nos exemplos</router-link>.</p>
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

<style>
</style>