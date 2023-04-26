'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StaffCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            StaffCategory.hasMany(models.Staff, { foreignKey: 'staff_category' });
            StaffCategory.belongsToMany(models.AccessPermission, { through: 'Staff_AccessPermission', foreignKey: 'staff_id' });
        }
    }
    StaffCategory.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'StaffCategory',
    });
    return StaffCategory;
};