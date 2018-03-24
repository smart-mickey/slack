import * as types from './types';
import * as API from './api';

export const saveUserData = user => ({
  type: types.MY_DATA,
  payload: user,
});

export const login = (param, callback) => (dispatch) => {
  fetch(API.API_LOGIN, {
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
      }
    })
    .catch((e) => {
      callback('error', e.toString());
    });
};

export const register = (param, callback) => (dispatch) => {
  fetch(API.API_REGISTER, {
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
        callback(res.message, res.data);
        dispatch(saveUserData(res.data));
      }
    })
    .catch((e) => {
      callback('error', e.toString());
    });
};

