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

const deleteCustomer = async (customer_id) => {
    let existedCustomer = await db.Customer.findOne({
        where: {
            id: +customer_id
        },
        raw: true
    })

    if (existedCustomer) {
        await db.Customer.destroy({
            where: {
                id: +customer_id
            }
        });

        return 'Delete customer successfully !';
    } else {
        return 'Customer is not existed !';
    }
}

const getCustomerInfoByPhone = async (phoneNumber) => {
    if (phoneNumber) {
        let result = await db.Customer.findOne({
            raw: true,
            order: [
                ['id', 'ASC']
            ],
            attribute: ['id', 'name', 'phone'],
            where: {
                phone: {
                    [Op.like]: `${phoneNumber}`
                }
            }
        });
        return result;
    } else {
        return null;
    }
}

const createNewCustomer = async (data) => {

    let existedCustomer = await db.Customer.findOne({
        where: {
            phone: {
                [Op.like]: `${data.phone}`
            }
        },
        raw: true
    })

    if (existedCustomer) {
        return {
            id: '',
            name: '',
            phone: ''
        }
    } else {

        let res = await db.Customer.create(data);

        if (res) {
            let result = res.get({ plain: true });

            return {
                id: result.id,
                name: result.name,
                phone: result.phone
            }
        } else {
            return {
                id: '',
                name: '',
                phone: ''
            }
        }
    }
}

module.exports = {
    getAllCustomers, getAllCustomerCategory, getCustomerByNamePhone, updateCustomer,
    deleteCustomer, getCustomerInfoByPhone, createNewCustomer
}