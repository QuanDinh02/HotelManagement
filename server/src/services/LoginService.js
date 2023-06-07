const jwt = require('jsonwebtoken');
const db = require('../models/index.js');
const { Op } = require("sequelize");
require('dotenv').config();

const createToken = (payload) => {
    let token = null;
    try {
        let key = process.env.JWT_SECRET;
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRE });
    } catch (error) {
        console.log(error);
        return null;
    }
    return token;
}

const verifyToken = (token) => {
    let data = null;
    let key = process.env.JWT_SECRET;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (error) {
        console.log(error);
    }
    return data;
}

const fetchAccountInfo = (token) => {
    try {
        let decoded = verifyToken(token);
        if (decoded) {
            let data = {
                id: decoded.id,
                username: decoded.username,
                group: decoded.group,
                isAuthenticated: decoded.isAuthenticated
            }

            return {
                data: data,
                EC: 0,
                EM: 'The token is valid!'
            }
        } else {
            return {
                data: null,
                EC: -1,
                EM: 'The token is expired!'
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const userLogin = async (userData) => {
    try {
        let result = await db.StaffAccount.findOne({
            raw: true,
            nest: true,
            include: {
                model: db.Staff, attributes: ['id', 'name'],
                nest: true,
                raw: true,
                include: {
                    model: db.StaffCategory, attributes: ['name']
                }
            },
            where: {
                [Op.and]: [
                    {
                        account_name: {
                            [Op.like]: `${userData.account}`
                        }
                    },
                    {
                        password: {
                            [Op.like]: `${userData.password}`
                        }
                    }
                ]
            }
        });

        if (result) {
            if (userData.password === result.password) {

                let payload = {
                    id: result.staff_id,
                    username: result.Staff?.name,
                    group: result.Staff?.StaffCategory?.name,
                    isAuthenticated: true
                }

                let accessToken = createToken(payload);
                return {
                    data: payload,
                    token: accessToken,
                    EC: 0,
                    EM: 'Login success !'
                }
            }
        }

        return {
            token: '',
            EC: -1,
            EM: 'Incorrect username or password !'
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    fetchAccountInfo, userLogin
}


