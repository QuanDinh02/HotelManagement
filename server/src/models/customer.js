'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Customer.belongsTo(models.CustomerCategory, { foreignKey: 'customer_category' });
        }
    }
    Customer.init({
        name: DataTypes.STRING,
        citizenID: DataTypes.STRING,
        phone: DataTypes.STRING,
        dob: DataTypes.STRING,
        address: DataTypes.STRING,
        gender: DataTypes.STRING,
        nationality: DataTypes.STRING,
        customer_category: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Customer',
    });
    return Customer;
};