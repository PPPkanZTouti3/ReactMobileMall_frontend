import React, { Component } from 'react';
import {connect} from 'react-redux'
import {LocaleProvider} from 'antd-mobile'
import {HashRouter} from 'react-router-dom'
import Routes from './routes'
import './assets/styles/common.scss'

class App extends Component {
  render() {
    return (
      <LocaleProvider>
        <HashRouter>
          <Routes></Routes>
        </HashRouter>
      </LocaleProvider>
    );
  }
}

export default connect()(App);
