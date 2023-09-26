'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User, {foreignKey: "UserId"})
      Favorite.belongsTo(models.Product, {foreignKey: "ProductId"})
    }
  }
  Favorite.init({
    UserId: DataTypes.INTEGER,
    ProductId: {
      type: DataTypes.INTEGER,
      unique: {
        msg: "You cannot add same product to your favorite"
      }
    },
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (favorite) => {
        favorite.status = "Favorite"
      }
    },
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};