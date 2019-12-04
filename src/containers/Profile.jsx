import React from "react";
import "../styles/Login.css";

const Profile = () => {
  return (
    <div className="Login">
      <div className="App">
        <div className="App-header">
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
