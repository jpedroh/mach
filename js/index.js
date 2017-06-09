$(document).ready(function () {
    $('#voos').DataTable({
        paging: false,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Filtrar resultados",
            "info": "Mostrando _TOTAL_ de _MAX_ resultados",
            "infoFiltered": "(filtro aplicado)"
        }

    });
    $('.dataTables_filter input').width($('#voos').width());
    $('.modal').modal();
});