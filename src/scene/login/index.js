import React from 'react';
import Spinner from 'react-spin';
import Notifications, { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { ActionCreators } from '../../redux/action';
import InputText from '../../component/InputText';

import './index.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailError: false,
      isPasswordError: false,
      isConfirmError: false,
      isUsernameError: false,
      email: '',
      password: '',
      username: '',
      confirm: '',
      reset: '',
      tabState: 'login',
      uemail: '',
      upassword: '',
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.props.checkWorkspace(this.props.params.workspace);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onClickTabButton(e) {
    if (this.state.isLoading) return;
    const title = e.target.value;
    if (title === 'Log in') {
      this.setState({ tabState: 'login' });
    } else {
      this.setState({ tabState: 'signup' });
    }
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

  gotoChatPage(msg) {
    localStorage.setItem('profile', JSON.stringify(msg));
    browserHistory.push(`/workspace/${this.props.params.workspace}/chat`);
  }

  signUpwithEmailPassword() {
    const {
      username, uemail, upassword, confirm, isLoading,
    } = this.state;
    if (isLoading) return;
    else if (username === '') {
      this.setState({ errorState: 'signup-username' });
      return;
    } else if (!this.validateEmail(uemail)) {
      this.setState({ errorState: 'signup-email' });
      return;
    } else if (upassword.length < 8) {
      this.setState({ errorState: 'signup-password' });
      return;
    } else if (upassword !== confirm) {
      this.setState({ errorState: 'signup-confirm' });
      return;
    }
    this.setState({ errorState: '', isLoading: true });
    const param = `email=${uemail}&username=${username}&password=${upassword}`;
    this.props.register(param, (status, msg) => {
      if (status === 'error') {
        this.showToast(msg, 'error');
      } else {
        // this.showToast('Registered Successfully!', 'success');
        this.gotoChatPage(msg);
      }
    });
  }

  signInwithEmailPassword() {
    const { email, password, isLoading } = this.state;
    if (isLoading) return;
    else if (!this.validateEmail(email)) {
      this.setState({ errorState: 'login-email' });
      return;
    } else if (password.length < 8) {
      this.setState({ errorState: 'login-password' });
      return;
    }
    this.setState({ errorState: '', isLoading: true });
    const param = `email=${email}&password=${password}`;
    this.props.login(param, (status, msg) => {
      if (status === 'error') {
        this.showToast(msg, 'error');
      } else {
        // this.showToast(`Welcome, ${msg.username}`, 'success');
        this.gotoChatPage(msg);
      }
    });
  }

  resetPassword() {
    const { isLoading, reset } = this.state;
    alert(`${reset}, ${this.validateEmail(reset)}`);
    if (isLoading) return;
    else if (!this.validateEmail(reset)) {
      this.setState({ errorState: 'reset' });
      return;
    }
    this.setState({ errorState: '', isLoading: true });
  }

  forgotPassword() {
    if (this.state.isLoading) return;
    this.setState({ tabState: 'forgot' });
  }

  backToLogin() {
    if (this.state.isLoading) return;
    this.setState({ tabState: 'login' });
  }

  render() {
    const {
      tabState, hoverState, isLoading, errorState, email,
      password, confirm, reset, username, upassword, uemail,
    } = this.state;
    return (
      <div className="container">
        <Notifications />
        <div className="row full-width">
          <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
            <center>
              <div className="login-form">
                <div className="row">
                  <div className="col-xs-6">
                    <button
                      className={tabState === 'login' ? 'tab-button-selected' : 'tab-button' }
                      onClick={e => this.onClickTabButton(e)}
                      onMouseOver={() => this.setState({ hoverState: 'loginHover' })}
                      onMouseOut={() => this.setState({ hoverState: 'none' })}
                      value="Log in">
                      Log in
                    </button>
                    {
                      tabState === 'login' || hoverState === 'loginHover' ?
                      <div className="underLine"/>
                      : null
                    }
                  </div>
                  <div className="col-xs-6">
                    <button
                      className={tabState === 'signup' ? 'tab-button-selected' : 'tab-button' }
                      onClick={e => this.onClickTabButton(e)}
                      onMouseOver={() => this.setState({ hoverState: 'signupHover' })}
                      onMouseOut={() => this.setState({ hoverState: 'none' })}
                      value="Sign up">
                        Sign up
                    </button>
                    {
                      tabState === 'signup' || hoverState === 'signupHover' ?
                      <div className="underLine"/>
                      : null
                    }
                  </div>
                </div>
                {
                  tabState === 'login' ?
                  <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
                      <p className="title">Log Into Your Account</p>
                      <InputText
                        placeholder="email"
                        isError={errorState === 'login-email'}
                        errorText="Invalid email"
                        onChange={text => this.setState({ email: text })}
                        text={email}
                        maxLength={40}
                      />
                      <InputText
                        placeholder="password"
                        isError={errorState === 'login-password'}
                        errorText="Password should be over 8 in length"
                        onChange={text => this.setState({ password: text })}
                        text={password}
                        type="password"
                        maxLength={20}
                      />
                      <button className="loginButton" onClick={() => this.signInwithEmailPassword()}>
                        Log In
                        {
                          isLoading ?
                          <div className="spinnerView">
                              <Spinner config={{ width: 1, radius: 8, color: 'white' }} />
                          </div>
                          : null
                        }
                      </button>
                      <p style={{ paddingTop: 30 }}><a className="forgotPassword" onClick={() => this.forgotPassword()}>Forgot Password?</a></p>
                    </div>
                  </div>
                  : tabState === 'signup' ?
                  <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
                      <p className="title">Create Your Slack Account</p>
                      <InputText
                        placeholder="username"
                        isError={errorState === 'signup-username'}
                        errorText="Please enter your username"
                        onChange={text => this.setState({ username: text })}
                        text={username}
                        maxLength={20}
                      />
                      <InputText
                        placeholder="email"
                        isError={errorState === 'signup-email'}
                        errorText="Invalid email"
                        onChange={text => this.setState({ uemail: text })}
                        text={uemail}
                        maxLength={40}
                      />
                      <InputText
                        placeholder="password"
                        isError={errorState === 'signup-password'}
                        errorText="Password should be over 8 in length"
                        onChange={text => this.setState({ upassword: text })}
                        text={upassword}
                        type="password"
                        maxLength={20}
                      />
                      <InputText
                        placeholder="confirm password"
                        isError={errorState === 'signup-confirm'}
                        errorText="Confirm password is incorrect"
                        onChange={text => this.setState({ confirm: text })}
                        text={confirm}
                        type="password"
                        maxLength={20}
                      />
                      <button className="loginButton" onClick={() => this.signUpwithEmailPassword()}>
                        Sign Up
                        {
                          isLoading ?
                          <div className="spinnerView">
                              <Spinner config={{ width: 1, radius: 8, color: 'white' }} />
                          </div>
                          : null
                        }
                      </button>
                    </div>
                  </div>
                  :
                  <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
                      <p className="title">Please enter your recovery email</p>
                      <InputText
                        placeholder="email"
                        isError={errorState === 'reset'}
                        errorText="Please enter your email address"
                        onChange={text => this.setState({ reset: text })}
                        text={reset}
                      />
                      <button className="loginButton" onClick={() => this.resetPassword()}>
                        Reset password
                        {
                          isLoading ?
                          <div className="spinnerView">
                              <Spinner config={{ width: 1, radius: 8, color: 'white' }} />
                          </div>
                          : null
                        }
                      </button>
                      <p style={{ paddingTop: 80 }}><a className="forgotPassword" onClick={() => this.backToLogin()}>Back to login</a></p>
                    </div>
                  </div>
                }
              </div>
            </center>
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
  r_user: state.user,
}), mapDispatchToProps)(Login);
