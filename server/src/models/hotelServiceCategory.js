'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HotelServiceCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            HotelServiceCategory.hasMany(models.HotelService, { foreignKey: 'hotel_service_category' });
        }
    }
    HotelServiceCategory.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'HotelServiceCategory',
    });
    return HotelServiceCategory;
};