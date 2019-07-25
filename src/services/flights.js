import { get } from './api';

export function loadFlights(appState, serverToken) {
  if(!serverToken) return;
  if(appState.flights.length) {
    return Promise.resolve(appState.flights);
  }

    return get('flights', serverToken)
      .then((response) => response.flights)
      .then((flights) => (appState.flights = flights));
  }
