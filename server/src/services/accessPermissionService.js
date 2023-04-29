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

const addAccessPermissions = async (data) => {
    let { id, access_permissions } = data;

    let existedStaffCategory = await db.StaffCategory.findOne({
        where: {
            id: +id
        },
        raw: true
    })

    if (!existedStaffCategory) {
        return {
            errorCode: -1,
            message: 'Staff is not existed !'
        }
    } else {

        let buildInput = access_permissions.map(item => {
            return {
                staff_id: +id,
                access_id: +item
            }
        })

        let res = await db.Staff_AccessPermission.bulkCreate(buildInput);

        if (res) {
            return {
                errorCode: 0,
                message: 'Add access permissions successfully !'
            }
        }
    }
}

const deleteAccessPermissions = async (data) => {
    let { id, access_permissions } = data;

    if (access_permissions && access_permissions.length > 0) {
        await db.Staff_AccessPermission.destroy({
            where: {
                [Op.and]: [
                    {
                        staff_id: +id
                    },
                    {
                        access_id: {
                            [Op.in]: access_permissions
                        }
                    }
                ]
            }
        });
        return {
            errorCode: 0,
            message: 'Delete access permissions successfully !'
        }

    } else {
        return {
            errorCode: 0,
            message: 'No access permissions were deleted !'
        }
    }
}

module.exports = {
    getAllAccessPermissions, getStaffAccessPermissions,
    addAccessPermissions, deleteAccessPermissions
}