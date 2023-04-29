'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('HotelService', [
            {
                name: 'Bánh mì ốp la 2 trứng',
                price: 20000,
                hotel_service_category: 1,
            },
            {
                name: 'Bánh mì chả lụa',
                price: 15000,
                hotel_service_category: 1,
            },
            {
                name: 'Bánh mì chả cá',
                price: 20000,
                hotel_service_category: 1,
            },
            {
                name: 'Bánh mì heo quay',
                price: 20000,
                hotel_service_category: 1,
            },
            {
                name: 'Mì nước 2 vắt',
                price: 35000,
                hotel_service_category: 1,
            },
            {
                name: 'Mì xào trứng xúc xích',
                price: 25000,
                hotel_service_category: 1,
            },
            {
                name: 'Bò kho',
                price: 40000,
                hotel_service_category: 1,
            },
            {
                name: 'Hủ tiếu nam vang',
                price: 40000,
                hotel_service_category: 1,
            },
            {
                name: 'Bánh canh cua',
                price: 40000,
                hotel_service_category: 1,
            },
            {
                name: 'Phở',
                price: 45000,
                hotel_service_category: 1,
            },
            {
                name: 'Nước ngọt',
                price: 10000,
                hotel_service_category: 1,
            },
            {
                name: 'Bia',
                price: 12000,
                hotel_service_category: 1,
            },
            {
                name: 'Rượu',
                price: 120000,
                hotel_service_category: 1,
            },
            {
                name: 'Cafe',
                price: 20000,
                hotel_service_category: 1,
            },
            {
                name: 'Gym',
                price: 200000,
                hotel_service_category: 2,
            },
            {
                name: 'Spa',
                price: 600000,
                hotel_service_category: 2,
            },
            {
                name: 'Tennis',
                price: 100000,
                hotel_service_category: 2,
            },
            {
                name: 'Hồ bơi',
                price: 45000,
                hotel_service_category: 2,
            },
            {
                name: 'Giặt ủi quần áo',
                price: 50000,
                hotel_service_category: 3,
            },
            {
                name: 'Đặt vé máy bay/ tour du lịch/ xe đưa đón',
                price: 0,
                hotel_service_category: 3,
            },
            {
                name: 'Đổi ngoại tệ',
                price: 0,
                hotel_service_category: 3,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('HotelService', null, {});
    }
};