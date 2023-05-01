const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const getAllHotelRooms = async () => {
    let result = await db.HotelRoom.findAll({
        raw: true,
        nest: true,
        include: {
            model: db.HotelRoomCategory, attributes: ['id', 'name','description', 'price','people_maximum']
        },
        attributes: ['id','name','status'],
        order: [
            ['id', 'ASC']
        ]
    });

    let _result = result.map(item => {
        let category = item.HotelRoomCategory;
        delete item.HotelRoomCategory;

        return {
            ...item, room_category: category
        }
    });

    return _result;
}

const getAllHotelRoomCategories = async () => {
    let result = await db.HotelRoomCategory.findAll({
        raw: true,
        order: [
            ['id', 'ASC']
        ]
    });
    return result;
}

module.exports = {
    getAllHotelRooms, getAllHotelRoomCategories
}