const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require('lodash');

const getAllHotelServices = async () => {
    try {
        let result = await db.HotelService.findAll({
            raw: true,
            nest: true,
            include: {
                model: db.HotelServiceCategory, attributes: ['id', 'name']
            },
            order: [
                ['id', 'ASC']
            ]
        });

        let _result = result.map(item => {
            let category = item.HotelServiceCategory;
            delete item.HotelServiceCategory;

            return {
                ...item, hotel_service_category: category
            }
        });

        return _result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllHotelServiceCategories = async () => {
    try {
        let result = await db.HotelServiceCategory.findAll({
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

const createNewService = async (data) => {
    try {
        let { name: newServiceName } = data;

        let lastItem = await db.HotelService.findOne({
            order: [['id', 'DESC']],
            raw: true
        })

        let existedServiceName = await db.HotelService.findOne({
            where: {
                name: {
                    [Op.like]: `${newServiceName}`
                }
            },
            raw: true
        })

        if (existedServiceName) {
            return {
                errorCode: -1,
                message: 'Service name is existed !'
            }
        } else {

            let res = await db.HotelService.create({
                id: lastItem.id + 1,
                ...data
            });

            if (res) {
                return {
                    errorCode: 0,
                    message: 'Create service successfully !'
                }
            }
            else {
                return {
                    errorCode: -2,
                    message: 'Create service failed !'
                }
            }

        }
    } catch (error) {
        return {
            errorCode: -2,
            message: 'Error with service !'
        }
    }

}

const updateService = async (data) => {
    try {
        let existedService = await db.HotelService.findOne({
            where: {
                id: +data.id
            },
            raw: true
        })

        if (existedService) {
            let { id: service_id } = data;
            delete data.id;

            await db.HotelService.update(data, {
                where: {
                    id: +service_id
                }
            });
            return {
                errorCode: 0,
                message: 'Update service successfully !'
            }
        } else {
            return {
                errorCode: -1,
                message: 'Service is not existed !'
            }
        }
    } catch (error) {
        return {
            errorCode: -2,
            message: 'Error with service !'
        }
    }
}

const deleteService = async (service_id) => {
    try {
        let existedService = await db.HotelService.findOne({
            where: {
                id: +service_id
            },
            raw: true
        })

        if (existedService) {
            await db.HotelService.destroy({
                where: {
                    id: +service_id
                }
            });
            return {
                errorCode: 0,
                message: 'Delete service successfully !'
            }
        } else {
            return {
                errorCode: -1,
                message: 'Service is not existed !'
            }
        }
    } catch (error) {
        return {
            errorCode: -2,
            message: 'Error with service !'
        }
    }
}

const getSearchedServiceByName = async (service_name) => {
    try {
        if (service_name) {
            let result = await db.HotelService.findAll({
                raw: true,
                nest: true,
                include: {
                    model: db.HotelServiceCategory, attributes: ['id', 'name'],
                },
                order: [
                    ['id', 'ASC']
                ],
                where: {
                    name: {
                        [Op.substring]: `${service_name}`
                    }
                }
            });

            if (result) {
                let _result = result.map(item => {
                    let category = item.HotelServiceCategory;
                    delete item.HotelServiceCategory;

                    return {
                        ...item, hotel_service_category: category
                    }
                });

                return _result;
            }
            return result;

        }

        let result = await db.HotelService.findAll({
            raw: true,
            nest: true,
            include: {
                model: db.HotelServiceCategory, attributes: ['id', 'name']
            },
            order: [
                ['id', 'ASC']
            ]
        });

        let _result = result.map(item => {
            let category = item.HotelServiceCategory;
            delete item.HotelServiceCategory;

            return {
                ...item, hotel_service_category: category
            }
        });

        return _result;
    } catch (error) {
        return {
            errorCode: -2,
            message: 'Error with service !'
        }
    }

}

const getSearchedServiceByCategory = async (service_category_name) => {
    try {
        if (service_category_name) {
            let result = await db.HotelService.findAll({
                raw: true,
                nest: true,
                include: {
                    model: db.HotelServiceCategory, attributes: ['id', 'name'],
                    where: {
                        name: {
                            [Op.substring]: `${service_category_name}`
                        }
                    }
                },
                order: [
                    ['id', 'ASC']
                ]
            });

            if (result) {
                let _result = result.map(item => {
                    let category = item.HotelServiceCategory;
                    delete item.HotelServiceCategory;

                    return {
                        ...item, hotel_service_category: category
                    }
                });

                return _result;
            }
            return result;
        }

        let result = await db.HotelService.findAll({
            raw: true,
            nest: true,
            include: {
                model: db.HotelServiceCategory, attributes: ['id', 'name']
            },
            order: [
                ['id', 'ASC']
            ]
        });

        let _result = result.map(item => {
            let category = item.HotelServiceCategory;
            delete item.HotelServiceCategory;

            return {
                ...item, hotel_service_category: category
            }
        });

        return _result;
    } catch (error) {
        return {
            errorCode: -2,
            message: 'Error with service !'
        }
    }
}

const createNewServiceCategory = async (newServiceCategoryName) => {
    try {
        let lastItem = await db.HotelServiceCategory.findOne({
            order: [['id', 'DESC']],
            raw: true
        })

        let existedServiceCategoryName = await db.HotelServiceCategory.findOne({
            where: {
                name: {
                    [Op.like]: `${newServiceCategoryName}`
                }
            },
            raw: true
        })

        if (existedServiceCategoryName) {
            return {
                errorCode: -1,
                message: 'Service category name is existed !'
            }
        } else {

            let res = await db.HotelServiceCategory.create({
                id: lastItem.id + 1,
                name: newServiceCategoryName
            });

            if (res) {
                return {
                    errorCode: 0,
                    message: 'Create service category successfully !'
                }
            }
            else {
                return {
                    errorCode: -2,
                    message: 'Create service category failed !'
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

const updateServiceCategory = async (data) => {
    try {
        let existedCategoryName = await db.HotelServiceCategory.findOne({
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
                message: 'Service category name is existed !'
            }
        } else {
            let existedCategory = await db.HotelServiceCategory.findOne({
                where: {
                    id: +data.id
                },
                raw: true
            });

            if (existedCategory) {
                let { id: category_id } = data;
                delete data.id;

                await db.HotelServiceCategory.update(data, {
                    where: {
                        id: +category_id
                    }
                });
                return {
                    errorCode: 0,
                    message: 'Update service category successfully !'
                }
            } else {
                return {
                    errorCode: -1,
                    message: 'Service category is not existed!'
                }
            }
        }
    } catch (error) {
        console.log(error);
        return {
            errorCode: -2,
            message: 'Error with service!'
        }
    }

}

const deleteServiceCategory = async (category_id) => {
    try {
        let existedServiceCategory = await db.HotelServiceCategory.findOne({
            where: {
                id: +category_id
            },
            raw: true
        })

        if (existedServiceCategory) {
            await db.HotelService.destroy({
                where: {
                    hotel_service_category: +category_id
                }
            })

            await db.HotelServiceCategory.destroy({
                where: {
                    id: +category_id
                }
            });

            return {
                errorCode: 0,
                message: 'Delete service category successfully !'
            }

        } else {
            return {
                errorCode: -1,
                message: 'Service category is not existed !'
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

module.exports = {
    getAllHotelServices, getAllHotelServiceCategories, createNewService,
    updateService, deleteService,

    getSearchedServiceByName, getSearchedServiceByCategory, createNewServiceCategory,
    updateServiceCategory, deleteServiceCategory
}