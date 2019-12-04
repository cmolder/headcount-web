import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import viewReducer from './viewReducer';

const reducer = combineReducers({
    token: tokenReducer,
    view: viewReducer,
});

export default reducer;