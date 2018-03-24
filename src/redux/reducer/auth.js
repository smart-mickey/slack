import { combineReducers } from 'redux';
import * as types from '../action/types';
import createReducer from './createReducer';

const Me = createReducer({}, {
  [types.MY_DATA](state, action) {
    return action.payload;
  },
});

const loginReducer = combineReducers({
  Me,
});

export default loginReducer;

