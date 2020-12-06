const express = require('express');
const orderController = require('../controllers/orderControler');

const router = express.Router();

router.post('/', orderController.order_create_post);

module.exports = router;
