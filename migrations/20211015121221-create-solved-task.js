'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SolvedTasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
          as: 'UserId',
        }
      },
      TaskId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Tasks',
          key: 'id',
          as: 'TaskId',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SolvedTasks');
  }
};