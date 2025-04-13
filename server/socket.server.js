const {Server} = require('socket.io');
const {config } = require('./config');
const cors = require('cors');
const { ChatRoomController } = require('./controller');

const socketServer = function(server) {
    const io = new Server(server,{
        cors:{
            origin:config.cors.origin,
        }
    });

    io.on("error",function(err){
        console.log(err.message);
        socket.emit("error",{message : "something went wrong in the server"});
    });

    io.on('connection',function(socket){
        let roomId;
        console.log("jai shree ram");
        socket.on('join room',(roomId)=> {
            socket.join(roomId);
            roomId = roomId;
            socket.on('send message',async (obj)=>{
                try{
                    await ChatRoomController.addMessageToChatRoom(obj.sender,obj.receiver,obj.msg,roomId);
                    io.to(roomId).emit('send message',{message:obj.msg,from:obj.sender});
                }
                catch(err){
                    console.log("this "+err.message);
                    io.to(roomId).emit('message_empty_error',err.message);
                }
            });
        });
        socket.on('disconnect',() => {
            console.log('socket disconnected');
        })

    });
};

module.exports = socketServer;

//so the moral of socket io basics is.
//1. Client has a socket and he wants to connect it to an electric outlet.
//2. the backend server creates an instance of io (which is the electric outlet).
//3. This instance is connected by the client and a socket instance is passed 
//   from the client side. which is used to join room or etc.
//4. The io instance is responsible for emitting events to a room i.e. to a socket
//   on the client.

// const joinedRooms = Object.keys(socket.rooms);
