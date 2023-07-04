const mongoose = require("mongoose");

const User = require("../models");

const SERVICES = {
    createUser : async (userData) => {
        const user = await User.create(userData);
        return user;
    }
};

module.exports = SERVICES;