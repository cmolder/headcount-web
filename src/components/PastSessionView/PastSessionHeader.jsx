import React from 'react';
import '../../styles/PastSessionView/PastSessionHeader.css';

const PastSessionHeader = props => {
    const classroomName = (typeof props.classroom.name === 'undefined') ? 'This class' : props.classroom.name;

    return(
        <div className='PastSessionHeader'>
            <div className='PastSessionHeader-sidecolumn'>
                <button onClick={() => props.onBackClick()}>Back</button>
            </div>

            <div className='PastSessionHeader-centercolumn'>
                <p>
                    {classroomName}
                </p>
            </div>

            <div className='PastSessionHeader-sidecolumn'>
                <p className='PastSessionHeader-text '>
                    <b>{props.numAttending}/{props.numStudents} present</b>
                </p>
            </div>

        </div>
    )
}

export default PastSessionHeader;