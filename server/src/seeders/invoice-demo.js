'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Invoice', [
            {
                id: 1,
                date: '2022-11-28',
                staff_id: 3,
                room_use_id: 1,
                total: 1620000
            },
            {
                id: 2,
                date: '2022-11-28',
                staff_id: 3,
                room_use_id: 2,
                total: 1200000
            },
            {
                id: 3,
                date: '2022-11-29',
                staff_id: 3,
                room_use_id: 3,
                total: 1200000
            },
            {
                id: 4,
                date: '2022-11-27',
                staff_id: 3,
                room_use_id: 4,
                total: 4800000
            },
            {
                id: 5,
                date: '2022-11-28',
                staff_id: 3,
                room_use_id: 5,
                total: 6000000
            },
            {
                id: 6,
                date: '2022-12-28',
                staff_id: 3,
                room_use_id: 6,
                total: 1500000
            },
            {
                id: 7,
                date: '2022-28-12',
                staff_id: 4,
                room_use_id: 8,
                total: 1000000
            },
            {
                id: 8,
                date: '2022-12-28',
                staff_id: 4,
                room_use_id: 10,
                total: 1000000
            },
            {
                id: 9,
                date: '2022-12-27',
                staff_id: 4,
                room_use_id: 11,
                total: 2000000
            },
            {
                id: 10,
                date: '2022-12-28',
                staff_id: 4,
                room_use_id: 13,
                total: 1500000
            },
            {
                id: 11,
                date: '2023-01-02',
                staff_id: 4,
                room_use_id: 14,
                total: 600000
            },
            {
                id: 12,
                date: '2023-01-02',
                staff_id: 3,
                room_use_id: 15,
                total: 1200000
            },
            {
                id: 13,
                date: '2023-01-03',
                staff_id: 3,
                room_use_id: 16,
                total: 1500000
            },
            {
                id: 14,
                date: '2023-01-08',
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