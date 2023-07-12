const jwt = require('jsonwebtoken');
const moment = require('moment');
const { config } = require('../config');

const JWT = {
    generateToken : async (userId) =>{
        const expires = moment()
                        .add(config.jwt.expiration_minute,'minutes')
                        .unix();
        const iat=moment().unix();
        const payload = {
            sub:userId,
            iat:iat,
            exp:expires,
        };
        const tokens = await jwt.sign(payload,config.jwt.secret_key);
        return tokens;
    },
};

module.exports = JWT;
