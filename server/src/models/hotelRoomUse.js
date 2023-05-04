'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HotelRoomUse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            HotelRoomUse.belongsTo(models.HotelRoom, { foreignKey: 'room_id' });
            HotelRoomUse.belongsTo(models.Customer, { foreignKey: 'customer_id' });
        }
    }
    HotelRoomUse.init({
        room_id: DataTypes.INTEGER,
        customer_id: DataTypes.INTEGER,
        night_stay: DataTypes.INTEGER,
        receive_date: DataTypes.STRING,
        checkOut_date: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'HotelRoomUse',
    });
    return HotelRoomUse;
};