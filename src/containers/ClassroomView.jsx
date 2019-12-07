import React, { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setView, PROFILE } from '../redux/actions/view';
import { setClassroom } from "../redux/actions/classroom";

// Components
import InactiveHeader from '../components/ClassroomView/InactiveHeader';
import ActiveHeader from '../components/ClassroomView/ActiveHeader';
import AttendanceBlock from '../components/ClassroomView/AttendanceBlock';
import SessionBlock from '../components/ClassroomView/SessionBlock';

import { API_URL } from '../globals';
import "../styles/ClassroomView/ClassroomView.css";


const ClassroomView = () => {

	const [attendanceList, setAttendanceList] = useState([]); // (If classroom is active) List of students who are marked present
	const [sessionList, setSessionList] = useState([]);		// (If classroom is inactive) List of previous classroom sessions

	const dispatch  = useDispatch();
	const token     = useSelector(state => state.token.token);
	const classroom = useSelector(state => state.classroom.classroom);

	const classcode = (classroom.active_session === null ? '' : classroom.active_session.class_code)

	
	// Runs from when the Classroom is loaded from the Redux store or the state
	// of the classroom is changed (i.e toggled from active/inactive).
	//
	// If the classroom was just set to active:
	// - Queries the server for the active session's AttendanceTransactions
	// - Polling process ends / restarts when the Classroom state is changed
	//
	// If the classroom was just set to inactive:
	// - Queries the server for the classroom's past ClassroomSessions
	// - Queries exactly one time when classroom is set to inactive
	//
	// The polling process ends entirely when the Active component is dismounted
	// (i.e. the user goes to another view)
	useEffect(() => {

		// If the classroom was just set to active, start polling the API for 
		// new AttendanceTransactions related to the classroom every INTERVAL ms
		if(typeof classroom !== 'undefined' && classroom.active === true) {
			const INTERVAL = 3000;

			fetchAttendanceList(classroom);  // Do not wait for the first interval period to pass
			const pollApi = setInterval(() => fetchAttendanceList(classroom), INTERVAL);
			return () => clearInterval(pollApi);
		}
		// If the classroom was just set to inactive, poll the API for
		// previous ClassroomSessions one time
		else fetchSessionList(classroom);	

	}, [classroom]);


	// Fetches the AttendanceTransactions from the server API and creates each one's
	// related attendance object.
	//
	// If the classroom is inactive, it returns before actually creating the API query.
	//
	// The Student's name and ID is obtained from a separate API query based
	// on the student's server ID in the AttendanceTransaction.
	const fetchAttendanceList = async classroom => {

		console.log('Polling the API for AttendanceTransactions...');
		if(typeof classroom === 'undefined' || classroom.active === false || classroom.active_session === null) {
			console.log("The classroom is inactive. Cancelling the polling of attendance transactions...");
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
		// and push the info into the newAttendanceList array
		let newAttendanceList = [];

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
			newAttendanceList.push({
				name: studentObj.name,
				studentId: studentObj.student_id,
			});
		}

		setAttendanceList(newAttendanceList);
	}


	// Fetches past ClassroomSessions from the server API and creates each one's
	// related session object.
	//
	// If the classroom is active, it returns before actually creating the API query.
	const fetchSessionList = async classroom => {

		console.log("Polling the API for past ClassroomSessions...");
		if(typeof classroom === 'undefined' || classroom.active === true || classroom.active_session !== null) {
			console.log("The classroom is active. Cancelling the polling of past sessions...");
			return;
		}

		// Query the list of classroom sesssions
		const queryResult = await fetch(API_URL + 'session?classroom=' + classroom.id,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': ('JWT ' + token),
			}
		});
		const queryObj = await queryResult.json();
		

		// For each session, get the list of attendanceList in a second query and
		// push the info into the new sessionList array
		let newSessionList = [];

		for (const query of queryObj) {
			const start = new Date(query.start); // Start time of session
			const end   = new Date(query.end);   // End time of session

			// Query the list of attendanceList
			let sessionAttendanceList = [];

			const attendanceListResult = await fetch(API_URL + 'attendance?session=' + query.id,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': ('JWT ' + token),
				}
			});
			const attendanceObj = await attendanceListResult.json();

			// Push each attendance transaction related to this session to the
			// session's own attendanceList array
			for (const attendance of attendanceObj) {
				sessionAttendanceList.push({
					name: attendance.name,
					studentId: attendance.studentId
				});
			}

			// Push the final object to the sessionList array
			newSessionList.push({
				start: start,
				end:   end,
				attendanceList: sessionAttendanceList,
				classSize: classroom.students.length
			});
		}

		console.log("New SessionList: ", newSessionList)
		setSessionList(newSessionList);
	}

	// Toggles the 'active' state of the classroom object
	// on Django to the value of the boolean active (true/false)
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
		// - update this component's Attendance state to hold an empty set of attendanceList
		// - update this website's Classroom state to hold the updated classroom
		if(queryObj.active !== null && queryObj.active === active) {
			dispatch(setClassroom(queryObj));
			setAttendanceList([]);
		}
	}


	// Maps the Attendance state obejects to AttendanceBlock components.
	const getAttendanceBlocks = () => {
		if(attendanceList !== null)
			return attendanceList.map(attendance => (
				<AttendanceBlock name={attendance.name}
								 studentId={attendance.studentId}/>
			));
		return <></>;
	}

	// Maps the Session state objects to SessionBlock components.
	const getSessionBlocks = () => {
		if(sessionList !== null)
			return sessionList.map(session => (
				<SessionBlock start={session.start}
							  end={session.end}
							  numAttending={session.attendanceList.length}
							  numStudents={session.classSize}/>
			))

		return <></>
	}


	const goBack = () => dispatch(setView(PROFILE));



	if(classroom.active === true) {
		return (
			<div className="ClassroomView">
				<ActiveHeader classroom={classroom}
							  classcode={classcode}
							  numAttending={(attendanceList.length)}
							  numStudents={(typeof classroom.students === 'undefined') ? 0 : classroom.students.length}
							  onBackClick={() => goBack()}
							  onEndSessionClick={() => setClassroomActiveTo(classroom, false)}/>
				<div className="ClassroomView-attendances">
					{getAttendanceBlocks()}
				</div>
			</div>
		);
	} else {
		return(
			<div className='ClassroomView'>
				<InactiveHeader classroom={classroom}
								onBackClick={() => goBack()}
								onStartSessionClick={() => setClassroomActiveTo(classroom, true)}/>
				<div className="ClassroomView-history">
					<p className="ClassroomView-historyTitle"><b>History</b></p>
					{getSessionBlocks()}
				</div>
			</div>
		)
	}
};

export default ClassroomView;
