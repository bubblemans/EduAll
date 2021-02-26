import React, { Component } from 'react';

class ChatMessage extends Component {
  constructor(props) {
    super(props);
}

  render () {
    return (
      <div key={this.props.index}>
        {this.props.name}: {this.props.content}
      </div>
    );
  }
}

export default ChatMessage;
