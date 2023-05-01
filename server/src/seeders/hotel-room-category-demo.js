'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('HotelRoomCategory', [
            {
                id: 1,
                name: 'Standard Room',
                description: 'Trang thiết bị của phòng standard, chỉ có phòng ngủ và phòng tắm',
                price: 500000,
                people_maximum: 1
            },
            {
                id: 2,
                name: 'Superior Room',
                description: 'Giống phòng Standard nhưng rộng hơn',
                price: 600000,
                people_maximum: 2
            },
            {
                id: 3,
                name: 'Deluxe Room',
                description: 'Trang thiết bị trong phòng đạt chất lượng cao, có hoa tươi, báo tiếng Anh hàng ngày..., có nhiều phòng (phòng ngủ, phòng tắm, phòng khách)',
                price: 1200000,
                people_maximum: 3
            },
            {
                id: 4,
                name: 'Executive Room',
                description: 'Giống phòng Deluxe nhưng rộng hơn và có thêm các dịch vụ khác',
                price: 2000000,
                people_maximum: 3
            },
            {
                id: 5,
                name: 'Single Room',
                description: 'Phòng single có 1 giường dành cho 1 khách',
                price: 400000,
                people_maximum: 1
            },
            {
                id: 6,
                name: 'Twin Room',
                description: 'Phòng twin có 2 giường dành cho 2 khách riêng biệt',
                price: 700000,
                people_maximum: 2
            },
            {
                id: 7,
                name: 'Double Room',
                description: 'Phòng double có 1 giường dành cho 2 khách',
                price: 500000,
                people_maximum: 2
            },
            {
                id: 8,
                name: 'Triple Room',
                description: 'Phòng triple có 3 giường dành cho 3 khách người lớn hoặc 1 gia đình (3 giường đơn hoặc 1 giường đôi, 1 giường đơn)',
                price: 900000,
                people_maximum: 3
            },
            {
                id: 9,
                name: 'Quad Room',
                description: 'Phòng quad dành cho 4 khách, gồm 2 giường (2 khách nằm chung 1 giường)',
                price: 1000000,
                people_maximum: 4
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('HotelRoomCategory', null, {});
    }
};
