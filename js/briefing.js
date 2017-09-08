//Variáveis
var voo = localStorage.getItem('voo')
var partida = localStorage.getItem('partida')
var chegada = localStorage.getItem('chegada')
var alternado = localStorage.getItem('altn').toUpperCase()
var aeronave = localStorage.getItem('aeronave')
var velocidade = localStorage.getItem('velocidade')
var fl = localStorage.getItem('altitude')
var rota = localStorage.getItem('rota')
var POB = localStorage.getItem('pob')
var eqpt = localStorage.getItem('eqpt')
var eet = localStorage.getItem('eet')
var esteira = localStorage.getItem('esteira')
var rmks = localStorage.getItem('rmks')
var eobt = localStorage.getItem('eobt')
var fob = localStorage.getItem('autonomia')
var id = localStorage.getItem('id')

//Verifica se o briefing existe
if (localStorage.getItem('briefing') !== "true")
    window.location.href = "index.html"

//Angular
/*FPL resumido*/
var app = angular.module('briefing', [])
app.controller('planoResumido_Ctrl', function ($scope) {
    $scope.partida = partida
    $scope.callsign = voo
    $scope.chegada = chegada
    $scope.alternado = alternado
    $scope.aeronave = aeronave
    $scope.esteira = esteira
    $scope.eqpt = eqpt.trim()
    $scope.fl = fl
    $scope.velocidade = velocidade
    $scope.eet = eet
    $scope.rota = rota
    $scope.fob = fob
    $scope.pob = POB
    $scope.rmks = rmks
    $scope.id = id
    $scope.fob_fpl = fob
})

/*Seção Meteorologia*/
//Puxa os METARs e salva numa array
function meteorologia() {
    $.ajax({
        url: 'http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=' + partida + ',' + chegada + ',' + localStorage.getItem('altn').toUpperCase() + '&msg=metar,taf&data_hora=nao',
        async: false,
        success: function (retorno) {
            metars = retorno.substr(0, retorno.length - 1).split("\n")
        }
    })

    //Monta a tabela METAR
    $.each(metars, function (chave, metar) {
        $('#meteorologia').append('<tr><td><b>' + metar.split(" ")[0] + ' para ' + metar.split(" ")[1] + '</b> ' + metar + '</td></tr>')
    })
}

//Roda o METAR
meteorologia()

/*Cartas Aéreas*/
//Função que puxa as cartas para determinado Aeroporto
function cartas(apt, tabela) {
    $.ajax({
        url: 'http://www.aisweb.aer.mil.br/api/?apiKey=1934217367&apiPass=e9062beb-43f1-11e7-a4c1-00505680c1b4&area=cartas&IcaoCode=' + apt,
        async: false,
        dataType: 'xml',
        timeout: 3000,
        error: function () {
            $(secao + '_notam').append('<li>Erro. Tente atualizar a página.</li>')
        },
        success: function (retorno) {
            $(retorno).find('item').each(function () {
                //Salva os valores
                var tipo = $(this).find('tipo').text()
                var nome = $(this).find('nome').text()
                var emenda = $(this).find('dt').text()
                var link = $(this).find('link').text()
                //Imprime a tabela
                $(tabela + '_tbody').append('<tr><td>' + tipo + '</td><td>' + nome + '</td><td>' + emenda + "</td><td><a href='" + link + "'>Download</a></td></tr>")

            })


        }
    })
}

//Monta as tabs
document.getElementById('partida_tab').innerText = localStorage.getItem('partida')
document.getElementById('chegada_tab').innerText = localStorage.getItem('chegada')
document.getElementById('alterna_tab').innerText = localStorage.getItem('altn')
document.getElementById('partidanotam_tab').innerText = localStorage.getItem('partida')
document.getElementById('chegadanotam_tab').innerText = localStorage.getItem('chegada')
document.getElementById('alternanotam_tab').innerText = localStorage.getItem('altn')

//Declara a função que cria as cartas na view
cartas(partida, '#partida')
cartas(chegada, '#chegada')
cartas(alternado, '#alternado')

/* Notams */
//Função que puxa as cartas para determinado Aeroporto
function notams(apt, secao) {
    $.ajax({
        url: 'http://www.aisweb.aer.mil.br/api/?apiKey=1934217367&apiPass=e9062beb-43f1-11e7-a4c1-00505680c1b4&area=notam&IcaoCode=' + apt,
        async: false,
        dataType: 'xml',
        timeout: 3000,
        error: function () {
            $(secao + '_notam').append('<p>Erro. Tente atualizar a página.</p>')
        },
        success: function (notam) {
            $(notam).find('item').each(function () {
                //Salva os valores
                var identificacao = $(this).find('n').text()
                var inicio = $(this).find('b').text()
                var termino = $(this).find('c').text()
                var mensagem = $(this).find('e').text()
                //Imprime a secao
                $(secao + '_notam').append('<h6>' + identificacao + '<span class="text-muted font-weight-normal"> de ' + dataNotam(inicio) + ' à ' + dataNotam(termino) + ' </span></h6><p>' + mensagem + '</p><hr>')
            })
        }
    })
}

//Puxa os notams
notams(partida, '#partida')
notams(chegada, '#chegada')
notams(alternado, '#alternado')

//Formata a data do notam
function dataNotam(a) {
    if (a == "PERM")
        return a
    else {
        return a[0] + a[1] + '/' + a[2] + a[3] + '/' + a[4] + a[5] + ' ' + a[6] + a[7] + ':' + a[8] + a[9]
    }
}

function atualiza(tipo, valor) {
    if (tipo == "pob")
        localStorage.setItem(tipo, valor)
    else
        localStorage.setItem(tipo, valor.toUpperCase())

    if(tipo != "esteira")
    document.getElementById(tipo).value = localStorage.getItem(tipo)
    if (tipo == "altn") {
        autonomiaUPDT(valor)
        document.getElementById("autonomia").value = localStorage.getItem('autonomia')
        document.getElementById('alternado_notam').innerHTML = ""
        document.getElementById('alternado_tbody').innerHTML = ""
        document.getElementById('meteorologia').innerHTML = ""
        document.getElementById('alternanotam_tab').innerText = localStorage.getItem('altn')
        document.getElementById('alterna_tab').innerText = localStorage.getItem('altn')
        meteorologia()
        notams(valor, '#alternado')
        cartas(valor, '#alternado')
    }

    //Mostra o snackbar
    var x = document.getElementById("snackbar")
    x.innerText = "Campo " + tipo + " atualizado"
    x.className = "show"
    setTimeout(function () {
        x.className = x.className.replace("show", "")
    }, 3000)
    localStorage.setItem("erro", 0)
}

function autonomiaUPDT(novo) {
    $.ajax({
        url: 'http://jpedroh.com/mach/api/rpl.php?dep=' + localStorage.getItem('chegada') + '&arr=' + novo,
        async: false,
        dataType: 'json',
        success: function (json) {
            if (json === null) {
                localStorage.setItem('autonomia', "0000")
            } else {
                //Monta a autonomia
                var eet = localStorage.getItem('eet')
                var eetaltn = json[0]['eet']

                //Calcula a autonomia
                ab = horasMinutos(eet)
                bc = horasMinutos(eetaltn)

                //Seta a autonomia
                fob = (ab + Math.ceil(0.1 * ab) + 30 + bc)

                //Formata o FOB
                if (fob !== "false") {
                    var hrs = Math.trunc(fob / 60) < 10 ? "0" + Math.trunc(fob / 60) : Math.trunc(fob / 60)
                    var min = fob % 60
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
                localStorage.setItem('autonomia', hrs + min)
            }
        }
    })


    //Converte horas em minutos
    function horasMinutos(a) {
        return parseInt((a[0] + a[1]) * 60) + parseInt((a[2] + a[3]))
    }
}

function aeronaveUPDT(e) {
    if (e.keyCode == 13) {
        var campo = document.getElementById("aeronave")
        atualiza('aeronave', campo.value)
    }
}

function skyvector() {
    window.open('https://skyvector.com/?fpl=' + localStorage.getItem('velocidade') + 'F' + localStorage.getItem('altitude') + ' ' + ' ' + localStorage.getItem('partida') + ' ' + localStorage.getItem('rota') + ' ' + localStorage.getItem('chegada'), '_blank')
}

function ivaofpl() {
    window.open('fpl_briefing.php?call=' + localStorage.getItem('voo') + '&acft=' + localStorage.getItem('aeronave') + '&wake=' + localStorage.getItem('esteira') + '&eqpt=' + localStorage.getItem('eqpt') + '&part=' + localStorage.getItem('partida') + '&cheg=' + localStorage.getItem('chegada') + '&velo=' + localStorage.getItem('velocidade') + '&alti=' + localStorage.getItem('altitude') + '&rota=' + localStorage.getItem('rota') + '&veet=' + localStorage.getItem('eet') + '&rmks=' + localStorage.getItem('rmks') + '&pob=' + localStorage.getItem('pob') + '&fob=' + localStorage.getItem('autonomia') + '&altn=' + localStorage.getItem('altn'), '_blank')
}

//Inicializa as tabelas
$('#partida_tabela').DataTable({
    paging: false,
    language: {
        search: '_INPUT_',
        searchPlaceholder: 'Filtrar resultados',
        'info': 'Mostrando _TOTAL_ de _MAX_ resultados',
        'infoEmpty': 'Nao foram encontrados resultados',
        'infoFiltered': '(filtro aplicado)'
    }
})

//Inicializa as tabelas
$('#chegada_tabela').DataTable({
    paging: false,
    language: {
        search: '_INPUT_',
        searchPlaceholder: 'Filtrar resultados',
        'info': 'Mostrando _TOTAL_ de _MAX_ resultados',
        'infoEmpty': 'Nao foram encontrados resultados',
        'infoFiltered': '(filtro aplicado)'
    }
})

//Inicializa as tabelas
$('#alternado_tabela').DataTable({
    paging: false,
    language: {
        search: '_INPUT_',
        searchPlaceholder: 'Filtrar resultados',
        'info': 'Mostrando _TOTAL_ de _MAX_ resultados',
        'infoEmpty': 'Nao foram encontrados resultados',
        'infoFiltered': '(filtro aplicado)'
    }
})