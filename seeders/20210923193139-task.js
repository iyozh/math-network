'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
      title: 'Pythagorean theorem',
      description: 'In mathematics, the Pythagorean theorem, or Pythagoras\' theorem, is a fundamental relation in Euclidean geometry among the three sides of a right triangle.',
      userId: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};