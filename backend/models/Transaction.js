const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Transaction = sequelize.define('transactions', {
  type: DataTypes.STRING,

  category: DataTypes.STRING,

  amount: DataTypes.BIGINT,

  description: DataTypes.TEXT,

  transaction_date: DataTypes.DATE,
})

module.exports = Transaction