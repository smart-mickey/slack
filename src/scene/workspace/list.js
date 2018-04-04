import React from 'react';
import Spinner from 'react-spin';
import Notifications, { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { ActionCreators } from '../../redux/action';
import InputText from '../../component/InputText';


import './index.css';

class WorkSpaceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  showToast(msg, type) {
    if (!this.mounted) return;
    const myColor = { background: 'green', text: '#FFFFFF' };
    if (type === 'error') {
      notify.show(msg, 'error', 5000, null);
    } else {
      notify.show(msg, 'custom', 5000, myColor);
    }
    this.setState({ isLoading: false });
  }

  render() {
    return (
        <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
            <center>
                <p className="title">WorkSpace List</p>
            </center>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(state => ({
  me: state.authReducer.Me,
}), mapDispatchToProps)(WorkSpaceList);
