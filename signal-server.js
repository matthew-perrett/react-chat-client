const WebsocketServer = require('ws').Server;

const server = new WebsocketServer({port: 3210});
server.on('connection', function(socket) {
    socket.on('message', function(msg) {
        server.clients.forEach(function(other) {
            if(other !== socket) {
                other.send(msg);
            }
        });
    });
});
