import React from 'react';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import { AppContext } from '../state/AppContext';
import { loadFlights } from '../services/flights';
import { FlightBookingModal } from '../components/FlightBookingModal';
import { bookFlight } from '../services/bookFlight';
import { action } from 'mobx';

function BookingContainer(props) {
    const { appState } = React.useContext(AppContext);
    useAsync(loadFlights.bind(null, appState, appState.userToken));
    React.useEffect(() => {
      const changeQueried = action("bookingQuery", () => appState.queriedID = props.match.params.id);
      changeQueried();
    }, [props.location.search]); 


    function book(e, flight, state, setState) {
      e.preventDefault();
      if(flight.no_of_seats - flight.no_of_booked_seats - state.selectedNumber >= 0) {
          bookFlight(appState, appState.userToken, state.selectedNumber, flight.id);
          props.history.push("/book/" + flight.id);
      } else {
          setState({ errorMsg: "The plane has only " + (flight.no_of_seats - flight.no_of_booked_seats) + " seats." });
      }
      

    
  }
    return (<React.Fragment>
      {
          <FlightBookingModal flight={appState.getFlightById[0]} bookFlight={book}/>
      }
    </React.Fragment>
    )
  }
  
  export const Booking = observer(BookingContainer);