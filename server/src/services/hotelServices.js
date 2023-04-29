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

module.exports = {
    getAllHotelServices, getAllHotelServiceCategories
}