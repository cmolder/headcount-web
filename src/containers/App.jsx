import React from 'react';

import { useSelector } from 'react-redux';
import { PROFILE, ACTIVE, LOGIN } from '../redux/actions/view';

import LoginView from './LoginView';
import ClassroomView from './ClassroomView';
import ProfileView from './ProfileView';

import "../styles/App.css";

function App() {
	const view	= useSelector(state => state.view.view); 

	switch(view) {
		case ACTIVE: {
			return (
				<div className="App">
					<ClassroomView/>
				</div>
			);
		}

		case PROFILE: {
			return (
				<div className="App">
					<ProfileView/>
				</div>
			);
		}

		case LOGIN:
		default: { 
			return (
				<div className="App">
					<LoginView/>
				</div>
			);
		}
	}
}

export default App;
