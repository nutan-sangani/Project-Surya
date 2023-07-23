const mongoose = require('mongoose');
const { Request } = require('../models');

const SERVICES = {
    createRequest : async(reqBody) => {
        const req = await Request.create(reqBody);
        return req;
    },
};

module.exports = SERVICES;