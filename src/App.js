import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise-middleware';

import Login from './scene/login';
import Chat from './scene/chat';
import reducer from './redux/reducer/index';
import './App.css';


const loggerMiddleware = createLogger();
const promiseMiddleware = promise();

const middleware = compose(applyMiddleware(
  promiseMiddleware,
  thunkMiddleware,
  loggerMiddleware,
), window.devToolsExtension ? window.devToolsExtension() : f => f);
const store = createStore(reducer, {}, middleware);
const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/">
            <IndexRoute component={Login} />
          </Route>
          <Route path="/chat">
            <IndexRoute component={Chat} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
