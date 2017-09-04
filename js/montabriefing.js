//Faz a requisição AJAX
$.ajax({
    url: 'http://jpedroh.com/mach/api/rpl.php?id=' + getParametro('id'),
    async: false,
    dataType: 'json',
    success: function (json) {
        rota = json[0]
    },
})

//Determina as variáveis
localStorage.setItem('briefing', true)
localStorage.setItem('id', getParametro('id'))
localStorage.setItem('voo', rota['callsign'])
localStorage.setItem('aeronave', rota['aeronave'])
localStorage.setItem('esteira', rota['esteira'])
localStorage.setItem('eqpt', rota['eqpt'])
localStorage.setItem('velocidade', rota['velocidade'])
localStorage.setItem('altitude', rota['fl'])
localStorage.setItem('rota', rota['rota'].trim())
localStorage.setItem('eet', rota['eet'])
localStorage.setItem('eobt', rota['std'])
localStorage.setItem('rmks', rota['rmk'])
localStorage.setItem('eqpt', rota['eqpt'])
localStorage.setItem('pob', getParametro('pob'))
localStorage.setItem('altn', getParametro('alternado').toUpperCase())

//Puxa os parâmetros da URL
function getParametro(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1].toUpperCase();
        }
    }
}

//Faz a requisição AJAX para calcular a autonomia
console.log(localStorage.getItem('altn'))

$.ajax({
    url: 'http://jpedroh.com/mach/api/rpl.php?dep=' + localStorage.getItem('chegada') + '&arr=' + localStorage.getItem('altn'),
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
            localStorage.setItem('autonomia',hrs + min)
        }
    }
})



//Converte horas em minutos
function horasMinutos(a) {
    return parseInt((a[0] + a[1]) * 60) + parseInt((a[2] + a[3]))
}

//Redireciona
window.location.href = '../briefing.html';