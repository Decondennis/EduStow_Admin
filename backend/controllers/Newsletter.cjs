const Newsletter = require("../models/newsletterModel.cjs");

exports.getAllNewsletter = async (req, res) => {
    try {
        const newsletter = await Newsletter.findAll();
        res.json(newsletter);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

exports.getNewsletterById = async (req, res) => {
    try {
        const newsletter = await Newsletter.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(newsletter[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

exports.createNewsletter = async (req, res) => {
    try {
        await Newsletter.create(req.body);
        res.json({
            "message": "Newsletter Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

exports.updateNewsletter = async (req, res) => {
    try {
        await Newsletter.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Newsletter Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

exports.deleteNewsletter = async (req, res) => {
    try {
        await Newsletter.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Newsletter Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
