import { combineReducers } from 'redux';
import * as types from '../action/types';
import createReducer from './createReducer';


const appState = createReducer(false, {
  [types.WELCOME](state, action) {
    return action.state;
  },
});

const loginReducer = combineReducers({
  appState,
});

export default loginReducer;

