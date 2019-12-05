import { SET_CLASSROOM, CLEAR_CLASSROOM } from '../actions/classroom';

function classroomReducer(state = { classroom: null }, action) {
    switch(action.type) {
        case SET_CLASSROOM:
            return {
                ...state,
                classroom: action.payload
            }
        case CLEAR_CLASSROOM:
            return {
                ...state,
                classroom: null
            }
        default:
            return state
    }
}

export default classroomReducer;