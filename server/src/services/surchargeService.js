const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const getAllSurcharge = async () => {

    let result = await db.Surcharge.findAll({
        raw: true
    });

    return result;
}

module.exports = {
    getAllSurcharge
}