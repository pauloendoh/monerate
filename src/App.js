import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import actions from './redux/actions';


const App = (props) => {

  const addUserHandler = () => {
    props.TEST_AUTH_REDUCER()
  }

  return (
    <div className="App">

      {props.authUser ? <div>{props.authUser}</div> : <div onClick={addUserHandler}>NO USER YET</div>}

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    authUser: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    TEST_AUTH_REDUCER: () => dispatch({ type: actions.TEST_AUTH_REDUCER })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
