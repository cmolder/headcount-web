import React, { useState, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setView, CLASSROOM } from '../redux/actions/view';
import { clearSession } from '../redux/actions/classroom';

// Components

import { API_URL } from '../globals';
import PastSessionHeader from '../components/PastSessionView/PastSessionHeader';
import '../styles/PastSessionView/_PastSessionView.css';

const PastSessionView = () => {

    const [studentList, setStudentList] = useState([]);
    const [presentIds, setPresentIds] = useState([]);
    const [absentIds, setAbsentIds]   = useState([]);

    const dispatch  = useDispatch();
    const token     = useSelector(state => state.token.token);
    const classroom = useSelector(state => state.classroom.classroom);
    const session   = useSelector(state => state.classroom.session);


    useEffect(() => {
        if(typeof classroom !== 'undefined' && typeof session !== 'undefiend') {
            fetchStudentsFromIds(classroom.students);

            const presentIdList = session.attendanceList.map(attendance => attendance.student);
            const absentIdList  = getAbsentIds(classroom.students, presentIdList)
            setPresentIds(presentIdList);
            setAbsentIds(absentIdList);
        }
    }, []);



    const fetchStudentsFromIds = async idArray => {
        let studentObjects = [];

        for(const id of idArray) {
            const studentResult = await fetch(API_URL + 'student/' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ('JWT ' + token),
                }
            });
            const studentObj = await studentResult.json();
            studentObjects.push(studentObj);
        }
        
        setStudentList(studentObjects);
    }


    const getAbsentIds = (rosterIds, presentIds) => {
        let absentIds = [];

        for (const id of rosterIds) {
            if(presentIds.includes(id) === false)
                absentIds.push(id);
        }
        return absentIds;
    }


    const getStudentFromId = (studentObjects, studentId) => {
        for(const studentObj of studentObjects) {
            if (studentObj.id === studentId)
                return studentObj;
        }
        return { name: '' };
    }

    const formatStudent = student => {
        if(typeof student === 'undefined' || 
           typeof student.name === 'undefined' || 
           typeof student.id === 'undefined')
            return '';
        return student.name + ' (ID: ' + student.student_id + ')';
    }


    const getPresentStudents = () => {
        if(presentIds !== null)
            return presentIds.map(id => (
                <p className='PastSessionView-studenttext'>
                    {formatStudent(getStudentFromId(studentList, id))}
                </p>
            ))

        return <></>;
    }


    const getAbsentStudents = () => {
        if(absentIds !== null)
            return absentIds.map(id => (
                <p className='PastSessionView-studenttext'>
                    {formatStudent(getStudentFromId(studentList, id))}
                </p>
            ));

        return <></>;
    }


    const goBack = () => {
        dispatch(setView(CLASSROOM));
        dispatch(clearSession());
    }

    console.log('Session: ', session);
    console.log('Students:', studentList);
    

    return(
        <div className="PastSessionView">

            <PastSessionHeader classroom={classroom}
                                numAttending={presentIds.length}
                                numStudents={studentList.length}
                                onBackClick={() => goBack()}/>

            <div className="PastSessionView-attendances">
                <div className="PastSessionView-studentlist">
                    <p className="PastSessionView-studenttext"><b>Present:</b></p>
                    {getPresentStudents()}
                </div>
                <div className="PastSessionView-studentlist">
                    <p  className="PastSessionView-studenttext"><b>Absent:</b></p>
                    {getAbsentStudents()}
                </div>
            </div>            
        </div>
    )
}

export default PastSessionView;