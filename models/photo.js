'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    filename: DataTypes.STRING,
    taskId: DataTypes.INTEGER,
  }, {});
  Photo.associate = function(models) {
    Photo.belongsTo(models.Task, {
      foreignKey: 'taskId',
      onDelete: 'CASCADE'
    });
  };
  return Photo;
};