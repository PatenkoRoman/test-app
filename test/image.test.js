process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { app } = require('../index');
const should = chai.should();
chai.use(chaiHttp);

const rabbit = require('../rabbitmq');
const faker = sinon.stub(); 
const stubCreateTask = sinon.stub(rabbit, 'createTask').callsFake(faker);
const stubCreateQueueWorker = sinon.stub(rabbit, 'createQueueWorker').callsFake(faker);


describe('POST /image', () => {
  it('it should POST image to process', (done) => {
    const bodyObj = { fileUrl: 'httpToFile' };
    chai.request(app)
      .post('/image')
      .send(bodyObj)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.be.eql(bodyObj);
        done();
      })
  });
});

