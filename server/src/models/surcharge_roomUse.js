'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Surcharge_RoomUse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Surcharge_RoomUse.belongsTo(models.HotelRoomUse, { foreignKey: 'room_use_id' });
            Surcharge_RoomUse.belongsTo(models.Surcharge, { foreignKey: 'surcharge_id' });
        }
    }
    Surcharge_RoomUse.init({
        surcharge_id: DataTypes.INTEGER,
        room_use_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Surcharge_RoomUse',
    });
    return Surcharge_RoomUse;
};