//Inicializa
var partida = localStorage.getItem("partida")
var chegada = localStorage.getItem("chegada")

//Angular
var app = angular.module('tabelaRotas', [])
app.controller('tab_rotas_Ctrl', function ($scope, $http) {
    $http.get('http://jpedroh.com/mach/api/rpl.php?dep=' + partida + '&arr=' + chegada).then(function (response) {
        //Recebe os dados das rotas
        $scope.rotas = response.data
        $scope.tamanho = response.data.length
        $scope.partida = partida
        $scope.chegada = chegada
        //
        if (response.data == 'null')
            window.location.href = 'selecao.html'
    })
})

/*//Inicializa a tabela
$('#resultados').DataTable({
    paging: false,
    language: {
        search: "_INPUT_",
        searchPlaceholder: "Filtrar resultados",
        "info": "Mostrando _TOTAL_ de _MAX_ resultados",
        "infoFiltered": "(filtro aplicado)"
    }
});*/