import React from 'react';
import { useAsync } from 'react-use';
import { observer } from 'mobx-react';
import { Header } from '../components/Header';
import { FlightBookingInfo } from '../components/FlightBookingInfo';
import styles from './Flight.module.css'
import { AppContext } from '../state/AppContext';
import { loadFlights } from '../services/flights';
import { action } from 'mobx';

function FlightContainer(props) {
  const { appState } = React.useContext(AppContext);
  const logout = action("logout", () => appState.userToken = '');
  useAsync(loadFlights.bind(null, appState, appState.userToken));

  React.useEffect(() => {
    const changeQueried = action("infoQuery", () => appState.queriedID = props.match.params.id);
    changeQueried();
  }, [props.location.search]);

  const chosenFlight = appState.getFlightById;


  return (<div>
    {
      chosenFlight.length === 0 ?
        <div></div>
        :
        <div className={styles.pageGrid}>
          <Header logout={logout} />
          <FlightBookingInfo chosenFlight={chosenFlight[0]} openBookingModal={(flight) => props.history.push("/book/modal/" + flight.id)} />
        </div>
    }
  </div>
  );
}

export const Flight = observer(FlightContainer);