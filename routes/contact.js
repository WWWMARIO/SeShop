const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.post('/', contactController.contact_create_post);
router.get('/', contactController.contact_list);
router.delete('/:id', contactController.contact_delete_delete);

module.exports = router;
