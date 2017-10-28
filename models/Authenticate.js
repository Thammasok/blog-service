var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var Authenticate = bookshelf.Model.extend({
  tableName: 'authenticate',
  hasTimestamps: true,

  initialize: function() {

  },

});

module.exports = Authenticate;
