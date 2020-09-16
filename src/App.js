import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import actions from './redux/actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from 'axios';


const App = (props) => {

  const [isSignUp, setIsSignUp] = useState(true)

  const addUserHandler = () => {
    if (props.authUser)



      props.TEST_AUTH_REDUCER(null)
    else
      props.TEST_AUTH_REDUCER('xd')
  }

  return (
    <div className="App">

      {/* <div onClick={addUserHandler}>
        {props.authUser ? <div>{props.authUser}</div> : <div >NO USER YET</div>}

      </div> */}

      {/* <header className="App-header">
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
      </header> */}

      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}

        onSubmit={(values, { setSubmitting }) => {
          const authData = {
            email: values.email,
            password: values.password,
            returnSecureToken: true
          }

          let endpoint = ''
          if (isSignUp)
            endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9XDA4Ttqp0QDuzJsYyRmLLKA-fh80kNo'
          else
            endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9XDA4Ttqp0QDuzJsYyRmLLKA-fh80kNo'

          Axios.post(endpoint, authData)
            .then(res => {
              alert(res)
            })
            .catch(err => {
              alert(err)
            }).finally(() => {
              setSubmitting(false)
            })
        }}

      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
           </button>
          </Form>
        )}
      </Formik>

      <div>

        {isSignUp ?
          <div>
            Already has an account? <button onClick={() => setIsSignUp(false)}> Sign in </button>
          </div> :
          <div>
            Don't have an account? <button onClick={() => setIsSignUp(true)}> Sign up </button>
          </div>}
      </div>
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
    TEST_AUTH_REDUCER: (user) => dispatch({ type: actions.TEST_AUTH_REDUCER, user })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
