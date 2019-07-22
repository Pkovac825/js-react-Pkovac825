import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Landing} from './containers/Landing';
import {Login} from './containers/Login';
import {Flight} from './containers/Flight';
import {Register} from './components/Register';
import { appState } from './state/AppState';
import { observer } from 'mobx-react';
import { Booking } from './containers/Booking';

function PrivateRoute({ isLoggedIn, Component, ...rest }) {
  function render(props) {
    return isLoggedIn ? <Component {...props}  /> : <Redirect to="/login" />;
  }

  return <Route {...rest} component={render} />;
}


function App(props) {

  return (
    <Router >
      <PrivateRoute isLoggedIn={Boolean(appState.userToken)} exact path="/" Component={ Landing } />
      <PrivateRoute isLoggedIn={Boolean(appState.userToken)} path="/book" Component={ Flight }/>
      <PrivateRoute isLoggedIn={Boolean(appState.userToken)} exact path="/book/modal" Component={ Booking }/>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
    </Router>
  );

  
}

const  MyApp = observer(App);

ReactDOM.render(<MyApp />, document.getElementById('root'));