const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.cjs');
const ContactsController = require('../controllers/Contacts');

router.get('/', authMiddleware, ContactsController.getAllContacts);
router.get('/:id', ContactsController.getContactById);
router.post('/', ContactsController.createContact);
router.put('/:id', ContactsController.updateContact);
router.delete('/:id', ContactsController.deleteContact);

module.exports = router;
