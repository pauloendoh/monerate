import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import mapStateToProps from './redux/mapStateToProps';
import mapDispatchToProps from './redux/mapDispatchToProps';
import Home from './containers/Home/Home';
import LandingPage from './containers/LandingPage/LandingPage';

const materialDefaults = createMuiTheme({
  palette: {
    primary: { main: "#169F8D" },
    secondary: { main: '#E33E7F', }
  }
});

const App = (props) => {

  useEffect(() => {
    props.CHECK_USER_OR_LOGOUT()
  }, [])

  useEffect(() => {
    if (props.authUser) {
      props.fetchAllExpenses(props.authUser)
    }
  }, [props.authUser])


  // =============== TEMPLATE ===================
  return (
    <MuiThemeProvider theme={materialDefaults}>
      {
        props.authUser ? <Home /> : <LandingPage />
      }
      <footer style={{ height: 100 }}></footer>
    </MuiThemeProvider >

  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
