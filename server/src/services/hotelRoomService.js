const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const getAllHotelRooms = async () => {
    let result = await db.HotelRoom.findAll({
        raw: true,
        nest: true,
        include: {
            model: db.HotelRoomCategory, attributes: ['id', 'name', 'description', 'price', 'people_maximum']
        },
        attributes: ['id', 'name', 'status'],
        order: [
            ['name', 'ASC']
        ]
    });

    let _result = result.map(item => {
        let category = item.HotelRoomCategory;
        delete item.HotelRoomCategory;

        return {
            ...item, room_category: category
        }
    });

    return _result;
}

const getAllHotelRoomCategories = async () => {
    let result = await db.HotelRoomCategory.findAll({
        raw: true,
        order: [
            ['id', 'ASC']
        ]
    });
    return result;
}

const createNewRoom = async (data) => {
    let { name, room_category } = data;

    let existedRoomName = await db.HotelRoom.findOne({
        where: {
            name: {
                [Op.like]: `${name}`
            }
        },
        raw: true
    })

    if (existedRoomName) {
        return {
            errorCode: -1,
            message: 'Room name is existed !'
        }
    } else {

        let res = await db.HotelRoom.create({
            name: name,
            status: 'Trống',
            room_category: room_category
        });

        if (res) {
            return {
                errorCode: 0,
                message: 'Create room successfully !'
            }
        }
        else {
            return {
                errorCode: -2,
                message: 'Create room failed !'
            }
        }

    }
}

const updateRoom = async (data) => {
    let existedRoom = await db.HotelRoom.findOne({
        where: {
            id: +data.id
        },
        raw: true
    })

    if (existedRoom) {
        let { id: room_id } = data;
        delete data.id;

        await db.HotelRoom.update(data, {
            where: {
                id: +room_id
            }
        });
        return {
            errorCode: 0,
            message: 'Update room successfully !'
        }
    } else {
        return {
            errorCode: -1,
            message: 'Room is not existed !'
        }
    }
}

const deleteRoom = async (room_id) => {
    let existedRoom = await db.HotelRoom.findOne({
        where: {
            id: +room_id
        },
        raw: true
    })

    if (existedRoom) {
        await db.HotelRoom.destroy({
            where: {
                id: +room_id
            }
        });
        return {
            errorCode: 0,
            message: 'Delete room successfully !'
        }
    } else {
        return {
            errorCode: -1,
            message: 'Room is not existed !'
        }
    }
}

const createNewRoomCategory = async (data) => {
    let existedRoomCategoryName = await db.HotelRoomCategory.findOne({
        where: {
            name: {
                [Op.like]: `${data.name}`
            }
        },
        raw: true
    })

    if (existedRoomCategoryName) {
        return {
            errorCode: -1,
            message: 'Room category name is existed !'
        }
    } else {

        let res = await db.HotelRoomCategory.create({
            name: data.name,
            price: +data.price,
            people_maximum: +data.people_maximum,
            description: data.description
        });

        if (res) {
            return {
                errorCode: 0,
                message: 'Create room category successfully !'
            }
        }
        else {
            return {
                errorCode: -2,
                message: 'Create room category failed !'
            }
        }

    }
}

const updateRoomCategory = async (data) => {

    let existedCategoryName = await db.HotelRoomCategory.findOne({
        where: {
            [Op.and]: [
                {
                    [Op.not]: +data.id
                },
                {
                    name: {
                        [Op.like]: `${data.name}`
                    }
                }
            ]
        },
        raw: true
    })

    if (existedCategoryName) {
        return {
            errorCode: -1,
            message: 'Room category name is existed !'
        }
    } else {
        let existedCategory = await db.HotelRoomCategory.findOne({
            where: {
                id: +data.id
            },
            raw: true
        });

        if (existedCategory) {
            let { id: category_id } = data;
            delete data.id;

            await db.HotelRoomCategory.update(data, {
                where: {
                    id: +category_id
                }
            });
            return {
                errorCode: 0,
                message: 'Update room category successfully !'
            }
        } else {
            return {
                errorCode: -1,
                message: 'Room category is not existed!'
            }
        }
    }


}

const deleteRoomCategory = async (category_id) => {

    let existedRoomCategory = await db.HotelRoomCategory.findOne({
        where: {
            id: +category_id
        },
        raw: true
    })

    if (existedRoomCategory) {
        await db.HotelRoom.destroy({
            where: {
                room_category: +category_id
            }
        })

        await db.HotelRoomCategory.destroy({
            where: {
                id: +category_id
            }
        });

        return {
            errorCode: 0,
            message: 'Delete room category successfully !'
        }

    } else {
        return {
            errorCode: -1,
            message: 'Service room is not existed !'
        }
    }
}

const getRoomSearchByName = async (value) => {
    if (value) {
        let result = await db.HotelRoom.findAll({
            raw: true,
            nest: true,
            include: {
                model: db.HotelRoomCategory, attributes: ['id', 'name', 'description', 'price', 'people_maximum']
            },
            attributes: ['id', 'name', 'status'],
            order: [
                ['name', 'ASC']
            ],
            where: {
                name: {
                    [Op.substring]: `${value}`
                }
            }
        });

        if (result) {
            let _result = result.map(item => {
                let category = item.HotelRoomCategory;
                delete item.HotelRoomCategory;

                return {
                    ...item, room_category: category
                }
            });

            return _result;
        }
        return result;

    }

    let result = await db.HotelRoom.findAll({
        raw: true,
        nest: true,
        include: {
            model: db.HotelRoomCategory, attributes: ['id', 'name', 'description', 'price', 'people_maximum']
        },
        attributes: ['id', 'name', 'status'],
        order: [
            ['name', 'ASC']
        ]
    });

    let _result = result.map(item => {
        let category = item.HotelRoomCategory;
        delete item.HotelRoomCategory;

        return {
            ...item, room_category: category
        }
    });

    return _result;
}

const getRoomSearchByCategory = async (value) => {
    if (value) {
        let result = await db.HotelRoom.findAll({
            raw: true,
            nest: true,
            include: {
                model: db.HotelRoomCategory, attributes: ['id', 'name', 'description', 'price', 'people_maximum'],
                where: {
                    name: {
                        [Op.substring]: `${value}`
                    }
                }
            },
            attributes: ['id', 'name', 'status'],
            order: [
                ['name', 'ASC']
            ]
        });

        if (result) {
            let _result = result.map(item => {
                let category = item.HotelRoomCategory;
                delete item.HotelRoomCategory;

                return {
                    ...item, room_category: category
                }
            });
            return _result;
        }
        return result;

    }

    let result = await db.HotelRoom.findAll({
        raw: true,
        nest: true,
        include: {
            model: db.HotelRoomCategory, attributes: ['id', 'name', 'description', 'price', 'people_maximum']
        },
        attributes: ['id', 'name', 'status'],
        order: [
            ['name', 'ASC']
        ]
    });

    let _result = result.map(item => {
        let category = item.HotelRoomCategory;
        delete item.HotelRoomCategory;

        return {
            ...item, room_category: category
        }
    });

    return _result;
}

module.exports = {
    getAllHotelRooms, getAllHotelRoomCategories, createNewRoom,
    updateRoom, deleteRoom, createNewRoomCategory, updateRoomCategory,
    deleteRoomCategory, getRoomSearchByName, getRoomSearchByCategory
}