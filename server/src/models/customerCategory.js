'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CustomerCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CustomerCategory.hasMany(models.Customer, { foreignKey: 'customer_category' });
        }
    }
    CustomerCategory.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'CustomerCategory',
    });
    return CustomerCategory;
};