let form = new FormData();

$('#btnEncrypt').hide();

$('#file').change(function (event) {
    console.log('Uploadou mané!!',form);

    form.append('file', event.target.files[0]);


    $('#btnEncrypt').show();
    let name = event.target.files[0].name; // para capturar o nome do arquivo com sua extenção

    $('#filename').text(name);

});


$('#btnEncrypt').click(function () {
    $.ajax({
        url: 'http://localhost:4200/encrypt', // Url do lado server que vai receber o arquivo
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        headers:{
            "Access-Control-Allow-Origin": '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        },
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
        data: file,
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
