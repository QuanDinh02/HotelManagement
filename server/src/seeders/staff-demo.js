'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Staff', [
            {
                id: 1,
                name: 'Vũ Kiều Trước',
                citizen_id: '123456',
                phone: '012345646',
                dob: '12/12/1955',
                address: '12/4 Lê Văn Lượng, VN',
                gender: 'Nam',
                working_day: '1/1/2007',
                staff_category: 1,
            },
            {
                id: 2,
                name: 'Võ Nguyên Bông',
                citizen_id: '222222',
                phone: '012345888',
                dob: '03/12/1975',
                address: '345 Nguyễn Trọng Tuyển, VN',
                gender: 'Nữ',
                working_day: '23/04/2010',
                staff_category: 2,
            },
            {
                id: 3,
                name: 'Trịnh Phước Bồn',
                citizen_id: '333333',
                phone: '012385230',
                dob: '24/12/1984',
                address: '12/4 Lê Văn Lượng, VN',
                gender: 'Nam',
                working_day: '02/03/2011',
                staff_category: 3,
            },
            {
                id: 4,
                name: 'Tôn Sĩ Mỹ',
                citizen_id: '444444',
                phone: '012225546',
                dob: '13/02/2001',
                address: '332 Lí Chính Thắng, VN',
                gender: 'Nữ',
                working_day: '13/06/2011',
                staff_category: 3,
            },
            {
                id: 5,
                name: 'Triệu Thị Kim Cẩn',
                citizen_id: '123739',
                phone: '082335799',
                dob: '2/03/1999',
                address: '43 Megamon st.Cali, US',
                gender: 'Nữ',
                working_day: '22/12/2011',
                staff_category: 3,
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Staff', null, {});
    }
};