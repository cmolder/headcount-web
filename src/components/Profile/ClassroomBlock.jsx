import React from 'react';
import '../../styles/Profile/ClassroomBlock.css';

const ClassroomBlock = (props) => {
    const classroom = props.classroom;

    let classcode = '';

    if(classroom.active_session !== null) {
        if(typeof classroom.active_session.class_code !== 'undefined')
            classcode = classroom.active_session.class_code;
    }
    

    return(
        <div className='ClassroomBlock'
             onClick={() => props.onClick(classroom)}>
            <div className='ClassroomBlock-subsection'>
                <p className='ClassroomBlock-text ClassroomBlock-boldtext'>{props.name}</p>
                <p className='ClassroomBlock-text'>{props.number}</p>
            </div>
            <div className='ClassroomBlock-subsection'>
                <p className='ClassroomBlock-text'>{props.rosterSize + ' students'}</p>
                <p className='ClassroomBlock-text'>{(classcode === '') ? ' ' : 'Class code: ' + classcode}</p>
                <p className='ClassroomBlock-text'>{(classcode === '') ? 'Currently inactive' : 'Currently active'}</p>
            </div>
            <div className='ClassroomBlock-arrow'>
            </div>
        </div>
    )
}

export default ClassroomBlock;