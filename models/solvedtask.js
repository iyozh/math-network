'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolvedTask = sequelize.define('SolvedTask', {
    UserId: DataTypes.INTEGER,
    TaskId: DataTypes.INTEGER,
  }, {});
  SolvedTask.associate = function(models) {
    models.Task.belongsToMany(models.User, { through: SolvedTask });
    models.User.belongsToMany(models.Task, { through: SolvedTask });
  };
  return SolvedTask;
};