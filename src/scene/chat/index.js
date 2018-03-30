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
      this.props.setChatData(channel.chat);
    });
    this.socket.on('Server error', (result) => {
      alert(result);
    });
    this.socket.on('Channel Removed', (result) => {
      alert(result);
    });

    this.socket.emit(
      'message added',
      {
        msg: this.state.message,
        channelName: this.props.channelName,
      },
    );

    const profile = localStorage.getItem('profile');
    if (profile == null) {
      browserHistory.push('/');
    } else {
      this.props.saveUserData(JSON.parse(profile));
    }
  }

  componentDidMount() {

    // this.props.listenChatData(channelName, timeFor);
  }

  onListenChatData(chatData) {
    console.log(chatData);
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

  render() {
    return (
      <div className="container">
        <div className="row full">
            <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3 full-height">
              <div className="chat_container full-height flex">
                <div className="chat-header">
                  <h2>Welcome, {this.props.me.username}</h2>
                  <button
                    className="chat-logout-button"
                    onClick={this.onLogout.bind(this)}
                  >
                  Log Out
                  </button>
                </div>
                <div className="full chat-message-view">
                {
                  this.props.chatData.map(chat => (
                      <ChatBubble
                        chat = {chat}
                        userId={chat.userId}
                        key={chat.userId + chat.updated_at}
                      >
                        {chat.message}
                      </ChatBubble>
                    ))
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
