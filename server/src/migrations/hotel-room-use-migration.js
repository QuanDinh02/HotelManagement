'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('HotelRoomUse', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            room_id: {
                type: Sequelize.INTEGER
            },
            customer_id: {
                type: Sequelize.INTEGER
            },
            night_stay: {
                type: Sequelize.INTEGER
            },
            receive_date: {
                type: Sequelize.STRING
            },
            checkOut_date: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('HotelRoomUse');
    }
};