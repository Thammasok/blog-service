const express = require('express');
const router = express.Router();

// Controllers
const HomeController = require('./../controllers/home');

router.get('/', HomeController.index);
router.post('/auth-token', HomeController.generateToken);

module.exports = router;
