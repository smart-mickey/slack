import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import { ActionCreators } from '../../redux/action';
import './index.css';

Moment.globalFormat = 'YYYY MMM DD    HH:mm';

class ChatBubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '?',
    };
  }

  componentDidMount() {
    this.props.getUserInfo(this.props.userId, (user) => {
      if (user === '?') return;
      this.setState({ name: user.username });
    });
  }

  simplifyName(name) {
    const letter = name.split(' ');
    if (letter.length === 1) {
      return letter[0].substring(0, 1);
    }
    return letter[0].substring(0, 1).toUpperCase() + letter[1].substring(0, 1).toUpperCase();
  }

  render() {
    const { me, userId, chat } = this.props;
    return (
      <div className = "chat-bubble-left">
        <div className="chat-bubble-name"><span>{this.simplifyName(this.state.name)}</span></div>
        <div className="chat-bubble-message full">
          <p className="chat-bubble-fullname">{this.state.name}</p>
          <p>{this.props.chat.message}</p>
        </div>
        <div className="chat-bubble-time">
        <Moment element='span'>{`${new Date(chat.updated_at)}`}</Moment>
        </div>
      </div>
    );
  }
}

ChatBubble.propTypes = {
  userId: PropTypes.string.isRequired,
  chat: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(state => ({
  me: state.authReducer.Me,
}), mapDispatchToProps)(ChatBubble);
