const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const passport = require('passport');
const knex = require('knex');
const User = require('../models/User');

function generateToken(user) {
  var payload = {
    iss: 'localhost',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

/**
 * Login required middleware
 */
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

exports.register = function(req, res, next) {
  req.assert('name', 'Name cannot be empty').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be empty').notEmpty();
  req.assert('password', 'Password must be at least 8 characters long').isLength({ min: 8 });
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).save()
    .then(function(user) {
      return res.status(200).json({
        user
      });
    })
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        return res.status(403).json({
          msg: 'The username or email address you have entered is already associated with another account.'
        });
      }
    });
};

exports.login = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(
      errors
    );
  }

  new User({ email: req.body.email })
    .fetch()
    .then(function(user) {
      if (!user) {
        return res.status(401).json({ 
          msg: 'The email address ' + req.body.email + ' is not associated with any account. ' +
        'Double-check your email address and try again.'
        });
      }
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).json({ 
            msg: 'Invalid email or password' 
          });
        }
        
        return res.status(401).json({ 
          token: generateToken(user), 
          user: user.toJSON() 
        });
      });
    });
};

/**
 * GET /logout
 */
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
  // res.status(200).json({
  //   msg: 'Logout is success'
  // });
};

/**
 * PUT /account
 * Update profile information OR change password.
 */
// exports.accountPut = function(req, res, next) {
//   if ('password' in req.body) {
//     req.assert('password', 'Password must be at least 4 characters long').len(4);
//     req.assert('confirm', 'Passwords must match').equals(req.body.password);
//   } else {
//     req.assert('email', 'Email is not valid').isEmail();
//     req.assert('email', 'Email cannot be blank').notEmpty();
//     req.sanitize('email').normalizeEmail({ remove_dots: false });
//   }

//   var errors = req.validationErrors();

//   if (errors) {
//     req.flash('error', errors);
//     return res.redirect('/account');
//   }

//   var user = new User({ id: req.user.id });
//   if ('password' in req.body) {
//     user.save({ password: req.body.password }, { patch: true });
//   } else {
//     user.save({
//       email: req.body.email,
//       name: req.body.name,
//       gender: req.body.gender,
//       location: req.body.location,
//       website: req.body.website
//     }, { patch: true });
//   }
//   user.then(function(user) {
//     if ('password' in req.body) {
//       req.flash('success', { msg: 'Your password has been changed.' });
//     } else {
//       req.flash('success', { msg: 'Your profile information has been updated.' });
//     }
//     res.redirect('/account');
//   }).catch(function(err) {
//     if (err.code === 'ER_DUP_ENTRY') {
//       req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
//     }
//   });
// };


/**
 * DELETE /account
 */
// exports.accountDelete = function(req, res, next) {
//   new User({ id: req.user.id }).destroy().then(function(user) {
//     req.logout();
//     req.flash('info', { msg: 'Your account has been permanently deleted.' });
//     res.redirect('/');
//   });
// };


/**
 * GET /unlink/:provider
 */
// exports.unlink = function(req, res, next) {
//   new User({ id: req.user.id })
//     .fetch()
//     .then(function(user) {
//       switch (req.params.provider) {
//         case 'facebook':
//           user.set('facebook', null);
//           break;
//         case 'google':
//           user.set('google', null);
//           break;
//         case 'twitter':
//           user.set('twitter', null);
//           break;
//         case 'vk':
//           user.set('vk', null);
//           break;
//         default:
//         req.flash('error', { msg: 'Invalid OAuth Provider' });
//         return res.redirect('/account');
//       }
//       user.save(user.changed, { patch: true }).then(function() {
//       req.flash('success', { msg: 'Your account has been unlinked.' });
//       res.redirect('/account');
//       });
//     });
// };


/**
 * POST /forgot
 */
// exports.forgotPost = function(req, res, next) {
//   req.assert('email', 'Email is not valid').isEmail();
//   req.assert('email', 'Email cannot be blank').notEmpty();
//   req.sanitize('email').normalizeEmail({ remove_dots: false });

//   var errors = req.validationErrors();

//   if (errors) {
//     req.flash('error', errors);
//     return res.redirect('/forgot');
//   }

//   async.waterfall([
//     function(done) {
//       crypto.randomBytes(16, function(err, buf) {
//         var token = buf.toString('hex');
//         done(err, token);
//       });
//     },
//     function(token, done) {
//       new User({ email: req.body.email })
//         .fetch()
//         .then(function(user) {
//           if (!user) {
//         req.flash('error', { msg: 'The email address ' + req.body.email + ' is not associated with any account.' });
//         return res.redirect('/forgot');
//           }
//           user.set('passwordResetToken', token);
//           user.set('passwordResetExpires', new Date(Date.now() + 3600000)); // expire in 1 hour
//           user.save(user.changed, { patch: true }).then(function() {
//             done(null, token, user.toJSON());
//           });
//         });
//     },
//     function(token, user, done) {
//       var transporter = nodemailer.createTransport({
//         service: 'Mailgun',
//         auth: {
//           user: process.env.MAILGUN_USERNAME,
//           pass: process.env.MAILGUN_PASSWORD
//         }
//       });
//       var mailOptions = {
//         to: user.email,
//         from: 'support@yourdomain.com',
//         subject: '✔ Reset your password on Mega Boilerplate',
//         text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
//         'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//         'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//         'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//       };
//       transporter.sendMail(mailOptions, function(err) {
//         req.flash('info', { msg: 'An email has been sent to ' + user.email + ' with further instructions.' });
//         res.redirect('/forgot');
//       });
//     }
//   ]);
// };


/**
 * POST /reset
*/
// exports.resetPost = function(req, res, next) {
//   req.assert('password', 'Password must be at least 4 characters long').len(4);
//   req.assert('confirm', 'Passwords must match').equals(req.body.password);

//   var errors = req.validationErrors();

//   if (errors) {
//     req.flash('error', errors);
//     return res.redirect('back');
//   }

//   async.waterfall([
//     function(done) {
//       new User({ passwordResetToken: req.params.token })
//         .where('passwordResetExpires', '>', new Date())
//         .fetch()
//         .then(function(user) {
//           if (!user) {
//           req.flash('error', { msg: 'Password reset token is invalid or has expired.' });
//           return res.redirect('back');
//           }
//           user.set('password', req.body.password);
//           user.set('passwordResetToken', null);
//           user.set('passwordResetExpires', null);
//           user.save(user.changed, { patch: true }).then(function() {
//           req.logIn(user, function(err) {
//             done(err, user.toJSON());
//           });
//           });
//         });
//     },
//     function(user, done) {
//       var transporter = nodemailer.createTransport({
//         service: 'Mailgun',
//         auth: {
//           user: process.env.MAILGUN_USERNAME,
//           pass: process.env.MAILGUN_PASSWORD
//         }
//       });
//       var mailOptions = {
//         from: 'support@yourdomain.com',
//         to: user.email,
//         subject: 'Your Mega Boilerplate password has been changed',
//         text: 'Hello,\n\n' +
//         'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
//       };
//       transporter.sendMail(mailOptions, function(err) {
//         req.flash('success', { msg: 'Your password has been changed successfully.' });
//         res.redirect('/account');
//       });
//     }
//   ]);
// };
