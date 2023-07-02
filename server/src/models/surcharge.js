'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Surcharge extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Surcharge.hasMany(models.Surcharge_RoomUse, { foreignKey: 'surcharge_id' });
        }
    }
    Surcharge.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Surcharge',
    });
    return Surcharge;
};