import React, { PropTypes } from 'react';
import Spinner from 'react-spin';
import Notifications, { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { ActionCreators } from '../../redux/action';
import InputText from '../../component/InputText';


import './index.css';

class CreateWorkSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabState: 'list',
      isLoading: false,
      hoverState: '',
      fullname: '',
      errorState: '',
      displayname: '',
      email: '',
      password: '',
      confirm: '',
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  CreateWorkSpace() {
    this.setState({ isLoading: true });
    this.props.onState(true);
    const {
      fullname, displayname, email, password, confirm, isLoading,
    } = this.state;
    if (fullname === '') {
      this.setState({ errorState: 'fullname' });
      return;
    } else if (displayname === '') {
      this.setState({ errorState: 'displayname' });
      return;
    } else if (!this.validateEmail(email)) {
      this.setState({ errorState: 'email' });
      return;
    } else if (password.length < 8) {
      this.setState({ errorState: 'password' });
      return;
    } else if (password !== confirm) {
      this.setState({ errorState: 'confirm' });
      return;
    }
    const param = `fullname=${fullname}&displayname=${displayname}&admin=${email}&password=${password}`;
    this.props.createWorkSpace(param);
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
    const {
      tabState, hoverState, errorState, fullname,
      displayname, email, password, confirm, isLoading,
    } = this.state;
    return (
      <center>
          <p className="title"></p>
          <InputText
              placeholder="Full name"
              isError={errorState === 'fullname'}
              errorText="Please enter your fullname"
              onChange={text => this.setState({ fullname: text })}
              text={fullname}
              maxLength={20}
          />
          <InputText
              placeholder="Display name"
              isError={errorState === 'displayname'}
              errorText="Please enter your display name"
              onChange={text => this.setState({ displayname: text })}
              text={displayname}
              maxLength={20}
          />
          <InputText
              placeholder="Admin's email"
              isError={errorState === 'email'}
              errorText="Invalid email"
              onChange={text => this.setState({ email: text })}
              text={email}
              maxLength={40}
          />
          <InputText
              placeholder="Password"
              isError={errorState === 'password'}
              errorText="Password should be over 8 in length"
              onChange={text => this.setState({ password: text })}
              text={password}
              maxLength={20}
              type="password"
          />
          <InputText
              placeholder="Confirm password"
              isError={errorState === 'confirm'}
              errorText="Confirm password is incorrect"
              onChange={text => this.setState({ confirm: text })}
              text={confirm}
              maxLength={20}
              type="password"
          />
          <button className="loginButton" onClick={() => this.CreateWorkSpace()}>
          Create Workspace
          {
              isLoading ?
              <div className="spinnerView">
                  <Spinner config={{ width: 1, radius: 8, color: 'white' }} />
              </div>
              : null
          }
          </button>
      </center>
    );
  }
}

CreateWorkSpace.propTypes = {
  onState: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(state => ({
  me: state.authReducer.Me,
}), mapDispatchToProps)(CreateWorkSpace);
