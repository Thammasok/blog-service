const bookshelf = require('../config/bookshelf');

var Category = bookshelf.Model.extend({
  tableName: 'categorys',
  hasTimestamps: true,

  initialize: function() {

  },

});

module.exports = Category;
