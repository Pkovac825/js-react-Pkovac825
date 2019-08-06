import React from 'react';
import { action } from 'mobx';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import { AppContext } from '../state/AppContext';
import { loadFlights } from '../services/flights';
import { bookFlight } from '../services/bookFlight';
import { FlightBookingModal } from '../components/FlightBookingModal'

/**
 * Container for the booking modal which appears if the user wants to book a flight.
 * Matches path "/book/modal/:id".
 */
function BookingContainer(props) {
    const { appState } = React.useContext(AppContext);
    useAsync(loadFlights.bind(null, appState, appState.userToken));
    React.useEffect(() => {
      const changeQueried = action("bookingQuery", () => appState.queriedID = props.match.params.id);
      changeQueried();
    }, [props.location.search]); 


    /**
     * Creates a booking for the current user.
     * @param  event - Event which triggered the function call 
     * @param  flight - Flight which will be booked
     * @param  state - Modal state 
     * @param  setState - Function to change modal state
     */
    function book(event, flight, state, setState) {
      event.preventDefault();
      if(flight.no_of_seats - flight.no_of_booked_seats - state.selectedNumber >= 0) {
          bookFlight(appState.userToken, state.selectedNumber, flight.id);
          props.history.push("/book/" + flight.id);
      } else {
          setState({ errorMsg: "The plane has only " + (flight.no_of_seats - flight.no_of_booked_seats) + " seats." });
      }
  }
  
    return (
    <>
      {
          <FlightBookingModal flight={appState.getFlightById[0]} bookFlight={book}/>
      }
    </>
    )
  }
  
  export const Booking = observer(BookingContainer);