import { get } from './api';

export function loadFlights(appState, serverToken) {
  if(!serverToken) return;
  if(appState.flights.length) {
    return Promise.resolve(appState.flights);
  }
  
    const optionsFlight = {
        method: 'GET',
        headers: {
          'Authorization': serverToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
    return get('flights', optionsFlight)
      .then((response) => response.flights)
      .then((flights) => (appState.flights = flights));
  }
