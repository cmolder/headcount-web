import React from 'react'; 
import '../../styles/Active/ActiveHeader.css'

const ActiveHeader = (props) => {
    const classcode = props.classcode;

    return(
        <div className='ActiveHeader'>
            <div className='ActiveHeader-top'>
                <button onClick={() => props.onBackClick()}>Back</button>
                <p>
                    Mark you are here in the <b>Bee Here</b> app and entering the
                    following code with your student ID
                </p>
                <button className='ActiveHeader-endbutton'>End session</button>
            </div>
            
            <p className='ActiveHeader-classcode'>{classcode}</p>
        </div>
    )
}

export default ActiveHeader;