'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Customer', [
            {
                id: 1,
                name: 'John Wick',
                citizen_id: '123456',
                phone: '012345646',
                dob: '1955-12-12',
                address: '1234 Louis Paten, US',
                gender: 'Nam',
                nationality: 'Mỹ',
                customer_category: 1,
            },
            {
                id: 2,
                name: 'Bobb Elisa',
                citizen_id: '123456',
                phone: '012345888',
                dob: '1975-12-03',
                address: '532 Louis Paten, US',
                gender: 'Nữ',
                nationality: 'Mỹ',
                customer_category: 1,
            },
            {
                id: 3,
                name: 'Nguyễn Văn A',
                citizen_id: '123456',
                phone: '012385646',
                dob: '1984-12-24',
                address: '12/4 Lê Văn Lượng, VN',
                gender: 'Nam',
                nationality: 'Việt Nam',
                customer_category: 1,
            },
            {
                id: 4,
                name: 'Ema Phạm',
                citizen_id: '123456',
                phone: '012225646',
                dob: '2001-02-13',
                address: '332 Lí Chính Thắng, VN',
                gender: 'Nữ',
                nationality: 'Việt Nam',
                customer_category: 1,
            },
            {
                id: 5,
                name: 'Steve Helen',
                citizen_id: '123456',
                phone: '082335646',
                dob: '1999-03-02',
                address: '43 Megamon st.Cali, US',
                gender: 'Nữ',
                nationality: 'Mỹ',
                customer_category: 1,
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Customer', null, {});
    }
};