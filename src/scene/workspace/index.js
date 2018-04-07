import React from 'react';
import Spinner from 'react-spin';
import Notifications, { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { ActionCreators } from '../../redux/action';
import InputText from '../../component/InputText';
import CreateWorkSpace from './create';
import WorkSpaceList from './list';


import './index.css';

class WorkSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabState: 'list',
      hoverState: '',
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.props.fetchWorkspaceList();
    if (this.props.params.state === 'create') this.setState({ tabState: 'create' });
    else if (this.props.params.state === 'list') this.setState({ tabState: 'list' });
    else if (this.props.params.state === undefined) {
      this.setState({ tabState: 'list' });
    } else {
      console.log(this.props.params.state);
      browserHistory.push(`/workspace/${this.props.params.state}/auth`);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onClickTabButton(e) {
    if (this.props.isLoading) return;
    const title = e.target.value;
    if (title === 'list') {
      this.setState({ tabState: 'list' });
      browserHistory.push('/workspace/list/');
    } else {
      this.setState({ tabState: 'create' });
      browserHistory.push('/workspace/create/');
    }
  }

  render() {
    const { tabState, hoverState } = this.state;
    return (
      <div className="container">
        <Notifications />
        <div className="full-width">
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            <center>
              <div className="login-form">
                <div className="row">
                  <div className="col-xs-6">
                    <button
                      className={tabState === 'login' ? 'tab-button-selected' : 'tab-button' }
                      onClick={e => this.onClickTabButton(e)}
                      onMouseOver={() => this.setState({ hoverState: 'list' })}
                      onMouseOut={() => this.setState({ hoverState: 'none' })}
                      value="list">
                      Workspace List
                    </button>
                    {
                      tabState === 'list' || hoverState === 'list' ?
                      <div className="underLine"/>
                      : null
                    }
                  </div>
                  <div className="col-xs-6">
                    <button
                      className={tabState === 'create' ? 'tab-button-selected' : 'tab-button' }
                      onClick={e => this.onClickTabButton(e)}
                      onMouseOver={() => this.setState({ hoverState: 'create' })}
                      onMouseOut={() => this.setState({ hoverState: 'none' })}
                      value="create">
                        Create Workspace
                    </button>
                    {
                      tabState === 'create' || hoverState === 'create' ?
                      <div className="underLine"/>
                      : null
                    }
                  </div>
                </div>
                <div className="row">
                {
                  tabState === 'list' ?
                  <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
                    <WorkSpaceList
                    />
                  </div>
                  : tabState === 'create' ?
                  <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
                    <CreateWorkSpace />
                  </div>
                  : null
                }
                </div>
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
  me: state.authReducer.Me,
  isLoading: state.workspaceReducer.isLoading,
}), mapDispatchToProps)(WorkSpace);
