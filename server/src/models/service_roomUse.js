'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Service_RoomUse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Service_RoomUse.belongsTo(models.HotelRoomUse, { foreignKey: 'room_use_id' });
            Service_RoomUse.belongsTo(models.HotelService, { foreignKey: 'service_id' });
        }
    }
    Service_RoomUse.init({
        service_id: DataTypes.INTEGER,
        room_use_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        total: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Service_RoomUse',
    });
    return Service_RoomUse;
};