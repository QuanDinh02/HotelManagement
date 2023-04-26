'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Staff_AccessPermission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    Staff_AccessPermission.init({
        staff_id: DataTypes.INTEGER,
        access_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Staff_AccessPermission',
    });
    return Staff_AccessPermission;
};