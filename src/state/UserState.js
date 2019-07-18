import { observable, decorate, autorun } from 'mobx';

class UserState {
  userToken = sessionStorage.getItem('userToken', '') || '';
  email = localStorage.getItem("email", '') || '';
  password =localStorage.getItem("password", '') || '';
  rememberMe = localStorage.getItem("rememberMe", false) || '';
}


decorate(UserState, {
  userToken: observable,
  email: observable,
  password: observable,
  rememberMe: observable,

});

export const userState = new UserState();

autorun(() => {
    localStorage.setItem('rememberMe', userState.rememberMe);
    localStorage.setItem('email', userState.rememberMe ? userState.email : '');
    localStorage.setItem('password', userState.rememberMe ? userState.password : '');
    sessionStorage.setItem('userToken', userState.userToken);
  });
