import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Notifications, { notify } from 'react-notify-toast';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import * as API from '../action/api';
import * as types from '../action/types';
import * as authAction from '../action/auth';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* checkWorkspace(action) {
  try {
    const result = yield call(authAction.checkWorkSpace, action.payload);
    yield put({ type: types.SET_WORKSPACE, result });
    // browserHistory.push(`/workspace/${workspace.message.displayName}/auth`);
  } catch (e) {
    notify.show(e.message, 'error', 5000, null);
    console.log(e.message);
  }
}
