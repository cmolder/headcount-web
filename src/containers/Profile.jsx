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
	const [instructor, setInstructor] = useState(null); // Object containing instructor's data
	const [classrooms, setClassrooms] = useState(null); // List of classrooms to be presented in this VIew

	const dispatch = useDispatch();
	const token    = useSelector(state => state.token.token);

	// Runs only when the Profile component is initially oaded
	// (i.e. the user just went to this page from another view)
	//
	// Polls the API first for the instructor based on the logged-in user, 
	// then polls the API for the logged-in user's associated classrooms that
	// they are the instructor of.
	useEffect(() => {
		fetchInstructor();
		fetchClassrooms();
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
		
		if('detail' in queryObj) 		// If the request had a mistake / server had an error
			console.error(queryObj.detail);
		else if (queryObj.length > 0) 
			setInstructor(queryObj[0]);
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
	
	const handleClassroomSelection = classroom => {
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
		
	return(
		<div className='Profile'>
			<div className='Profile-instructor'>
				<p className='Profile-instructorTitle'>
					{(instructor === null) ? 'No instructor found.' : 'Hello, ' + instructor.title + ' ' + instructor.name + '.'}
				</p>
				<button onClick={() => logout()}>Log out</button>
			</div>
			<div className='Profile-classrooms'>
				{getClassroomBlocks()}
			</div>	
		</div>
	);
}

export default Profile;
