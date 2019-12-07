import React from 'react';

import { useSelector } from 'react-redux';
import { PAST_SESSION, PROFILE, CLASSROOM, LOGIN } from '../redux/actions/view';

import LoginView from './LoginView';
import ClassroomView from './ClassroomView';
import ProfileView from './ProfileView';
import PastSessionView from './PastSessionView';

import "../styles/App.css";

function App() {
	const view	= useSelector(state => state.view.view); 

	switch(view) {
		case CLASSROOM: {
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

		case PAST_SESSION: {
			return (
				<div className='App'>
					<PastSessionView/>
				</div>
			)
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
