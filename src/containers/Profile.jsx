import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

import { clearToken } from '../redux/actions/token';
import { setView, LOGIN, ACTIVE }  from '../redux/actions/view';
import { setClassroom } from '../redux/actions/classroom';

import ClassroomBlock from '../components/Profile/ClassroomBlock';
import '../styles/Profile.css';


const Profile = () => {

	// TODO cancel API pinging when we leave this state

	const [message, setMessage] = useState('');
	const [instructor, setInstructor] = useState(null);
	const [classrooms, setClassrooms] = useState(null);

	const dispatch = useDispatch();
	const token = useSelector(state => state.token.token);

	// Helper functions
	async function fetchInstructor() {
		const queryResult = await fetch('https://headcount-server.herokuapp.com/api/instructor?is_user=True',
		{	
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ('JWT ' + token),
			}
		});
		const queryObj = await queryResult.json();
		
		// If the request had a mistake / server had an error
		if('detail' in queryObj)
			setMessage(queryObj['detail']);
		else if (queryObj.length < 1)
			setMessage('No instructor found');
		else {
			let instructor = queryObj[0];
			setInstructor(instructor);
			setMessage(instructor['title'] + ' ' + instructor['name']);
		}
	}

	async function fetchClassrooms() {
		
		const queryResult = await fetch('https://headcount-server.herokuapp.com/api/classroom?is_instructor=True',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ('JWT ' + token),
			}
		});
		const queryObj = await queryResult.json();

		// TODO verify that there are actual classrooms here
		setClassrooms(queryObj);
	}

	const logout = () => {
		dispatch(clearToken());
		dispatch(setView(LOGIN));
	}
	
	const handleClassroomSelection = (classroom) => {
		dispatch(setClassroom(classroom));
		dispatch(setView(ACTIVE));
	}

	const getClassroomBlocks = () => {
		if(classrooms !== null) {
			return classrooms.map((classroom) => (
				<ClassroomBlock classroom={classroom}
								name={classroom.name}
								number={classroom.department + ' ' + classroom.number}
								rosterSize={classroom.students.length}
								session={classroom.active_session}
								onClick={classroom => handleClassroomSelection(classroom)}/>
			));
		}
		return <></>;
	}

	// Code execution begins here
	if(instructor === null)
		fetchInstructor();

	if(classrooms === null) {
		const pollFunction = (func, timeout = 60000, interval = 1000) => {
			let startTime = (new Date()).getTime();
			
			(function poll(){
				func();
				if(((new Date()).getTime() - startTime) < timeout)
					setTimeout(poll, interval);
			})();
		}
		
		// Need to re-check classrooms every interval ms
		// to see if any have been deactivated
		pollFunction(fetchClassrooms, 600000, 3000);
	}
		

	return(
		<div className='Profile'>
			<div className='Profile-instructor'>
				<p className='Profile-instructorTitle'>{message}</p>
				<button onClick={() => logout()}>Log out</button>
			</div>
			<div className='Profile-classrooms'>
				{getClassroomBlocks()}
			</div>	
		</div>
	);
}

export default Profile;
