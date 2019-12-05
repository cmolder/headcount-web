import React from 'react'; 
import '../../styles/Active/InactiveHeader.css'

const InactiveHeader = (props) => {

    return(
        <div className='InactiveHeader'>
            <div className='InactiveHeader-top'>
                <button onClick={() => props.onBackClick()}>Back</button>
                <p>
                    The class is currently inactive.
                </p>
                <button onClick={() => props.onStartSessionClick()}>Start session</button>
            </div>
        </div>
    )
}

export default InactiveHeader;