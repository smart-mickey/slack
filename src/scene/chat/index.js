import React from 'react';
import Spinner from 'react-spin';
import Notifications, { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import io from 'socket.io-client';
import { ActionCreators } from '../../redux/action';
import InputText from '../../component/InputText';
import * as API from '../../redux/action/api';
import * as Constant from '../../lib/constant';
import ChatBubble from './bubble';
import './index.css';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentWillMount() {
    const { channelName, timeFor } = this.props;
    this.socket = io('http://localhost:3002');
    this.socket.on('message added', (channel) => {
      console.log(channel);
      // this.props.setChatData(channel.chat);
      this.props.listenChatData(channelName, timeFor);
    });
    this.socket.on('Server error', (result) => {
      alert(result);
    });
    this.socket.on('Channel Removed', (result) => {
      alert(result);
    });

    const profile = localStorage.getItem('profile');
    if (profile == null) {
      browserHistory.push('/');
    } else {
      this.props.saveUserData(JSON.parse(profile));
    }
  }

  componentDidMount() {
    const { channelName, timeFor } = this.props;
    this.props.listenChatData(channelName, timeFor);
  }

  componentDidUpdate() {
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  onTypeMessage(e) {
    this.setState({ message: e.target.value });
  }

  onSendMessage() {
    const param = `userId=${this.props.me._id}&channel=general&message=${this.state.message}`;
    this.props.sendMessage(param, (status, data) => {
      if (status === 'error') alert(data);
      else {
        setTimeout(() => {
          this.setState({ message: '' });
          this.socket.emit(
            'message added',
            {
              msg: this.state.message,
              channelName: this.props.channelName,
            },
          );
        }, 300);
      }
    });
  }

  onLogout() {
    localStorage.removeItem('profile');
    browserHistory.push('/');
  }

  getDate(ts) {
    const time = new Date(ts);
    const CT = new Date();
    const week = Constant.weekdays[time.getDay()];
    const month = Constant.months[time.getMonth()];
    let day = time.getDate();
    if (day % 10 === 1) day += 'st';
    else if (day % 10 === 2) day += 'nd';
    else if (day % 10 === 3) day += 'rd';
    else day += 'th';
    if (time.getFullYear() === CT.getFullYear()) {
      return `${week}, ${month} ${day}`;
    }
    return `${week}, ${month} ${day}, ${time.getFullYear()}`;
  }

  render() {
    return (
      <div className="container">
        <div className="row full">
            <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3 full-height">
              <div className="chat_container flex">
                <div className="chat-header">
                  <h2>Welcome, {this.props.me.username}</h2>
                  <button
                    className="chat-logout-button"
                    onClick={this.onLogout.bind(this)}
                  >
                  Log Out
                  </button>
                </div>
                <div className="full chat-message-view" id="messageList">
                {
                  this.props.chatData.map((chat) => {
                    const time = this.getDate(chat.updated_at);
                    if (this.prevTime === time) {
                      return (
                        <ChatBubble
                          chat = {chat}
                          userId={chat.userId}
                          key={chat.userId + chat.updated_at}
                        >
                          {chat.message}
                        </ChatBubble>
                      );
                    }
                    this.prevTime = time;
                    return (
                      <div key={chat.userId + chat.updated_at}>
                        <div className="chat-time-line">
                          <div/>
                          <span>{time}</span>
                          <div/>
                        </div>
                        <ChatBubble
                          chat = {chat}
                          userId={chat.userId}
                          key={chat.userId + chat.updated_at}
                        >
                          {chat.message}
                        </ChatBubble>
                      </div>
                    );
                  })
                }
                </div>
                <div className="chat-input-container">
                  <textarea
                    ref={(ref) => {
                      this.messageField = ref;
                    }}
                    placeholder="type here..."
                    maxLength={512}
                    className="message-input"
                    onChange={e => this.onTypeMessage(e)}
                    value={this.state.message}
                  />
                  <button
                      className='message-send-button'
                      onClick={e => this.onSendMessage(e)}
                      value="Log in">
                      Send
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(state => ({
  me: state.authReducer.Me,
  channelName: state.chatReducer.channelName,
  timeFor: state.chatReducer.timeFor,
  chatData: state.chatReducer.chatData,
}), mapDispatchToProps)(Chat);
