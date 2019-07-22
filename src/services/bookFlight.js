import { get } from './api';

export function bookFlight(appState, serverToken, noOfSeats, flightID) {
  if(!serverToken) return;
  
    const optionsBooking = {
        method: 'POST',
        headers: {
          'Authorization': serverToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "booking": {
              "no_of_seats": noOfSeats,
              "flight_id": flightID
            }
          })
      };
    return get('bookings', optionsBooking)
            .then((booking) => appState.bookings.push(booking));
  }
