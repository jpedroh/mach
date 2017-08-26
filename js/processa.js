//Destrói os dados antigos
localStorage.clear();

//Seta chegada e partida
localStorage.setItem("partida", getParametro('p'));
localStorage.setItem("chegada", getParametro('c'));
localStorage.setItem("erro", 0);

//Faz a solicitação das rotas
$.ajax({
    url: "http://jpedroh.com/mach/api/rpl.php?dep=" + localStorage.getItem("partida") + "&arr=" + localStorage.getItem("chegada"),
    async: false,
    dataType: 'json',
    success: function (json) {
        rotas = json;
    },
});

//Valida
if (!rotas) {
    localStorage.setItem("erro", 1);
    //Redireciona para a seleção
    window.location.href = "../selecao.html";
} else {
    //Redireciona para a tabela
    window.location.href = "../index.html";
    localStorage.setItem("erro", 0);
}

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