'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StaffAccount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            StaffAccount.belongsTo(models.Staff, { foreignKey: 'staff_id' });
        }
    }
    StaffAccount.init({
        account_name: DataTypes.STRING,
        password: DataTypes.STRING,
        staff_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'StaffAccount',
    });
    return StaffAccount;
};