const express = require("express");

const {
    getAllContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact
} = require("../controllers/Contacts.cjs");

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.patch('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
