'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
      title: 'Pythagorean theorem',
      description: 'In mathematics, the Pythagorean theorem, or Pythagoras\' theorem, is a fundamental relation in Euclidean geometry among the three sides of a right triangle.',
      userId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Algebra',
      description: 'You don\'t have to be a math genius to follow along with this book!',
      userId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Functions',
      description: 'Discover more than 85 of the most important mathematical ideas, theorems, and proofs ever devised with this beautifully illustrated book.',
      userId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};