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
    $.ajax({
        url: 'http://localhost:4200/download', // Url do lado server que vai receber o arquivo
        data: {fileName: name},
        cache: false,
        contentType: false,
        processData: false,
        type: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = name;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
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
    let hash = $('#hash').value();
    formD.append('hash',hash);
    $.ajax({
        url: 'localhost:4200/decrypt', // Url do lado server que vai receber o arquivo
        data: formD,
        processData: false,
        contentType: false,
        type: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function (data) {
            console.log('acertou Mizeria',data);
            if(data.check){
                alert('Hash Válida');
                //download(data.file,'decrypted');

            }else{
                alert('Hash inválida');
            }

        }
    });
});
