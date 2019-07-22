import React from 'react';
import { observer } from 'mobx-react';
import { AppContext } from '../state/AppContext';
import { LoginComponent } from '../components/Login';

function LoginContainer(props) {
  const { appState } = React.useContext(AppContext);
  return (
    <LoginComponent appState={appState} history={props.history}/>
  );
}

export const Login = observer(LoginContainer);