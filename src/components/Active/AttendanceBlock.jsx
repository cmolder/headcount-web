import React from "react";
import "../../styles/Active/AttendanceBlock.css";

const AttendanceBlock = props => {
  return (
    <div className="AttendanceBlock">
      <p>{props.name} is here!</p>
    </div>
  );
};

export default AttendanceBlock;
