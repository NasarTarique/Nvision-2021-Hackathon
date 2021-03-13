import React, { useState, useEffect, useCallback } from "react";
import {TextField, Button} from "@material-ui/core"
import Video from "twilio-video";
import "./styles/createroom.css";

const JoinRoom = ({ setRoom }) => {
  const [username, setUsername] = useState("");
		const [connecting ,setConnecting]  = useState(false)
		  const [roomid, setRoomid] = useState("");
		const [roomDetail, setRoomDetail ] = useState(null)
		const [twilioroom ,setTwilioroom] = useState(null)

  const handleUserchange = (e) => {
    setUsername(e.target.value);
  };

  const handleRoomchange = (e) => {
    setRoomid(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setConnecting(true);
		  const data = await fetch("/api/join/", {
      method: "POST",
      body: JSON.stringify({
        username: username,
			  roomid: roomid
      }),
      headers: {
        "Content-Type": "application/json",
      }, }).then((res) => res.json());
		  then(d=>{setRoomDetail(d);return d});
		  Video.connect(data.token, {
			  name: data.roomname,
    })
      .then((room) => {
        setConnecting(false);
			  setTwilioroom(room);
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
				label="Roomid"
          variant="outlined"
          onChange={handleRoomchange}
				value={roomid}
        />
      </div>
      <div>
        <Button type="submit" variant="contained" color="primary">
          {connecting ? "CONNECTING" : "JOIN"}
        </Button>
      </div>
    </form>
  );
};

export default JoinRoom;
