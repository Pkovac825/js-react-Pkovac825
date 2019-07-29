import { observable, decorate, computed, autorun } from 'mobx';

class AppState {
  flights = [];
  queriedID = '';
  userToken = sessionStorage.getItem('userToken', '') || '';
  user = {
    id: sessionStorage.getItem("id", '') || '',
    username: sessionStorage.getItem("username", '') || 'MillBurray',
    firstName: sessionStorage.getItem("firstName", '') || '',
    lastName: sessionStorage.getItem("lastName", '') || '',
    email: localStorage.getItem("email", '') || sessionStorage.getItem("email", '') || '',
    rememberMe: localStorage.getItem("rememberMe", false) || '',
    bookings: [],
    imageurl: sessionStorage.getItem("imageurl", '') || "",
    wishlist: sessionStorage.getItem("wishlist", '') || JSON.stringify([]),
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
  id: observable,
  firstName: observable,
  lastName: observable,
  bookings: observable,
  imageurl: observable,
  wishlist: observable,
});

export const appState = new AppState();


autorun(() => {
  localStorage.setItem('rememberMe', appState.user.rememberMe);
  localStorage.setItem('email', appState.user.rememberMe ? appState.user.email : '');
  sessionStorage.setItem('email', appState.user.email);
  sessionStorage.setItem("imageurl", appState.user.imageurl);
  sessionStorage.setItem("id", appState.user.id);
  sessionStorage.setItem("wishlist", appState.user.wishlist);
  sessionStorage.setItem("firstName", appState.user.firstName);
  sessionStorage.setItem("lastName", appState.user.lastName);
  sessionStorage.setItem('userToken', appState.userToken);
});


