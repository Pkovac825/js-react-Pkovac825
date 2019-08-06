import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { appState } from './state/AppState';
import {Landing} from './containers/Landing';
import {Login} from './containers/Login';
import {Flight} from './containers/Flight';
import {Register} from './containers/Register';
import { Booking } from './containers/Booking';
import { Profile } from './containers/Profile';
import { UserEdit } from './containers/UserEdit';

/**
 * Routes the user to the correct site if he is logged in (if appState's user token is a truthy value), otherwise reroutes the user to the Login page.
 * @param {Boolean} props.isLoggedIn Truthy/falsy appState.userToken value
 * @param {Boolean} props.component Component that will be rendered if user is logged in
 * @returns Route to the login component or to the requested component 
 */
function PrivateRoute({ isLoggedIn, component: Component, ...rest }) {
  function render(props) {
    return isLoggedIn ? <Component {...props}  /> : <Redirect to="/login" />;
  }

  return <Route {...rest} component={render} />;
}


function App() {
  return (
    <Router >
      <PrivateRoute isLoggedIn={Boolean(appState.userToken)} exact path="/" component={ Landing } />
      <PrivateRoute isLoggedIn={Boolean(appState.userToken)} path="/book/:id" component={ Flight }/>
      <PrivateRoute isLoggedIn={Boolean(appState.userToken)} exact path="/book/modal/:id" component={ Booking }/>
      <PrivateRoute isLoggedIn={Boolean(appState.userToken)} path="/profile" component={ Profile }/>
      <PrivateRoute isLoggedIn={Boolean(appState.userToken)} exact path="/profile/edit" component={ UserEdit }/>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
    </Router>
  );
}

const  MyApp = observer(App);

ReactDOM.render(<MyApp />, document.getElementById('root'));