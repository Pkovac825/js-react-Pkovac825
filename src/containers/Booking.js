import React from 'react';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import { AppContext } from '../state/AppContext';
import { loadFlights } from '../services/flights';
import { FlightBookingModal } from '../components/FlightBookingModal';

function BookingContainer(props) {
    const { appState } = React.useContext(AppContext);
    useAsync(loadFlights.bind(null, appState, appState.userToken));
    appState.queriedID = props.location.search.substring(1).split("=")[1];
    const chosenFlight = appState.getFlightById;
  
  
    return (<React.Fragment>
      {
          <FlightBookingModal flight={chosenFlight[0]} appState={appState} history={props.history}/>
      }
    </React.Fragment>
    )
  }
  
  export const Booking = observer(BookingContainer);