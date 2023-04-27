const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const getAllAccessPermissions = async () => {
    let result = await db.AccessPermission.findAll({
        raw: true,
        order: [
            ['id', 'ASC']
        ]
    });

    return result;
}

const getStaffAccessPermissions = async (staff_category_id) => {

    let result = await db.StaffCategory.findOne({
        where: {
            id: +staff_category_id
        },
        nest: true,
        include: [{
            model: db.AccessPermission,
            attributes: ['id'],
            through: { attributes: [] }
        }]
    })

    let _result = result.get({ plain: true });
    _result.AccessPermissions = _result.AccessPermissions.map(item => +item.id);
    return _result;
}

module.exports = {
    getAllAccessPermissions, getStaffAccessPermissions
}