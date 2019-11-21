const amqp = require('amqplib');
const config = require('./config');
const { Worker } = require('worker_threads');

const createTask = (data) => {
  return amqp.connect(config.RABBIT.URI)
    .then(connection => connection.createChannel())
    .then(channel => {
      const queue = config.RABBIT.QUEUE;
      const msg = data;

      channel.assertQueue(queue, {
          durable: true
      });
      channel.sendToQueue(config.RABBIT.QUEUE, Buffer.from(msg), {
          persistent: true
      });
      console.log(` [x] Sent: `, msg);
    });
};

const createQueueWorker = (workerPath) => {
  return amqp.connect(config.RABBIT.URI)
    .then(connection => connection.createChannel())
    .then(channel => {
      const queue = config.RABBIT.QUEUE;
    
      channel.assertQueue(queue, {
          durable: true
      });
      channel.prefetch(1);
      console.log(` [*] Waiting for messages in %s. To exit press CTRL+C`, queue);
      channel.consume(queue, function(msg) {
          console.log(` [x] Received: `, msg.content.toString());
          console.log(" [x] Done");
          
          const worker = new Worker(workerPath, { workerData: msg.content.toString() });
          worker.on('message', (result) => { 
            console.log(result);
            channel.ack(msg);
          });
      }, {
          noAck: false
      });
    })
};

module.exports = {
  createTask,
  createQueueWorker,
}
