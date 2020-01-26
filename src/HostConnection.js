const Peer = require('simple-peer');
const Websocket = require('simple-websocket');
const EventEmitter = require('events').EventEmitter;

const peers = [];
const emitter = new EventEmitter();

module.exports = function() {
    const socket = new Websocket('ws://localhost:3210');
    socket.on('close', function() { console.log('Socket closed'); });
    socket.on('error', function(err) { console.log('Socket error'); console.log(err); });
    socket.on('connect', function() { console.log('Connected'); });

    socket.on('data', function(data) {
        const peer = new Peer({ initiator: false, trickle: false });

        peer.signal(data);

        peer.on('signal', function(data) {
            socket.send(data);
        });

        peer.on('connect', function() {
            peers.push(peer);
        });

        peer.on('data', function(msg) {
            emitter.emit('message', msg);
            //as host, we need to broadcast the data to the other peers
            peers.forEach(function(p) {
                if(p !== peer) {
                    p.send(msg);
                }
            });
        });

    });

    return {
        onReady: function(callback) {
            //the host is always "ready" although it may not have any clients
            callback();
        },

        send: function(message) {
            peers.forEach(p => p.send(message));
        },

        onMessage: function(callback) {
            emitter.on('message', callback);
        }
    };
};
