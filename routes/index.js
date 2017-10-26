var express = require('express');
var router = express.Router();

// Controllers
var HomeController = require('./../controllers/home');
// var contactController = require('./../controllers/contact');
// var userController = require('./../controllers/user');

// router.put('/account', userController.ensureAuthenticated, userController.accountPut);
// router.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
// router.post('/contact', contactController.contactPost);


router.get('/', HomeController.index);
router.get('/auth-token', HomeController.generateToken);
// router.get('/contact', contactController.contactGet);
// router.get('/account', userController.ensureAuthenticated, userController.accountGet);
// router.get('/signup', userController.signupGet);
// router.get('/login', userController.loginGet);
// router.get('/forgot', userController.forgotGet);
// router.get('/reset/:token', userController.resetGet);
// router.get('/logout', userController.logout);
// router.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);

module.exports = router;
