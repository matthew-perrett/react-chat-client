const React = require('react');
const createReactClass = require('create-react-class');
const MessageList = require('./MessageList');
const MessageForm = require('./MessageForm');
const MessageStore = require('./MessageStore');

module.exports = createReactClass({
  getInitialState: function() {
    return {
      messages: MessageStore.getMessages()
    };
  },

  componentWillMount: function() {
    MessageStore.subscribe(this.updateMessages);
  },

  componentWillUnmount: function() {
    MessageStore.unsubscribe(this.updateMessages);
  },

  updateMessages: function() {
    this.setState({
      messages: MessageStore.getMessages()
    });
  },

  onSend: function(newMessage) {
    MessageStore.newMessage(newMessage);
  },

  render: function() {
    return <div>
      <MessageList messages={this.state.messages} />
      <MessageForm onSend={this.onSend} />
    </div>;
  }
});
