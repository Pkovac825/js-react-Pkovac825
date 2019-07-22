import React from 'react';
import styles from './Login.module.css';
import { useSetState } from 'react-use';
import { sessionRequest } from '../services/sessionAPI';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';



function Login(props) {
  const { history } = props;
  const { appState } = props;
  const [state, setState] = useSetState({
    loginMessage: '',
    email: appState.email || '',
    password: appState.password || '',
    rememberYou: appState.rememberMe || '',
  });

  function onInputChange(fieldName) {
    return (e) => {
      setState({
        [fieldName]: e.target.value,
      });
    };
  }

  function changeRememberance(e) {
    setState({ rememberYou: e.target.checked });
  }

  async function checkLogin(e) {
    e.preventDefault();
    setState({ loginMessage: "" });

    if (!state.email.match("[^@]+@[^.]+..+")) {
      setState({ loginMessage: "Invalid email" });
    } else if (state.password.trim().length === 0) {

      setState({ loginMessage: "Must input password" });
    } else {

      const newSession = await sessionRequest('POST', state.email, state.password);
      if (!newSession.session) {
        setState({ loginMessage: "The Email or Password is incorrect." });
      } else {
        appState.rememberMe = state.rememberYou;
        appState.email = state.email;
        appState.password = state.password;
        appState.userToken = newSession.session.token;
        history.push('/');
      }
    }
  }


  return (
    <div>
      {
        appState.userToken ?

          <div>
            <h1>You are already logged in</h1>
            <Link to="/">Go back to main page.</Link>
          </div>
          :
          <div className={styles.loginPageGrid}>
            <div className={styles.spaceGrid}></div>
            <div className={styles.loginForm}>
              <div className={styles.blueLetters}>Login</div>
              <div></div>
              <form onSubmit={checkLogin}>
                <input type="email" className="{styles.formElement}" placeholder="Email" value={state.email} onChange={onInputChange('email')} />
                <input type="password" className="{styles.formElement}" placeholder="Password" value={state.password} onChange={onInputChange('password')} />
                <div className={styles.loginMessage}>{state.loginMessage}</div>
                <span className={styles.alignCenter}><input type="checkbox" onChange={changeRememberance} />&nbsp;&nbsp;Remember Me</span>
                <input className={styles.blueButton} type="submit" value="Login" />
                <h5 className={styles.alignCenter}>Don't have an account?</h5>
                <a href="/register" className={styles.blueLink}><div className={styles.alignCenter}>Register here</div></a>
              </form>
            </div>
          </div >
      }
    </div>
  );
}

export const LoginComponent = observer(Login);



