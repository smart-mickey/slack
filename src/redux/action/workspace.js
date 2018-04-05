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

export const fetchWorkspaceList = () => ({
  type: types.GET_WORKSPACE_LIST,
});

export const setDatabase = name => ({
  type: types.SET_DATABASE,
  payload: name,
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

export const set_Database = name => fetch(API.SET_DATABASE, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: `name=${name}`,
})
  .then(response => response.json())
  .then(data => data);

export const getWorkspace = () => fetch(API.GET_WORKSPACE, {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => data);
