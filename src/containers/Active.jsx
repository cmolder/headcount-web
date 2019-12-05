import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from 'react-redux';

import { setView, PROFILE } from '../redux/actions/view';

import InactiveHeader from '../components/Active/InactiveHeader';
import ActiveHeader from '../components/Active/ActiveHeader';
import AttendanceBlock from '../components/Active/AttendanceBlock';
import "../styles/Active/Active.css";
import { setClassroom } from "../redux/actions/classroom";

const Active = () => {

	const [attendances, setAttendances] = useState(null);

	const dispatch  = useDispatch();
	const token     = useSelector(state => state.token.token);
	const classroom = useSelector(state => state.classroom.classroom);

	const classcode = (classroom.active_session === null ? '' : classroom.active_session.class_code)
	
	async function fetchAttendances() {

		let newAttendances = [];

		if(classroom.active_session === null)
			return;

		// Query the list of attendance transactions
		const queryResult = await fetch('https://headcount-server.herokuapp.com/api/attendance?session=' + classroom.active_session.id,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ('JWT ' + token),
			}
		});
		const queryObj = await queryResult.json();

		// For each attendance transaction, get the student's info in a second query
		// and push the info into the new attendances array
		// (TODO) is there a clean way to integrate this into the serializer?
		for (const query of queryObj) {
			const studentServerId = query.student;
			const studentResult = await fetch('https://headcount-server.herokuapp.com/api/student/' + studentServerId,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': ('JWT ' + token),
				}
			});
			const studentObj = await studentResult.json();
			newAttendances.push({
				name: studentObj.name,
				studentId: studentObj.student_id,
			});
		}

		// console.log(newAttendances);
		setAttendances(newAttendances);
	}

	async function setActiveSession(activeBool) {
		// PATCH the classroom object to be not active
		// (Server automatically deactivates the classroom for you)
		const classroomResult = await fetch('https://headcount-server.herokuapp.com/api/classroom/' + classroom.id, 
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ('JWT ' + token),
			},
			body: JSON.stringify({
				'active': activeBool,
			}),
		});

		// Returns a Classroom object
		const classroomObj = await classroomResult.json();

		// If the deactivation request was succesful,
		// update the classroom state to hold the deactivated classroom
		if(classroomObj.active !== null && classroomObj.active === activeBool)
			dispatch(setClassroom(classroomObj));
			setAttendances([]);
	}

	const goBack = () => dispatch(setView(PROFILE));

	const getAttendanceBlocks = () => {
		if(attendances !== null)
			return attendances.map(attendance => (
				<AttendanceBlock name={attendance.name}
								 studentId={attendance.studentId}/>
			));
		return <></>;
	}

	if(attendances === null) {
		const pollFunction = (func, timeout = 60000, interval = 1000) => {
			let startTime = (new Date()).getTime();
			
			(function poll(){
				func();
				if(((new Date()).getTime() - startTime) < timeout)
					setTimeout(poll, interval);
			})();
		}

		// Need to re-check attendances every interval ms
		// to see if any have been added to the session
		pollFunction(fetchAttendances, 600000, 3000);
	}

	if(classroom.active === true)
		return (
			<div className="Active">
				<ActiveHeader classcode={classcode}
							onBackClick={() => goBack()}
							onEndSessionClick={() => setActiveSession(false)}/>
				<div className="Active-attendances">
					{getAttendanceBlocks()}
				</div>
			</div>
		);
	else return(
		<div className='Active'>
			<InactiveHeader onBackClick={() => goBack()}
							onStartSessionClick={() => setActiveSession(true)}/>
			<div className="Active-attendances">
			</div>
		</div>
	)
};

export default Active;
