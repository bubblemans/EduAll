import React, { useContext, useEffect, useState , useRef} from "react"

import { List, Container, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatListItem from "./ChatListItem";
import { ContextStore } from "../ContextStore";

const SOCKET_URL = process.env.REACT_APP_BASE_URL + ":3030";


const io = require("socket.io-client");
let socket;

export default function Chat() {
  const { CurrentUser, SideBar } = useContext(ContextStore);
  const [ showSidebar, setShowSidebar] = SideBar;
  const [ user, setUser ] = CurrentUser;
  const [sender, setSender] = useState("user_id_1");
  const [name, setName] = useState(user.firstName + " " + user.lastName);
  const [messages, setMessages] = useState([]);
  const [searchBarOptions, setSearchBarOptions] = useState([]);
  const [recentMessages, setRecentMessages] = useState({});
  const [numRoom, setNumRoom] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const room = useRef("");
  const [roomId, setRoomId] = useState("");
  const messagesEndRef = useRef(null);
  const ws = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    let isCancelled = false;

    setShowSidebar(true);

    scrollToBottom();

    getSearchBarOptions();

    getRecentMessages();

    return () => {
      isCancelled = true;
    };

  }, [messages])

  const getSearchBarOptions = () => {
    var url = process.env.REACT_APP_BASE_URL + ":4000/contact/" + user.token;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setSearchBarOptions(data)
      })
  }

  const getRecentMessages = () => {
    const url = process.env.REACT_APP_BASE_URL + ":4000/recentMessages/" + user.token;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data != null) {
          setRecentMessages(data);
          setNumRoom(data.number_of_rooms);
        }
      })
  }

  const handleSocket = (id) => {
    if (socket) {
      socket.disconnect();
    }
    socket = io.connect(SOCKET_URL);
    socket.emit("join", id);
    socket.on("chat", data => {
      addMessages(data);
    })
  }

  const addMessages = ms => {
    setMessages(messages => [...messages, ...ms]);
  }

  const handleSubmitMessage = message => {
    socket.emit("chat", {
      room_id: roomId,
      sender: user.id,
      message: message,
      name: name,
      token: user.token
    });
  }

  const handleSearchBar = userName => {
    let participant;
    for (const key in searchBarOptions) {
      const option = searchBarOptions[key];
      if (option.name === userName) {
        participant = option.user;
        getRoomId(participant)
          .then( roomObject => {
            const roomName = roomObject.name;
            room.current = roomName;
            setRoomId(roomObject._id);
            handleSocket(roomObject._id);
          })
      }
    }
  }

  const getRoomId = participant => {
    const url = process.env.REACT_APP_BASE_URL + ":4000/room/" + user.token + "?participant=" + participant;
    return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.hasOwnProperty("_id")) {
        return data;
      } else {
        return createRoom(participant)
          .then( () => {
            console.log("called?")
            getRoomId(participant)
            .then(roomObject => {
              return roomObject;
            })
          })
      }
    })
  }

  const createRoom = participant => {
    const url = process.env.REACT_APP_BASE_URL + ":4000/room/" + user.token + "?participant=" + participant;
    const body = {
      name: "Room",
      participants: [user.id, participant]
    }
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        return data;
      })
  }

  const handleClickListItem = (room_id) => {
    getRoomNameById(room_id)
      .then( (name) => {
        room.current = name;
        setRoomId(room_id);
        handleSocket(room_id)
      })
  }

  const getRoomNameById = (id) => {
    const url = process.env.REACT_APP_BASE_URL + ":4000/room/" + user.token + "?id=" + id;
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        return data.name;
      })
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
            }}
            options={ searchBarOptions.map((option, i) => {
              return option.name;
            }) }
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
                    date={recentMessages["created_at_" + (i+1).toString()].split("T")[0]}
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
          {room.current}
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
