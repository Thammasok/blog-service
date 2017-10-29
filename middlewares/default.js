var Authenticate = require('../models/Authenticate');

exports.authenticateHeader = function (req, res, next){
  // var appToken = req.headers['application-token'];
  let contentType = req.headers['content-type'];
  let loginToken = req.headers['Login-Token'];

  if(contentType === 'application/json' && (loginToken !== '' || loginToken === undefined)){
    next();
  }else{
    if(loginToken === '' || loginToken === undefined) {
      return res.status(401).json({
        msg: 'Login-Token incorrect.'
      });
    }else{
      return res.status(401).json({
        msg: 'Content-Type incorrect.'
      });
    }
  }


};
