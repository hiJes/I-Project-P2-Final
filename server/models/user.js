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
      User.hasMany(models.Cart, {foreignKey:"UserId"})
      User.hasMany(models.Favorite, {foreignKey:"UserId"})
    }
  }
  User.init({
    email:{ 
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique!"
      },
      validate: {
        notNull: {
          msg: "Email is required!"
        },
        notEmpty: {
          msg: "Email is required!"
        },
        isEmail: {
          msg: "Must be email format!"
        }
      }
    },
    password:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required!"
        },
        notEmpty: {
          msg: "Password is required!"
        }, 
        isMinCharcter(password){
          if (password.length >= 1 && password.length < 8) {
            throw new Error ("Minimal 8 character for your password")
          }
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = createHash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};