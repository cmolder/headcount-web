import React from 'react';
import Login from './Login';
import Active from './Active';
import Profile from './Profile';

import "../styles/App.css";

function App() {
  let login = false; //turns to true when succesful login
  var active = false; //activates when class activates

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
        <Active/>
      </div>
    );
  } else if (login && !active) {
    return (
      <div className="App">
        <Profile/>
      </div>
    );
  } else if (!login) {
    return (
      <div className="App">
		<Login />
      </div>
    );
  }
}

export default App;
