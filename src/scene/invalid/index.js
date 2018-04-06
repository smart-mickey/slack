import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router';
import { ActionCreators } from '../../redux/action';

import './index.css';

const InvalidIcon = require('../../resource/image/invalid.png');

class InvalidPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
        <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
            <center>
                <img src={InvalidIcon} className="invalid-icon"/>
                <p className="invalid-text">{this.props.errorText}</p>
                <Link className="invalid-link" to="/workspace">Check Workspace list</Link>
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
  errorText: state.errorReducer.errorText,
}), mapDispatchToProps)(InvalidPage);
