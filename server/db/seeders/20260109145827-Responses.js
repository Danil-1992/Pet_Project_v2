'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Responses', [
      {
        comment: 'Хорошая футболка, надеюсь прослужит долго',
        user_id: 2,
        good_id: 1,
      },
      {
        comment:
          'Мне тоже понравилась. Материал настолько приятный, что я недано в ней заснула',
        user_id: 3,
        good_id: 1,
      },
      {
        comment: 'Легкая, летняя рубашка. Ставлю 4 чисто из-за доставки',
        user_id: 2,
        good_id: 4,
      },
      {
        comment: 'Хорошая футболка, надеюсь прослужит долго',
        user_id: 3,
        good_id: 4,
      },
      {
        comment: 'При стирке не испортилась',
        user_id: 2,
        good_id: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Responses', null, {});
  },
};
