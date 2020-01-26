const React = require('react');
const ChatMessage = require('./ChatMessage');
const createReactClass = require('create-react-class');

module.exports = createReactClass({
    render: function() {
        const messages = this.props.messages.map(function (msg) {
            return <ChatMessage message={msg}/>;
        });

        return <div>{messages}</div>;
    }
});
