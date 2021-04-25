import React, { Component } from 'react';
import '../chatStyle.css'

class ChatMessage extends Component {
  constructor(props) {
    super(props);
}

  render () {
    return (
      <div class='chat-bubble-row' key={this.props.index} style={{flexDirection: 'row'}}>
        <div className={'chat-bubble is-user'}>
          <div
            class='message'
            style={{color: '#000300', textAlign: 'left'}}>
              {this.props.message}
          </div>
          <div style={{fontSize: 12, color: '#a3a3a3', textAlign: 'right'}}>{this.props.user}</div>
        </div>
      </div>
    );
  }
}

export default ChatMessage;
