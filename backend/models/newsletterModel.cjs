const db = require("../config/database.cjs");
const { DataTypes } = require("sequelize");

const Newsletter = db.define('newsletter', {
    email: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

module.exports = Newsletter;
