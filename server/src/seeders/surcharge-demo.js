'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Surcharge', [
            {
                id: 1,
                name: 'QĐ 1.1',
                description: '',
                price: 10000,
            },
            {
                id: 2,
                name: 'QĐ 1.2',
                description: '',
                price: 20000,
            },
            {
                id: 3,
                name: 'QĐ 1.3',
                description: '',
                price: 15000,
            },
            {
                id: 4,
                name: 'QĐ 1.4',
                description: '',
                price: 15000,
            },
            {
                id: 5,
                name: 'QĐ 1.5',
                description: '',
                price: 20000,
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Surcharge', null, {});
    }
};
