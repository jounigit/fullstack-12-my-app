const { DataTypes } = require('sequelize');

// This migration adds cascade delete to the session table, ensuring that when a user is deleted, their associated sessions are also removed.
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addConstraint('sessions', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'sessions_userId_fkey',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint('sessions', 'sessions_userId_fkey');
  }
};