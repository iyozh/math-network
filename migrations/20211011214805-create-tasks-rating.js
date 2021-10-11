'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TasksRatings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating: {
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
      taskId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Tasks',
          key: 'id',
          as: 'taskId',
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
    await queryInterface.dropTable('TasksRatings');
  }
};