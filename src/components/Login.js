import React from 'react';
import { useLocalStorage } from 'react-use';
import { useSessionStorage } from 'react-use';
import './CSS/Login.css';

export function Login() {
  const [userToken, setToken] = useSessionStorage('userToken', '');
  const [username, setUsername] = useLocalStorage('username', '');
  const [password, setPassword] = useLocalStorage('password', '');
  const [loginMessage, setLoginMessage] = useSessionStorage('loginMessage', '');
  const [rememberYou, shouldIRemember] = useLocalStorage('remember', false);



  function onUsernameInputChange(e) {
    setUsername(e.target.value);
  }

  function onPasswordInputChange(e) {
    setPassword(e.target.value);
  }

  async function checkLogin(e) {
    setLoginMessage("");
    if (username.length === 0) {
      setLoginMessage("Invalid username");
    } else if (password.length === 0) {
      setLoginMessage("Must input password");
    } else {
      if (false) {
        setLoginMessage("The username or password is incorrect.");
      } else {
        setToken("token");
        document.location.href = "/";
      }
      setUsername(rememberYou ? username : '');
      setPassword(rememberYou ? password : '');
    }
  }


  function changeRememberance(e) {
    shouldIRemember(e.target.checked);
  }

  return (

    <div className="loginPageGrid">
      <div className="spaceGrid"></div>
      <div className="loginForm">
        <div className="blueLetters">Login</div>
        <div></div>
        <input type="text" className="formElement" value={username} placeholder="Username" onChange={onUsernameInputChange} />
        <input type="password" className="formElement" value={password} placeholder="Password" onChange={onPasswordInputChange} />
        <div className="loginMessage">{loginMessage}</div>
        <span className="alignCenter adjustSize20"><input type="checkbox" checked={rememberYou} onChange={changeRememberance} />&nbsp;&nbsp;Remember Me</span>
        <button className="blueButton" onClick={checkLogin}>Login</button>
        <div></div>
        <h5 className="alignCenter">Don't have an account?</h5>
        <a href="/register" className="blueLink alignCenter">Register here</a>
      </div>
    </div >
  );
}



