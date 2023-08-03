const mongoose = require('mongoose');
const { Request } = require('../models');

const SERVICES = {
    createRequest : async(reqBody) => {
        const req = await Request.create(reqBody);
        return req;
    },

    checkIfExist : async(userId,bookId) => {
        const req = await Request.findOne({book:bookId,sender:userId});
        return req;
    }
};

module.exports = SERVICES;