'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Backets', [
      {
        user_id: 2,
        good_id: 3,
        quantity: 1,
      },
      {
        user_id: 2,
        good_id: 4,
        quantity: 1,
      },
      {
        user_id: 2,
        good_id: 5,
        quantity: 1,
      },
      {
        user_id: 2,
        good_id: 6,
        quantity: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Backets', null, {});
  },
};
