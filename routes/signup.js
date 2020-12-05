const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.user_create_post);

module.exports = router;
