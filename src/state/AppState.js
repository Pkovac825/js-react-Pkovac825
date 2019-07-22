import { observable, decorate, computed, autorun } from 'mobx';

class AppState {
  flights = [];
  queriedID = '';
  userToken = sessionStorage.getItem('userToken', '') || '';
  email = localStorage.getItem("email", '') || '';
  password =localStorage.getItem("password", '') || '';
  rememberMe = localStorage.getItem("rememberMe", false) || '';
  bookings = [];

  get getFlightById() {
    return this.flights.filter((flight) => flight.id == this.queriedID);
  }
}


decorate(AppState, {
  flights: observable,
  queriedID: observable,
  getFlightById: computed,
  userToken: observable,
  email: observable,
  password: observable,
  rememberMe: observable,
  bookings: observable,
});

export const appState = new AppState();


autorun(() => {
  localStorage.setItem('rememberMe', appState.rememberMe);
  localStorage.setItem('email', appState.rememberMe ? appState.email : '');
  localStorage.setItem('password', appState.rememberMe ? appState.password : '');
  sessionStorage.setItem('userToken', appState.userToken);
});


