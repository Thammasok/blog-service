const bookshelf = require('../config/bookshelf');

var Tag = bookshelf.Model.extend({
  tableName: 'tags',
  hasTimestamps: true,

  initialize: function() {

  },

});

module.exports = Tag;
