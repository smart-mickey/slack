import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from './login';

const reducer = combineReducers({
  loginReducer,
  routing: routerReducer,
});

export default reducer;
