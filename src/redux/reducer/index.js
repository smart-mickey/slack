import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import chatReducer from './chat';
import workspaceReducer from './workspace';

const reducer = combineReducers({
  authReducer,
  chatReducer,
  workspaceReducer,
  routing: routerReducer,
});

export default reducer;
