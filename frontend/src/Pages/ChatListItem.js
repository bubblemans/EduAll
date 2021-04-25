import React, { Component } from 'react';
import { List, ListItem, ListItemText, Divider, Container, Typography } from '@material-ui/core';
import '../chatStyle.css'

class ChatListItem extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <ListItem
          button={true}
          style={{width: "100%"}}
          onClick={() => this.props.handleClick(this.props.room)}
          >
          <ListItemText
            primary={
              <React.Fragment>
                <div class="chat-panel-list-title">
                  <div style={{color: "white"}}>
                    {this.props.sender}
                  </div>
                  <div style={{fontSize: 10, color: "#9b9c9e", position: 'absolute', right: '0%', top: '35%', transform: 'translate(-50%, -50%)'}}>
                    {this.props.date}
                  </div>
                </div>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  color="textPrimary"
                />
                <div style={{color: "#9b9c9e"}} >
                  {this.props.text}
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider style={{backgroundColor: "#6b6c6e"}} />
      </div>
    );
  }
}

export default ChatListItem;
