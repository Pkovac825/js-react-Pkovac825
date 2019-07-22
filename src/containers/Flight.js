import React from 'react';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import { Header } from '../components/Header';
import { FlightBookingInfo } from '../components/FlightBookingInfo';
import styles from './Flight.module.css'
import { AppContext } from '../state/AppContext';
import { loadFlights } from '../services/flights';

function FlightContainer(props) {
  const { appState } = React.useContext(AppContext);
  useAsync(loadFlights.bind(null, appState, appState.userToken));
  appState.queriedID = props.location.search.substring(1).split("=")[1];
  const chosenFlight = appState.getFlightById;



  return (<div>
    {
      chosenFlight.length === 0 ?
        <div></div>
        :
        <div className={styles.pageGrid}>
          <Header appState={appState} />
          <FlightBookingInfo chosenFlight={chosenFlight[0]} history={props.history} />
        </div>
    }
  </div>
  );
}

export const Flight = observer(FlightContainer);