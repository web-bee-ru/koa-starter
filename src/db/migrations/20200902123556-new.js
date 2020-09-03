module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'examples',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        text: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      },
      {},
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('examples');
  },
};
