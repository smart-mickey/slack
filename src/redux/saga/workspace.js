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
    console.log('workspace: ', workspace);
    if (workspace.status === 'error') notify.show(workspace.message, 'error', 5000, null);
    yield put({ type: types.SET_WORKSPACE, workspace });
    yield put({ type: types.CREATING_WORKSPACE, payload: false });
    browserHistory.push(`/workspace/${workspace.message.displayName}/auth`);
  } catch (e) {
    notify.show(e.message, 'error', 5000, null);
    yield put({ type: types.CREATING_WORKSPACE, payload: true });
  }
}

export function* setDatabase(action) {
  try {
    const database = yield call(workspaceAction.set_Database, action.payload);
    console.log('Database', action.payload);
    yield put({ type: types.SET_DATABASE_SUCCESS, message: action.payload });
  } catch (e) {
    yield put({ type: types.SET_DATABASE_FAILED, message: e.message });
  }
}

