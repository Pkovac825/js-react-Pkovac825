import { post } from './api';

export function bookFlight(appState, serverToken, noOfSeats, flightID) {
  if(!serverToken) return;
  
    const body = JSON.stringify({
            "booking": {
              "no_of_seats": noOfSeats,
              "flight_id": flightID
            }
          });

    return post('bookings', serverToken, body);
  }
