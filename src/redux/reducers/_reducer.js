import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';

const reducer = combineReducers({
    token: tokenReducer,
});

export default reducer;