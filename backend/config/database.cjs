
const { Sequelize } = require("sequelize");
 
const db = new Sequelize('edustow', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
module.exports = db;