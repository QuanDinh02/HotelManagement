'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Invoice.hasMany(models.Surcharge_RoomUse, { foreignKey: 'surcharge_id' });
            Invoice.belongsTo(models.HotelRoomUse, { foreignKey: 'room_use_id' });
            Invoice.belongsTo(models.Staff, { foreignKey: 'staff_id' });
        }
    }
    Invoice.init({
        date: DataTypes.STRING,
        staff_id: DataTypes.INTEGER,
        room_use_id: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Invoice',
    });
    return Invoice;
};