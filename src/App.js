import React, { useEffect, useState } from 'react';
import './App.css';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import actions from './redux/actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from 'axios';
import { Button, makeStyles, Modal } from '@material-ui/core';
import AddExpenseModal from './containers/AddExpenseModal/AddExpenseModal';



const App = (props) => {

  const [isSignUp, setIsSignUp] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    props.CHECK_USER_OR_LOGOUT()
  }, [])



  return (
    <div className="App">
      {
        props.authUser ?
          (<div>
            <div>{props.authUser.email}</div>
            <button onClick={() => props.LOGOUT()}>Logout</button>
            <Button variant="contained" color="primary" onClick={() => setModalIsOpen(true)} >
              Add Expense
              </Button>
            <AddExpenseModal
              open={modalIsOpen}
              onClose={() => setModalIsOpen(false)}
            />
          </div>)
          :
          (<div>
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
                    props.UPDATE_AUTH_USER(res.data)

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
                    {isSignUp ? 'Sign Up' : 'Sign In'}
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
          </div>)
      }


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


    </div >

  );
}

const mapStateToProps = state => {
  return {
    authUser: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    UPDATE_AUTH_USER: (user) => dispatch({ type: actions.UPDATE_AUTH_USER, user }),
    CHECK_USER_OR_LOGOUT: () => dispatch({ type: actions.CHECK_USER_OR_LOGOUT }),
    LOGOUT: () => dispatch({ type: actions.LOGOUT }),

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
