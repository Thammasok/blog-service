const express = require('express');
const router = express.Router();
const tagController = require('./../../controllers/tag');

router.post('/add', tagController.add);
router.post('/edit', tagController.edit);

module.exports = router;
