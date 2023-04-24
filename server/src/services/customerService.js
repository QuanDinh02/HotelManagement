const db = require('../models/index.js');
const { Op } = require("sequelize");

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

const getCustomerByNamePhone = async (value) => {
    if (value) {
        let result = await db.Customer.findAll({
            raw: true,
            order: [
                ['id', 'ASC']
            ],

            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: `${value}`
                        }
                    },
                    {
                        phone: {
                            [Op.substring]: `${value}`
                        }
                    }
                ]
            }
        });
        return result;
    }

    let result = await db.Customer.findAll({
        raw: true,
        order: [
            ['id', 'ASC']
        ],
    });
    return result;
}

const updateCustomer = async (data) => {
    let existedCustomer = await db.Customer.findOne({
        where: {
            id: +data.id
        },
        raw: true
    })

    if (existedCustomer) {
        let { id: customer_id } = data;
        delete data.id;

        await db.Customer.update(data, {
            where: {
                id: +customer_id
            }
        });

        return 'Update customer successfully !';
    } else {
        return 'Customer is not existed !';
    }
}
module.exports = {
    getAllCustomers, getAllCustomerCategory, getCustomerByNamePhone, updateCustomer
}