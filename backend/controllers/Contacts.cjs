const Contact = require("../models/contactModel.cjs");

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

exports.getContactById = async (req, res) => {
    try {
        const contacts = await Contact.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(contacts[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

exports.createContact = async (req, res) => {
    try {
        await Contact.create(req.body);
        res.json({
            "message": "Contact Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

exports.updateContact = async (req, res) => {
    try {
        await Contact.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Contact Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

exports.deleteContact = async (req, res) => {
    try {
        await Contact.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Contact Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
