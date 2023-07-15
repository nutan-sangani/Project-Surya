const RESPONSE ={
    getRes : (success,data,err,message,msgCd="SUCCESS") =>
    {
        let responseObj = {
            success:0,
            data:[],
            error:[],
            message:'',
            msgCd:msgCd,
        };
        responseObj.success=success;
        // responseObj.data=[]; //so that arr me aaram se traverse krsake.
        if(data!=null && typeof data === 'object')
        {
            responseObj.data[0]=data;
        }
        if(err!=null && typeof err === 'object')
        {
            responseObj.error[0]=err;
        }
        if(Array.isArray(data) && data.length===0)
        {
            success=0;
            responseObj.success=0;
        }
        responseObj.data=data;
        if(message)
        {
            responseObj.message=message;
        }
        else 
        {
            if(success) responseObj.message="success";
            else responseObj.message=err.message;
        }
        if(msgCd)
        {
            responseObj.msgCd=msgCd;
        }
        else{
            if(success) return responseObj;
            else responseObj.msgCd="ERROR";
        }
        return responseObj;
    }
};

module.exports = RESPONSE;