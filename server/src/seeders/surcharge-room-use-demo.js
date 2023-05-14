'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Surcharge_RoomUse', [
            {
                id: 1,
                surcharge_id: 1,
                room_use_id: 3
            },
            {
                id: 2,
                surcharge_id: 3,
                room_use_id: 3
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Surcharge_RoomUse', null, {});
    }
};
