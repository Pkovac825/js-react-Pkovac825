import React from 'react';
import styles from './Register.module.css';
import { useSetState } from 'react-use';
import { userRequest } from '../services/userAPI';

export function Register(props) {
  const [state, setState] = useSetState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    registerMessage: '',
  });

  function onInputChange(fieldName) {
    return (e) => {
      setState({
        [fieldName]: e.target.value,
      });
    };
  }

  async function onRegisterSubmit(e) {
    e.preventDefault();

    setState({ registerMessage: "" });
    if (state.fname.trim().length === 0 || state.lname.trim().length === 0) {
      setState({ registerMessage: "Must input full name!" });

    } else if (!state.email.match("[^@]+@[^.]+..+")) {
      setState({ registerMessage: "Must input valid Email!" });

    } else if (state.password.trim().length === 0) {
      setState({ registerMessage: "Must input password!" });

    } else if (state.password !== state.confirmPassword) {
      setState({ registerMessage: "The passwords must match!" });

    } else {
      const newUser = await userRequest('POST', state.email, state.fname, state.lname, state.password);
      if (!newUser.user.id) {
        setState({ registerMessage: "This Email is already used." });
      } else {
        setState({ registerMessage: "Registration was successful, please login to view flights." });
        props.history.push('/login');
      }
    }
  }

  return (
    <div className={styles.loginPageGrid}>
      <div className={styles.spaceGrid}></div>
      <div className={styles.loginForm}>
        <div className={styles.blueLetters}>Register</div>
        <div></div>
        <form onSubmit={onRegisterSubmit}>
          <input type="text" className="{styles.formElement}" placeholder="First Name" value={state.fname} onChange={onInputChange('fname')} />
          <input type="text" className="{styles.formElement}" placeholder="Last Name" value={state.lname} onChange={onInputChange('lname')} />
          <input type="email" className="{styles.formElement}" placeholder="Email" value={state.email} onChange={onInputChange('email')} />
          <input type="password" className="{styles.formElement}" placeholder="Password" value={state.password} onChange={onInputChange('password')} />
          <input type="password" className="{styles.formElement}" placeholder="Confirm Password" value={state.confirmPassword} onChange={onInputChange('confirmPassword')} />
          <div className={styles.loginMessage}>{state.registerMessage}</div>
          <input className={styles.blueButton} type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}
