const express = require('express');
const orderController = require('../controllers/orderControler');
const auth = require('../auth/authentication');

const router = express.Router();

router.post('/', auth.authenticateRegisteredUser, orderController.order_create_post);
router.get('/', auth.authenticateAdmin, orderController.order_list);
router.get('/:id', auth.authenticateAdmin, orderController.order_details);
router.get(
  '/foruser/:id',
  auth.authenticateSelfOrAdmin,
  orderController.order_list_for_user
);

module.exports = router;
