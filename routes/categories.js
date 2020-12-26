const express = require('express');
const categoryController = require('../controllers/categoryController');
const auth = require('../auth/authorization');

const router = express.Router();

router.get('/', auth.authenticateAdmin, categoryController.category_list);
// router.get('/:id', itemController.item_details);
router.delete(
  '/:id',
  auth.authenticateAdmin,
  categoryController.category_delete_delete
);
router.put('/', auth.authenticateAdmin, categoryController.category_update_put);
router.post(
  '/',
  auth.authenticateAdmin,
  categoryController.category_create_post
);

module.exports = router;
