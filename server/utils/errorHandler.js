const httpStatus = require('http-status');
const { getRes } = require('./responseTemplate');


//this handler will handle only Error not custom errors, uske liye alag handler bana.
//like this will return res on any unhandled err
const errorHandler = (err,req,res,next) => {
    if(err instanceof Error)
    {
        if(err.name==='UnauthorizedError' || err.code===401)
            return res.status(httpStatus.UNAUTHORIZED).json(getRes(0,null,err,'Invalid Token','AUTH_ERROR'));
        if(err.name==='Not Found')
            return res.send(httpStatus.NOT_FOUND).json(getRes(0,null,err,'Resource Not Found','NOT_FOUND'));
        if(err.name==='MongoError' || err.code===11000)
            return res.status(httpStatus.BAD_REQUEST).json(getRes(0,null,err,'Bad input to server','BAD_REQUEST'));
        if(err.code===400)
            return res.status(httpStatus.BAD_REQUEST).json(getRes(0,null,err,'Enter a Valid Input','BAD_REQUEST'));  
    }
    next(err);
}

module.exports = errorHandler;