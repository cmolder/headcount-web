import React from "react";
//import logo from "./logo.svg";
import "./App.css";

function App() {
  var login = 0; //turns to one when succesful login
  var active = 0; //activates when class activates

  /*
  var username;
  var password;
  var title;
  var name;
  var className;
  var department;
  var classNumber
  */

  if (login && active) {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Mark that you're here in "class name" by opening the <b>Bee Here</b>{" "}
            app and typing in this class code
          </p>
          <h1> </h1>
          <p> </p>
          <button type="button">End Attendance</button>
        </header>
      </div>
    );
  }
  if (login && !active) {
    return (
      <div className="App">
        <header className="App-header">
          <p>Hello "put professor name here", activate your class below</p>
          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <br></br>
          <button type="button">State Attendance</button>
          <br></br>
          <p>Register a new Class Below</p>
          <form id="newClass">
            Department:<br></br>
            <input type="text" name="depart"></input>
            <br></br>
            Class Number:<br></br>
            <input type="text" name="Number"></input>
            <br></br>
            Class Name:<br></br>
            <input type="text" name="name"></input>
            <br></br>
          </form>
          <br></br>
          <p>Get all attendence data:</p>
          <button>Download Form</button>
        </header>
      </div>
    );
  }
  if (!login) {
    return (
      <div className="App" align="left">
        <header className="App-header">
          <p>
            <b>Bee Here </b>Professor Login
          </p>
          <form id="login">
            Username:<br></br>
            <input type="text" name="username"></input>
            <br></br>
            Password:<br></br>
            <input type="text" name="password"></input>
            <br></br>
          </form>
          <br></br>

          <p>Register as an Instructor Here</p>
          <form id="newUser">
            Name:<br></br>
            <input type="text" name="instructName"></input>
            <br></br>
            Title:<br></br>
            <input type="text" name="title"></input>
            <br></br>
            Username:<br></br>
            <input type="text" name="username"></input>
            <br></br>
            Password:<br></br>
            <input type="text" name="password"></input>
            <br></br>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
