import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import promise from 'redux-promise-middleware';
import Notifications from 'react-notify-toast';

import CreateWorkSpace from './scene/workspace';
import Login from './scene/login';
import Chat from './scene/chat';
import InvalidPage from './scene/invalid';
import reducer from './redux/reducer/index';
import mySaga from './redux/saga/index';
import './App.css';


const loggerMiddleware = createLogger();
const promiseMiddleware = promise();
const sagaMiddleware = createSagaMiddleware();

const middleware = compose(applyMiddleware(
  promiseMiddleware,
  thunkMiddleware,
  loggerMiddleware,
  sagaMiddleware,
), window.devToolsExtension ? window.devToolsExtension() : f => f);
const store = createStore(reducer, {}, middleware);
const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();
sagaMiddleware.run(mySaga);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/workspace">
            <IndexRoute component={CreateWorkSpace} />
          </Route>
          <Route path="/workspace/:state">
            <IndexRoute component={CreateWorkSpace} />
          </Route>
          <Route path="/workspace/:workspace/auth">
            <IndexRoute component={Login} />
          </Route>
          <Route path="/workspace/:workspace/chat">
            <IndexRoute component={Chat} />
          </Route>
          <Route path="*" component={InvalidPage} />
        </Router>
      </Provider>
    );
  }
}

export default App;
