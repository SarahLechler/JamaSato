var searchdata;

/*function tableDestroy(table){
    table.destroy();
} */
function tableButton(res) {
    res = JSON.stringify(res);
    res = JSON.parse(res);
    console.log(res);

    $('#example').DataTable({
        searching: false,
        scrollX: true,
        data: res,
        destroy: true,
        columns: [
            {data: 'date'},
            {data: 'name'},
            {data: 'location'}
        ],
        "order": [[1, "desc"]]
    });

    $('#example').on('click', 'tr', function () {
        var datastring = this.children[1].innerText;
        layertomap(datastring);
    });
}

function layertomap(datastring) {
    var pathbase = '/home/s_lech05/JamaSato/IMG/' + datastring;
    $('#dir')[0].value = pathbase;
}