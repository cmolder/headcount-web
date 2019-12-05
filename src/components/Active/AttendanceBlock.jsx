import React from "react";
import "../../styles/Active/AttendanceBlock.css";

const AttendanceBlock = props => {
  return (
    <div className="AttendanceBlock">
      <p className="AttendanceBlock-text"><b>{props.name}</b></p>
      <p className="AttendanceBlock-text">{props.studentId}</p>
    </div>
  );
};

export default AttendanceBlock;
