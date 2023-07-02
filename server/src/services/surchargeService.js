const db = require('../models/index.js');

const getAllSurcharge = async () => {
    try {
        let result = await db.Surcharge.findAll({
            raw: true,
            order: [
                ['id', 'DESC']
            ]
        });

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getAllSurcharge
}