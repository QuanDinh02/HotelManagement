const db = require('../models/index.js');
const { Op } = require("sequelize");

const getAllStaffs = async () => {
    try {
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
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllStaffCategory = async () => {
    try {
        let result = await db.StaffCategory.findAll({
            raw: true,
            order: [
                ['id', 'ASC']
            ]
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createStaff = async (data) => {
    try {
        let { staffInfo, staffAccount } = data;

        let lastItem = await db.Staff.findOne({
            order: [['id', 'DESC']],
            raw: true
        })

        let lastStaffAccount = await db.StaffAccount.findOne({
            order: [['id', 'DESC']],
            raw: true
        })

        let existedStaff = await db.Staff.findOne({
            where: {
                [Op.or]: [
                    {
                        citizen_id: {
                            [Op.like]: `${staffInfo.citizen_id}`
                        }
                    },
                    {
                        phone: {
                            [Op.like]: `${staffInfo.phone}`
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

            let res = await db.Staff.create({
                id: lastItem.id + 1,
                ...staffInfo
            });
            let item = JSON.parse(JSON.stringify(res.get({ plain: true })));
            let staffId = item.id;

            let buildData = {
                id: lastStaffAccount.id + 1,
                account_name: staffAccount.account_name,
                password: staffAccount.password,
                staff_id: +staffId
            }

            await db.StaffAccount.create(buildData);

            return {
                errorCode: 0,
                message: 'Create staff successfully !'
            }
        }
    } catch (error) {
        console.log(error);
        return {
            errorCode: -2,
            message: 'Error with service !'
        }
    }

}

const updateStaff = async (data) => {
    try {
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
    } catch (error) {
        console.log(error);
        return '';
    }
}

const deleteStaff = async (staff_id) => {
    try {
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
    } catch (error) {
        console.log(error);
        return '';
    }
}

const getSearchedStaff = async (value) => {
    try {
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
    } catch (error) {
        console.log(error);
        return null;
    }
}

const staffLogin = async (data) => {
    let result = await db.StaffAccount.findOne({
        raw: true,
        nest: true,
        include: {
            model: db.Staff, attributes: ['id', 'name'],
            nest: true,
            include: {
                model: db.StaffCategory, attributes: ['name']
            }
        },
        where: {
            [Op.and]: [
                {
                    account_name: {
                        [Op.like]: `${data.account}`
                    }
                },
                {
                    password: {
                        [Op.like]: `${data.password}`
                    }
                }
            ]
        }
    });

    if (result) {
        let buildData = {
            id: result.staff_id,
            name: result.Staff.name,
            category: result.Staff.StaffCategory.name
        }
        console.log(buildData);
        return 'Login successfully';
    } else {
        return 'Login failed !';
    }
}

module.exports = {
    getAllStaffs, getAllStaffCategory, createStaff,
    updateStaff, deleteStaff, getSearchedStaff,
    staffLogin
}