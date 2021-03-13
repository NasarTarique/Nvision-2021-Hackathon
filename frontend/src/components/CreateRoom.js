import React, { useState, useEffect, useCallback } from "react";
import {TextField, Button} from "@material-ui/core"
import Video from "twilio-video";
import "./styles/createroom.css";

const CreateRoom = ({setRoom})=> {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const [todos, setTodos] = useState("");

  const handleUserchange = (e) => {
    setUsername(e.target.value);
  };
  const handleRoomchange = (e) => {
    setRoomname(e.target.value);
  };
  const handleTodochange = (e) => {
    setTodos(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setConnecting(true);
    const data = await fetch("/api/create/", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        roomname: roomname,
        todos: todos,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    Video.connect(data.token, {
      name: roomname,
    })
      .then((room) => {
        setConnecting(false);
        setRoom(room);
      })
      .catch((err) => {
        console.error(err);
        setConnecting(false);
      });
  };

  return (

    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={handleUserchange}
          value={username}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Roomname"
          variant="outlined"
          onChange={handleRoomchange}
          value={roomname}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Todos"
          variant="outlined"
          onChange={handleTodochange}
          value={todos}
        />
      </div>
      <div>
        <Button type="submit" variant="contained" color="primary">
          {connecting ? "CONNECTING" : "CREATE"}
        </Button>
      </div>
    </form>
  );
}

export default CreateRoom;
