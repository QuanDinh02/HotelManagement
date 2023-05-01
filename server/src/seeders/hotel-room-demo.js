'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('HotelRoom', [
            {
                id: 1,
                name: 'Phòng 101',
                status: 'Trống',
                room_category: 1
            },
            {
                id: 2,
                name: 'Phòng 102',
                status: 'Trống',
                room_category: 1
            },
            {
                id: 3,
                name: 'Phòng 103',
                status: 'Trống',
                room_category: 1
            },
            {
                id: 4,
                name: 'Phòng 104',
                status: 'Trống',
                room_category: 1
            },
            {
                id: 5,
                name: 'Phòng 105',
                status: 'Trống',
                room_category: 1
            },
            {
                id: 6,
                name: 'Phòng 201',
                status: 'Trống',
                room_category: 2
            },
            {
                id: 7,
                name: 'Phòng 202',
                status: 'Trống',
                room_category: 2
            },
            {
                id: 8,
                name: 'Phòng 203',
                status: 'Trống',
                room_category: 2
            },
            {
                id: 9,
                name: 'Phòng 204',
                status: 'Trống',
                room_category: 2
            },
            {
                id: 10,
                name: 'Phòng 205',
                status: 'Trống',
                room_category: 2
            },
            {
                id: 11,
                name: 'Phòng 301',
                status: 'Trống',
                room_category: 3
            },
            {
                id: 12,
                name: 'Phòng 302',
                status: 'Trống',
                room_category: 3
            },
            {
                id: 13,
                name: 'Phòng 303',
                status: 'Trống',
                room_category: 3
            },
            {
                id: 14,
                name: 'Phòng 304',
                status: 'Trống',
                room_category: 4
            },
            {
                id: 15,
                name: 'Phòng 305',
                status: 'Trống',
                room_category: 4
            },
            {
                id: 16,
                name: 'Phòng 106',
                status: 'Trống',
                room_category: 5
            },
            {
                id: 17,
                name: 'Phòng 107',
                status: 'Trống',
                room_category: 5
            },
            {
                id: 18,
                name: 'Phòng 108',
                status: 'Trống',
                room_category: 5
            },
            {
                id: 19,
                name: 'Phòng 206',
                status: 'Trống',
                room_category: 6
            },
            {
                id: 20,
                name: 'Phòng 207',
                status: 'Trống',
                room_category: 6
            },
            {
                id: 21,
                name: 'Phòng 208',
                status: 'Trống',
                room_category: 7
            },
            {
                id: 22,
                name: 'Phòng 209',
                status: 'Trống',
                room_category: 7
            },
            {
                id: 23,
                name: 'Phòng 306',
                status: 'Trống',
                room_category: 8
            },
            {
                id: 24,
                name: 'Phòng 307',
                status: 'Trống',
                room_category: 8
            },
            {
                id: 25,
                name: 'Phòng 308',
                status: 'Trống',
                room_category: 9
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('HotelRoom', null, {});
    }
};