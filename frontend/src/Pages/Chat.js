import React, { useContext, useEffect, useState , useRef} from 'react'

import { List, Container, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ChatListItem from './ChatListItem';
import { ContextStore } from '../ContextStore';

const URL = 'ws://localhost:3030';

export default function Chat() {
  const { CurrentUser, SideBar } = useContext(ContextStore);
  const [ showSidebar, setShowSidebar] = SideBar;
  const [ user, setUser ] = CurrentUser;
  const [sender, setSender] = useState("user_id_1");
  const [name, setName] = useState(user.firstName + " " + user.lastName);
  const [room_id, setRoomId] = useState("room_id_1");
  const [messages, setMessages] = useState([]);
  const [searchBarOptions, setSearchBarOptions] = useState({});
  const [recentMessages, setRecentMessages] = useState({});
  const [numRoom, setNumRoom] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const messagesEndRef = useRef(null);
  const ws = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setShowSidebar(true);

    scrollToBottom();

    var url = "http://localhost:4000/contact/" + user.token;
    fetch(url)
      .then(res => res.json())
      .then(data => setSearchBarOptions(data))

    url = "http://localhost:4000/recentMessages/" + user.token;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setRecentMessages(data);
        setNumRoom(data.number_of_rooms);
      })

  }, [messages])

  const handleWS = () => {
    // TODO: initialize ws based on chosen room_id!
    ws.current = new WebSocket(URL);

    ws.current.onopen = event => {
      console.log('connected');
    }

    ws.current.onmessage = event => {
      const messages = JSON.parse(event.data);
      addMessages(messages);
    }

    ws.current.onclose = () => {
      console.log('disconnected');
      ws = new WebSocket(URL);
    }
  }

  const addMessages = ms => {
    setMessages([...messages, ...ms]);
  }

  const handleSubmitMessage = message => {
    const messages = [{
      room_id: room_id,
      sender: sender,
      message: message,
      name: name
    }];
    ws.current.send(JSON.stringify(messages));
    addMessages(messages);
  }

  const handleSearchBar = name => {
    console.log(name);
  }

  const handleClickListItem = (room) => {
    console.log(room);
  }

  return (
    <div class="chat">
      <Container class="chat-panel">
        <br/>
        <div>
          <Autocomplete
            class="chat-search-bar"
            value={searchValue}
            onChange={(event, newValue) => {
              setSearchValue(newValue);
              handleSearchBar(newValue);
            }}
            inputValue={searchValue}
            onInputChange={(event, newInputValue) => {
              setSearchValue(newInputValue);
              handleSearchBar(newInputValue);
            }}
            options={ searchBarOptions }
            renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
          />
        </div>
        <List>
          <div>
            {
              [...Array(parseInt(numRoom))].map((x, i) => {
                return (
                  <ChatListItem
                    sender={recentMessages["name_" + (i+1).toString()]}
                    text={recentMessages["message_" + (i+1).toString()]}
                    date={recentMessages["created_at_" + (i+1).toString()].split('T')[0]}
                    room={recentMessages["room_id_" + (i+1).toString()]}
                    handleClick={handleClickListItem}
                  />
                )
              }
            )}
          </div>
        </List>
      </Container>

      <Container class="chat-window">
        <Container class="chat-room-title">
          {searchValue}
        </Container>
        <Container class="chat-message">
          <div>
            {
              messages.map((message, index) => {
                return (
                  <ChatMessage
                    key={index}
                    message={message.message}
                    user={message.name}
                  />
                );
              })
            }
            <div ref={messagesEndRef} />
          </div>
        </Container>
        <br/>
        <Container>
          <ChatInput
            onSubmitMessage={handleSubmitMessage}
          />
        </Container>
      </Container>
    </div>
  );
}
