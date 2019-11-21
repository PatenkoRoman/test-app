const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const rabbitmq = require('./rabbitmq');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/image', (req, res) => {
  const fileUrl = req.body.fileUrl;
  rabbitmq.createTask(fileUrl);
	res.json(req.body);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

if(process.env.NODE_ENV !== 'test') {
  rabbitmq.createQueueWorker('./worker.js');
};

module.exports = { app };