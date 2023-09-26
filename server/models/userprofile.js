'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, {foreignKey: "UserId"})
    }
  }
  UserProfile.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username is required!"
        },
        notEmpty: {
          msg: "Username is required!"
        } 
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Your name is required!"
        },
        notEmpty: {
          msg: "Your name is required!"
        } 
      }
    },
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone number is required!"
        },
        notEmpty: {
          msg: "Phone number is required!"
        } 
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Address is required!"
        },
        notEmpty: {
          msg: "Address is required!"
        } 
      }
    },
    profilePicture: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};