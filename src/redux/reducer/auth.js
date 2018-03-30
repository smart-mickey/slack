import { combineReducers } from 'redux';
import * as types from '../action/types';
import createReducer from './createReducer';

const Me = createReducer({
  email: '',
  username: '',
}, {
  [types.MY_DATA](state, action) {
    return action.payload;
  },
});

const authReducer = combineReducers({
  Me,
});

export default authReducer;

