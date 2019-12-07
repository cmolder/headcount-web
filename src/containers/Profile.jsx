import React, { useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

import { clearToken } from '../redux/actions/token';
import { setView, LOGIN, ACTIVE }  from '../redux/actions/view';
import { setClassroom } from '../redux/actions/classroom';

import ClassroomBlock from '../components/Profile/ClassroomBlock';

import { API_URL } from '../globals';
import '../styles/Profile/Profile.css';


const Profile = () => {
	const [message, setMessage] = useState('');			// Greeting message (Hello, NAME) or error message if something went wrong
	const [instructor, setInstructor] = useState(null); // Object containing instructor's data
	const [classrooms, setClassrooms] = useState(null); // List of classrooms to be presented in this VIew

	const dispatch = useDispatch();
	const token = useSelector(state => state.token.token);

	// These useEffect hooks are run only on the first Profile component render
	//
	// The first fetches the Instructor associated with the logged-in user,
	// The second starts the API poll process for the instructor's Classrooms
	//
	// The second hook's polling process ends when the Profile component 
	// is unmounted (i.e. the user goes to another view)
	useEffect(() => { fetchInstructor() }, [])

	useEffect(() => {
		fetchClassrooms(); // Do not wait for the first API poll
		const pollApi = setInterval(() => {
			// console.log('Polling the API for Classrooms..');
			fetchClassrooms();
		}, 3000);

		return () => clearInterval(pollApi);
	}, []);

	// Helper functions
	const fetchInstructor = async () => {
		const queryResult = await fetch(API_URL + 'instructor?is_user=True',
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
			setMessage(queryObj.detail);
		else if (queryObj.length < 1)
			setMessage('No instructor found');
		else {
			let instructor = queryObj[0];
			setInstructor(instructor);
			setMessage(instructor.title + ' ' + instructor.name);
		}
	}

	const fetchClassrooms = async () => {
		
		const queryResult = await fetch(API_URL + 'classroom?is_instructor=True',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ('JWT ' + token),
			}
		});
		const queryObj = await queryResult.json();
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
