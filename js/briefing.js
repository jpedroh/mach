//Inicializa as tabelas

//Inicializa as cartas de partida
$('#partida_tbl').DataTable({
    paging: false,
    language: {
        search: "_INPUT_",
        searchPlaceholder: "Filtrar resultados",
        "info": "Mostrando _TOTAL_ de _MAX_ resultados",
        "infoEmpty": "Não foram encontrados resultados",
        "infoFiltered": "(filtro aplicado)"
    }
});

//Inicializa as cartas de chegada
/*$('#chegada_tbl').DataTable({
    paging: false,
    language: {
        search: "_INPUT_",
        searchPlaceholder: "Filtrar resultados",
        "info": "Mostrando _TOTAL_ de _MAX_ resultados",
        "infoEmpty": "Não foram encontrados resultados",
        "infoFiltered": "(filtro aplicado)"
    }
});*/

    $('#example').DataTable( {
        initComplete: function () {
            this.api().columns().every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        }
    } );

$('select').material_select();

//Ajusta a largura
$('.dataTables_filter input').width($('.tabs').width());