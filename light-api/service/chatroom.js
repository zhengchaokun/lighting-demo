const websocket = require("../lib/websocket.js");

exports.register = function (server, options, next) {
    const ws = websocket.init(server);

    const users = {};

    ws.on("connection",function(socket){

        const query = socket.handshake.query;
        const room = query.room||'默认';
        const userName = query.userName||"匿名用户";

        socket.join(room);
        ws.to(room).emit("checkin",userName);

        socket.on("discus",function(msg){
            ws.to(room).emit("discus",msg);
        })

        socket.on("disconnect",function(){
            socket.leave(room);
            ws.to(room).emit("checkout",userName);
        })

    })

    next();
};

exports.register.attributes = {
    name: 'chatroom',
    version: '1.0.0'
};