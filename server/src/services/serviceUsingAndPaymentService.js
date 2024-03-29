const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const getAllHotelRoomUsePayment = async () => {
    try {
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
                    model: db.Customer,
                    attributes: ['id', 'name', 'phone', 'citizen_id', 'address', 'nationality'],
                    raw: true,
                    nest: true,
                    include: {
                        model: db.CustomerCategory, attributes: ['id', 'name']
                    }
                },
            ],
            attributes: ['id', 'night_stay', 'receive_date', 'checkOut_date', 'status'],
            order: [
                ['id', 'DESC']
            ],
            where: {
                status: {
                    [Op.or]: ['Đã nhận phòng', 'Đã thanh toán']
                }
            }
        });

        let _result = result.map(item => {
            let _item = _.cloneDeep(item);
            _item.Customer.customer_category = _item.Customer.CustomerCategory;
            delete _item.Customer.CustomerCategory;

            _item.customer = _item.Customer;
            _item.HotelRoom.category = _item.HotelRoom.HotelRoomCategory.name;
            _item.room = _item.HotelRoom;

            delete _item.HotelRoom;
            delete _item.room.HotelRoomCategory;
            delete _item.Customer;

            return _item;
        })

        return _result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getInvoiceByHotelRoomUse = async (room_use_id) => {
    try {
        let invoice_info = await db.Invoice.findOne({
            where: {
                room_use_id: +room_use_id
            },
            raw: true,
            nest: true,
            include: {
                model: db.Staff,
                attributes: ['name'],
            },
            attributes: ['id', 'total', 'date'],
        })

        if (invoice_info) {
            let invoice = await db.HotelRoomUse.findOne({
                where: {
                    id: +room_use_id
                },
                nest: true,
                include: [
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

            let surcharge_invoice = await db.Surcharge_RoomUse.findAll({
                raw: true,
                nest: true,
                order: [
                    ['id', 'DESC']
                ],
                include: {
                    model: db.Surcharge,
                    attributes: ['name', 'price','description']
                },
                attributes: ['id'],
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

            let _surcharge_invoice = surcharge_invoice.map(item => {
                let _item = _.cloneDeep(item);
                _item.name = _item.Surcharge.name;
                _item.price = _item.Surcharge.price;
                _item.description = _item.Surcharge.description;
                delete _item.Surcharge;

                return _item;
            });

            let surchargeTotal = 0;
            let serviceTotal = 0;

            _surcharge_invoice.forEach(element => {
                surchargeTotal += element.price;
            });

            _service_invoice.forEach(element => {
                serviceTotal += element.total;
            });

            _result.Services = _service_invoice;
            _result.Surcharges = _surcharge_invoice;
            _result.HotelRoom.price = _result.HotelRoom.HotelRoomCategory.price;
            _result.invoice_total = invoice_info?.total;
            _result.id = invoice_info.id;
            _result.invoice_date = invoice_info.date;
            _result.staff = invoice_info.Staff.name;
            _result.room_use_id = +room_use_id;
            _result.surcharge_total = surchargeTotal;
            _result.service_price_total = serviceTotal;

            delete _result.HotelRoom.HotelRoomCategory;
            delete _result.status;
            delete _result.customer_id;
            delete _result.room_id;

            return _result;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createRoomUseInvoice = async (data) => {
    try {
        let lastItem = await db.Invoice.findOne({
            order: [['id', 'DESC']],
            raw: true
        })

        let res = await db.Invoice.create({
            id: lastItem.id + 1,
            ...data
        });

        if (res) {
            return {
                errorCode: 0,
                message: 'Create room use invoice successfully !'
            }
        }
        else {
            return {
                errorCode: -1,
                message: 'Create room use invoice failed !'
            }
        }
    } catch (error) {
        return {
            errorCode: -2,
            message: 'Error with service !'
        }
    }

}

const updatePayment = async (room_use_id, total_payment) => {
    try {
        let existedRoomUse = await db.HotelRoomUse.findOne({
            where: {
                id: +room_use_id
            },
            raw: true
        })

        if (existedRoomUse) {

            await db.HotelRoomUse.update({ status: 'Đã thanh toán' }, {
                where: {
                    id: +room_use_id
                }
            });

            await db.Invoice.update({ total: +total_payment }, {
                where: {
                    room_use_id: +room_use_id
                }
            })

            return {
                errorCode: 0,
                message: 'Room payment successfully !'
            }
        } else {
            return {
                errorCode: -1,
                message: 'Room use is not existed !'
            }
        }
    } catch (error) {
        return {
            errorCode: -2,
            message: 'Error with service !'
        }
    }

}

const addRoomService = async (data) => {
    try {
        let lastItem = await db.Service_RoomUse.findOne({
            order: [['id', 'DESC']],
            raw: true
        })

        let res = await db.Service_RoomUse.create({
            id: lastItem.id + 1,
            service_id: +data.service_id,
            room_use_id: +data.room_use_id,
            quantity: +data.quantity,
            total: +data.total
        });

        return {
            errorCode: 0,
            message: 'Add room service successfully !'
        }
    } catch (error) {
        console.log(error);
        return {
            errorCode: -2,
            message: 'Add room service failed !'
        }
    }
}

const addRoomSurcharge = async (data) => {
    try {
        let arr = await db.Surcharge_RoomUse.findAll({
            order: [['id', 'DESC']],
            raw: true
        })

        // console.log(arr);

        let lastItem = await db.Surcharge_RoomUse.findOne({
            order: [['id', 'DESC']],
            raw: true
        })

        let res = await db.Surcharge_RoomUse.create({
            id: lastItem.id + 1,
            surcharge_id: +data.surcharge_id,
            room_use_id: +data.room_use_id
        });

        return {
            errorCode: 0,
            message: 'Add room surcharge successfully !'
        }
    } catch (error) {
        console.log(error);
        return {
            errorCode: -2,
            message: 'Error with service!'
        }
    }
}

module.exports = {
    getAllHotelRoomUsePayment, getInvoiceByHotelRoomUse,
    createRoomUseInvoice, updatePayment, addRoomService,
    addRoomSurcharge
}