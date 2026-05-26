const { DataTypes } =
  require('sequelize')

const sequelize =
  require('../config/database')

const Bank = sequelize.define(
  'Bank',
  {

    name: {

      type: DataTypes.STRING,

      allowNull: false,

    },

    account_number: {

      type: DataTypes.STRING,

      allowNull: false,

    },

    balance: {

      type: DataTypes.BIGINT,

      defaultValue: 0,

    },

  }
)

module.exports = Bank