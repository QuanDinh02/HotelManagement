'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Customer', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            citizen_id: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            dob: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.STRING
            },
            nationality: {
                type: Sequelize.STRING
            },
            customer_category: {
                type: Sequelize.INTEGER
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Customer');
    }
};