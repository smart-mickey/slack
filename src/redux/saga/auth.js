import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Notifications, { notify } from 'react-notify-toast';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import * as API from '../action/api';
import * as types from '../action/types';
import * as authAction from '../action/auth';
import * as workspaceAction from '../action/workspace';


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* checkWorkspace(action) {
  try {
    // const advance = yield call(workspaceAction.set_Database, 'all-workspace');
    const result = yield call(authAction.checkWorkSpace, action.payload);
    console.log('Check WorkSpace: ', result);
    if (result.status === 'error') {
      yield put({ type: types.CREATE_WORKSPACE_FAILED });
      browserHistory.push('/invalid');
    } else {
      yield put({ type: types.SET_WORKSPACE, workspace: result.message });
      yield put({ type: types.SET_DATABASE, payload: result.message.displayName });
    }
  } catch (e) {
    console.log(e.message);
    yield put({ type: types.CREATE_WORKSPACE_FAILED });
    browserHistory.push('/invalid');
  }
}
