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
                dob: '12/12/1955',
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
                dob: '03/12/1975',
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
                dob: '24/12/1984',
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
                dob: '13/02/2001',
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
                dob: '2/03/1999',
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