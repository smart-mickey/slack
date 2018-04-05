import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import chatReducer from './chat';
import workspaceReducer from './workspace';
import errorReducer from './error';

const reducer = combineReducers({
  authReducer,
  chatReducer,
  workspaceReducer,
  errorReducer,
  routing: routerReducer,
});

export default reducer;
