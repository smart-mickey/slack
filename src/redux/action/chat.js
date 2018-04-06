import * as types from './types';
import * as API from './api';

export const saveUserData = user => ({
  type: types.MY_DATA,
  payload: user,
});

export const setChatData = chat => ({
  type: types.CHANNEL_CHAT_DATA,
  payload: chat,
});

export const setChatStatus = status => ({
  type: types.SET_CHAT_STATUS,
  payload: status,
});

export const sendMessage = (param, callback) => (dispatch) => {
  fetch(API.SEND_MESSAGE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: param,
  })
    .then(data => data.json())
    .then((res) => {
      if (res.status === 'error') {
        callback('error', res.message);
      } else {
        callback('success', res.message);
      }
    })
    .catch((e) => {
      callback('error', e.toString());
    });
};

export const listenChatData = (workspace, channelName, timeFor) => (dispatch) => {
  const url = `${API.FETCH_CHATS}/${workspace}/${channelName}/${timeFor}`;
  fetch(url, {
    method: 'GET',
  })
    .then(data => data.json())
    .then((res) => {
      if (res.status === 'error') {
        console.log(res.message);
        dispatch(setChatStatus(res.message));
      } else {
        dispatch(setChatStatus(''));
        dispatch(setChatData(res.message.reverse()));
      }
    })
    .catch((e) => {
      console.log('Chat Data Error: ', e.toString());
    });
};

export const getUserInfo = (userId, callback) => (dispatch) => {
  const url = `${API.GET_USER_DATA}/${userId}`;
  fetch(url, {
    method: 'GET',
  })
    .then(data => data.json())
    .then((res) => {
      if (res.error) {
        callback('?');
      } else if (res.status === 'removed') {
        callback('?');
      } else {
        callback(res.data);
      }
    })
    .catch((e) => {
      console.log('Chat Data Error: ', e.toString());
    });
};

