import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Landing} from './containers/Landing';
import {Login} from './components/Login';
import {Flight} from './containers/Flight';
import {Register} from './components/Register';
import { userState } from './state/UserState';
import { observer } from 'mobx-react';

function PrivateRoute({ isLoggedIn, Component, ...rest }) {
  function render(props) {
    return isLoggedIn ? <Component {...props}  /> : <Redirect to="/login" />;
  }

  return <Route {...rest} component={render} />;
}


function App(props) {

  return (
    <Router >
      <PrivateRoute isLoggedIn={Boolean(userState.userToken)} exact path="/" Component={Landing} />
      <PrivateRoute isLoggedIn={Boolean(userState.userToken)} path="/book" Component={Flight}/>
      <Route exact path="/login" component={Login } />
      <Route exact path="/register" component={Register } />
    </Router>
  );

  
}

const  MyApp = observer(App);

ReactDOM.render(<MyApp />, document.getElementById('root'));