import * as types from './types';
import * as API from './api';

export const setErrorText = error => ({
  type: types.ERROR_TEXT,
  payload: error,
});
