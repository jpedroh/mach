//Variáveis
var voo = localStorage.getItem('voo')
var partida = localStorage.getItem('partida')
var chegada = localStorage.getItem('chegada')
var alternado = localStorage.getItem('altn')
var aeronave = localStorage.getItem('aeronave')
var velocidade = localStorage.getItem('velocidade')
var fl = localStorage.getItem('altitude')
var rota = localStorage.getItem('rota')
var POB = localStorage.getItem('pob')
var autonomia = localStorage.getItem('autonomia')
var eqpt =  localStorage.getItem('eqpt')
var eet =  localStorage.getItem('eet')
var esteira = localStorage.getItem('esteira')
var rmks = localStorage.getItem('rmks')
var eobt = localStorage.getItem('eobt')

if (localStorage.getItem('briefing') !== "true")
    window.location.href = "index.html";

//Saudação
document.getElementById('saudacao').innerHTML = 'Voo ' + voo + ' de ' + partida + ' para ' + chegada

/*Seção Resumo*/
//Formata a autonomia
if (autonomia !== "false") {
    var hrs = Math.trunc(autonomia / 60) < 10 ? "0" + Math.trunc(autonomia / 60) : Math.trunc(autonomia / 60)
    var min = autonomia % 60
    if (min < 60 && min > 9) {
        var min = min
    } else if (min > 0 && min < 9) {
        var min = "0" + min
    } else {
        var min = "00"
    }
} else {
    var min = "00"
    var hrs = "00"
}

//Define a view
autview = autonomia !== "false" ? hrs + ':' + min + 'h ou ' + autonomia + ' minutos' : 'O sistema não pode calcular uma autonomia'

//Monta o plano simplificado
$('#linha1').append('<div class="col"><p><b>Partida</b> ' + partida + '</p></a></div><div class="col"><p><b>Chegada</b> ' + chegada + '</p></div><div class="col"><p><b>Alternado</b> ' + alternado + '</p></div>')
$('#linha2').append('<div class="col-8"><p><b>Aeronave</b> ' + aeronave + "/" + esteira + '</p></div><div class="col-4"><p><b>EQPT</b> ' + eqpt + '</p></div>')
$('#linha3').append('<div class="col"><p><b>FL</b> ' + fl + '</p></div><div class="col"><p><b>Velocidade</b> ' + velocidade + '</p></div><div class="col"><p><b>EET</b> ' + eet + '</p></div>')
$('#linha4').append('<div class="col"><p><b>Rota</b> ' + rota + '</p></div>')
$('#linha5').append('<div class="col-8"><p><b>FOB</b> ' + autview + '</p></div><div class="col-4"><p><b>POB</b> ' + POB + '</p></div>')
$('#linha6').append('<div class="col"><p><b>RMKS</b> ' + rmks + '</p></div>')

/*Seção Meteorologia*/
//Puxa os METARs e salva numa array
$.ajax({
    url: 'http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=' + partida + ',' + chegada + ',' + alternado + '&msg=metar&data_hora=nao',
    async: false,
    success: function (retorno) {
        metars = retorno.substr(0, retorno.length - 1).split("\n")
    }
})

//Monta a tabela METAR
$.each(metars, function (chave, metar) {
    $('#metar').append('<tr><td><b>METAR em ' + metar.substr(6, 4) + '</b> ' + metar.substr(6) + '</td></tr>')
})

/*Seção Cartas Aéreas*/
//Função que puxa as cartas para determinado Aeroporto
function cartas(apt, tabela) {
    $.ajax({
        url: 'http://www.aisweb.aer.mil.br/api/?apiKey=1934217367&apiPass=e9062beb-43f1-11e7-a4c1-00505680c1b4&area=cartas&IcaoCode=' + apt,
        async: false,
        dataType: 'xml',
        success: function (retorno) {
            $(retorno).find('item').each(function () {
                //Salva os valores
                var tipo = $(this).find('tipo').text();
                var nome = $(this).find('nome').text();
                var emenda = $(this).find('dt').text();
                var link = $(this).find('link').text();
                //Imprime a tabela
                $(tabela + '_tbody').append('<tr><td>' + tipo + '</td><td>' + nome + '</td><td>' + emenda + "</td><td><a href='" + link + "'>Download</a></td></tr>")

            });
            //Inicializa a tabela
            $(tabela + '_tabela').DataTable({
                paging: false,
                language: {
                    search: '_INPUT_',
                    searchPlaceholder: 'Filtrar resultados',
                    'info': 'Mostrando _TOTAL_ de _MAX_ resultados',
                    'infoEmpty': 'Nao foram encontrados resultados',
                    'infoFiltered': '(filtro aplicado)'
                }
            });
        }
    })
}

//Monta as tabs
document.getElementById('partida_tab').innerText = localStorage.getItem('partida')
document.getElementById('chegada_tab').innerText = localStorage.getItem('chegada')
document.getElementById('alterna_tab').innerText = localStorage.getItem('altn')

//Declara a função que cria as cartas na view
cartas(partida, '#partida')
cartas(chegada, '#chegada')
cartas(alternado, '#alternado')

//Função que atualiza os campos
function atualiza(campo, valor){
    console.log("teste", campo, valor)
    localStorage.setItem("'" + campo + "'", valor)
    location.reload()
}

/*Seção Outros*/
$('#outros').append("<div class='col'><a href='fpl.php?id=" + localStorage.getItem('id') + "&aut=" + hrs + min + "&pob=" + POB + "&altn=" + alternado + "' class='btn-block btn btn-lg btn-outline-primary'>Gerar plano de voo da IVAO</a></div>")
$('#outros').append("<div class='col'><a target='_blank' href='https://skyvector.com/?fpl=" + velocidade + "F" + fl + " " + partida + " " + rota + " " + chegada + "' class='btn-block btn btn-lg btn-outline-primary'>Ver essa rota no SkyVector</a></div>")