// --- Dependencies ---
import React from "react";
import ReactDOM from "react-dom";

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './redux/reducers/_reducer';

import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";


// Redux store
const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
