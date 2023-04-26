'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('StaffAccount', [
            {
                id: 1,
                account_name: 'admin646',
                password: 'admin646',
                staff_id: 1
            },
            {
                id: 2,
                account_name: 'manager888',
                password: 'admin888',
                staff_id: 2
            },
            {
                id: 3,
                account_name: 'staff230',
                password: 'staff230',
                staff_id: 3
            },
            {
                id: 4,
                account_name: 'staff546',
                password: 'staff546',
                staff_id: 4
            },
            {
                id: 5,
                account_name: 'staff799',
                password: 'staff799',
                staff_id: 5
            },

        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('StaffAccount', null, {});
    }
};
