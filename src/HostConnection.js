const SimplePeer = require('simple-peer');
const SimpleWebsocket = require('simple-websocket');
const EventEmitter = require('events').EventEmitter;

const peers = [];
const emitter = new EventEmitter();

module.exports = function() {
    const socket = new SimpleWebsocket('ws://localhost:3210');
    socket.on('close', function() { console.log('Socket closed'); });
    socket.on('error', function(err) { console.log('Socket error'); console.log(err); });
    socket.on('connect', function() { console.log('Connected'); });

    socket.on('data', function(data) {

    });

    return {

    };
};
