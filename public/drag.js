let form;
$('#btnEncrypt').hide();

$('#file').change(function (event) {
    console.log('Uploadou mané!!',form);
    form = new FormData();
    form.append('file', event.target.files[0]);

    for (let key of form.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
    $('#btnEncrypt').show();
    let name = event.target.files[0].name; // para capturar o nome do arquivo com sua extenção
    console.log('Uploadou mané!!',form);

    $('#filename').text(name);
});


$('#btnEncrypt').click(function () {
    console.log('enviou mané!!',form);

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
