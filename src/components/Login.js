import React from 'react';
import styles from './Login.module.css';
import { useSetState } from 'react-use';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import useForm from 'react-hook-form';

function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const { checkLogin, appState, loginError } = props;
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [state, setState] = useSetState({
    rememberMe: appState.user.rememberMe === "true",
  });

  function changeRememberance(e) {
    setState({ rememberMe: e.target.checked });
  }

  function submitAction(data, event) {
     checkLogin(data, event, state.rememberMe);
  };

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
              <form onSubmit={handleSubmit(submitAction)}>

                <input type="email" className={styles.formElement} placeholder="Email" name="email" defaultValue={(appState.user.rememberMe == "true") ? appState.user.email : ""}
                  ref={register({
                    required: true,
                    pattern,
                  })} />
                {errors.email && <div className={styles.errorMsg}>Must input valid Email.</div>}

                <input type="password" className={styles.formElement} placeholder="Password" name="password"
                  ref={register({
                    required: true,
                    minLength: 5,
                    maxLength: 20
                  })} />
                {errors.password && <div className={styles.errorMsg}>Password must have more than 5 and less than 20 characters</div>}

                {loginError && <div className={styles.errorMsg}>{loginError}</div>}
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



