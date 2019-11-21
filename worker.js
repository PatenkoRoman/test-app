const { parentPort, workerData } = require('worker_threads');
const tesseract = require("node-tesseract-ocr");
const { download } = require('./download');
const { TESSERACT } = require('./config');

download(workerData, 'image.jpg', () => {
	tesseract.recognize('image.jpg', TESSERACT)
	  .then(text => parentPort.postMessage(text))
	  .catch(error => console.log(error.message));
});
