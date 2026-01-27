'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('OrderItems', [
      {
        quantity: 1,
        size: 'S',
        order_id: 1,
        good_id: 1,
      },
      {
        quantity: 2,
        size: 'M',
        order_id: 1,
        good_id: 4,
      },
      {
        quantity: 1,
        size: 'S',
        order_id: 1,
        good_id: 5,
      },
      {
        quantity: 1,
        size: 'M',
        order_id: 1,
        good_id: 6,
      },
      {
        quantity: 1,
        size: 'S',
        order_id: 1,
        good_id: 8,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', null, {});
  },
};
