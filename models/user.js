'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    social_user_id: DataTypes.STRING,
    password: DataTypes.STRING,
    registration_type: DataTypes.ENUM('google', 'twitter', 'vk')
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function(models) {
    User.hasMany(models.Task, {
      foreignKey: 'userId',
    })
  };
  return User;
};
