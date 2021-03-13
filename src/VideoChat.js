import React, { useState, useCallback } from "react";
import Lobby from "./Lobby";
import Room from "./Room";

const VideoChat = () => {
   
   const [userName,setUserName] = useState('');
   const [roomName,setRoomName] = useState('');
   const [task,setTask] = useState('');
   const [token,setToken] = useState(null);

   const handleUserNameChange = useCallback(event => {
     setUserName(event.target.value);
   },[] );

   const handleRoomNameChange = useCallback(event => {
     setRoomName(event.target.value);
   },[] );

   const handleTaskChange = useCallback(event => {
    setTask(event.target.value);
  },[] );

   const handleSubmit = useCallback(async event => {
     event.preventDefault();

     const data = await fetch('/video/token',{
      method: 'POST' ,
      body: JSON.stringify({
        identity: userName,
        room: roomName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
     }).then(res => res.json());
     setToken(data.token);

     const taskdata = await fetch('',{
      method: 'POST' ,
      body: JSON.stringify({
        name: userName,
        task: task
      }),
      headers: {
        'Content-Type': 'application/json'
      }
     }).then(res => res.json());
     setTask(taskdata.task);

   }, [userName,roomName,task]);
   

   const handleLogout = useCallback(event =>{
     setToken(null);
   }, []);

   let render;

   if (token) {
     render = (
       <Room roomName={roomName} token={token} handleLogout ={handleLogout} />
     );
   }
   else {
     render = (
       <Lobby 
          userName= {userName}
          roomName={roomName}
          task = {task}
          handleUserNameChange = {handleUserNameChange}
          handleRoomNameChange = {handleRoomNameChange}
          handleTaskChange = {handleTaskChange}
          handleSubmit={handleSubmit}
       />
     );
   }

   return render;

};

export default VideoChat;
