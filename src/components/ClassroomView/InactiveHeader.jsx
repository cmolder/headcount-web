import React from 'react'; 
import '../../styles/ClassroomView/InactiveHeader.css'

const InactiveHeader = (props) => {

    const classroomName = (typeof props.classroom.name === 'undefined') ? 'This class' : props.classroom.name;

    return(
        <div className='InactiveHeader'>
            <div className='InactiveHeader-sidecolumn'>
                <button onClick={() => props.onBackClick()}>Back</button>
            </div>

            <div className='InactiveHeader-centercolumn'>
                <p>
                    {classroomName} is currently inactive.
                </p>
            </div>

            <div className='InactiveHeader-sidecolumn'>
                <button onClick={() => props.onStartSessionClick()}>Start session</button>
            </div>
        </div>
    )
}

export default InactiveHeader;