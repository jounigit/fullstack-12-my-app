const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'password_hash');
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'password_hash');
  }
};