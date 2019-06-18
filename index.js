const express = require('express');


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

var httpServer = require('http').createServer(app);
httpServer.listen(4200, function () {
    console.log('Running on port ' + 4200 + '.');
});
