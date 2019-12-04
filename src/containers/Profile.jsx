import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ClassroomBlock from '../components/ClassroomBlock';
import '../styles/Profile.css';


const Profile = () => {

	const [message, setMessage] = useState('');
	const [instructor, setInstructor] = useState(null);
	const [classrooms, setClassrooms] = useState(null);

	const token = useSelector(state => state.token.token);

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

		console.log(queryObj);
		setClassrooms(queryObj);
	}
	
	const handleClassroomSelection = (classroom) => {
		console.log(classroom);
	}

	const getClassroomBlocks = () => {
		if(classrooms !== null) {
			return classrooms.map((classroom) => (
				<ClassroomBlock classroom={classroom}
								name={classroom.name}
								classNumber={classroom.department + ' ' + classroom.number}
								rosterSize={classroom.students.length}
								classCode={'000000'}
								onClick={classroom => handleClassroomSelection(classroom)}/>
			));
		}
		return <></>;
	}

	if(instructor === null)
		fetchInstructor();

	if(classrooms === null)
		fetchClassrooms();

	return(
		<div className='Profile'>
			<div className='Profile-instructor'>
				<p className='Profile-instructorTitle'>{message}</p>
				<button>Log out</button>
			</div>
			<div className='Profile-classrooms'>
				{getClassroomBlocks()}
			</div>	
		</div>
	);
}

export default Profile;
