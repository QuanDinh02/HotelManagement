const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const checkMonthYear = (date, month, year) => {
    let arr = date.split('/');
    if (arr.length === 3) {
        if (month !== 0 && year !== 0) {
            return +arr[1] === month && +arr[2] === year;
        }
        else if (year !== 0) {
            return +arr[2] === year;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const getRevenueReport = async (month, year) => {

    let rows = await db.Invoice.findAll({
        raw: true,
        nest: true,
        include: {
            model: db.HotelRoomUse, attributes: ['id', 'receive_date', 'checkOut_date'],
            raw: true,
            nest: true,
            include: {
                model: db.HotelRoom, attributes: ['id', 'name'],
                raw: true,
                nest: true,
                include: {
                    model: db.HotelRoomCategory, attributes: ['id', 'name']
                }
            }
        },

        attributes: ['id', 'date', 'total'],
        order: [
            ['id', 'DESC']
        ]
    });

    const roomCategories = await db.HotelRoomCategory.findAll({
        raw: true,
        attributes: ['id', 'name']
    })

    let result = rows.filter(item => checkMonthYear(item.date, month, year));

    if (result && result.length > 0) {
        let _result = result.map(item => {
            let _item = _.cloneDeep(item);
            _item.room_category = _item.HotelRoomUse.HotelRoom.HotelRoomCategory.id;
            delete _item.HotelRoomUse;
            return _item;
        });

        const groupByResult = _(_result)
            .groupBy('room_category')
            .map((room_category, id) => ({
                room_category: +id,
                total: _.sumBy(room_category, 'total')
            }))
            .value();

        let sumOfRevenue = _.sumBy(groupByResult, 'total');

        let revenueTotalByRoomCategory = roomCategories.map(item => {
            let _item = _.cloneDeep(item);
            let temp = groupByResult.filter(e => e.room_category === _item.id)[0];
            _item.revenue_total = temp?.total ? temp.total : 0;
            _item.rate = temp?.total ? Math.round((temp.total * 100) / sumOfRevenue) : 0
            return _item;
        });

        let buildData = {
            room_categories: roomCategories,
            revenue_results: revenueTotalByRoomCategory
        }

        return buildData;
    } else {

        return {
            room_categories: roomCategories,
            revenue_results: []
        }
    }

}

module.exports = {
    getRevenueReport
}