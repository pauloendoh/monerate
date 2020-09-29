import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import authReducer from './redux/reducers/authReducer'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios'
import expensesReducer from './redux/reducers/expensesReducer';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));
axios.defaults.baseURL = 'https://monerate-3a2a5.firebaseio.com/'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
