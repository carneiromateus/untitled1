let form;
$('#btnEncrypt').hide();

$('#file').change(function (event) {
    console.log('Uploadou mané!!',event);

    form = new FormData();
    form.append('fileUpload', event.target.files[0]); // para apenas 1 arquivo

    $('#btnEncrypt').show();
    let name = event.target.files[0].name; // para capturar o nome do arquivo com sua extenção

    $('#filename').text(name);
});


$('#btnEncrypt').click(function () {
    console.log('enviou mané!!');

    $.ajax({
        url: 'localhost:4200/encrypt', // Url do lado server que vai receber o arquivo
        data: form,
        processData: false,
        contentType: false,
        type: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function (data) {
            console.log('acertou Mizeria',data);
        }
    });
});


$('#btnDecrypt').click(function () {
    console.log('enviou mané!!');

    $.ajax({
        url: 'localhost:4200/encrypt', // Url do lado server que vai receber o arquivo
        data: form,
        processData: false,
        contentType: false,
        type: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        success: function (data) {
            console.log('acertou Mizeria',data);
        }
    });
});
