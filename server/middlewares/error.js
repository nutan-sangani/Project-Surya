const httpStatus = require('http-status');
const { customError } = require('../utils');
const { getRes } = require('../utils/responseTemplate');

const ERROR = {
    errorConverter : (err,req,res,next) => {
        let error=err;
        if(!(error instanceof customError))
        {
            const name = error.name;
            const code = httpStatus.INTERNAL_SERVER_ERROR;
            const message = error.message;
            error = new customError(name,code,message,'INTERNAL_SERVER_ERROR',error.stack);
        }
        next(error);
    },

    customErrorHandler : (err,req,res,next) => {
        const error=err;
        const result = getRes(0,null,error,error.message,error.msgCd);
        res.status(error.statusCode).send(result);
    },
};

module.exports = ERROR;