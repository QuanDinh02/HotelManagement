'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Staff extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Staff.belongsTo(models.StaffCategory, { foreignKey: 'staff_category' });
            Staff.hasOne(models.StaffAccount, { foreignKey: 'staff_id' });
        }
    }
    Staff.init({
        name: DataTypes.STRING,
        citizen_id: DataTypes.STRING,
        phone: DataTypes.STRING,
        dob: DataTypes.STRING,
        address: DataTypes.STRING,
        gender: DataTypes.STRING,
        working_day: DataTypes.STRING,
        staff_category: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Staff',
    });
    return Staff;
};