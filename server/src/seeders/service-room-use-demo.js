'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Service_RoomUse', [
            {
                id: 1,
                service_id: 1,
                room_use_id: 1,
                quantity: 1,
                total: 20000,
            },
            {
                id: 2,
                service_id: 19,
                room_use_id: 1,
                quantity: 2,
                total: 100000,
            },
            {
                id: 3,
                service_id: 1,
                room_use_id: 19,
                quantity: 1,
                total: 20000,
            },
            {
                id: 4,
                service_id: 19,
                room_use_id: 19,
                quantity: 1,
                total: 50000,
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Service_RoomUse', null, {});
    }
};
