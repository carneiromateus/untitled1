const express = require('express');
const bodyParser = require('body-parser');

const encrypt = require('./encrypt');
const decrypt = require('./decrypt');
// pull the mode, file and password from the command arguments.
const [ mode, file, password ] = process.argv.slice(2);
if (mode === 'encrypt') {
    encrypt.instance({ file, password });
}
if (mode === 'decrypt') {
    decrypt.instance({ file, password });
}

//
let app = express();
app.use(bodyParser.json())
// app.use(bodyParser({ uploadDir: path.join(__dirname, 'files'), keepExtensions: true }));

// app.use(bodyParser.fi)
app.post('/encrypt', function (req, rep) {
    console.log(req.body);
    encrypt.instance( {file: req.body, password: 'password'} );
    res.send('qlqr coisa')
})

app.post('/deencrypt', function(req, res, next){

});


var httpServer = require('http').createServer(app);
httpServer.listen(4200, function () {
    console.log('Running on port ' + 4200 + '.');
});
