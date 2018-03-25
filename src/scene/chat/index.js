import React from 'react';
import Spinner from 'react-spin';
import Notifications, { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import InputText from '../../component/InputText';

import './index.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    };
  }

  render() {
    return (
      <div className="container">
        <Text>{this.props.me.username}</Text>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(state => ({
  me: state.Me,
}), mapDispatchToProps)(Chat);
