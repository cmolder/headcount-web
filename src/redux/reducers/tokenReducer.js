import { SET_TOKEN, CLEAR_TOKEN } from '../actions/token';

function tokenReducer(state = { token: '' }, action) {
    switch(action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case CLEAR_TOKEN:
            return {
                ...state,
                token: ''
            }
        default:
            return state;
    }
}

export default tokenReducer;