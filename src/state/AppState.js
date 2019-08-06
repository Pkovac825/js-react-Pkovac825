import { observable, decorate, computed, autorun } from 'mobx';

/**
 * @author Petar Kovač
 * @description The state of the application which contains all the information needed for the application to work correctly.
 */
class AppState {
  /* All the flights received from https://flighter-hw7.herokuapp.com/api/flights. Flight documentation can be found on the https://flighter-hw7.herokuapp.com/docs site.*/ 
  flights = [];
  /** The ID with which the getFlightById method finds results.*/
  queriedID = '';
  /** The authorization token used for making successful request on the https://flighter-hw7.herokuapp.com API.*/
  userToken = sessionStorage.getItem('userToken', '') || '';
  /** Current user information. User documentation can be found on the https://flighter-hw7.herokuapp.com/docs site.*/
  user = {
    /**The user id as stored on the https://flighter-hw7.herokuapp.com API.*/
    id: sessionStorage.getItem("id", '') || '',
    /**User username, currently unused.*/
    username: sessionStorage.getItem("username", '') || 'MillBurray',
    /**User first name. */
    firstName: sessionStorage.getItem("firstName", '') || '',
    /**User last name. */
    lastName: sessionStorage.getItem("lastName", '') || '',
    /**User email. */
    email: localStorage.getItem("email", '') || sessionStorage.getItem("email", '') || '',
    /**A flag which determines whether a user's email is remembered in local storage (True) or session storage (False). */
    rememberMe: localStorage.getItem("rememberMe", false) || '',
    /**User bookings. Booking documentation can be found on the https://flighter-hw7.herokuapp.com/docs site.*/
    bookings: [],
    /**User's image URL. The images are stored on https://isa-js-upload.andreicek.dev AKA Andrei's server. */
    imageurl: sessionStorage.getItem("imageurl", '') || "",
    /**An array of locations the user wants to visit. */
    wishlist: sessionStorage.getItem("wishlist", '') || JSON.stringify([]),
  }

  /**
   * @description Filters the flights array where the flight ID is equal to the appState queriedID.
   * @returns An array with one flight if the ID matches, otherwise an empty array.
   */
  get getFlightById() {
    return this.getBookableFlights.filter((flight) => flight.id == this.queriedID);
  }

  /**
   * @returns An array with flights that have atleast 1 available seat.
   */
  get getBookableFlights() {
    return this.flights.filter((flight) => flight.no_of_seats - flight.no_of_booked_seats > 0);
  }

  /**
   * @description Searches for all the destinations that can be found in the flights names. For this method to work, all flight names must be of
   * format origin-destination. This collection acts like a set, so there are no duplicates.
   * @returns An array of all the available destinations.
   */
  get getDestinations() {
    const destinations = new Set(this.getBookableFlights.map((flight) => flight.name.split("-")[1].trim()));
    return Array.from(destinations);
  }

}

decorate(AppState, {
  id: observable,
  user: observable,
  flights: observable,
  lastName: observable,
  bookings: observable,
  imageurl: observable,
  wishlist: observable,
  queriedID: observable,
  firstName: observable,
  userToken: observable,
  getFlightById: computed,
  getDestinations: computed,
  getBookableFlights: computed,
});

export const appState = new AppState();


autorun(() => {
  localStorage.setItem('rememberMe', appState.user.rememberMe);
  localStorage.setItem('email', appState.user.rememberMe ? appState.user.email : '');
  sessionStorage.setItem('email', appState.user.email);
  sessionStorage.setItem('username', appState.user.username);
  sessionStorage.setItem("imageurl", appState.user.imageurl);
  sessionStorage.setItem("id", appState.user.id);
  sessionStorage.setItem("wishlist", appState.user.wishlist);
  sessionStorage.setItem("firstName", appState.user.firstName);
  sessionStorage.setItem("lastName", appState.user.lastName);
  sessionStorage.setItem('userToken', appState.userToken);
});


