const db = require('../models/index.js');
const { Op } = require("sequelize");

const getAllStaffs = async () => {
    let result = await db.Staff.findAll({
        raw: true,
        nest: true,
        include: {
            model: db.StaffAccount, attributes: ['account_name']
        },
        order: [
            ['id', 'ASC']
        ]
    });

    let buildData = result.map(item => {
        let accountName = item.StaffAccount.account_name;
        delete item.StaffAccount;
        return {
            ...item, staff_account_name: accountName
        }
    });

    return buildData;
}

const getAllStaffCategory = async () => {
    let result = await db.StaffCategory.findAll({
        raw: true,
        order: [
            ['id', 'ASC']
        ]
    });
    return result;
}

const createStaff = async (data) => {
    let { staffInfo, staffAccount } = data;

    let existedStaff = await db.Staff.findOne({
        where: {
            [Op.or]: [
                {
                    citizen_id: {
                        [Op.substring]: `${staffInfo.citizen_id}`
                    }
                },
                {
                    phone: {
                        [Op.substring]: `${staffInfo.phone}`
                    }
                }
            ]
        },
        raw: true
    })

    if (existedStaff) {
        return {
            errorCode: -1,
            message: 'Staff is existed !'
        }
    } else {

        let res = await db.Staff.create(staffInfo);

        if (res) {
            let result = res.get({ plain: true });

            let buildData = {
                account_name: staffAccount.account_name,
                password: staffAccount.password,
                staff_id: +result.id
            }

            let account_res = await db.StaffAccount.create(buildData);

            if (account_res) {
                return {
                    errorCode: 0,
                    message: 'Create staff successfully !'
                }
            } else {
                return {
                    errorCode: -2,
                    message: 'Something is wrong !'
                }
            }
        }
    }
}

const updateStaff = async (data) => {
    let existedStaff = await db.Staff.findOne({
        where: {
            id: +data.id
        },
        raw: true
    })

    if (existedStaff) {
        let { id: staff_id } = data;
        delete data.id;

        await db.Staff.update(data, {
            where: {
                id: +staff_id
            }
        });

        return 'Update staff successfully !';
    } else {
        return 'Staff is not existed !';
    }
}

const deleteStaff = async (staff_id) => {
    let existedStaff = await db.Staff.findOne({
        where: {
            id: +staff_id
        },
        raw: true
    })

    if (existedStaff) {
        await db.Staff.destroy({
            where: {
                id: +staff_id
            }
        });

        await db.StaffAccount.destroy({
            where: {
                staff_id: +staff_id
            }
        });

        return 'Delete staff successfully !';
    } else {
        return 'Staff is not existed !';
    }
}

const getSearchedStaff = async (value) => {
    if (value) {
        let result = await db.Staff.findAll({
            raw: true,
            nest: true,
            include: {
                model: db.StaffAccount, attributes: ['account_name']
            },
            order: [
                ['id', 'ASC']
            ],
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: `${value}`
                        }
                    },
                    {
                        citizen_id: {
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
        });

        if (result) {
            let _result = result.map(item => {
                let accountName = item.StaffAccount.account_name;
                delete item.StaffAccount;
                return {
                    ...item, staff_account_name: accountName
                }
            });

            return _result;
        }
        return result;

    }

    let result = await db.Staff.findAll({
        raw: true,
        nest: true,
        include: {
            model: db.StaffAccount, attributes: ['account_name']
        },
        order: [
            ['id', 'ASC']
        ]
    });

    let _result = result.map(item => {
        let accountName = item.StaffAccount.account_name;
        delete item.StaffAccount;
        return {
            ...item, staff_account_name: accountName
        }
    });

    return _result;
}

module.exports = {
    getAllStaffs, getAllStaffCategory, createStaff,
    updateStaff, deleteStaff, getSearchedStaff
}