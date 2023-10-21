const {Server} = require('socket.io');
const {config } = require('./config');
const cors = require('cors');

const socketServer = function(server) {
    const io = new Server(server,{
        cors:{
            origin:config.cors.origin,
        }
    });

    io.on('connection',function(socket){
        console.log("jai shree ram");
        socket.on('chat message',(msg)=>{
            console.log("hey there");
        });
    });
};

module.exports = socketServer;