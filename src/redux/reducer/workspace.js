import { combineReducers } from 'redux';
import * as types from '../action/types';
import createReducer from './createReducer';

const workspace = createReducer({}, {
  [types.SET_WORKSPACE](state, action) {
    return action.workspace;
  },
  [types.CREATE_WORKSPACE_FAILED](state, action) {
    return { status: 'error' };
  },
});

const allWorkspace = createReducer([], {
  [types.GET_WORKSPACE_SUCCESS](state, action) {
    return action.payload;
  },
  [types.GET_WORKSPACE_FAILED](state, action) {
    return [];
  },
});

const creating = createReducer(false, {
  [types.CREATING_WORKSPACE](state, action) {
    return action.payload;
  },
});

const workspaceReducer = combineReducers({
  workspace,
  allWorkspace,
  creating,
});

export default workspaceReducer;
