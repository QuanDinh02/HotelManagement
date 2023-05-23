const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');
const ServicePayment = require('./serviceUsingAndPaymentService.js');

const createNewRoomUse = async (data) => {

    let res = await db.HotelRoomUse.create({
        room_id: data.room_id,
        customer_id: data.customer_id,
        night_stay: data.night_stay,
        receive_date: data.receive_date,
        checkOut_date: data.checkOut_date,
        status: data.status
    });

    if (res) {

        let createResult = res.toJSON();

        let result = _.cloneDeep(createResult);

        if (result.status === 'Đã nhận phòng') {
            const date = new Date();

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            await ServicePayment.createRoomUseInvoice({
                date: `${day}/${month}/${year}`,
                staff_id: 4,
                room_use_id: +result.id,
                total: 0
            });

            return {
                errorCode: 0,
                message: 'Book room successfully !'
            }
        }

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
                        model: db.HotelRoomCategory, attributes: ['name']
                    }
                },
                {
                    model: db.Customer, attributes: ['id', 'name', 'phone'],
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

    let result = await getAllHotelRoomUse();
    return result;
}

module.exports = {
    getAllHotelRoomUse, getHotelRoomsByRoomsCategory,
    createNewRoomUse, getHotelRoomUseById,
    updateHotelRoomUse, deleteHotelRoomUse,
    getHotelRoomUseSearchByCustomer
}