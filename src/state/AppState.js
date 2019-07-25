import { observable, decorate, computed, autorun } from 'mobx';

class AppState {
  flights = [];
  queriedID = '';
  userToken = sessionStorage.getItem('userToken', '') || '';
  user = {
    email: localStorage.getItem("email", '') || '',
    rememberMe: localStorage.getItem("rememberMe", false) || '',
    bookings: [],
  }

  get getFlightById() {
    return this.flights.filter((flight) => flight.id == this.queriedID);
  }
}


decorate(AppState, {
  flights: observable,
  queriedID: observable,
  getFlightById: computed,
  userToken: observable,
  user: observable,
});

export const appState = new AppState();


autorun(() => {
  localStorage.setItem('rememberMe', appState.user.rememberMe);
  localStorage.setItem('email', appState.user.rememberMe ? appState.user.email : '');
  sessionStorage.setItem('userToken', appState.userToken);
});


