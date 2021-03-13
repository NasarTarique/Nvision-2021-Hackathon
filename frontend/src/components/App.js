import React, { useState, useEffect } from "react";
import { render } from "react-dom";
function App() {
  return (
    <div>
      <h1> video conferencing </h1>
      <form action="">
        <input type="text" name="username" id="username"></input>
        <button id="joincall">Join call</button>
      </form>
      <p id="count"></p>

      <div id="container" class="container">
        <div id="local" class="participant">
          <div></div>
          <div>Me</div>
        </div>
      </div>
    </div>
  );
}
export default App;
const container = document.getElementById("app");
render(<App />, container);
