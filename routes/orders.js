const express = require('express');
const orderController = require('../controllers/orderControler');

const router = express.Router();

router.post('/', orderController.order_create_post);
router.get('/', orderController.order_list);
router.get('/:id', orderController.order_details);
router.get('/foruser/:id', orderController.order_list_for_user);

module.exports = router;
