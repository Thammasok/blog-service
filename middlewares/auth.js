const Authenticate = require('../models/Authenticate');

exports.authenticateHeaderJson = function (req, res, next){
  // let appToken = req.headers['application-token'];
  let contentType = req.headers['content-type'];

  if(contentType === 'application/json'){
    next();
    // if (!appToken) {
    //   return res.status(401).json({
    //     msg: 'Application Token Required.'
    //   });
    // } else {
    //   // Check authenticate validation
    //   // var encoded = req.headers.authorization.split(' ')[1];
    //   // var decoded = new Buffer(encoded, 'base64').toString('utf8');

    //   let decodedAppToken = new Buffer(appToken, 'base64').toString('utf8');

    //   let shotName = decodedAppToken.split(':')[0];
    //   let key = decodedAppToken.split(':')[1];

    //   Authenticate.where({
    //     auth_shot_name: shotName,
    //     auth_key: key
    //   }).fetch().then(function(appTokenInfo) {
    //     if(appTokenInfo === null){
    //       return res.status(401).json({
    //         msg: "Application Token not found."
    //       });
    //     }else{
    //         next();
    //     }
    //   }).catch(function(err) {
    //     return res.status(401).json({
    //       msg: err
    //     });
    //   });
    // }
  }else{
    return res.status(401).json({
      msg: 'Content-Type incorrect.'
    });
  }


};
