import { SET_VIEW } from '../actions/view';
import { LOGIN } from '../actions/view';

function viewReducer(state = { view: LOGIN }, action) {
    switch(action.type) {
        case SET_VIEW:
            return {
                ...state,
                view: action.payload
            }
        default:
            return state;
    }
}

export default viewReducer;