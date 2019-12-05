import React, { useState } from "react";

// Redux
import { useSelector, useDispatch } from 'react-redux';

import { setView, PROFILE } from '../redux/actions/view';

import InactiveHeader from '../components/Active/InactiveHeader';
import ActiveHeader from '../components/Active/ActiveHeader';
import AttendanceBlock from '../components/Active/AttendanceBlock';
import "../styles/Active/Active.css";

const Active = () => {

	const [attendances, setAttendances] = useState(null);

	const dispatch  = useDispatch();
	const token     = useSelector(state => state.token.token);
	const classroom = useSelector(state => state.classroom.classroom);

	const classcode = (classroom.active_session === null ? '' : classroom.active_session.class_code)
	
	async function fetchAttendances() {

		let newAttendances = [];

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
			newAttendances.push(studentObj.name);
		}

		console.log(newAttendances);
		setAttendances(newAttendances);
	}

	const goBack = () => dispatch(setView(PROFILE));

	const getAttendanceBlocks = () => {
		if(attendances !== null)
			return attendances.map(attendance => (
				<AttendanceBlock name={attendance}/>
			));
		return <></>;
	}

	if(attendances === null)
		fetchAttendances();

	return (
		<div className="Active">
			<ActiveHeader classcode={classcode}
										onBackClick={() => goBack()}/>
			<div className="Active-attendances">
				{getAttendanceBlocks()}
			</div>
		</div>
	);
};

export default Active;
