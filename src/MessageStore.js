const EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter();
const messages = ['a', 'b', 'c'];

module.exports = {
    getMessages: function() {
        return messages.concat();
    },

    subscribe: function(callback) {
        emitter.addListener('update', callback);
    },

    unsubscribe: function(callback) {
        emitter.removeListener('update', callback);
    },

    newMessage: function(message) {
        messages.push(message);
        emitter.emit('update');
    }
};
