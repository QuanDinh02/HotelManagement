const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const getAllHotelServices = async () => {
    let result = await db.HotelService.findAll({
        raw: true,
        nest: true,
        include: {
            model: db.HotelServiceCategory, attributes: ['id', 'name']
        },
        order: [
            ['id', 'ASC']
        ]
    });

    let _result = result.map(item => {
        let category = item.HotelServiceCategory;
        delete item.HotelServiceCategory;

        return {
            ...item, hotel_service_category: category
        }
    });

    return _result;
}

const getAllHotelServiceCategories = async () => {
    let result = await db.HotelServiceCategory.findAll({
        raw: true,
        order: [
            ['id', 'ASC']
        ]
    });
    return result;
}

const createNewService = async (data) => {
    let { name: newServiceName } = data;

    let existedServiceName = await db.HotelService.findOne({
        where: {
            name: {
                [Op.like]: `${newServiceName}`
            }
        },
        raw: true
    })

    if (existedServiceName) {
        return {
            errorCode: -1,
            message: 'Service name is existed !'
        }
    } else {

        let res = await db.HotelService.create(data);

        if (res) {
            //let result = res.get({ plain: true });
            return {
                errorCode: 0,
                message: 'Create service successfully !'
            }
        }
        else {
            return {
                errorCode: -2,
                message: 'Create service failed !'
            }
        }

    }
}

const updateService = async (data) => {
    let existedService = await db.HotelService.findOne({
        where: {
            id: +data.id
        },
        raw: true
    })

    if (existedService) {
        let { id: service_id } = data;
        delete data.id;

        await db.HotelService.update(data, {
            where: {
                id: +service_id
            }
        });
        return {
            errorCode: 0,
            message: 'Update service successfully !'
        }
    } else {
        return {
            errorCode: -1,
            message: 'Service is not existed !'
        }
    }
}

const deleteService = async (service_id) => {
    let existedService = await db.HotelService.findOne({
        where: {
            id: +service_id
        },
        raw: true
    })

    if (existedService) {
        await db.HotelService.destroy({
            where: {
                id: +service_id
            }
        });
        return {
            errorCode: 0,
            message: 'Delete service successfully !'
        }
    } else {
        return {
            errorCode: -1,
            message: 'Service is not existed !'
        }
    }
}

const getSearchedServiceByName = async (service_name) => {
    if (service_name) {
        let result = await db.HotelService.findAll({
            raw: true,
            nest: true,
            include: {
                model: db.HotelServiceCategory, attributes: ['id', 'name'],
            },
            order: [
                ['id', 'ASC']
            ],
            where: {
                name: {
                    [Op.substring]: `${service_name}`
                }
            }
        });

        if (result) {
            let _result = result.map(item => {
                let category = item.HotelServiceCategory;
                delete item.HotelServiceCategory;

                return {
                    ...item, hotel_service_category: category
                }
            });

            return _result;
        }
        return result;

    }

    let result = await db.HotelService.findAll({
        raw: true,
        nest: true,
        include: {
            model: db.HotelServiceCategory, attributes: ['id', 'name']
        },
        order: [
            ['id', 'ASC']
        ]
    });

    let _result = result.map(item => {
        let category = item.HotelServiceCategory;
        delete item.HotelServiceCategory;

        return {
            ...item, hotel_service_category: category
        }
    });

    return _result;
}

const getSearchedServiceByCategory = async (service_category_name) => {
    if (service_category_name) {
        let result = await db.HotelService.findAll({
            raw: true,
            nest: true,
            include: {
                model: db.HotelServiceCategory, attributes: ['id', 'name'],
                where: {
                    name: {
                        [Op.substring]: `${service_category_name}`
                    }
                }
            },
            order: [
                ['id', 'ASC']
            ]
        });

        if (result) {
            let _result = result.map(item => {
                let category = item.HotelServiceCategory;
                delete item.HotelServiceCategory;

                return {
                    ...item, hotel_service_category: category
                }
            });

            return _result;
        }
        return result;
    }

    let result = await db.HotelService.findAll({
        raw: true,
        nest: true,
        include: {
            model: db.HotelServiceCategory, attributes: ['id', 'name']
        },
        order: [
            ['id', 'ASC']
        ]
    });

    let _result = result.map(item => {
        let category = item.HotelServiceCategory;
        delete item.HotelServiceCategory;

        return {
            ...item, hotel_service_category: category
        }
    });

    return _result;
}

const createNewServiceCategory = async (newServiceCategoryName) => {
    let existedServiceCategoryName = await db.HotelServiceCategory.findOne({
        where: {
            name: {
                [Op.like]: `${newServiceCategoryName}`
            }
        },
        raw: true
    })

    if (existedServiceCategoryName) {
        return {
            errorCode: -1,
            message: 'Service category name is existed !'
        }
    } else {

        let res = await db.HotelServiceCategory.create({
            name: newServiceCategoryName
        });

        if (res) {
            return {
                errorCode: 0,
                message: 'Create service category successfully !'
            }
        }
        else {
            return {
                errorCode: -2,
                message: 'Create service category failed !'
            }
        }

    }
}

const updateServiceCategory = async (data) => {

    let existedCategoryName = await db.HotelServiceCategory.findOne({
        where: {
            name: {
                [Op.like]: `${data.name}`
            }
        },
        raw: true
    })

    if (existedCategoryName) {
        return {
            errorCode: -1,
            message: 'Service category name is existed !'
        }
    } else {
        let existedCategory = await db.HotelServiceCategory.findOne({
            where: {
                id: +data.id
            },
            raw: true
        });

        if (existedCategory) {
            let { id: category_id } = data;
            delete data.id;

            await db.HotelServiceCategory.update(data, {
                where: {
                    id: +category_id
                }
            });
            return {
                errorCode: 0,
                message: 'Update service category successfully !'
            }
        } else {
            return {
                errorCode: -1,
                message: 'Service category is not existed!'
            }
        }
    }


}

const deleteServiceCategory = async (category_id) => {
    let existedServiceCategory = await db.HotelServiceCategory.findOne({
        where: {
            id: +category_id
        },
        raw: true
    })

    if (existedServiceCategory) {
        let result = await db.HotelService.destroy({
            where: {
                hotel_service_category: +category_id
            }
        })
        if (result) {
            await db.HotelServiceCategory.destroy({
                where: {
                    id: +category_id
                }
            });
            return {
                errorCode: 0,
                message: 'Delete service category successfully !'
            }
        } else {
            return {
                errorCode: -1,
                message: 'Delete service category failed !'
            }
        }

    } else {
        return {
            errorCode: -1,
            message: 'Service category is not existed !'
        }
    }
}

module.exports = {
    getAllHotelServices, getAllHotelServiceCategories, createNewService,
    updateService, deleteService,

    getSearchedServiceByName, getSearchedServiceByCategory, createNewServiceCategory,
    updateServiceCategory, deleteServiceCategory
}