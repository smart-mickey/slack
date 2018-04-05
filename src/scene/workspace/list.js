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

    };
  }

  componentDidMount() {
    this.mounted = true;
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
      <center>
          <p className="title"></p>
          <div className="workspace-listview">
          {
            this.props.allWorkspace.map(workspace => (
              <p key={workspace.displayName}><Link className="workspace-list-item" to={`/workspace/${workspace.displayName}/auth`}>{workspace.displayName}</Link></p>
            ))
          }
          </div>
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
