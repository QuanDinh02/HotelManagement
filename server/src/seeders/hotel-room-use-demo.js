'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('HotelRoomUse', [
            {
                id: 1,
                room_id: 1,
                customer_id: 1,
                night_stay: 3,
                receive_date: '12/03/2022',
                checkOut_date: '15/03/2022',
                status: 'Chờ nhận phòng'
            },
            {
                id: 2,
                room_id: 2,
                customer_id: 2,
                night_stay: 2,
                receive_date: '12/03/2022',
                checkOut_date: '14/03/2022',
                status: 'Chờ nhận phòng'
            },
            {
                id: 3,
                room_id: 3,
                customer_id: 3,
                night_stay: 4,
                receive_date: '13/03/2022',
                checkOut_date: '17/03/2022',
                status: 'Đã nhận phòng'
            },
            {
                id: 4,
                room_id: 1,
                customer_id: 4,
                night_stay: 2,
                receive_date: '15/03/2022',
                checkOut_date: '17/03/2022',
                status: 'Chờ nhận phòng'
            },
            {
                id: 5,
                room_id: 12,
                customer_id: 1,
                night_stay: 2,
                receive_date: '18/04/2022',
                checkOut_date: '20/04/2022',
                status: 'Hủy đặt phòng'
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('HotelRoomUse', null, {});
    }
};