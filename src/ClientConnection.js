const Peer = require('simple-peer');
const Websocket = require('simple-websocket');
const EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter();

module.exports = function() {
    const socket = new Websocket('ws://localhost:3210');
    let clientRtc;
    socket.on('close', function() { console.log('Socket closed'); });
    socket.on('error', function(err) { console.log('Socket error'); console.log(err); });

    socket.on('connect', function() {
        clientRtc = new Peer({ initiator: true, trickle: false });
        clientRtc.on('signal', function(data) {
            socket.send(data);
        });

        socket.on('data', function(data) {
            clientRtc.signal(data);
        });

        clientRtc.on('connect', function() {
            emitter.emit('connected');
            //we no longer need the signaler
            socket.destroy();
        });

        clientRtc.on('data', function(message) {
            emitter.emit('message', message);
        });
    });

    return {
        onReady: function(callback) {
            emitter.on('connected', callback);
        },

        send: function(message) {
            clientRtc.send(message);
        },

        onMessage: function(cb) {
            emitter.on('message', cb);
        }
    };
};
