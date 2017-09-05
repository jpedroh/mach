//Destrói os dados antigos
localStorage.clear();

//Faz a solicitação das rotas
$.ajax({
    url: 'http://jpedroh.com/mach/api/rpl.php',
    async: false,
    dataType: 'json',
    success: function (json) {
        rota = json[Math.floor(Math.random() * (json.length - 0)) + 0];
    },
});

//Seta chegada e partida
localStorage.setItem('partida', rota['partida']);
localStorage.setItem('chegada', rota['chegada']);
localStorage.setItem('erro', 0);
localStorage.setItem('briefing', true)
localStorage.setItem('id', rota['id']);
localStorage.setItem('voo', rota['callsign'])
localStorage.setItem('aeronave', rota['aeronave'])
localStorage.setItem('esteira', rota['esteira'])
localStorage.setItem('eqpt', rota['eqpt'])
localStorage.setItem('velocidade', rota['velocidade'])
localStorage.setItem('altitude', rota['fl'])
localStorage.setItem('rota', rota['rota'].trim())
localStorage.setItem('eet', rota['eet'])
localStorage.setItem('eobt', rota['eobt'])
localStorage.setItem('rmks', rota['rmk'])
localStorage.setItem('eqpt', rota['eqpt'])
localStorage.setItem('pob', Math.floor(Math.random() * 250) + 2)
localStorage.setItem('autonomia', "0000")

//Puxa o alternativo mais próximo
$.ajax({
    url: 'http://jpedroh.com/mach/api/rpl.php?dep=' + rota['chegada'],
    async: false,
    dataType: 'json',
    success: function (alternado) {
        altn = alternado.sort(function(a, b){
            return a.eet - b.eet;
        });
    },
});

//Seta o alternado
localStorage.setItem('altn', altn[0]['chegada'])

//Monta a autonomia
var eet = localStorage.getItem('eet')
var eetaltn = altn[0]['eet']

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
localStorage.setItem('autonomia',hrs + min)

//Converte horas em minutos
function horasMinutos(a) {
    return parseInt((a[0] + a[1]) * 60) + parseInt((a[2] + a[3]))
}

//Redireciona
window.location.href = '../briefing.html'