class customError extends Error {
    constructor (name,statusCode,message,msgCd='SUCCESS',stack='')
    {
        super(message); //calls constructor of Error class (which takes arg as msg)
        this.statusCode=statusCode || 500;
        this.name=name;
        this.msgCd=msgCd;
        if(stack)
        {
            this.stack=stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}
module.exports = customError;
