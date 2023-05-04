'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HotelRoom extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            HotelRoom.belongsTo(models.HotelRoomCategory, { foreignKey: 'room_category' });
            HotelRoom.hasMany(models.HotelRoomUse, { foreignKey: 'room_id' });
        }
    }
    HotelRoom.init({
        name: DataTypes.STRING,
        status: DataTypes.STRING,
        room_category: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'HotelRoom',
    });
    return HotelRoom;
};