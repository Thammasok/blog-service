const request = require('../../configRequestServer');
const {assert} = require('chai');

describe('User number: POST /api/user/number', function () {
  it('User number >> Should call api ok', function (done) {
    request
      .post('/api/user/number')
      .set('Accept', 'application/json')
      .send({ status: 'all' })
      .expect(200, done);
  });

  it('User number >> Show error when valiadation is null', function (done) {
    request
      .post('/api/user/number')
      .set('Accept', 'application/json')
      .send({ status: '' })
      .expect(400, done);
  });

  it('User number >> return number type', function (done) {
    request
      .post('/api/user/number')
      .set('Accept', 'application/json')
      .send({ status: 'waiting' })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
      
        assert.typeOf(res.body.number, 'number');
        
        done();
      });
  });
});