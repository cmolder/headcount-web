import React from 'react';
import { useSelector } from 'react-redux';
import { PROFILE, ACTIVE, LOGIN } from '../redux/actions/view';
import Login from './Login';
import Active from './Active';
import Profile from './Profile';

import "../styles/App.css";

function App() {
	const view	= useSelector(state => state.view.view); 

	switch(view) {
		case ACTIVE: {
			return (
				<div className="App">
					<Active/>
				</div>
			);
		}

		case PROFILE: {
			return (
				<div className="App">
					<Profile/>
				</div>
			);
		}

		case LOGIN:
		default: { 
			return (
				<div className="App">
					<Login />
					</div>
			);
		}
	}
}

export default App;
