'use strict';
module.exports = (sequelize, DataTypes) => {
  const TasksRating = sequelize.define('TasksRating', {
    rating: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {});
  TasksRating.associate = function(models) {
    TasksRating.belongsTo(models.Task, {
      foreignKey: 'taskId',
      onDelete: 'CASCADE'
    })
  };
  return TasksRating;
};
