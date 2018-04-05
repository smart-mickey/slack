import { combineReducers } from 'redux';
import * as types from '../action/types';
import createReducer from './createReducer';

const errorText = createReducer('Unexpected Error', {
  [types.ERROR_TEXT](state, action) {
    return action.payload;
  },
});

const errorReducer = combineReducers({
  errorText,
});

export default errorReducer;

