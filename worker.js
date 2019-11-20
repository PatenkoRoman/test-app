const { parentPort, workerData } = require('worker_threads');
const tesseract = require("node-tesseract-ocr");

const fs = require('fs');
const request = require('request');

const TESSERACT_CONFIG = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


download(workerData, 'image.jpg', function(){
	tesseract.recognize('image.jpg', TESSERACT_CONFIG)
	  .then(text => {
			parentPort.postMessage('OK');
			console.log("Result:", text)
	  })
	  .catch(error => {
	    console.log(error.message)
	})
})
