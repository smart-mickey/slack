import * as types from './types';
import * as API from './api';

export const saveUserData = user => ({
  type: types.MY_DATA,
  payload: user,
});

export const checkWorkspace = workspace => ({
  type: types.CHECK_WORKSPACE,
  payload: workspace,
});

export const login = (param, callback) => (dispatch) => {
  fetch(API.LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: param,
  })
    .then(data => data.json())
    .then((res) => {
      if (res.message === 'error') {
        callback('error', res.data);
      } else {
        callback('success', res.message);
        dispatch(saveUserData(res.message));
      }
    })
    .catch((e) => {
      callback('error', e.toString());
    });
};

export const register = (param, callback) => (dispatch) => {
  fetch(API.REGISTER, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: param,
  })
    .then(data => data.json())
    .then((res) => {
      if (res.message === 'exist') {
        callback('error', 'User is already exist or signup error');
      } else {
        callback('success', res.message);
        dispatch(saveUserData(res.message));
      }
    })
    .catch((e) => {
      callback('error', e.toString());
    });
};

export function checkWorkSpace(param) {
  return fetch(API.CHECK_WORKSPACE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `name=${param}`,
  })
    .then(response => response.json())
    .then(data => data);
}
