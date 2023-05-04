const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const getAllHotelRoomUse = async () => {
    let result = await db.HotelRoomUse.findAll({
        raw: true,
        nest: true,
        include: [
            {
                model: db.HotelRoom, attributes: ['id', 'name'],
                raw: true,
                nest: true,
                include: {
                    model: db.HotelRoomCategory, attributes: ['name']
                }
            },
            {
                model: db.Customer, attributes: ['id', 'name', 'phone']
            },
        ],
        attributes: ['id', 'night_stay', 'receive_date', 'checkOut_date', 'status'],
        order: [
            ['id', 'ASC']
        ]
    });

    let _result = result.map(item => {
        let _item = _.cloneDeep(item);
        _item.customer = _item.Customer;
        _item.HotelRoom.category = _item.HotelRoom.HotelRoomCategory.name;
        _item.room = _item.HotelRoom;

        delete _item.HotelRoom;
        delete _item.room.HotelRoomCategory;
        delete _item.Customer;

        return _item;
    })
    return _result;
}

module.exports = {
    getAllHotelRoomUse
}