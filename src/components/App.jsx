import React, { Component } from 'react';
import { browserHistory, Router, Route } from 'react-router'


import { auth } from './auth'

class App extends Component {
  render() {
    console.log('in app', auth.Login)
    return (
      <Router history={browserHistory}>
        <Route path='/' component={auth.login} />
      </Router>
    );
  }
}

export default App;
