'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('StaffCategory', [
            {
                id: 1,
                name: 'ADMIN',
            },
            {
                id: 2,
                name: 'STAFF_MANAGER',
            },
            {
                id: 3,
                name: 'STAFF',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('StaffCategory', null, {});
    }
};
