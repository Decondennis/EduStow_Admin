const db = require("../config/database.cjs");
const { DataTypes } = require("sequelize");

const Contact = db.define('contacts', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    subject: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

module.exports = Contact;
