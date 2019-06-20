const crypto = require('crypto')
    , fs = require('fs');

function getHash(filename){

    let algorithm = 'sha256';
    let shasum = crypto.createHash(algorithm);

    // Updating shasum with file content
    let fullfile = __dirname + filename;
    let s = fs.ReadStream(fullfile);
    s.on('data', function(data) {
        shasum.update(data);
    });

    // making digest
    s.on('end', function() {
        let hash = shasum.digest('hex');
        console.log(hash + '  ' + filename);
    });

    // Calculating hash from string
    let textToHash = "Hello, I want a hash from it";
    let shasum2 = crypto.createHash(algorithm);
    shasum2.update(textToHash);
    let hash2 = shasum2.digest('hex');
    console.log(hash2 + '  ' + textToHash);
    return hash2
}
exports.instance = getHash;
