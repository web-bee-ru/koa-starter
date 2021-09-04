import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.createTable(
      'examples',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        text: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        deleted_at: {
          type: DataTypes.DATE,
        },
      },
      {},
    );
  },
  down: (queryInterface: QueryInterface, sequelize: Sequelize) => {
    return queryInterface.dropTable('examples');
  },
};
