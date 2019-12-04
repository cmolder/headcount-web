import { SET_TOKEN } from '../actions/token';

function tokenReducer(state = { token: '' }, action) {
    switch(action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}

export default tokenReducer;