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
    const result = yield call(authAction.checkWorkSpace, action.payload);
    if (result.status === 'error') {
      yield put({ type: types.CHECK_WORKSPACE_FAILED });
      yield put({ type: types.ERROR_TEXT, payload: `The Workpace <${action.payload}> doesn't exist` });
      browserHistory.push('/invalid');
    } else {
      yield put({ type: types.SET_WORKSPACE, workspace: result.message });
    }
  } catch (e) {
    yield put({ type: types.CHECK_WORKSPACE_FAILED });
    yield put({ type: types.ERROR_TEXT, payload: e.message });
    browserHistory.push('/invalid');
  }
}
