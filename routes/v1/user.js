const express = require('express');
const router = express.Router();
// const authMiddleware = require('./../../middlewares/auth');
const userController = require('./../../controllers/user');

// middleware
// const authenticatePostJson = authMiddleware.authenticateHeaderJson.bind(authMiddleware);


// router.post('/forgot', userController.forgotPost);
// router.post('/reset/:token', userController.resetPost);

module.exports = router;
