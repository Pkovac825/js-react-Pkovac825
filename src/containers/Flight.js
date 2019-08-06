import React from 'react';
import { action } from 'mobx';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import styles from './Flight.module.css'
import { Header } from '../components/Header';
import { AppContext } from '../state/AppContext';
import { loadFlights } from '../services/flights';
import { FlightBookingInfo } from '../components/FlightBookingInfo';

/**
 * Container for a component that shows information concerning a single chosen flight.
 * Matches path "/book/:id"
 */
function FlightContainer(props) {
  const { appState } = React.useContext(AppContext);
  const logout = action("logout", () => appState.userToken = '');
  useAsync(loadFlights.bind(null, appState, appState.userToken));

  React.useEffect(() => {
    const changeQueried = action("infoQuery", () => appState.queriedID = props.match.params.id);
    changeQueried();
  }, [props.location.search]);

  const chosenFlight = appState.getFlightById;


  return (
  <>
    {
      chosenFlight.length === 0 ?
        <div></div>
        :
        <div className={styles.pageGrid}>
          <Header logout={logout} firstName={appState.user.firstName}/>
          <FlightBookingInfo chosenFlight={chosenFlight[0]} openBookingModal={(flight) => props.history.push("/book/modal/" + flight.id)} />
        </div>
    }
  </>
  );
}

export const Flight = observer(FlightContainer);