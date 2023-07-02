const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');
const ServicePayment = require('./serviceUsingAndPaymentService.js');

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

const updateHotelRoomUse = async (room_use_id, staff_id) => {
    try {
        let existedRoomUse = await db.HotelRoomUse.findOne({
            where: {
                id: +room_use_id
            },
            raw: true
        })

        if (existedRoomUse) {

            await db.HotelRoomUse.update({ status: 'Đã nhận phòng' }, {
                where: {
                    id: +room_use_id
                }
            });

            const date = new Date();

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            await ServicePayment.createRoomUseInvoice({
                date: `${day}/${month}/${year}`,
                staff_id: +staff_id,
                room_use_id: +room_use_id,
                total: 0
            });

            return {
                errorCode: 0,
                message: 'Receive room successfully !'
            }
        } else {
            return {
                errorCode: -1,
                message: 'Receive room is not existed !'
            }
        }
    } catch (error) {
        console.log(error);
        return {
            errorCode: -2,
            message: 'Receive room is not existed !'
        }
    }
}

module.exports = {
    getAllHotelRoomUse, getHotelRoomUseSearchByCustomer, updateHotelRoomUse
}