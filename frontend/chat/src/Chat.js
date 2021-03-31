import React, { Component } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const URL = 'ws://localhost:3030';

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sender: 'user_id_1',
      room_id: 'room_id_1',
      messages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = event => {
      console.log('connected');
    }

    this.ws.onmessage = event => {
      const messages = JSON.parse(event.data);
      this.addMessages(messages);
    }

    this.ws.onclose = () => {
      console.log('disconnected');
      this.setState({ ws: new WebSocket(URL)});
    }
  }

  addMessages(messages) {
    this.setState({ messages: [...this.state.messages, ...messages]});
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(message) {
    const messages = [{
      room_id: this.state.room_id,
      sender: this.state.sender,
      message: message
    }];
    this.ws.send(JSON.stringify(messages));
    this.addMessages(messages);
  }

  render() {
    return (
      <div>
        {/* <label htmlFor='name'>
          Name:&nbsp;
          <input
            type='text'
            id={'name'}
            placeholder={'Enter your name'}
            value={this.state.sender}
            onChange={this.handleChange}
          />
        </label> */}
        <ChatInput
          onSubmitMessage={this.handleSubmit}
        />
        {
          this.state.messages.map((message, index) => {
            return (
              <ChatMessage
                key={index}
                message={message.message}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Chat;