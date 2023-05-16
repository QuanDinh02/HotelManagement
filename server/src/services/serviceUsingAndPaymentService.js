const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const getAllHotelRoomUsePayment = async () => {

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
                [Op.like]: 'Đã nhận phòng'
            }
        }
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

const getInvoiceByHotelRoomUse = async (room_use_id) => {

    let invoice_info = await db.Invoice.findOne({
        where: {
            room_use_id: +room_use_id
        },
        raw: true,
        attributes: ['id', 'total'],
    })

    if (invoice_info) {
        let invoice = await db.HotelRoomUse.findOne({
            where: {
                id: +room_use_id
            },
            nest: true,
            include: [
                {
                    model: db.Surcharge,
                    attributes: ['id', 'name', 'description', 'price'],
                    through: { attributes: [] }
                },
                {
                    model: db.HotelRoom, attributes: ['name'],
                    raw: true,
                    nest: true,
                    include: {
                        model: db.HotelRoomCategory, attributes: ['price']
                    }
                },
            ]
        })

        let service_invoice = await db.Service_RoomUse.findAll({
            raw: true,
            nest: true,
            order: [
                ['id', 'DESC']
            ],
            include: {
                model: db.HotelService,
                attributes: ['name', 'price']
            },
            attributes: ['id', 'quantity', 'total'],
            where: {
                room_use_id: +room_use_id
            }
        });

        let _result = invoice.get({ plain: true });

        let _service_invoice = service_invoice.map(item => {
            let _item = _.cloneDeep(item);
            _item.name = _item.HotelService.name;
            _item.price = _item.HotelService.price;
            delete _item.HotelService;

            return _item;
        });

        let surchargeTotal = 0;

        _result.Surcharges.forEach(element => {
            surchargeTotal += element.price;
        });

        _result.Services = _service_invoice;
        _result.HotelRoom.price = _result.HotelRoom.HotelRoomCategory.price;
        _result.invoice_total = invoice_info?.total;
        _result.id = invoice_info.id;
        _result.room_use_id = +room_use_id;
        _result.surcharge_total = surchargeTotal;

        delete _result.HotelRoom.HotelRoomCategory;
        delete _result.status;
        delete _result.customer_id;
        delete _result.room_id;

        return _result;
    } else {
        return null;
    }
}

const createRoomUseInvoice = async (data) => {
    let res = await db.Invoice.create(data);

    if (res) {
        return {
            errorCode: 0,
            message: 'Create room use invoice successfully !'
        }
    }
    else {
        return {
            errorCode: -2,
            message: 'Create room use invoice failed !'
        }
    }
}

module.exports = {
    getAllHotelRoomUsePayment, getInvoiceByHotelRoomUse,
    createRoomUseInvoice
}