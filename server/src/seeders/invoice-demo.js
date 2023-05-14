'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Invoice', [
            {
                id: 1,
                date: 1,
                staff_id: 4,
                room_use_id: 3,
                total: 2145000,
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Invoice', null, {});
    }
};