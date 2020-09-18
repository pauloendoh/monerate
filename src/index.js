import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { combineReducers, createStore } from 'redux';
import authReducer from './redux/reducers/authReducer'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios'

const rootReducer = combineReducers({
  auth: authReducer
})

const store = createStore(rootReducer)

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
