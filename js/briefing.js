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
    window.location.href = "index.html";

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

/*Meteorologia*/
app.controller('meteorologia_Ctrl', function ($scope, $http) {
    $http.get('http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=' + partida + ',' + chegada + ',' + alternado + '&msg=metar,taf&data_hora=nao').then(function (response) {
        //Recebe os METARs
        $scope.metars = response.data.substr(0, response.data.length - 1).split("\n")
    })
})

/*Cartas Aéreas*/

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

function atualiza(tipo, valor) {
    localStorage.setItem(tipo, valor)
    if (tipo == "altn") {
        autonomiaUPDT(valor)
    }
    location.reload()
}

function autonomiaUPDT(novo) {
    $.ajax({
        url: 'http://jpedroh.com/mach/api/rpl.php?dep=' + localStorage.getItem('chegada') + '&arr=' + novo,
        async: false,
        dataType: 'json',
        success: function (json) {
            if (json === null) {
                localStorage.setItem('autonomia', "0000");
            } else {
                //Monta a autonomia
                var eet = localStorage.getItem('eet')
                var eetaltn = json[0]['eet']

                //Calcula a autonomia
                ab = horasMinutos(eet);
                bc = horasMinutos(eetaltn);

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
        var campo = document.getElementById("aeronave");
        atualiza('aeronave', campo.value)
    }
}
