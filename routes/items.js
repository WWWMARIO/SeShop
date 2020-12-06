const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.get('/', itemController.item_list);
router.get('/:id', itemController.item_details);
router.delete('/:id', itemController.item_delete_delete);
router.post('/', itemController.item_create_post);
router.put('/', itemController.item_update_put);

module.exports = router;
