/**
 * GET /
 */
exports.index = function (req, res) {
  res.json({
    title: 'Home',
    name: 'Jaranchai'
  });
};

exports.generateToken = function(req, res) {
  var authorizationHeader = new Buffer('BOFCCPV:TzSuv8z9aNQgpdqd').toString('base64');

  res.json({
    auth: authorizationHeader
  });
};
