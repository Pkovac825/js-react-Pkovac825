import { get } from './api';

/**
 * The method makes an API call that gets all the flights from the https://flighter-hw7.herokuapp.com/api API. 
 * If the API call is successful, the flights will be saved in the AppState.
 *  
 * @param appState The current AppState
 * @param {String} serverToken User's authorization token
 */
export function loadFlights(appState, serverToken) {
  if(!serverToken) return;
  if(appState.flights.length) {
    return Promise.resolve(appState.flights);
  }

    return get('flights', serverToken)
      .then((response) => response.flights)
      .then((flights) => (appState.flights = flights));
  }
