'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('HotelServiceCategory', [
            {
                id: 1,
                name: 'Ăn uống',
            },
            {
                id: 2,
                name: 'Giải trí',
            },
            {
                id: 3,
                name: 'Tiện ích',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('HotelServiceCategory', null, {});
    }
};
