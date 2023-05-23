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
                receive_date: '28/11/2022',
                checkOut_date: '31/11/2022',
                status: 'Đã thanh toán'
            },
            {
                id: 2,
                room_id: 7,
                customer_id: 2,
                night_stay: 2,
                receive_date: '28/11/2022',
                checkOut_date: '30/11/2022',
                status: 'Đã thanh toán'
            },
            {
                id: 3,
                room_id: 8,
                customer_id: 3,
                night_stay: 2,
                receive_date: '29/11/2022',
                checkOut_date: '31/11/2022',
                status: 'Đã thanh toán'
            },
            {
                id: 4,
                room_id: 11,
                customer_id: 4,
                night_stay: 4,
                receive_date: '27/11/2022',
                checkOut_date: '31/11/2022',
                status: 'Đã thanh toán'
            },
            {
                id: 5,
                room_id: 15,
                customer_id: 5,
                night_stay: 3,
                receive_date: '28/11/2022',
                checkOut_date: '31/11/2022',
                status: 'Đã thanh toán'
            },
            {
                id: 6,
                room_id: 1,
                customer_id: 1,
                night_stay: 3,
                receive_date: '28/12/2022',
                checkOut_date: '31/12/2022',
                status: 'Đã thanh toán'
            },
            {
                id: 7,
                room_id: 1,
                customer_id: 1,
                night_stay: 2,
                receive_date: '13/01/2023',
                checkOut_date: '15/01/2023',
                status: 'Chờ nhận phòng'
            },
            {
                id: 8,
                room_id: 2,
                customer_id: 2,
                night_stay: 2,
                receive_date: '28/12/2022',
                checkOut_date: '30/12/2022',
                status: 'Đã thanh toán'
            },
            {
                id: 9,
                room_id: 12,
                customer_id: 2,
                night_stay: 2,
                receive_date: '28/01/2022',
                checkOut_date: '30/01/2022',
                status: 'Hủy đặt phòng'
            },
            {
                id: 10,
                room_id: 3,
                customer_id: 3,
                night_stay: 2,
                receive_date: '29/12/2022',
                checkOut_date: '31/12/2022',
                status: 'Đã thanh toán'
            },
            {
                id: 11,
                room_id: 4,
                customer_id: 4,
                night_stay: 4,
                receive_date: '27/12/2022',
                checkOut_date: '31/12/2022',
                status: 'Đã thanh toán'
            },
            {
                id: 12,
                room_id: 6,
                customer_id: 4,
                night_stay: 3,
                receive_date: '13/01/2023',
                checkOut_date: '16/01/2023',
                status: 'Chờ nhận phòng'
            },
            {
                id: 13,
                room_id: 5,
                customer_id: 5,
                night_stay: 3,
                receive_date: '28/12/2022',
                checkOut_date: '31/12/2022',
                status: 'Đã thanh toán'
            },
            {
                id: 14,
                room_id: 6,
                customer_id: 1,
                night_stay: 1,
                receive_date: '02/01/2023',
                checkOut_date: '03/01/2023',
                status: 'Đã thanh toán'
            },
            {
                id: 15,
                room_id: 7,
                customer_id: 2,
                night_stay: 2,
                receive_date: '02/01/2023',
                checkOut_date: '04/01/2023',
                status: 'Đã thanh toán'
            },
            {
                id: 16,
                room_id: 2,
                customer_id: 3,
                night_stay: 3,
                receive_date: '03/01/2023',
                checkOut_date: '06/01/2023',
                status: 'Đã thanh toán'
            },
            {
                id: 17,
                room_id: 14,
                customer_id: 4,
                night_stay: 2,
                receive_date: '08/01/2023',
                checkOut_date: '10/01/2023',
                status: 'Chờ nhận phòng'
            },
            {
                id: 18,
                room_id: 10,
                customer_id: 4,
                night_stay: 3,
                receive_date: '08/01/2023',
                checkOut_date: '12/01/2023',
                status: 'Chờ nhận phòng'
            },
            {
                id: 19,
                room_id: 1,
                customer_id: 1,
                night_stay: 3,
                receive_date: '08/01/2023',
                checkOut_date: '12/01/2023',
                status: 'Đã nhận phòng'
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('HotelRoomUse', null, {});
    }
};