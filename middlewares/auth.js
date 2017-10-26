var auth = function() {};

var Authenticate = require('../models/Authenticate');

var _ = auth.prototype;

_.authenticateHeaderJson = authenticateHeaderJson;

function authenticateHeaderJson (req, res, next){
  // Grab the "Authorization" header.
  // var auth = req.get("authorization");
  var auth = req.headers.authorization;
  var contentType = req.headers['content-type'];

  if(contentType === 'application/json'){
    if (!auth) {
      // var authorizationHeader = new Buffer('NTRB:TzSuv8z9aNQgpdqd').toString('base64');

      return res.status(401).json({
        msg: 'Authorization Required.'
      });
    } else {
      // Check authenticate validation
      // var encoded = req.headers.authorization.split(' ')[1];
      // var decoded = new Buffer(encoded, 'base64').toString('utf8');

      let decodedAuthorization = new Buffer(req.headers.authorization, 'base64').toString('utf8');

      let shotName = decodedAuthorization.split(':')[0];
      let key = decodedAuthorization.split(':')[1];

      Authenticate.where({
        auth_shot_name: shotName,
        auth_key: key
      }).fetch().then(function(authInfo) {
        if(authInfo === null){
          return res.status(401).json({
            msg: "Authenticate not found."
          });
        }else{
            next();
        }
      }).catch(function(err) {
        return res.status(401).json({
          msg: err
        });
      });
    }
  }else{
    return res.status(401).json({
      msg: 'Content-Type incorrect.'
    });
  }


}

module.exports = new auth();
