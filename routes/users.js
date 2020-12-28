const express = require('express');
// const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const auth = require('../auth/authentication');

const router = express.Router();

router.get('/:id', auth.authenticateSelfOrAdmin, userController.user_details);
router.get('/', auth.authenticateAdmin, userController.user_list);
router.delete('/:id', auth.authenticateAdmin, userController.user_delete_delete);
router.put('/', auth.authenticateAdmin, userController.user_update_put);
// router.post('/', authenticateToken, userController.user_create_post);

module.exports = router;
