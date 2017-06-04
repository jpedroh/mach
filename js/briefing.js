//Inicializa as tabelas

//Inicializa as cartas de partida
$('#partida_tbl').DataTable({
    paging: false,
    language: {
        search: "_INPUT_",
        searchPlaceholder: "Filtrar resultados",
        "info": "Mostrando _TOTAL_ de _MAX_ resultados",
        "infoEmpty": "NĂŁo foram encontrados resultados",
        "infoFiltered": "(filtro aplicado)"
    }
});

//Inicializa as cartas de chegada
$('#chegada_tbl').DataTable({
    paging: false,
    language: {
        search: "_INPUT_",
        searchPlaceholder: "Filtrar resultados",
        "info": "Mostrando _TOTAL_ de _MAX_ resultados",
        "infoEmpty": "NĂŁo foram encontrados resultados",
        "infoFiltered": "(filtro aplicado)"
    }
});

//Ajusta a largura
$('.dataTables_filter input').width($('.tabs').width());