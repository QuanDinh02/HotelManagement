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
                    model: db.HotelRoomCategory, attributes: ['id', 'name']
                }
            },
            {
                model: db.Customer, attributes: ['id', 'name', 'phone', 'citizen_id']
            },
        ],
        attributes: ['id', 'night_stay', 'receive_date', 'checkOut_date', 'status'],
        order: [
            ['id', 'DESC']
        ],
        where: {
            status: {
                [Op.notLike]: 'Hủy đặt phòng'
            }
        }
    });

    let _result = result.map(item => {
        let _item = _.cloneDeep(item);
        _item.customer = _item.Customer;
        _item.HotelRoom.category = _item.HotelRoom.HotelRoomCategory;
        _item.room = _item.HotelRoom;

        delete _item.HotelRoom;
        delete _item.room.HotelRoomCategory;
        delete _item.Customer;

        return _item;
    })
    return _result;
}

const getHotelRoomUseSearchByCustomer = async (value) => {
    if (value) {
        let result = await db.HotelRoomUse.findAll({
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
                    model: db.Customer, attributes: ['id', 'name', 'phone', 'citizen_id'],
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
                },
            ],
            attributes: ['id', 'night_stay', 'receive_date', 'checkOut_date', 'status'],
            order: [
                ['id', 'DESC']
            ],
            where: {
                status: {
                    [Op.notLike]: 'Hủy đặt phòng'
                }
            }
        });

        let _result = result.map(item => {
            let _item = _.cloneDeep(item);
            _item.customer = _item.Customer;
            _item.HotelRoom.category = _item.HotelRoom.HotelRoomCategory;
            _item.room = _item.HotelRoom;

            delete _item.HotelRoom;
            delete _item.room.HotelRoomCategory;
            delete _item.Customer;

            return _item;
        })
        return _result;
    }

    let result = await getAllHotelRoomUse();
    return result;
}

module.exports = {
    getAllHotelRoomUse, getHotelRoomUseSearchByCustomer
}