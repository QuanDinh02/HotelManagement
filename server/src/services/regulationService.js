const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const createNewRegulation = async (data) => {
    try {
        let { name: newRegulationName } = data;

        let lastItem =  await db.Surcharge.findOne({
            order: [ [ 'id', 'DESC' ]],
            raw: true
        })

        let existedRegulationName = await db.Surcharge.findOne({
            where: {
                name: {
                    [Op.like]: `${newRegulationName}`
                }
            },
            raw: true
        })

        if (existedRegulationName) {
            return {
                errorCode: -1,
                message: 'Regulation name is existed !'
            }
        } else {
            await db.Surcharge.create({
                id: lastItem.id + 1,
                ...data
            });

            return {
                errorCode: 0,
                message: 'Create regulation successfully !'
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

const updateRegulation = async (data) => {
    try {
        let existedSurcharge = await db.Surcharge.findOne({
            where: {
                id: +data.id
            },
            raw: true
        })

        if (existedSurcharge) {
            let { id: surcharge_id } = data;
            delete data.id;

            await db.Surcharge.update(data, {
                where: {
                    id: +surcharge_id
                }
            });
            return {
                errorCode: 0,
                message: 'Update regulation successfully !'
            }
        } else {
            return {
                errorCode: -1,
                message: 'Regulation is not existed !'
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

const deleteRegulation = async (surcharge_id) => {
    try {
        let existedSurcharge = await db.Surcharge.findOne({
            where: {
                id: +surcharge_id
            },
            raw: true
        })

        let checkSurchargeUsing = await db.Surcharge_RoomUse.findAll({
            where: {
                surcharge_id: +surcharge_id
            },
            raw: true
        })

        if (existedSurcharge && checkSurchargeUsing.length === 0) {
            await db.Surcharge.destroy({
                where: {
                    id: +surcharge_id
                }
            });
            return {
                errorCode: 0,
                message: 'Delete surcharge successfully !'
            }
        } else {
            if (checkSurchargeUsing.length !== 0) {
                return {
                    errorCode: -1,
                    message: "Surcharge is using, it can't be deleted !"
                }
            } else {
                return {
                    errorCode: -1,
                    message: 'Surcharge is not existed !'
                }
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

const getSearchedRegulation = async (value) => {
    try {
        if (value) {
            let result = await db.Surcharge.findAll({
                raw: true,
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.substring]: `${value}`
                            }
                        },
                        {
                            description: {
                                [Op.substring]: `${value}`
                            }
                        }
                    ]
                },
                order: [
                    ['id', 'DESC']
                ],
            });

            return result;
        } else {
            let result = await db.Surcharge.findAll({
                raw: true,
                order: [
                    ['id', 'DESC']
                ]
            });
            return result;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createNewRegulation, updateRegulation, deleteRegulation,
    getSearchedRegulation
}

