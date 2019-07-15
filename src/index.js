import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Landing} from './containers/Landing';
import {Login} from './components/Login';
import {Register} from './components/Register';

function PrivateRoute({ isLoggedIn, Component, serverToken, ...rest }) {
  function render(props) {
    return isLoggedIn ? <Component {...props} serverToken={serverToken} /> : <Redirect to="/" />;
  }

  return <Route {...rest} component={render} />;
}



function App() {
  

  return (
    <Router>
      <Route exact path="/" component={Landing } />
      <Route exact path="/login" component={Login } />
      <Route exact path="/register" component={Register } />
    </Router>
  );

  
}

ReactDOM.render(<App />, document.getElementById('root'));
