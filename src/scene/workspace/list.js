import React from 'react';
import Spinner from 'react-spin';
import Notifications, { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router';
import { ActionCreators } from '../../redux/action';
import InputText from '../../component/InputText';


import './index.css';

class WorkSpaceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: false,
      email: '',
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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

  onSendWorkSpaceEmail() {
    if (this.validateEmail(this.state.email)) {
      this.setState({ emailError: false });
      this.props.checkWorkSpaceUser(this.state.email);
    } else {
      this.setState({ emailError: true });
    }
  }

  render() {
    return (
      <center>
          <p className="title"></p>
          <div className="workspace-listview">
          {
            this.props.allWorkspace.map(workspace => (
              <p key={workspace.displayName}><Link className="workspace-list-item" to={`/workspace/${workspace.displayName}/auth`}>{workspace.fullName}</Link></p>
            ))
          }
          </div>
          <InputText
              placeholder="Your Email"
              isError={this.state.emailError}
              errorText="Email is invalid"
              onChange={text => this.setState({ email: text })}
              maxLength={40}
              text={this.state.email}
          />
          <button className="loginButton" onClick={() => this.onSendWorkSpaceEmail()}>
            Check Workspace Link
          </button>
      </center>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(state => ({
  me: state.authReducer.Me,
  allWorkspace: state.workspaceReducer.allWorkspace,
}), mapDispatchToProps)(WorkSpaceList);
