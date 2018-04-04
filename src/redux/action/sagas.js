import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Notifications, { notify } from 'react-notify-toast';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import * as API from './api';
import * as types from './types';
import * as workspaceAction from './workspace';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* createWorkspace(action) {
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

function* setDatabase(action) {
  try {
    const database = yield call(workspaceAction.set_Database, action.payload);
    yield put({ type: types.SET_DATABASE, database });
  } catch (e) {
    yield put({ type: types.SET_DATABASE_FAILED, message: e.message });
  }
}


function* mySaga() {
  /*
    Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
    Allows concurrent fetches of user.
    */
  yield takeEvery(types.CREATE_WORKSPACE, createWorkspace);
  yield takeEvery(types.SET_DATABASE, setDatabase);
  /*
    Alternatively you may use takeLatest.

    Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
    dispatched while a fetch is already pending, that pending fetch is cancelled
    and only the latest one will be run.
  */
}

export default mySaga;
