import React from 'react';
import { observer } from 'mobx-react';
import { AppContext } from '../state/AppContext';
import { LoginComponent } from '../components/Login';
import { createSession } from '../services/sessionAPI';
import { fetchUser } from '../services/userAPI';
import { action } from 'mobx';
import { useSetState } from 'react-use';

/**
 * The container for the Login page.
 * Matches path "login".
 */
function LoginContainer(props) {
  const { appState } = React.useContext(AppContext);
  const  [ state, setState ] = useSetState({
    loginError: '',
  });

  const updateLogin = action ("login",  (data, rememberMe, token) => {
    appState.user.rememberMe = rememberMe;
    appState.user.email = data.email;
    appState.userToken = token;
  });

  /**
   * Tries to login user. If successful, saves a user token in the AppState singleton.
   * @param data - Data received from React-form.
   * @param event - Event which triggered the function.
   * @param {Boolean} rememberMe If true, user's email will be saved in local storage. 
   */
  async function onLogin(data, event, rememberMe) {
    event.preventDefault();
    const newSession = await createSession(data.email, data.password);
    if (!newSession.session) {
      setState({ loginError: "Invalid email or password."});
    } else {
      await fetchUser(appState, newSession.session.user.id, newSession.session.token);
      updateLogin(data, rememberMe, newSession.session.token);
      props.history.push('/');
    }
  }

  return (
    <LoginComponent appState={appState} onLogin={onLogin} loginError={state.loginError} />
  );
}

export const Login = observer(LoginContainer);