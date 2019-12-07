import React from 'react'; 
import '../../styles/ClassroomView/ActiveHeader.css';

const ActiveHeader = (props) => {
    const classcode = props.classcode;
    const classroomName = (typeof props.classroom.name === 'undefined') ? 'This class' : props.classroom.name;

    return(
        <div className='ActiveHeader'>

            <div className='ActiveHeader-sidecolumn'>
                <button onClick={() => props.onBackClick()}>Back</button>
            </div>

            <div className='ActiveHeader-centercolumn'>
                <p className='ActiveHeader-text'>
                    Mark you are present in {classroomName} by opening the <b>Bee Here</b> app and entering the
                    code below
                </p>
                <p className='ActiveHeader-classcode'>{classcode}</p>
            </div>

            <div className='ActiveHeader-sidecolumn'>
                <button onClick={() => props.onEndSessionClick()}>End session</button>
                <p className='ActiveHeader-sidetext'>
                    <b>{props.numAttending}/{props.numStudents} present</b>
                </p>
            </div>
           
        </div>
    )
}

export default ActiveHeader;