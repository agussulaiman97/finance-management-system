import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Transaction = sequelize.define(
  'Transaction',
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    note: {
      type: DataTypes.TEXT,
    },

    date: {
      type: DataTypes.DATEONLY,
    },
  }
)

export default Transaction