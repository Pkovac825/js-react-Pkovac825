import { observable, decorate, computed } from 'mobx';

class AppState {
  flights = [];
  queriedID = '';

  get getFlightById() {
    return this.flights.filter((flight) => flight.id == this.queriedID);
  }
}


decorate(AppState, {
  flights: observable,
  queriedID: observable,
  getFlightById: computed,
});

export const appState = new AppState();


