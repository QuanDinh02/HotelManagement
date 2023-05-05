const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const createNewRoomUse = async (data) => {
    let res = await db.HotelRoomUse.create(data);

    if (res) { 
        return {
            errorCode: 0,
            message: 'Book room successfully !'
        }
    }
    else {
        return {
            errorCode: -2,
            message: 'Book room failed !'
        }
    }
}

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

const getHotelRoomsByRoomsCategory = async () => {
    let hotelRoomCategories = await db.HotelRoomCategory.findAll({
        raw: true,
        attributes: ['id', 'name', 'price', 'people_maximum'],
        order: [
            ['id', 'ASC']
        ]
    });

    let roomsByRoomCategory = await Promise.all(hotelRoomCategories.map(async (item) => {
        let rooms = await db.HotelRoom.findAll({
            raw: true,
            where: {
                room_category: +item.id
            },
            attributes: ['id', 'name']
        });
        item.rooms = rooms;
        return item;
    }));

    return roomsByRoomCategory;
}

module.exports = {
    getAllHotelRoomUse, getHotelRoomsByRoomsCategory, createNewRoomUse
}