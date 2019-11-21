const fs = require('fs');
const request = require('request');

const download = (uri, filename, callback) => {
	request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
};

module.exports = {
	download,
};