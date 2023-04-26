'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Staff_AccessPermission', [
            {
                staff_id: 1,
                access_id: 1
            },
            {
                staff_id: 1,
                access_id: 2
            },
            {
                staff_id: 1,
                access_id: 3
            },
            {
                staff_id: 1,
                access_id: 4
            },
            {
                staff_id: 1,
                access_id: 5
            },
            {
                staff_id: 1,
                access_id: 6
            },
            {
                staff_id: 1,
                access_id: 7
            },
            {
                staff_id: 2,
                access_id: 1
            },
            {
                staff_id: 2,
                access_id: 2
            },
            {
                staff_id: 2,
                access_id: 3
            },
            {
                staff_id: 2,
                access_id: 4
            },
            {
                staff_id: 2,
                access_id: 5
            },
            {
                staff_id: 2,
                access_id: 6
            },
            {
                staff_id: 2,
                access_id: 7
            },
            {
                staff_id: 3,
                access_id: 1
            },
            {
                staff_id: 3,
                access_id: 2
            },
            {
                staff_id: 3,
                access_id: 3
            },
            {
                staff_id: 3,
                access_id: 5
            },
            {
                staff_id: 3,
                access_id: 7
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Staff_AccessPermission', null, {});
    }
};
