import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setView, PROFILE, ACTIVE } from '../redux/actions/view';
import { setClassroom } from "../redux/actions/classroom";

// Components
import InactiveHeader from '../components/Active/InactiveHeader';
import ActiveHeader from '../components/Active/ActiveHeader';
import AttendanceBlock from '../components/Active/AttendanceBlock';

import { API_URL } from '../globals';
import "../styles/Active/Active.css";


const Active = () => {

	const [attendances, setAttendances] = useState([]);

	const dispatch  = useDispatch();
	const token     = useSelector(state => state.token.token);
	const classroom = useSelector(state => state.classroom.classroom);

	const classcode = (classroom.active_session === null ? '' : classroom.active_session.class_code)

	// Runs from when the Classroom is loaded from the Redux store, querying the
	// server for its associated active session's AttendanceTransactions
	// (if the classroom is currently active)
	//
	// The polling process restarts when the Classroom is changed (i.e the Classroom
	// is toggled from active/inactive)
	//
	// The polling process ends entirely when the Active component is dismounted
	// (i.e. the user goes to another view)
	useEffect(() => {
		fetchAttendances(classroom); // Do not wait for the first interval period to pass
									 // before initially fetching the AttendanceTransactions

		const pollApi = setInterval(() => {
			// console.log('Polling the API for AttendanceTransactions...');
			// console.log('Using this classroom...', classroom);
			fetchAttendances(classroom);
		}, 3000);

		return () => clearInterval(pollApi);
	}, [classroom]);


	// Fetches the AttendanceTransactions from the server API and creates each one's
	// related attendance object.
	//
	// The Student's name and ID is obtained from a separate API query based
	// on the student's server ID in the AttendanceTransaction.
	const fetchAttendances = async classroom => {

		if(typeof classroom === 'undefined' || classroom.active === false || classroom.active_session === null) {
			// console.log("The classroom is inactive. Cancelling poll process...");
			return;
		}

		// Query the list of attendance transactions
		const queryResult = await fetch(API_URL + 'attendance?session=' + classroom.active_session.id,
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
		let newAttendances = [];

		for (const query of queryObj) {
			const studentServerId = query.student;
			const studentResult = await fetch(API_URL + 'student/' + studentServerId,
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

		setAttendances(newAttendances);
	}

	const setClassroomActiveTo = async (classroom, active) => {
		// PATCH the classroom object to be not active
		// (Server automatically deactivates the classroom for you)
		const queryResult = await fetch(API_URL + 'classroom/' + classroom.id, 
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ('JWT ' + token),
			},
			body: JSON.stringify({
				'active': active,
			}),
		});

		// Returns a Classroom object
		const queryObj = await queryResult.json();

		// If the activation/deactivation request was succesful,
		// - update this component's Attendance state to hold an empty set of attendances
		// - update this website's Classroom state to hold the updated classroom
		if(queryObj.active !== null && queryObj.active === active) {
			dispatch(setClassroom(queryObj));
			setAttendances([]);
		}
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


	if(classroom.active === true)
		return (
			<div className="Active">
				<ActiveHeader classroom={classroom}
							  classcode={classcode}
							  numAttending={(attendances.length)}
							  numStudents={(typeof classroom.students === 'undefined') ? 0 : classroom.students.length}
							  onBackClick={() => goBack()}
							  onEndSessionClick={() => setClassroomActiveTo(classroom, false)}/>
				<div className="Active-attendances">
					{getAttendanceBlocks()}
				</div>
			</div>
		);
	else return(
		<div className='Active'>
			<InactiveHeader classroom={classroom}
							onBackClick={() => goBack()}
							onStartSessionClick={() => setClassroomActiveTo(classroom, true)}/>
			<div className="Active-attendances">
			</div>
		</div>
	)
};

export default Active;
