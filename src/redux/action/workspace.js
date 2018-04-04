import * as types from './types';
import * as API from './api';

export const saveUserData = user => ({
  type: types.MY_DATA,
  payload: user,
});

export const createWorkSpace = param => ({
  type: types.CREATE_WORKSPACE,
  payload: param,
});

export const setDatabase = name => ({
  type: types.SET_DATABASE,
  payload: `name=${name}`,
});

export function create_WorkSpace(param) {
  console.log(param);
  return fetch(API.CREATE_WORKSPACE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: param,
  })
    .then(response => response.json())
    .then(data => data);
}

export function set_Database(param) {
  return fetch(API.SET_DATABASE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: param,
  })
    .then(response => response.json())
    .then(data => data);
}
