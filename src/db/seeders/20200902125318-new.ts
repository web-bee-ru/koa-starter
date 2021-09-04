import { QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.bulkInsert(
      'examples',
      [
        {
          text: 'example text',
          created_at: '1111-11-11 11:11:11',
          updated_at: '1111-11-11 11:11:11',
        },
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
