//Parâmetros
var partida = localStorage.getItem("partida");
var chegada = localStorage.getItem("chegada");

//Faz a solicitação das rotas
$.ajax({
    url: "http://jpedroh.com/mach/api/rpl.php?dep=" + partida + "&arr=" + chegada,
    async: false,
    dataType: 'json',
    success: function (json) {
        rotas = json;
    },
});

//Verifica se existe alguma consulta prévia
if (!rotas) {
    localStorage.setItem("erro", 1);
    //Redireciona
    window.location.href = "selecao.html";
}

//Cabeçalho
document.getElementById("saudacao").innerHTML = "Encontrei " + rotas.length + " sugestões para a rota " + partida + " <i class='fa fa-long-arrow-right' aria-hidden='true'></i> " + chegada

//Imprime as rotas na tabela
$.each(rotas, function (key, val) {
    $("#voos").append("<tr><td>" + val['callsign'] + "</td><td>" + val['rota'] + "</td><td>" + val['fl'] + "</td><td>" + val['std'] + "Z</td><td>" + val['aeronave'] + "</td><td>" + val['eet'] + "</td><td id='acao'><a data-toggle='modal' href='#modal" + val['callsign'] + "'>Ver Briefing</a> | <a class='blue-text text-darken-4' href='fpl.php?id=" + val['id'] + "'>IVAO FPL</a></td></tr>")
    $("#modaisvoos").append("<div class='modal fade' id='modal" + val['callsign'] + "' tabindex='-1' role='dialog' aria-labelledby='label' aria-hidden='true'> <form class='form-signin' action='handles/briefing.html' method='get'> <div class='modal-dialog modal-lg' role='document'> <div class='modal-content'> <div class='modal-header'> <h5 class='modal-title' id='label'>Pré-briefing - Voo " + val['callsign'] + "</h5> <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button> </div> <div class='modal-body'> <p class='lead'>Antes de começarmos,você precisa preencher umas coisinhas.</p> <div class='form-group'> <label class='form-control-label' for='alternado'>Escolha um alternado</label> <input type='hidden' name='id' value='" + val['id'] + "'><input name='alternado' id='alternado' type='text' required class='form-control' placeholder='Alternado'> </div> <div class='form-group'> <label class='form-control-label' for='pob'>Insira um POB</label> <input name='pob' id='pob' type='number' required class='form-control' placeholder='POB'> </div> </div> <div class='modal-footer'> <button type='button' class='btn btn-secondary' data-dismiss='modal'>Voltar a seleção</button> <button class='btn btn-primary' type='submit'>Ir para o briefing</button> </div> </div> </div> </form> </div>")
})

//Inicializa a tabela
$('#resultados').DataTable({
    paging: false,
    language: {
        search: "_INPUT_",
        searchPlaceholder: "Filtrar resultados",
        "info": "Mostrando _TOTAL_ de _MAX_ resultados",
        "infoFiltered": "(filtro aplicado)"
    }
});