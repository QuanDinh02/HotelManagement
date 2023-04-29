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
                [Op.substring]: `${newServiceName}`
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
            errorCode: 0,
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
            errorCode: 0,
            message: 'Service is not existed !'
        }
    }
}

module.exports = {
    getAllHotelServices, getAllHotelServiceCategories, createNewService,
    updateService, deleteService
}