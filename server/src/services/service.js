const db = require('../models/index.js');

const getAllCustomers = async () => {
    let result = await db.Customer.findAll({
        raw: true,
        order: [
            ['id', 'ASC']
        ]
    });
    return result;
}

const getAllCustomerCategory = async () => {
    let result = await db.CustomerCategory.findAll({
        raw: true,
        order: [
            ['id', 'ASC']
        ]
    });
    return result;
}

module.exports = {
    getAllCustomers, getAllCustomerCategory
}