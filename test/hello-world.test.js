process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let { app } = require('../index');
let should = chai.should();

chai.use(chaiHttp);
describe('GET /', () => {
  it('it should GET Hello World! text', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.status.should.equal(200);
        res.text.should.be.a('string');
        res.text.should.be.eql('Hello World!');
        done();
      });
  });
});

