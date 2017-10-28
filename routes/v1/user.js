const express = require('express');
const router = express.Router();
// const authMiddleware = require('./../../middlewares/auth');
const userController = require('./../../controllers/user');
const {authenticateHeaderJson} = require('./../../middlewares/auth');

// middleware
// const authenticatePostJson = authMiddleware.authenticateHeaderJson.bind(authMiddleware);

router.post('/register', authenticateHeaderJson, userController.register);
router.post('/login', authenticateHeaderJson, userController.login);
router.get('/logout', authenticateHeaderJson, userController.logout);

// router.post('/forgot', userController.forgotPost);
// router.post('/reset/:token', userController.resetPost);

module.exports = router;
