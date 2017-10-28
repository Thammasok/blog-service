const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const knex = require('knex');
const Authenticate = require('../models/Authenticate');

/**
 * GET /
 */
exports.index = function (req, res) {
  res.status(200).json({
    text: 'Hello world'
  });
};

exports.generateToken = function(req, res) {
  req.assert('auth_key', 'Authication Key cannot be empty').notEmpty();
  req.assert('auth_shot_name', 'Authication shot name cannot be empty').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    return res.status(403).json({ 
      result: 'validate',
      errors
    });
  }
  
  let auth_key = req.body.auth_key;
  let auth_shot_name = req.body.auth_shot_name;
  let authorizationHeader = "";

  Authenticate.where({
    auth_shot_name: auth_shot_name,
    auth_key: auth_key
  }).fetch().then(function(authInfo) {
    if(authInfo === null){
      return res.status(403).json({
        msg: "Authenticate not found."
      });
    }else{
      authorizationHeader = new Buffer(authInfo.auth_shot_name + ':' + authInfo.auth_key).toString('base64');
      
      return res.status(200).json({
        auth_token: authorizationHeader
      });
    }
  }).catch(function(err) {
    return res.status(403).json({
      msg: err
    });
  });
};
