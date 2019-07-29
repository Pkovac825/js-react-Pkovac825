import React from 'react';
import styles from './Register.module.css';
import { observer } from 'mobx-react-lite';
import useForm from 'react-hook-form';

function Register(props) {
  const { register, handleSubmit, errors, setError } = useForm();
  const { onRegisterSubmit } = props;

  function registerAction(data, event) {
    if(data.password === data.checkPassword) {
      if(onRegisterSubmit(data, event)) {
        setError("invalid", "invalidRegister", "A user with this Email already exists.");
      }
    } else {
      setError("checkPassword", "invalidRegister", "Passwords must match!");
    }
    
  }

  return (
    <div className={styles.loginPageGrid}>
      <div className={styles.spaceGrid}></div>
      <div className={styles.loginForm}>
        <div className={styles.blueLetters}>Register</div>
        <div></div>
        <form onSubmit={handleSubmit(registerAction)}>
          <input type="text" className="{styles.formElement}" placeholder="First Name" name="firstName"
                ref={register({
                  required: true,
                })} />
          {errors.firstName && <div className={styles.errorMsg}>Must input first name.</div>}
          <input type="text" className="{styles.formElement}" placeholder="Last Name" name="lastName"
                ref={register({
                  required: true,
                })}/>
          {errors.lastName && <div className={styles.errorMsg}>Must input last name.</div>}
          <input type="email" className="{styles.formElement}" placeholder="Email" name="email"
                ref={register({ 
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}/>
          {errors.email && <div className={styles.errorMsg}>Must input valid Email.</div>}
          <input type="password" className="{styles.formElement}" placeholder="Password" name="password"
                ref={register({
                  required: true,
                  minLength: 5,
                  maxLength: 20
                })}/>
          {errors.password && <div className={styles.errorMsg}>Password must have more than 5 and less than 20 characters</div>}
          <input type="password" className="{styles.formElement}" placeholder="Confirm Password" name="checkPassword" 
                ref={register({
                  required: true,
                  minLength: 5,
                  maxLength: 20
                })}/>
          {errors.checkPassword && <div className={styles.errorMsg}>{errors.checkPassword.message}</div>}
          <input className={styles.blueButton} type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}

export const RegisterComponent = observer(Register);
