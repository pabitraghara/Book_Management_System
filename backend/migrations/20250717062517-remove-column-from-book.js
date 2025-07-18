"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // REMOVE columns from the table (example: 'Books')
    await queryInterface.removeColumn("books", "pages");
    await queryInterface.removeColumn("books", "language");
    await queryInterface.removeColumn("books", "coverImage");
  },

  async down(queryInterface, Sequelize) {
    // ADD columns back (for rollback)
    await queryInterface.addColumn("books", "pages", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("books", "language", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("books", "coverImage", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
