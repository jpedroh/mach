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

    $http.get('http://jpedroh.com/mach/api/rpl.php?dep=' + chegada).then(function (response) {
        //Recebe os dados das rotas
        $scope.alternado = response.data
    })
})

//Remove duplicados nas sugestões
app.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];
        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
});