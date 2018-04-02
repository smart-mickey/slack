import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import './index.css';

class ChatLeftBar extends React.Component {
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
    const { isOpen, me } = this.props;
    return (
      <div className={isOpen ? 'chat-more-open' : 'chat-more'}>
        Left Bar
      </div>
    );
  }
}

ChatLeftBar.propTypes = {
  isOpen: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(state => ({
  me: state.authReducer.Me,
}), mapDispatchToProps)(ChatLeftBar);