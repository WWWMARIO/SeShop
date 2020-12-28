const express = require('express');
const itemController = require('../controllers/itemController');
const auth = require('../auth/authentication');

const router = express.Router();

router.get('/', auth.authenticateRegisteredUser, itemController.item_list);
router.get('/:id', auth.authenticateAdmin, itemController.item_details);
router.delete(
  '/:id',
  auth.authenticateAdmin,
  itemController.item_delete_delete
);
router.post('/', auth.authenticateAdmin, itemController.item_create_post);
router.put('/', auth.authenticateAdmin, itemController.item_update_put);

module.exports = router;
