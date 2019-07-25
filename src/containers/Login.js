import React from 'react';
import { observer } from 'mobx-react';
import { AppContext } from '../state/AppContext';
import { LoginComponent } from '../components/Login';
import { createSession } from '../services/sessionAPI';
import { action } from 'mobx';

function LoginContainer(props) {
  const { appState } = React.useContext(AppContext);

  const update = action ("login",  (data, rememberMe, token) => {
    appState.user.rememberMe = rememberMe;
    appState.user.email = data.email;
    appState.userToken = token;
  });

  async function checkLogin(data, event, rememberMe) {
    event.preventDefault();
    const newSession = await createSession(data.email, data.password);
    if (!newSession.session) {
      return true;
    } else {
      update(data, rememberMe, newSession.session.token);
      props.history.push('/');
    }
  }


  return (
    <LoginComponent appState={appState} checkLogin={checkLogin} />
  );
}

export const Login = observer(LoginContainer);