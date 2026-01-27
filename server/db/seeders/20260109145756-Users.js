const bcrypt = require('bcrypt');
('use strict');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Vladimir',
        email: 'vladimir@gmail.com',
        hashpass: await bcrypt.hash('123456', 10),
        role: 'admin',
      },
      {
        name: 'Vlad',
        email: 'vlad@gmail.com',
        hashpass: await bcrypt.hash('123456', 10),
        role: 'user',
      },
      {
        name: 'Anton',
        email: 'anton@gmail.com',
        hashpass: await bcrypt.hash('123456', 10),
        role: 'user',
      },
      {
        name: 'Sasha',
        email: 'sasha@gmail.com',
        hashpass: await bcrypt.hash('123456', 10),
        role: 'user',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
