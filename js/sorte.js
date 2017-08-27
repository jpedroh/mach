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
localStorage.setItem('pob', '0')
localStorage.setItem('altn', 'TBA')
localStorage.setItem('autonomia', "0000")

//Redireciona
window.location.href = '../briefing.html'