const express = require('express');
const router = express.Router();
const categoryController = require('./../../controllers/category');

router.post('/add', categoryController.add);
router.post('/edit', categoryController.edit);

module.exports = router;
