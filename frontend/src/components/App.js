import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch,Redirect, Route, Link } from "react-router-dom";
import { ButtonGroup, Button, Grid} from "@material-ui/core"
import VideoChat from "./VideoChat";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import JoinRoom from "./JoinRoom";
import "./styles/App.css";

const App = () => {
  const [room, setRoom] = useState(null);
		const [joinroom, setJoinroom] = useState(false)
		const [createroom, setCreateroom] = useState(false)
		const [roomDetail, setRoomdetail] = useState({})
 

  const handleLogout = () => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
	})
  };
		const roomexists = () =>{
				if(room)
						return <Room roomName={roomDetail.roomname} room={room} handleLogout={handleLogout} />
		}

		const redirectjoinroom = () =>{
				if(joinroom)
						return <Redirect to="/join" />
		}
		const redirectcreateroom = () =>{
				if(createroom)
						return <Redirect to="/create" />
		}
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Productivity Group</h1>
        </header>
        <main>
          <Switch>
            <Route path="/join">
					<JoinRoom  setRoom={setRoom}/>
            </Route>
            <Route path="/create">
              <CreateRoom setRoom={setRoom} />
            </Route>

				  <Route path="/room">
						  {roomexists()}
            </Route>
            <Route exact path="/">
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: "50vh" }}
              >
                <Grid item xs={16}>
                  <ButtonGroup
                    size="large"
                    color="secondary"
                    aria-label="outlined secondary button group"
                  >
						  <Button onClick={()=>setJoinroom(true)}>JOIN</Button>
						  <Button onClick={()=>setCreateroom(true)}>CREATE</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Route>
          </Switch>
				{redirectcreateroom()}
				{redirectjoinroom()}
        </main>
      </div>
    </Router>
  );
};

export default App;
const container = document.getElementById("app");
render(<App />, container);
