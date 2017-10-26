const request = require('../../configRequestServer');
const { assert } = require('chai');

describe('User Lists: POST /api/user/list', function () {
  it('User lists >> Should call api ok', function (done) {
    request
      .post('/api/user/list')
      .set('Accept', 'application/json')
      .send({ status: 'all' })
      .expect(200, done);
  });

  it('User Lists >> Show error when valiadation is null', function (done) {
    request
      .post('/api/user/list')
      .set('Accept', 'application/json')
      .send({ status: '' })
      .expect(400, done);
  });

  it('User Lists >> return number type', function (done) {
    request
      .post('/api/user/list')
      .set('Accept', 'application/json')
      .send({ status: 'waiting' })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        assert.typeOf(res.body.user, 'Array');

        done();
      });
  });
});