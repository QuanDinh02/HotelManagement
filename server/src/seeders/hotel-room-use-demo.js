'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('HotelRoomUse', [
            {
                id: 1,
                room_id: 3,
                customer_id: 1,
                night_stay: 3,
                receive_date: '2022-11-28',
                checkOut_date: '2022-11-31',
                status: 'Đã thanh toán'
            },
            {
                id: 2,
                room_id: 7,
                customer_id: 2,
                night_stay: 2,
                receive_date: '2022-11-28',
                checkOut_date: '2022-11-30',
                status: 'Đã thanh toán'
            },
            {
                id: 3,
                room_id: 8,
                customer_id: 3,
                night_stay: 2,
                receive_date: '2022-11-29',
                checkOut_date: '2022-11-31',
                status: 'Đã thanh toán'
            },
            {
                id: 4,
                room_id: 11,
                customer_id: 4,
                night_stay: 4,
                receive_date: '2022-11-27',
                checkOut_date: '2022-11-31',
                status: 'Đã thanh toán'
            },
            {
                id: 5,
                room_id: 15,
                customer_id: 5,
                night_stay: 3,
                receive_date: '2022-11-28',
                checkOut_date: '2022-11-31',
                status: 'Đã thanh toán'
            },
            {
                id: 6,
                room_id: 1,
                customer_id: 1,
                night_stay: 3,
                receive_date: '2022-12-28',
                checkOut_date: '2022-12-31',
                status: 'Đã thanh toán'
            },
            {
                id: 7,
                room_id: 1,
                customer_id: 1,
                night_stay: 2,
                receive_date: '2023-01-13',
                checkOut_date: '2023-01-15',
                status: 'Chờ nhận phòng'
            },
            {
                id: 8,
                room_id: 2,
                customer_id: 2,
                night_stay: 2,
                receive_date: '2022-12-28',
                checkOut_date: '2022-12-30',
                status: 'Đã thanh toán'
            },
            {
                id: 9,
                room_id: 12,
                customer_id: 2,
                night_stay: 2,
                receive_date: '2022-01-28',
                checkOut_date: '2022-01-30',
                status: 'Hủy đặt phòng'
            },
            {
                id: 10,
                room_id: 3,
                customer_id: 3,
                night_stay: 2,
                receive_date: '2022-12-29',
                checkOut_date: '2022-12-31',
                status: 'Đã thanh toán'
            },
            {
                id: 11,
                room_id: 4,
                customer_id: 4,
                night_stay: 4,
                receive_date: '2022-12-27',
                checkOut_date: '2022-12-31',
                status: 'Đã thanh toán'
            },
            {
                id: 12,
                room_id: 6,
                customer_id: 4,
                night_stay: 3,
                receive_date: '2023-01-13',
                checkOut_date: '2023-01-16',
                status: 'Chờ nhận phòng'
            },
            {
                id: 13,
                room_id: 5,
                customer_id: 5,
                night_stay: 3,
                receive_date: '2022-12-28',
                checkOut_date: '2022-12-31',
                status: 'Đã thanh toán'
            },
            {
                id: 14,
                room_id: 6,
                customer_id: 1,
                night_stay: 1,
                receive_date: '2023-01-02',
                checkOut_date: '2023-01-03',
                status: 'Đã thanh toán'
            },
            {
                id: 15,
                room_id: 7,
                customer_id: 2,
                night_stay: 2,
                receive_date: '2023-01-02',
                checkOut_date: '2023-01-04',
                status: 'Đã thanh toán'
            },
            {
                id: 16,
                room_id: 2,
                customer_id: 3,
                night_stay: 3,
                receive_date: '2023-01-03',
                checkOut_date: '2023-01-06',
                status: 'Đã thanh toán'
            },
            {
                id: 17,
                room_id: 14,
                customer_id: 4,
                night_stay: 2,
                receive_date: '2023-01-08',
                checkOut_date: '2023-01-10',
                status: 'Chờ nhận phòng'
            },
            {
                id: 18,
                room_id: 10,
                customer_id: 4,
                night_stay: 3,
                receive_date: '2023-01-08',
                checkOut_date: '2023-01-12',
                status: 'Chờ nhận phòng'
            },
            {
                id: 19,
                room_id: 1,
                customer_id: 1,
                night_stay: 3,
                receive_date: '2023-01-08',
                checkOut_date: '2023-01-12',
                status: 'Đã nhận phòng'
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('HotelRoomUse', null, {});
    }
};