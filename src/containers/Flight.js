import React from 'react';
import { appState } from '../state/AppState';
import { observer } from 'mobx-react';
import { ShowFlight } from '../components/ShowFlight';

function FlightContainer(props) {
  appState.queriedID = props.location.search.substring(1);
  const chosenFlight = appState.getFlightById;
  
  return (<div>
    {
      chosenFlight.length === 0 ?
        <div></div>
        :
        <ShowFlight chosenFlight={chosenFlight} history={props.history} />
    }
  </div>
  );
}

export const Flight = observer(FlightContainer);