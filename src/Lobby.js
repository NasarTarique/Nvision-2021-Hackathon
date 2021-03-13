import React from "react";

const Lobby = ({
  userName,
  handleUserNameChange,
  roomName,
  handleRoomNameChange,
  task,
  handleTaskChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a Room</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={userName}
          onChange={handleUserNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Room Name:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="task">Tasks (optional):</label>
        <textarea 
            type ="text"
            id ='task'
            cols='39'
            rows='6'
            onChange={handleTaskChange} 
            value={task}
        />
      </div>
      <button type="submit">Sumbit</button>
    </form>
  )
}

export default Lobby;
