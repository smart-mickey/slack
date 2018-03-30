import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import chatReducer from './chat';

const reducer = combineReducers({
  authReducer,
  chatReducer,
  routing: routerReducer,
});

export default reducer;
