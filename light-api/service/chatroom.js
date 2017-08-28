const websocket = require("../lib/websocket.js");

exports.register = function (server, options, next) {
    const ws = websocket.init(server);

    ws.on("connection",function(socket){

        const query = socket.handshake.query;
        const room = query.room||'默认';
        const user = query.user||"匿名用户";

        socket.on("discuss",function(msg){
            socket.to(room).emit(msg);
        })

        socket.to(room).emit(`${user}进入${room}聊天室！`);

        socket.on("disconnect",function(){
            socket.to(room).emit(`${user}离开${room}聊天室！`);
        })

    })

    next();
};

exports.register.attributes = {
    name: 'chatroom',
    version: '1.0.0'
};