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

console.log(autonomia)

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

//Monta a tabela resumo
$('#resumo').append('<tr><td><b>Voo</b> ' + voo + '</td></tr>')
$('#resumo').append('<tr><td><b>Partida</b> ' + partida + '</td></tr>')
$('#resumo').append('<tr><td><b>Chegada</b> ' + chegada + '</td></tr>')
$('#resumo').append('<tr><td><b>Alternativa</b> ' + alternado + '</td></tr>')
$('#resumo').append('<tr><td><b>Aeronave</b> ' + aeronave + '</td></tr>')
$('#resumo').append('<tr><td><b>Velocidade</b> ' + velocidade + '</td></tr>')
$('#resumo').append('<tr><td><b>FL</b> ' + fl + '</td></tr>')
$('#resumo').append('<tr><td><b>Rota</b> ' + rota + '</td></tr>')
$('#resumo').append('<tr><td><b>POB</b> ' + POB + '</td></tr>')
$('#resumo').append('<tr><td><b>Autonomia sugerida</b> ' + autview + '</td></tr>')

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

/*Seção Outros*/
$('#outros').append("<a href='fpl.php?id=" + localStorage.getItem('id') + "&aut=" + hrs + min + "&pob=" + POB + "&altn=" + alternado + "' class='btn btn-lg btn-outline-primary'>Gerar plano de voo da IVAO</a> ")
$('#outros').append("<a target='_blank' href='https://skyvector.com/?fpl=" + velocidade + "F" + fl + " " + partida + " " + rota + " " + chegada + "' class='btn btn-lg btn-outline-primary'>Ver essa rota no SkyVector</a>")