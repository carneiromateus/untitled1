let form = new FormData();
let formD = new FormData();
form.append('file',null);
formD.append('file',null);
formD.append('hash',null);

$('#btnEncrypt').hide();
$('#btnDecrypt').hide();
$('#hash').hide();

$('#file').change(function (event) {
    let name = event.target.files[0].name; // para capturar o nome do arquivo com sua extenção

    form.set('file', event.target.files[0],name);


    $('#btnEncrypt').show();
    $('#filename').text('Criptografar: '+name);

});

$('#decrypt').change(function (event) {
    let name = event.target.files[0].name; // para capturar o nome do arquivo com sua extenção

    formD = new FormData();
    formD.set('file', event.target.files[0],name);
    $('#btnDecrypt').show();
    $('#hash').show();
    $('#filenameD').text('Descriptografar: '+name);

});

function download(name){
    $.fileDownload('http://localhost:4200/'+name+'.enc')
        .done(function () { alert('File download a success!'); })
        .fail(function () { alert('File download failed!'); });
    //$.ajax({
    //    url: 'http://localhost:4200/download?fileName='+name, // Url do lado server que vai receber o arquivo
    //    cache: false,
    //   type: 'POST',
    //    headers: {
    //       'Access-Control-Allow-Origin': '*',
    //        "content-type": "application/json",
    //    },
    //   success: function (data) {
    //        console.log(data);
    //       var filename = 'encrypted';
    //       var blob = new Blob([data]);
    //        saveAs(blob, filename+".enc");

    //    }
    //});

}
$('#btnEncrypt').click(function () {
    var settings = {
        "url": "http://localhost:4200/encrypt",
        "method": "POST",
        "headers": {
            "cache-control": "no-cache",
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    };
    $.ajax(settings).done(function (response) {
        response= JSON.parse(response);
        $('#hashText').text('Hash: '+response.hash );
        download(response.fileName);
    });
});


$('#btnDecrypt').click(function () {
    console.log('enviou mané!!');
    let hash = $('#hash').val();
    formD.set('hash',hash);
    var settings = {
        "url": "http://localhost:4200/decrypt",
        "method": "POST",
        "headers": {
            "cache-control": "no-cache",
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formD
    };
    $.ajax(settings).done(function (response) {
        response= JSON.parse(response);
        download(response.fileName);
    });



});
