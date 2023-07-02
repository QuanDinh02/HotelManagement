const db = require('../models/index.js');
const { Op } = require("sequelize");

const getAllCustomers = async () => {
    try {
        let result = await db.Customer.findAll({
            raw: true,
            order: [
                ['id', 'ASC']
            ]
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllCustomerCategory = async () => {
    try {
        let result = await db.CustomerCategory.findAll({
            raw: true,
            order: [
                ['id', 'ASC']
            ]
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const getCustomerByNamePhone = async (value) => {
    try {
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
    } catch (error) {
        console.log(error);
        return null;
    }

}

const updateCustomer = async (data) => {
    try {
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
    } catch (error) {
        console.log(error);
        return '';
    }
    
}

const deleteCustomer = async (customer_id) => {
    try {
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
    } catch (error) {
        console.log(error);
        return '';
    }
    
}

const getCustomerInfoByPhone = async (phoneNumber) => {
    try {
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
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

const createNewCustomer = async (data) => {
    try {
        let lastItem =  await db.Customer.findOne({
            order: [ [ 'id', 'DESC' ]],
            raw: true
        })

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

            let res = await db.Customer.create({
                id: lastItem.id + 1,
                ...data
            });

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
    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports = {
    getAllCustomers, getAllCustomerCategory, getCustomerByNamePhone, updateCustomer,
    deleteCustomer, getCustomerInfoByPhone, createNewCustomer
}