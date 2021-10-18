'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    solution: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    section: DataTypes.ENUM('Number Theory', 'Algebra', 'Geometry', 'Arithmetic', 'Combinatorics', 'Topology', 'Mathematical Analysis')
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Task.hasMany(models.TasksRating, {
      foreignKey: 'taskId',
    });
    Task.hasMany(models.SolvedTask, {
      foreignKey: 'TaskId',
    });
    Task.hasMany(models.Photo, {
      foreignKey: 'taskId',
    })
  };
  return Task;
};
