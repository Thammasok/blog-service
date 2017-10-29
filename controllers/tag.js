const config = require('../config/knexfile');
const async = require('async');
const knex = require('knex')(config);
const Tag = require('../models/Tag');

//Database Table
const tableTag = 'tags';

exports.add = function(req, res, next) {
  req.assert('name', 'Tag Name cannot be empty').notEmpty();
  req.assert('meta', 'Tag Meta cannot be empty').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  // new Tag({
  //   tag_name: req.body.name,
  //   tag_meta: req.body.meta
  // }).save()
  //   .then(function(tag) {
  //     return res.status(200).json({
  //       tag
  //     });
  //   })
  //   .catch(function(err) {
  //     return res.status(403).json({
  //       code: err.code,
  //       msg: err.sqlMessage
  //     });
  //   });

  knex(tableTag)
  .returning(['tag_id','tag_name', 'tag_meta'])
  .insert({
    tag_name: req.body.name,
    tag_meta: req.body.meta
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
  req.assert('id', 'Tag id cannot be empty').notEmpty();
  req.assert('name', 'Tag name cannot be empty').notEmpty();
  req.assert('meta', 'Tag meta cannot be empty').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  knex(tableTag)
  .where('tag_id', req.body.id)
  .update({
    tag_name: req.body.name,
    tag_meta: req.body.meta
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