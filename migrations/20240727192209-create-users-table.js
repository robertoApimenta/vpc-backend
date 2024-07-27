'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      birthDate: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      state: {
        allowNull: true,
        type: Sequelize.STRING
      },
      street: {
        allowNull: true,
        type: Sequelize.STRING
      },
      neighborhood: {
        allowNull: true,
        type: Sequelize.STRING
      },
      number: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      complement: {
        allowNull: true,
        type: Sequelize.STRING
      },
      zipCode: {
        allowNull: true,
        type: Sequelize.STRING
      },
      pixKey: {
        allowNull: true,
        type: Sequelize.STRING
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      insurance: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
