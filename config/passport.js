var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  new User({ id: id}).fetch().then(function(user) {
    done(null, user);
  });
});

// Sign in with Email and Password
// { usernameField: 'username' }, 
passport.use(new LocalStrategy(function (username, password, done) {
  new User({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        // return done(null, false, { msg: 'The username ' + username + ' is not associated with any account.' });
        return done(null, false, { msg: 'Your username or password incorrect.' });
      }
      
      user.comparePassword(password, function(err, isMatch) {
        if (!isMatch) {
          return done(null, false, { msg: 'Your username or password incorrect.' });
        }
        return done(null, user);
      });
    });
}));
