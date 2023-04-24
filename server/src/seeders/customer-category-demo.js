'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('CustomerCategory', [
            {
                id: 1,
                name: 'Khách du lịch',
            },
            {
                id: 2,
                name: 'Khách cũ',
            },
            {
                id: 3,
                name: 'Khách VIP',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('CustomerCategory', null, {});
    }
};
