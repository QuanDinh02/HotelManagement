'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AccessPermission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            AccessPermission.belongsToMany(models.StaffCategory, { through: 'Staff_AccessPermission', foreignKey: 'access_id' });
        }
    }
    AccessPermission.init({
        name: DataTypes.STRING,
        link: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'AccessPermission',
    });
    return AccessPermission;
};