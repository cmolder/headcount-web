import React from 'react';
import '../styles/ClassroomBlock.css';

const ClassroomBlock = (props) => {
    const classroom = props.classroom

    return(
        <div className='ClassroomBlock'
             onClick={() => props.onClick(classroom)}>
            <div className='ClassroomBlock-subsection'>
                <p className='ClassroomBlock-text ClassroomBlock-boldtext'>{props.name}</p>
                <p className='ClassroomBlock-text'>{props.classNumber}</p>
            </div>
            <div className='ClassroomBlock-subsection'>
                <p className='ClassroomBlock-text'>{props.rosterSize + ' students'}</p>
                <p className='ClassroomBlock-text'>{props.classCode}</p>
            </div>
            <div className='ClassroomBlock-arrow'>
                <p>→</p>
            </div>
        </div>
    )
}

export default ClassroomBlock;