let form = new FormData();
let formD = new FormData();

$('#btnEncrypt').hide();
$('#btnDecrypt').hide();
$('#hash').hide();

$('#file').change(function (event) {
    form.append('file', event.target.files[0]);

    $('#btnEncrypt').show();
    let name = event.target.files[0].name; // para capturar o nome do arquivo com sua extenção
    $('#filename').text('Criptografar: '+name);

});

$('#decrypt').change(function (event) {
    formD.append('file', event.target.files[0]);
    $('#btnDecrypt').show();
    $('#hash').show();

    let name = event.target.files[0].name; // para capturar o nome do arquivo com sua extenção
    $('#filenameD').text('Descriptografar: '+name);

});

function download(name){
    let test = {
        fileName: name
    }

    $.ajax({
        url: 'http://localhost:4200/download?fileName='+name, // Url do lado server que vai receber o arquivo
        cache: false,
        type: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function (data) {
            console.log(data);
            var filename = 'encrypted'
            var blob = new Blob([data]);
            saveAs(blob, filename+".enc");

        }
    });

}
$('#btnEncrypt').click(function () {
    $.ajax({
        url: 'http://localhost:4200/encrypt', // Url do lado server que vai receber o arquivo
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function (data) {
            console.log('acertou Mizeria',data);
            $('hashencrypt').text('HASH: ' + data.hash);
            download(data.fileName);
        }
    });
});


$('#btnDecrypt').click(function () {
    console.log('enviou mané!!');
    //let hash = $('#hash').value();
    //formD.append('hash',hash);
    $.ajax({
        url: 'http://localhost:4200/decrypt', // Url do lado server que vai receber o arquivo
        data: formD,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function (data) {
            console.log('acertou Mizeria',data);
            if(!data.check){
                alert('Hash Válida');
                download(data.fileName);

            }else{
                alert('Hash inválida');
            }

        }
    });
});
