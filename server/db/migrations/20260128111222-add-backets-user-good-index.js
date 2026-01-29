'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
   
    await queryInterface.addIndex('Backets', ['user_id', 'good_id'], {
      name: 'idx_backets_user_good_composite',
      using: 'BTREE'
    });
    
    await queryInterface.addIndex('Backets', ['good_id'], {
      name: 'idx_backets_good_id',
      using: 'BTREE'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('Backets', 'idx_backets_user_good_composite');
    await queryInterface.removeIndex('Backets', 'idx_backets_user_id');
    await queryInterface.removeIndex('Backets', 'idx_backets_good_id');
  }
};