import React, { Component } from 'react';

class ChatMessage extends Component {
  constructor(props) {
    super(props);
}

  render () {
    return (
      <div key={this.props.index}>
        {this.props.message}
      </div>
    );
  }
}

export default ChatMessage;
