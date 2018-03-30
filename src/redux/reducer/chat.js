import { combineReducers } from 'redux';
import * as types from '../action/types';
import createReducer from './createReducer';

const channelName = createReducer('general', {
  [types.CHANGE_CHANNEL_NAME](state, action) {
    return action.payload;
  },
});

const timeFor = createReducer(7, {
  [types.SET_TIME_FOR_CHANNEL](state, action) {
    return action.payload;
  },
});

const chatData = createReducer([], {
  [types.CHANNEL_CHAT_DATA](state, action) {
    return action.payload;
  },
});

const authReducer = combineReducers({
  channelName,
  timeFor,
  chatData,
});

export default authReducer;

