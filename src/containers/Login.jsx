import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../redux/actions/token';
import '../styles/Login.css';

const Login = () => {

    const dispatch = useDispatch();      // Items to/from Redux store
    const token    = useSelector(state => state.token.token);
 
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

        if(typeof authObj.token === 'undefined')
            console.log("Error authenticating");
        else {
            console.log("token: ", authObj.token);
            dispatch(setToken(authObj.token));
        }
    }

    return(
        <div className='Login'>
            <p>Bee Here Professor Login</p>
            <input ref={userInput} type="text" placeholder="Username" name="username"></input>
            <input ref={passInput} type="password" placeholder="Password" name="password"></input>
            <button onClick={() => handleLogin()}>Login</button>
            <p>{token}</p>
        </div>
    )
}

export default Login;