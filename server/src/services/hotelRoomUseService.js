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
            ['id', 'DESC']
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

const getHotelRoomUseById = async (room_use_id) => {

    let result = await db.HotelRoomUse.findOne({
        raw: true,
        nest: true,
        include: [
            {
                model: db.HotelRoom, attributes: ['id', 'name'],
                raw: true,
                nest: true,
                include: {
                    model: db.HotelRoomCategory, attributes: ['id', 'name']
                }
            },
            {
                model: db.Customer,
                raw: true,
                nest: true,
                include: {
                    model: db.CustomerCategory, attributes: ['name']
                }
            },
        ],
        attributes: ['id', 'night_stay', 'receive_date', 'checkOut_date', 'status'],
        where: {
            id: +room_use_id
        }
    });

    result.HotelRoom.category = result.HotelRoom.HotelRoomCategory;
    result.room = result.HotelRoom;
    result.customer = result.Customer;
    result.customer.customer_category = result.customer.CustomerCategory.name;

    delete result.HotelRoom;
    delete result.Customer;
    delete result.customer.CustomerCategory;
    delete result.room.HotelRoomCategory;

    return result;
}

const updateHotelRoomUse = async (data) => {
    let existedRoomUse = await db.HotelRoomUse.findOne({
        where: {
            id: +data.id
        },
        raw: true
    })

    if (existedRoomUse) {
        let { id: room_use_id } = data;
        delete data.id;

        await db.HotelRoomUse.update(data, {
            where: {
                id: +room_use_id
            }
        });
        return {
            errorCode: 0,
            message: 'Update book room successfully !'
        }
    } else {
        return {
            errorCode: -1,
            message: 'Book room is not existed !'
        }
    }
}

const deleteHotelRoomUse = async (room_use_id) => {
    let existedRoomUse = await db.HotelRoomUse.findOne({
        where: {
            id: +room_use_id
        },
        raw: true
    })

    if (existedRoomUse) {
        await db.HotelRoomUse.update({ status: 'Hủy đặt phòng' }, {
            where: {
                id: +room_use_id
            }
        });
        return {
            errorCode: 0,
            message: 'Delete book room successfully !'
        }
    } else {
        return {
            errorCode: -1,
            message: 'Book room is not existed !'
        }
    }
}

module.exports = {
    getAllHotelRoomUse, getHotelRoomsByRoomsCategory,
    createNewRoomUse, getHotelRoomUseById,
    updateHotelRoomUse, deleteHotelRoomUse
}