const express = require('express');

const multer = require('multer');

const encrypt = require('./encrypt');
const decrypt = require('./decrypt');
const bPrser = require('body-parser');
const path = require('path');
const fs = require('fs');
// pull the mode, file and password from the command arguments.
const [mode, file, password] = process.argv.slice(2);
if (mode === 'encrypt') {
    encrypt.instance({file, password});
}
if (mode === 'decrypt') {
    decrypt.instance({file, password});
}
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//
//         // error first callback
//         cb(null, './');
//     },
//     filename: function (req, file, cb) {
//
//         // error first callback
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
//
let app = express();


app.use(express.static('/uploads'));
app.use(express.static('/certs'));

// app.use(bPrser.json());


const upload = multer({dest: 'uploads/'});


function hash(file) {
    return new Promise(function (resolve, reject) {
        var crypto = require('crypto'); // change the algo to sha1, sha256 etc according to your requirements
        var algo = 'sha256';
        var shasum = crypto.createHash(algo);
        var s = fs.ReadStream(file);
        s.on('data', function (d) {
            shasum.update(d);
        });
        s.on('end',
            function () {
                var d = shasum.digest('hex');
                console.log(d);
                return resolve(d)
            });
    })

}

app.get('/uploads', (req, res) => {
    res.sendFile('/home/freada/WebstormProjects/untitled1/uploads/uploa.html')
});
app.post('/encrypt', upload.single('file'),
    async (req, res) => {
        console.log(req.file);
        let file = "/home/freada/WebstormProjects/untitled1/" + req.file.path, password = 'password';

        encrypt.instance({file, password});
        console.log('time2' + req.file.path);
        let h = hash(file);
        h = await h;
        res.setHeader('x-hash', h);
        setTimeout(function () {

            res.sendFile(req.file.filename + ".enc", {
                root: path.join(__dirname + '/uploads')
            }, function (err) {
                if (err) {
                    console.log(err);
                }
            })
        }, 1000)

    });

app.post('/decrypt', upload.single('file'),
    async (req, res) => {
        let file = "/home/freada/WebstormProjects/untitled1/" + req.file.path, password = 'password';
        decrypt.instance({file, password});

        setTimeout(async function () {
            let filedec = "/home/freada/WebstormProjects/untitled1/" + req.file.path + ".unenc", password = 'password';

            let h = hash(filedec);
            h = await h;
            let confirmation = false;
            if (h == req.body.hash) {
                confirmation = true;
            }
            res.setHeader('x-hash-confirmation', confirmation);
            setTimeout(function () {

                res.sendFile(req.file.filename + ".unenc", {
                    root: path.join(__dirname + '/uploads')
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
                // res.send({hash: hash(file)});
            }, 1000)
        }, 1000);
    });


app.listen(4200);


// var httpServer = require('http').createServer(app);
// httpServer.listen(4200, function () {
//     console.log('Running on port ' + 4200 + '.');
// });
