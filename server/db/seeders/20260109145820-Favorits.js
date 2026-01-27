'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Favorits', [
      {
        user_id: 2,
        good_id: 4,
      },
      {
        user_id: 2,
        good_id: 5,
      },
      {
        user_id: 3,
        good_id: 4,
      },
      {
        user_id: 3,
        good_id: 5,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Favorits', null, {});
  },
};
