const express = require('express');
const orderController = require('../controllers/orderControler');
const auth = require('../auth/authorization');

const router = express.Router();

router.post('/', auth.authenticateAdmin, orderController.order_create_post);
router.get('/', auth.authenticateAdmin, orderController.order_list);
router.get('/:id', auth.authenticateAdmin, orderController.order_details);
router.get(
  '/foruser/:id',
  auth.authenticateAdmin,
  orderController.order_list_for_user
);

module.exports = router;
