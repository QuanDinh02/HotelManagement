'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('AccessPermission', [
            {
                id: 1,
                name: 'Đặt phòng',
                link: '/book-room'
            },
            {
                id: 2,
                name: 'Nhận phòng',
                link: '/receive-room'
            },
            {
                id: 3,
                name: 'Quản lý phòng',
                link: '/room-management'
            },
            {
                id: 4,
                name: 'Quản lý nhân viên',
                link: '/staff-management'
            },
            {
                id: 5,
                name: 'Quản lý dịch vụ',
                link: '/service-management'
            },
            {
                id: 6,
                name: 'Quản lý khách hàng',
                link: '/customer-management'
            },
            {
                id: 7,
                name: 'Quản lý sử dụng dịch vụ và thanh toán',
                link: '/service-using-payment'
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('AccessPermission', null, {});
    }
};
