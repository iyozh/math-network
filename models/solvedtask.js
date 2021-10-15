'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolvedTask = sequelize.define('SolvedTask', {
    UserId: DataTypes.INTEGER,
    TaskId: DataTypes.INTEGER,
  }, {});
  SolvedTask.associate = function(models) {
    SolvedTask.belongsTo(models.Task, {
      foreignKey: 'TaskId',
      onDelete: 'CASCADE'
    });
    SolvedTask.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });


  };
  return SolvedTask;
};


