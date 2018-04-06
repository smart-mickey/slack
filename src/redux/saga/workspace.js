import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Notifications, { notify } from 'react-notify-toast';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import * as API from '../action/api';
import * as types from '../action/types';
import * as workspaceAction from '../action/workspace';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* createWorkspace(action) {
  try {
    yield put({ type: types.CREATING_WORKSPACE, payload: true });
    const workspace = yield call(workspaceAction.create_WorkSpace, action.payload);
    yield put({ type: types.CREATING_WORKSPACE, payload: false });
    if (workspace.status === 'error') {
      notify.show(workspace.message, 'error', 5000, null);
    } else {
      yield put({ type: types.SET_WORKSPACE, workspace: workspace.message });
      browserHistory.push(`/workspace/${workspace.message.displayName}/auth`);
    }
  } catch (e) {
    notify.show(e.message, 'error', 5000, null);
    yield put({ type: types.CREATING_WORKSPACE, payload: true });
  }
}

export function* getWorkspace() {
  try {
    const workspaces = yield call(workspaceAction.getWorkspace);
    yield put({ type: types.GET_WORKSPACE_SUCCESS, payload: workspaces.message });
  } catch (e) {
    yield put({ type: types.GET_WORKSPACE_FAILED, message: e.message });
  }
}

