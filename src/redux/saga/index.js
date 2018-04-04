import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../action/types';
import * as workspace from './workspace';
import * as auth from './auth';

function* mySaga() {
  /*
      Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
      Allows concurrent fetches of user.
      */
  yield takeEvery(types.CREATE_WORKSPACE, workspace.createWorkspace);
  yield takeEvery(types.SET_DATABASE, workspace.setDatabase);
  /*
      Alternatively you may use takeLatest.

      Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
      dispatched while a fetch is already pending, that pending fetch is cancelled
      and only the latest one will be run.
    */
  yield takeLatest(types.CHECK_WORKSPACE, auth.checkWorkspace);
}

export default mySaga;
