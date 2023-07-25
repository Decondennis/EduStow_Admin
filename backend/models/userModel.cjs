const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database.cjs');
const bcrypt = require('bcryptjs'); 
const Payment = require('./paymentModel.cjs');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  schoolName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  schoolAddress: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.BOOLEAN
  },
  role: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
});

User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

User.prototype.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

User.associate = (models) => {
User.hasMany(Payment, { foreignKey: 'userId', as: 'payments', sourceKey: 'id' });
};


module.exports = User;
