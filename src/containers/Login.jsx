import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, clearToken } from '../redux/actions/token';
import { setView, PROFILE } from '../redux/actions/view';
import '../styles/Login.css';

const Login = () => {

    const [message, setMessage] = useState('');

    const dispatch = useDispatch();      // Items to/from Redux store
 
    const userInput = React.createRef(); // References to username and password input
    const passInput = React.createRef();

    // Call the server with username and password.
    // - If valid, returns a JWT token which is saved in Redux store
    // - If invalid, returns an error message
    async function handleLogin() {

        const authResult = await fetch("https://headcount-server.herokuapp.com/auth/",
        {
            method: 'POST',
            body: JSON.stringify({
                'username': userInput.current.value,
                'password': passInput.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const authObj = await authResult.json();

        if(typeof authObj.token === 'undefined') {
            dispatch(clearToken());
            setMessage('Error authenticating.');
        } else {
            dispatch(setToken(authObj.token));
            // setMessage(authObj.token);  
            dispatch(setView(PROFILE));
        }
    }

    // Handle the key press in one of the inputs.
    // - If it is an enter press, go ahead and handle the login
    const handleKeyPress = (e) => {
        if (e.key === 'Enter')
            handleLogin();
    }

    return(
        <div className='Login'>
            <p>Bee Here Professor Login</p>
            <input ref={userInput} type="text" placeholder="Username"
                   onKeyDown={(e) => handleKeyPress(e)}></input>
            <input ref={passInput} type="password" placeholder="Password"
                   onKeyDown={(e) => handleKeyPress(e)}></input>
            <button onClick={() => handleLogin()}>Login</button>
            <p>{message}</p>
        </div>
    )
}

export default Login;