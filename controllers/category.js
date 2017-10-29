const config = require('../config/knexfile');
const async = require('async');
const knex = require('knex')(config);
const Tag = require('../models/Tag');

//Database Table
const tableCategory = 'categorys';

exports.add = function(req, res, next) {
  req.assert('name', 'Category Name cannot be empty').notEmpty();
  req.assert('meta', 'Category Meta cannot be empty').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  knex(tableCategory)
  .returning(['category_id','category_name', 'category_meta'])
  .insert({
    category_name: req.body.name,
    category_meta: req.body.meta
  })
  .then(function(tag) {
    return res.status(200).json({
      id: tag[0]
    });
  })
  .catch(function(err) {
    return res.status(403).json({
      code: err.code,
      msg: err.sqlMessage
    });
  });
};

exports.edit = function(req, res, next) {
  req.assert('id', 'Category id cannot be empty').notEmpty();
  req.assert('name', 'Category name cannot be empty').notEmpty();
  req.assert('meta', 'Category meta cannot be empty').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  knex(tableCategory)
  .where('category_id', req.body.id)
  .update({
    category_name: req.body.name,
    category_meta: req.body.meta
  }).then(function(tag) {
    return res.status(200).json({
      tag
    });
  })
  .catch(function(err) {
    return res.status(403).json({
      err
    });
  });
};