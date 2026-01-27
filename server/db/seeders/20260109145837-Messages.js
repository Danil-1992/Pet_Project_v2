'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Messages', [
      {
        message:
          'Подскажите пожалуйста, в течение какого времени можно осуществить возврат товара',
        chat_id: 1,
        good_id: 3,
      },
      {
        message: 'Добрый день! Вы можете вернуть товар в течение двух недель',
        chat_id: 1,
        good_id: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
  },
};
