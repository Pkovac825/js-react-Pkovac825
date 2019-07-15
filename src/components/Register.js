import React from 'react';
import ReactDOM from 'react-dom';
import { useSessionStorage } from 'react-use';
import './CSS/Login.css';

export function Register() {
  const [nameRegister, setRegisterName] = useSessionStorage('nameRegister', '');
  const [emailRegister, setRegisterEmail] = useSessionStorage('emailRegister', '');
  const [passwordRegister, setRegisterPassword] = useSessionStorage('passwordRegister', '');
  const [confirmPasswordRegister, setRegisterConfirmPassword] = useSessionStorage('passwordRegister', '');
  const [registerMessage, setRegisterMessage] = useSessionStorage('registerMessage', '');

  


  function onEmailRegisterInputChange(e) {
    setRegisterEmail(e.target.value);
  }

  function onPasswordRegisterInputChange(e) {
    setRegisterPassword(e.target.value);
  }

  function onConfirmPasswordRegisterInputChange(e) {
    setRegisterConfirmPassword(e.target.value);
  }

  function onNameRegisterInputChange(e) {
    setRegisterName(e.target.value);
  }

  async function checkRegister(e) {
    setRegisterMessage("");
    if(nameRegister.trim().length === 0) {
      setRegisterMessage("Must input first name!");
    } else if(!emailRegister.match("[^@]+@[^\.]+\..+")) {
      setRegisterMessage("Invalid E-Mail");
    } else if(passwordRegister.length < 5) {
      setRegisterMessage("Password must contain atleast 5 characters.");
      
    } else if(passwordRegister != confirmPasswordRegister) {
      setRegisterMessage("Passwords must match");
    }else {
      if(false) {
        setRegisterMessage("Something went wrong while registering user...");
      } else {
        document.location.href = "/";
      }
    }
  }

  return (
    <div className="loginPageGrid">
      <div className="spaceGrid"></div>
      <div className="loginForm">
        <div className="blueLetters">Register</div>
        <div></div>
        <input type="text" className="formElement" value={nameRegister} placeholder="Username" onChange={onNameRegisterInputChange} />
        <input type="email" className="formElement" value={emailRegister} placeholder="Email" onChange={onEmailRegisterInputChange} />
        <input type="password" className="formElement" value={passwordRegister} placeholder="Password" onChange={onPasswordRegisterInputChange} />
        <input type="password" className="formElement" value={confirmPasswordRegister} 
              placeholder="Confirm Password" onChange={onConfirmPasswordRegisterInputChange} />
        <div className="loginMessage">{registerMessage}</div>
        <button className="blueButton" onClick={checkRegister}>Register</button>
      </div>
    </div>
  );
}