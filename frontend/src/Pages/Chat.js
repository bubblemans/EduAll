import React, { useContext, useEffect, useState , useRef} from 'react'

import { List, Container, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ChatListItem from './ChatListItem';
import { ContextStore } from '../ContextStore';

const URL = "http://localhost:3030";


const io = require('socket.io-client');
let socket;

export default function Chat() {
  const { CurrentUser, SideBar } = useContext(ContextStore);
  const [ showSidebar, setShowSidebar] = SideBar;
  const [ user, setUser ] = CurrentUser;
  const [sender, setSender] = useState("user_id_1");
  const [name, setName] = useState(user.firstName + " " + user.lastName);
  const [messages, setMessages] = useState([]);
  const [searchBarOptions, setSearchBarOptions] = useState({});
  const [recentMessages, setRecentMessages] = useState({});
  const [numRoom, setNumRoom] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const room = useRef("");
  const messagesEndRef = useRef(null);
  const ws = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setShowSidebar(true);
    setSearchBarOptions(['1', '2']);

    // scrollToBottom();

    // var url = "http://localhost:4000/contact/" + user.token;
    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => setSearchBarOptions(data))

    // url = "http://localhost:4000/recentMessages/" + user.token;
    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     setRecentMessages(data);
    //     setNumRoom(data.number_of_rooms);
    //   })

  }, [messages])


  const handleSocket = (room) => {
    console.log(room);
    if (socket) {
      socket.disconnect();
    }
    socket = io.connect(URL);
    socket.emit("join", room);
    socket.on("chat", data => {
      // store all messages to
      addMessages(data);
    })
  }

  const addMessages = ms => {
    setMessages([...messages, ...ms]);
  }

  const handleSubmitMessage = message => {
    const messages = [{
      room: room.current,
      sender: sender,
      message: message,
      name: name
    }];
    socket.emit("chat", messages[0]);
    addMessages(messages);
  }

  const handleSearchBar = name => {
    room.current = getRoomId(name); // TODO
    handleSocket(room.current);
  }

  const getRoomId = name => {
// TODO: call API
// call GET: check if there is a room for two people
// if not: call POST to create one
  }

  const handleClickListItem = (room_id) => {
    console.log(room_id);
    room.current = room_id;
    handleSocket(room.current);
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
              // handleSearchBar(newInputValue);
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
