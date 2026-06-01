import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Category = sequelize.define(
  'Category',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
)

export default Category