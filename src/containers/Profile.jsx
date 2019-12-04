import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClassroomBlock from '../components/ClassroomBlock';
import '../styles/Profile.css';

const Profile_old = () => {
  return (
	 <div className="Login">
		<div className="App">
		  <div className="App-header">
			 <p>Hello "put professor name here", activate your class below</p>
			 <select>
				<option value="volvo">Volvo</option>
				<option value="saab">Saab</option>
				<option value="mercedes">Mercedes</option>
				<option value="audi">Audi</option>
			 </select>
			 <br></br>
			 <button type="button">State Attendance</button>
			 <br></br>
			 <p>Register a new Class Below</p>
			 <form id="newClass">
				Department:<br></br>
				<input type="text" name="depart"></input>
				<br></br>
				Class Number:<br></br>
				<input type="text" name="Number"></input>
				<br></br>
				Class Name:<br></br>
				<input type="text" name="name"></input>
				<br></br>
			 </form>
			 <br></br>
			 <p>Get all attendence data:</p>
			 <button>Download Form</button>
		  </div>
		</div>
	 </div>
  );
};



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
