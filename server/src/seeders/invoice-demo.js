'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Invoice', [
            {
                id: 1,
                date: '28/11/2022',
                staff_id: 3,
                room_use_id: 1,
                total: 1620000
            },
            {
                id: 2,
                date: '28/11/2022',
                staff_id: 3,
                room_use_id: 2,
                total: 1200000
            },
            {
                id: 3,
                date: '29/11/2022',
                staff_id: 3,
                room_use_id: 3,
                total: 1200000
            },
            {
                id: 4,
                date: '27/11/2022',
                staff_id: 3,
                room_use_id: 4,
                total: 4800000
            },
            {
                id: 5,
                date: '28/11/2022',
                staff_id: 3,
                room_use_id: 5,
                total: 6000000
            },
            {
                id: 6,
                date: '28/12/2022',
                staff_id: 3,
                room_use_id: 6,
                total: 1500000
            },
            {
                id: 7,
                date: '28/12/2022',
                staff_id: 4,
                room_use_id: 8,
                total: 1000000
            },
            {
                id: 8,
                date: '28/12/2022',
                staff_id: 4,
                room_use_id: 10,
                total: 1000000
            },
            {
                id: 9,
                date: '27/12/2022',
                staff_id: 4,
                room_use_id: 11,
                total: 2000000
            },
            {
                id: 10,
                date: '28/12/2022',
                staff_id: 4,
                room_use_id: 13,
                total: 1500000
            },
            {
                id: 11,
                date: '02/01/2023',
                staff_id: 4,
                room_use_id: 14,
                total: 600000
            },
            {
                id: 12,
                date: '02/01/2023',
                staff_id: 3,
                room_use_id: 15,
                total: 1200000
            },
            {
                id: 13,
                date: '03/01/2023',
                staff_id: 3,
                room_use_id: 16,
                total: 1500000
            },
            {
                id: 14,
                date: '08/01/2023',
                staff_id: 3,
                room_use_id: 19,
                total: 0
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Invoice', null, {});
    }
};