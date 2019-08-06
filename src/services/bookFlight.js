import { post } from './api';

/**
 * The method makes an API call that creates a booking on the https://flighter-hw7.herokuapp.com/api API. 
 * 
 * @param {String} serverToken User's authorization
 * @param {Number} noOfSeats Number of available seats (number of seats - number of booked seats)
 * @param {Number} flightID The flight identifier. 
 */
export function bookFlight(serverToken, noOfSeats, flightID) {
  if(!serverToken) return;
  
    const body = JSON.stringify({
            "booking": {
              "no_of_seats": noOfSeats,
              "flight_id": flightID
            }
          });

    return post('bookings', serverToken, body);
  }
