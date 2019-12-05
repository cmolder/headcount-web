import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import viewReducer from './viewReducer';
import classromReducer from './classroomReducer';

const reducer = combineReducers({
    token: tokenReducer,
    view: viewReducer,
    classroom: classromReducer
});

export default reducer;