import { get } from './flightsAPI';

export function loadFlights(appState, serverToken) {
  if(!serverToken) return;
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
