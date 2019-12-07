import { SET_CLASSROOM, CLEAR_CLASSROOM, SET_SESSION, CLEAR_SESSION } from '../actions/classroom';

function classroomReducer(state = { classroom: null }, action) {
    switch(action.type) {
        case SET_CLASSROOM:
            return {
                ...state,
                classroom: action.payload,
                session: null,
            }
        case CLEAR_CLASSROOM:
            return {
                ...state,
                classroom: null,
                session: null,
            }
        case SET_SESSION:
            return {
                ...state,
                session: action.payload,
            }
        case CLEAR_SESSION:
            return {
                ...state,
                session: null,
            }
        default:
            return state
    }
}

export default classroomReducer;