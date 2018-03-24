import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from './auth';

const reducer = combineReducers({
  loginReducer,
  routing: routerReducer,
});

export default reducer;
