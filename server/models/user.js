'use strict';
const {
  Model
} = require('sequelize');
const { createHash } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, {foreignKey:"UserId"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already exist!"
      },
      validate: {
        notEmpty: {
          msg: "Email is required!"
        },
        notNull: {
          msg: "Email is required!"
        },
        isEmail: {
          msg: "Invalid format email!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required!"
        },
        notNull: {
          msg: "Password is required!"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user){
        user.password = createHash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};