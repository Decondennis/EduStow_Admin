const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database.cjs');
const User = require('./userModel.cjs').User;

const Payment = sequelize.define('payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // Make sure the model name is correct
      key: 'id'
    }
  },
  school_name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  transaction_code: {
    type: DataTypes.STRING
  },
  session: {
    type: DataTypes.STRING
  },
  term: {
    type: DataTypes.STRING
  },
  registered_students: {
    type: DataTypes.STRING
  },
  amount: {
    type: DataTypes.INTEGER
  },
  status_flag: {
    type: DataTypes.BOOLEAN
  }
}, {
  freezeTableName: true
});

Payment.associate = (models) => {
Payment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
};


module.exports = Payment;
