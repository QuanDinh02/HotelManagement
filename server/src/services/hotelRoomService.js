const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const getAllHotelRooms = async () => {
    let result = await db.HotelRoom.findAll({
        raw: true,
        nest: true,
        include: {
            model: db.HotelRoomCategory, attributes: ['id', 'name', 'description', 'price', 'people_maximum']
        },
        attributes: ['id', 'name', 'status'],
        order: [
            ['name', 'ASC']
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

const createNewRoom = async (data) => {
    let { name, room_category } = data;

    let existedRoomName = await db.HotelRoom.findOne({
        where: {
            name: {
                [Op.like]: `${name}`
            }
        },
        raw: true
    })

    if (existedRoomName) {
        return {
            errorCode: -1,
            message: 'Room name is existed !'
        }
    } else {

        let res = await db.HotelRoom.create({
            name: name,
            status: 'Trống',
            room_category: room_category
        });

        if (res) {
            return {
                errorCode: 0,
                message: 'Create room successfully !'
            }
        }
        else {
            return {
                errorCode: -2,
                message: 'Create room failed !'
            }
        }

    }
}

const updateRoom = async (data) => {
    let existedRoom = await db.HotelRoom.findOne({
        where: {
            id: +data.id
        },
        raw: true
    })

    if (existedRoom) {
        let { id: room_id } = data;
        delete data.id;

        await db.HotelRoom.update(data, {
            where: {
                id: +room_id
            }
        });
        return {
            errorCode: 0,
            message: 'Update room successfully !'
        }
    } else {
        return {
            errorCode: -1,
            message: 'Room is not existed !'
        }
    }
}

const deleteRoom = async (room_id) => {
    let existedRoom = await db.HotelRoom.findOne({
        where: {
            id: +room_id
        },
        raw: true
    })

    if (existedRoom) {
        await db.HotelRoom.destroy({
            where: {
                id: +room_id
            }
        });
        return {
            errorCode: 0,
            message: 'Delete room successfully !'
        }
    } else {
        return {
            errorCode: -1,
            message: 'Room is not existed !'
        }
    }
}

module.exports = {
    getAllHotelRooms, getAllHotelRoomCategories, createNewRoom,
    updateRoom, deleteRoom
}