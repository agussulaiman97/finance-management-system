const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define('users', {
  name: DataTypes.STRING,

  email: {
    type: DataTypes.STRING,
    unique: true,
  },

  password: DataTypes.STRING,

  role: {
    type: DataTypes.ENUM('admin', 'management'),
    defaultValue: 'management',
  },
})

module.exports = User