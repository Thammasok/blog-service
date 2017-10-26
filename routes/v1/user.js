var express = require('express');
var router = express.Router();
// var authMiddleware = require('./../../middlewares/auth');
var userController = require('./../../controllers/user');

// middleware
// var authenticatePostJson = authMiddleware.authenticateHeaderJson.bind(authMiddleware);

//router.post('/register', authenticatePostJson, userController.registerPost);
router.post('/register', userController.register);
router.post('/list', userController.userList);
router.post('/number', userController.numberOfUser);

router.post('/login', userController.loginPost);
router.get('/logout', userController.logout);

// router.post('/forgot', userController.forgotPost);
// router.post('/reset/:token', userController.resetPost);

module.exports = router;