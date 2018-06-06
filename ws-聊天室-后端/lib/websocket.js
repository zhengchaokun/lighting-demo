module.exports = {
    init(server){
        let io = require('socket.io')(server.listener);
        return io;
    }
}
