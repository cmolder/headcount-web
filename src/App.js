import React from "react";
//import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Mark that you're here by opening the <b>Bee Here</b> app and typing in
          this class code
        </p>
        <h1>{Math.floor(Math.random() * 100000 * 6)} </h1>

        <p> </p>
        <button type="button">End Session</button>
      </header>
    </div>
  );
}

export default App;
