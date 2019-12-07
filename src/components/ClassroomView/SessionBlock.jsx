import React from 'react';
import '../../styles/ClassroomView/SessionBlock.css';

const SessionBlock = props => {

    const startDay  = props.start.toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    const startTime = props.start.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
    
    const endDay    = props.end.toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    const endTime   = props.end.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });

    return (
        <div className='SessionBlock'
             onClick={() => props.onClick(props.session)}>
            <div className='SessionBlock-subsection'>
                <p className='SessionBlock-text'><b>Date</b></p>
                {(startDay === endDay) ? 
                    (<p className='SessionBlock-text'>{startDay}</p>) :
                    (<><p className='SessionBlock-text'>{startDay + ' to'}</p>
                     <p className='SessionBlock-text'>{endDay}</p></>)}
            </div>
            <div className='SessionBlock-subsection'>
                <p className='SessionBlock-text'><b>Start time</b></p>
                <p className='SessionBlock-text'>{startTime}</p>
            </div>
            <div className='SessionBlock-subsection'>
                <p className='SessionBlock-text'><b>End time</b></p>
                {(startDay === endDay) ?
                    (<p className='SessionBlock-text'>{endTime}</p>) :
                    (<><p className='SessionBlock-text'>{endDay}</p>
                     <p className='SessionBlock-text'>{endTime}</p></>)}
            </div>
            <div className='SessionBlock-subsection'>
                <p className='SessionBlock-text'><b>Number present</b></p>
                <p className='SessionBlock-text'>{props.numAttending}/{props.numStudents} students</p>
            </div>
            <div className='SessionBlock-arrow'>
            </div>
        </div>
    )
}

export default SessionBlock;