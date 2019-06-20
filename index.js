const express = require('express');
const bodyParser = require('body-parser');
const upload = require('multer')({dest:'./'});
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');
// const hashReq = /
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
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})
// app.use(bodyParser.json())
// app.use(bodyParser({ uploadDir: path.join(__dirname, 'files'), keepExtensions: true }));

// app.use(bodyParser.fi)
app.post('/encrypt',upload.single('file'), function (req, res) {
    // console.log(req.file);
    let hash = require('./getHash').instance(req.file.filename);
    encrypt.instance( {file: req.file.path, password: 'password'} );
    // var readStream = require('fs').createReadStream(req.file.filename+'.enc');
    // readStream.pipe(res);
    // res.writeHead(200, {
    //     'Content-Type': '*',
    //     'Content-Length': 1
    // });
    res.sendFile(require('path').join(__dirname+'/' + req.file.filename+'.enc'))
})

app.post('/deencrypt', function(req, res, next){

});


var httpServer = require('http').createServer(app);
httpServer.listen(4200, function () {
    console.log('Running on port ' + 4200 + '.');
});
