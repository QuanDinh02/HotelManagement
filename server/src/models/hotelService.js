'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HotelService extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            HotelService.belongsTo(models.HotelServiceCategory, { foreignKey: 'hotel_service_category' });
        }
    }
    HotelService.init({
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        hotel_service_category: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'HotelService',
    });
    return HotelService;
};