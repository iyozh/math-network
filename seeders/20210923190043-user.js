'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John Petrov',
      email: 'demo@demo.com',
      password: '$321!pass!123$',
      social_user_id:  Math.random().toString(36).substr(2, 9),
      registration_type: "google",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};