import React from "react";

// Redux
import { useSelector } from 'react-redux';



import "../styles/Active.css";
const Active = () => {

  const classroom = useSelector(state => state.classroom.classroom);



  return (
    <div className="Active">
      <p>
        Mark you are here in the <b>Bee Here</b> app and entering the
        following code with your student ID
      </p>
      <p className='Active-classCode'>{classroom.active_session.class_code}</p>
    </div>
  );
};

export default Active;
